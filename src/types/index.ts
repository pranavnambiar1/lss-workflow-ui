export interface ApiNode {
  id: string;
  name: string;
  description: string;
  category: string;
  responses: ApiResponse[];
}

export interface ApiResponse {
  id: string;
  name: string;
  description: string;
  data: any;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  jobId: string;
}

export interface Job {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export interface WorkflowNode {
  id: string;
  type: 'api' | 'task';
  data: {
    label: string;
    api?: ApiNode;
    task?: Task;
    selectedResponse?: ApiResponse;
  };
  position: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  data?: {
    response?: ApiResponse;
  };
}

export interface WorkflowState {
  assetClass: string;
  lenderName: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
