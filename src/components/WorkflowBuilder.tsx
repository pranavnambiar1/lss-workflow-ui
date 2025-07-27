import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  Node,
  NodeTypes,
  useEdgesState,
  useNodesState,
  NodeMouseHandler,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { WorkflowState, Task } from '../types';
import ApiSidebar from './ApiSidebar';
import JobsPanel from './JobsPanel';
import ResponseSelectorModal from './ResponseSelectorModal';
import TaskNode from './TaskNode';
import ApiNode from './ApiNode';

interface WorkflowBuilderProps {
  workflowState: WorkflowState;
  setWorkflowState: React.Dispatch<React.SetStateAction<WorkflowState>>;
}

/* -------------------------------------------------------------------------- */
/*                         Helper / internal type guards                      */
/* -------------------------------------------------------------------------- */

const isApiNode = (n: Node<any>): boolean => n.type === 'api' || n.data?.isApi;
const isTaskNode = (n: Node<any>): boolean => n.type === 'task' || n.data?.isTask;

/* -------------------------------------------------------------------------- */
/*                              React Component                                */
/* -------------------------------------------------------------------------- */

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ workflowState, setWorkflowState }) => {
  /* ------------------------------ react-flow ------------------------------ */
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const nodeTypes: NodeTypes = useMemo(() => ({ task: TaskNode, api: ApiNode }), []);

  /* ------------------------------ UI State ------------------------------- */
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  /* ----------------------------- Sound refs ------------------------------ */
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const dropSoundRef = useRef<HTMLAudioElement | null>(null);
  const connectSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSoundRef.current = new Audio('/sounds/click.mp3');
    dropSoundRef.current = new Audio('/sounds/drop.mp3');
    connectSoundRef.current = new Audio('/sounds/connect.mp3');
  }, []);

  /* ----------------------------- Helpers --------------------------------- */
  const play = (ref: React.RefObject<HTMLAudioElement>) => {
    ref.current?.play().catch(() => {/* ignore */});
  };

  /* --------------------------- Drag-and-drop ----------------------------- */
  const handleTaskSelect = useCallback((task: Task) => {
    play(clickSoundRef);

    const taskNode: Node = {
      id: `task-${task.id}-${Date.now()}`,
      type: 'task',
      position: { x: 100, y: 100 + (nodes.length * 40) },
      data: {
        label: task.name,
        task,
        isTask: true,
      },
    };
    setNodes((ns) => [...ns, taskNode]);
  }, [nodes]);

  const handleApiDrop = useCallback((raw: any) => {
    play(dropSoundRef);

    let data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (data?.data) data = { ...data, ...data.data };

    const apiNode: Node = {
      id: `api-${Date.now()}`,
      type: 'api',
      position: data.position || { x: 300, y: 200 },
      data: {
        ...data,
        isApi: true,
        label: data.label || data.api?.name || 'API',
      },
    };
    setNodes((ns) => [...ns, apiNode]);
  }, []);

  /* -------------------------- Connection Logic --------------------------- */
  const isValidConnection = useCallback((conn: Connection) => {
    const s = nodes.find((n) => n.id === conn.source);
    const t = nodes.find((n) => n.id === conn.target);
    if (!s || !t) return false;
    // Allow task→api or api→api
    if (isTaskNode(s) && isApiNode(t)) return true;
    if (isApiNode(s) && isApiNode(t)) return true;
    return false;
  }, [nodes]);

  const onConnect = useCallback((params: Connection) => {
    if (!isValidConnection(params)) return;

    const sNode = nodes.find((n) => n.id === params.source);
    const tNode = nodes.find((n) => n.id === params.target);

    // For api→api ask response mapping, else create directly
    if (sNode && tNode && isApiNode(sNode) && isApiNode(tNode)) {
      setPendingConnection(params);
      setIsResponseModalOpen(true);
    } else {
      setEdges((es) => addEdge({ ...params, animated: true }, es));
      play(connectSoundRef);
    }
  }, [nodes]);

  const handleResponseSelection = useCallback((responseId: string) => {
    if (pendingConnection) {
      setEdges((es) => addEdge({ ...pendingConnection, id: `edge-${Date.now()}`, data: { responseId }, animated: true }, es));
      play(connectSoundRef);
    }
    setPendingConnection(null);
    setIsResponseModalOpen(false);
  }, [pendingConnection]);

  /* -------------------------- Traverse / export -------------------------- */
  type ExportItem = {
    id: string;
    investor_name: string;
    api_name: string;
    order: number;
    event_group: string | null;
    action_on_success_1: string[];
    action_on_success_2: string[];
    action_on_success_3: string[];
    // plus many static fields… keeping minimal for brevity
  };

  const traverseWorkflow = useCallback(() => {
    // order by layout (x) then (y)
    const apiNodes = nodes.filter(isApiNode).sort((a, b) => (a.position.x - b.position.x) || (a.position.y - b.position.y));

    const items: ExportItem[] = apiNodes.map((n, idx) => {
      // incoming from task → event group
      const incoming = edges.filter((e) => e.target === n.id);
      let eventGroup: string | null = null;
      incoming.forEach((e) => {
        const src = nodes.find((no) => no.id === e.source);
        if (src && isTaskNode(src)) eventGroup = (src.data as any)?.label ?? null;
      });

      // outgoing api→api success targets (first 3)
      const outgoing = edges.filter((e) => e.source === n.id).slice(0, 3);
      const successTargets = outgoing.map((e) => {
        const tgt = nodes.find((no) => no.id === e.target);
        return (tgt?.data as any)?.label || (tgt?.data as any)?.api?.name || tgt?.id;
      });

      return {
        id: String(idx + 1),
        investor_name: workflowState.lenderName.toLowerCase(),
        api_name: (n.data as any)?.label || `api_${idx + 1}`,
        order: idx + 1,
        event_group: eventGroup,
        action_on_success_1: successTargets[0] ? [successTargets[0]] : [],
        action_on_success_2: successTargets[1] ? [successTargets[1]] : [],
        action_on_success_3: successTargets[2] ? [successTargets[2]] : [],
      };
    });

    const jsonStr = JSON.stringify(items, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflowState.lenderName}_workflow.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges, workflowState]);;

  /* ---------------------------- Render ---------------------------------- */
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Header */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, p: 2, display: 'flex', gap: 2, alignItems: 'center', zIndex: 1000, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6">LSS Workflow Builder</Typography>
        <Chip label={`Asset: ${workflowState.assetClass}`} color="primary" />
        <Chip label={`Lender: ${workflowState.lenderName}`} color="secondary" />
        <Box flexGrow={1} />
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => setWorkflowState({ assetClass: '', lenderName: '', nodes: [], edges: [] })}>
          Back to Setup
        </Button>
        <Button variant="contained" color="success" disabled={nodes.length === 0} onClick={traverseWorkflow}>Traverse & Export</Button>
      </Box>

      {/* API Sidebar */}
      <ApiSidebar lenderName={workflowState.lenderName} />

      {/* Canvas */}
      <Box sx={{ flex: 1, mt: 8 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          connectionLineType={ConnectionLineType.SmoothStep}
          onDrop={(evt) => {
            evt.preventDefault();
            const data = evt.dataTransfer.getData('application/reactflow');
            if (data) handleApiDrop(data);
          }}
          onDragOver={(evt) => {
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'move';
          }}
        >
          <Controls />
          <Background gap={20} size={1} variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </Box>

      {/* Jobs / Task List */}
      <JobsPanel onNodeAdd={handleApiDrop} onTaskSelect={handleTaskSelect} />

      {/* Modal for selecting API response edge */}
      <ResponseSelectorModal
        open={isResponseModalOpen}
        onClose={() => {
          setIsResponseModalOpen(false);
          setPendingConnection(null);
        }}
        onSelect={handleResponseSelection}
        sourceNodeId={pendingConnection?.source ?? ''}
      />
    </Box>
  );
};

export default WorkflowBuilder;
