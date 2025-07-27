# LSS Workflow UI

A modern React-based UI for LSS Workflow management - a Zapier-like API orchestration tool.

## Features

- **Whiteboard Interface**: Drag-and-drop API orchestration using React Flow
- **Job-based Workflow**: Organize APIs into loan journey jobs (Identity Verification, Biometric Verification, etc.)
- **Response-based Routing**: Connect APIs based on their response outcomes
- **Asset Class & Lender Configuration**: Customize workflows for different loan types and lenders
- **Real-time Visual Feedback**: Interactive workflow building with immediate visual feedback

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to Use

1. **Setup**: Select your Asset Class (Personal Loan, Home Loan, etc.) and Lender Name
2. **Drag APIs**: From the left sidebar, drag APIs to the job tasks on the right panel
3. **Connect Workflows**: Connect APIs by drawing connections between nodes
4. **Response Selection**: When connecting APIs, select which response should trigger the next API
5. **Build Linear Flows**: Create end-to-end API orchestration workflows

## Project Structure

```
src/
├── components/
│   ├── SetupForm.tsx           # Initial configuration form
│   ├── WorkflowBuilder.tsx     # Main workflow canvas
│   ├── ApiSidebar.tsx          # Draggable API list
│   ├── JobsPanel.tsx           # Job tasks drop zones
│   └── ResponseSelectorModal.tsx # Response selection dialog
├── constants/
│   └── index.ts                # Jobs, APIs, and configuration data
├── types/
│   └── index.ts                # TypeScript type definitions
├── App.tsx                     # Main application component
└── index.tsx                   # Application entry point
```

## Tech Stack

- **React 18** with TypeScript
- **Material-UI** for consistent UI components
- **React Flow** for whiteboard-like drag-and-drop interface
- **React Router** for navigation

## Jobs & Tasks

The workflow is organized into 5 main jobs:

1. **Job 1 - Identity Verification**: Dedupe, DigiLocker KYC, Aadhaar Data, Name Match
2. **Job 2 - Biometric Verification**: Selfie Liveness, OTP Generation/Verification
3. **Job 3 - Financial Verification**: Bank Account Validation, Mandate Registration
4. **Job 4 - Loan Processing**: Offer Generation, Document Creation/Updates
5. **Job 5 - Disbursement**: Loan Disbursement, Deductions, First Installment Date

## API Categories

- **Identity**: Identity Verification API
- **Documents**: KYC Document API
- **Credit**: Credit Score API
- **Banking**: Bank Verification API
- **Loan**: Loan Eligibility API
- **Disbursement**: Disbursement API

Each API includes multiple response scenarios (Success, Partial, Failed) for realistic workflow building.

## Development

The project uses TypeScript for type safety and Material-UI for consistent UI components. The application is set up with React Flow for the visual workflow builder interface.
