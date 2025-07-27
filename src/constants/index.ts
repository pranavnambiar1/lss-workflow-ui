import { Job, ApiNode } from '../types';

export const JOBS: Job[] = [
  {
    id: 'job1',
    name: 'Job 1 - Identity Verification',
    description: 'Initial identity verification and KYC processes',
    tasks: [
      { id: 'dedupe_initiated', name: 'Dedupe_Initiated', description: 'Check for duplicate applications', jobId: 'job1' },
      { id: 'digilocker_kyc_initiated', name: 'Digilocker_KYC_Initiated', description: 'Start DigiLocker KYC process', jobId: 'job1' },
      { id: 'fetch_aadhaar_data', name: 'Fetch_Aadhaar_Data', description: 'Retrieve Aadhaar information', jobId: 'job1' },
      { id: 'digilocker_name_match', name: 'Digilocker_Name_Match', description: 'Match name with DigiLocker', jobId: 'job1' }
    ]
  },
  {
    id: 'job2',
    name: 'Job 2 - Biometric Verification',
    description: 'Biometric and liveness verification',
    tasks: [
      { id: 'selfie_liveliness_initiated', name: 'Selfie_Liveliness_Initiated', description: 'Start selfie liveness check', jobId: 'job2' },
      { id: 'generate_otp', name: 'Generate OTP', description: 'Generate one-time password', jobId: 'job2' },
      { id: 'verify_otp', name: 'Verify OTP', description: 'Verify one-time password', jobId: 'job2' }
    ]
  },
  {
    id: 'job3',
    name: 'Job 3 - Financial Verification',
    description: 'Bank account and financial verification',
    tasks: [
      { id: 'bank_account_validation_initiated', name: 'Bank_Account_Validation_Initiated', description: 'Validate bank account details', jobId: 'job3' },
      { id: 'mandate_registration_initiated', name: 'Mandate_Registration_Initiated', description: 'Register payment mandate', jobId: 'job3' },
      { id: 'fetch_mandate_data', name: 'Fetch_Mandate_Data', description: 'Retrieve mandate information', jobId: 'job3' }
    ]
  },
  {
    id: 'job4',
    name: 'Job 4 - Loan Processing',
    description: 'Loan offer generation and processing',
    tasks: [
      { id: 'offer_generation_initiated', name: 'Offer_Generation_Initiated', description: 'Generate loan offer', jobId: 'job4' },
      { id: 'document_generation_initiated', name: 'Document_Generation_Initiated', description: 'Generate loan documents', jobId: 'job4' },
      { id: 'document_created', name: 'Document_Created', description: 'Loan document created', jobId: 'job4' },
      { id: 'document_updated', name: 'Document_Updated', description: 'Loan document updated', jobId: 'job4' }
    ]
  },
  {
    id: 'job5',
    name: 'Job 5 - Disbursement',
    description: 'Loan disbursement and final processing',
    tasks: [
      { id: 'disbursement_initiated', name: 'Disbursement_Initiated', description: 'Start loan disbursement', jobId: 'job5' },
      { id: 'disbursement_deduction_initiated', name: 'Disbursement_Deduction_Initiated', description: 'Process disbursement deductions', jobId: 'job5' },
      { id: 'fetch_first_installment_date', name: 'Fetch_First_Installment_Date', description: 'Get first EMI date', jobId: 'job5' }
    ]
  }
];

export const DUMMY_APIS: ApiNode[] = [
  {
    id: 'api1',
    name: 'Identity Verification API',
    description: 'Verifies user identity using multiple data sources',
    category: 'Identity',
    responses: [
      { id: 'resp1', name: 'Success', description: 'Identity verified successfully', data: { status: 'verified', confidence: 95 } },
      { id: 'resp2', name: 'Partial Match', description: 'Partial identity match found', data: { status: 'partial', confidence: 70 } },
      { id: 'resp3', name: 'Failed', description: 'Identity verification failed', data: { status: 'failed', confidence: 20 } }
    ]
  },
  {
    id: 'api2',
    name: 'KYC Document API',
    description: 'Processes KYC documents and extracts information',
    category: 'Documents',
    responses: [
      { id: 'resp4', name: 'Documents Valid', description: 'All documents are valid', data: { status: 'valid', documents: ['aadhaar', 'pan'] } },
      { id: 'resp5', name: 'Missing Documents', description: 'Some documents are missing', data: { status: 'incomplete', missing: ['address_proof'] } },
      { id: 'resp6', name: 'Invalid Documents', description: 'Documents are invalid or corrupted', data: { status: 'invalid', errors: ['blurry_image'] } }
    ]
  },
  {
    id: 'api3',
    name: 'Credit Score API',
    description: 'Fetches credit score from multiple bureaus',
    category: 'Credit',
    responses: [
      { id: 'resp7', name: 'High Score', description: 'Credit score above 750', data: { score: 780, bureau: 'CIBIL' } },
      { id: 'resp8', name: 'Medium Score', description: 'Credit score between 650-750', data: { score: 680, bureau: 'CIBIL' } },
      { id: 'resp9', name: 'Low Score', description: 'Credit score below 650', data: { score: 580, bureau: 'CIBIL' } }
    ]
  },
  {
    id: 'api4',
    name: 'Bank Verification API',
    description: 'Verifies bank account details and balance',
    category: 'Banking',
    responses: [
      { id: 'resp10', name: 'Account Valid', description: 'Bank account is valid and active', data: { status: 'active', balance: 50000 } },
      { id: 'resp11', name: 'Insufficient Balance', description: 'Account valid but low balance', data: { status: 'active', balance: 1000 } },
      { id: 'resp12', name: 'Account Invalid', description: 'Bank account is invalid or closed', data: { status: 'invalid', error: 'account_closed' } }
    ]
  },
  {
    id: 'api5',
    name: 'Loan Eligibility API',
    description: 'Calculates loan eligibility based on various factors',
    category: 'Loan',
    responses: [
      { id: 'resp13', name: 'Eligible', description: 'User is eligible for loan', data: { eligible: true, amount: 100000, rate: 12.5 } },
      { id: 'resp14', name: 'Partially Eligible', description: 'User eligible for reduced amount', data: { eligible: true, amount: 50000, rate: 15.0 } },
      { id: 'resp15', name: 'Not Eligible', description: 'User not eligible for loan', data: { eligible: false, reason: 'low_credit_score' } }
    ]
  },
  {
    id: 'api6',
    name: 'Disbursement API',
    description: 'Processes loan disbursement to user account',
    category: 'Disbursement',
    responses: [
      { id: 'resp16', name: 'Disbursed', description: 'Loan amount disbursed successfully', data: { status: 'disbursed', transaction_id: 'TXN123456' } },
      { id: 'resp17', name: 'Pending', description: 'Disbursement is pending approval', data: { status: 'pending', approval_required: true } },
      { id: 'resp18', name: 'Failed', description: 'Disbursement failed due to technical error', data: { status: 'failed', error: 'bank_unavailable' } }
    ]
  }
];

export const ASSET_CLASSES = [
  'Personal Loan',
  'Home Loan',
  'Car Loan',
  'Business Loan',
  'Education Loan'
];

export const LENDERS = [
  'HDFC Bank',
  'ICICI Bank',
  'SBI',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Yes Bank',
  'SMFG'
];

export const SMFG_APIS = [
  { id: 'pan_mobile_dedupe', name: 'pan_mobile_dedupe', description: 'PAN Mobile Dedupe', category: 'Dedupe', responses: [
    { id: 'success', name: 'Success', description: 'Operation completed successfully', data: { status: 'success' } },
    { id: 'failure', name: 'Failure', description: 'Operation failed', data: { status: 'failure' } }
  ] },
  { id: 'dedupe_response_to_task', name: 'dedupe_response_to_task', description: 'Dedupe Response To Task', category: 'Dedupe', responses: [
    { id: 'success', name: 'Success', description: 'Operation completed successfully', data: { status: 'success' } },
    { id: 'failure', name: 'Failure', description: 'Operation failed', data: { status: 'failure' } }
  ] },
  { id: 'soft_offer', name: 'soft_offer', description: 'Soft Offer', category: 'Offer' },
  { id: 'offer_callback_webhook', name: 'offer_callback_webhook', description: 'Offer Callback Webhook', category: 'Offer' },
  { id: 'offer_response_to_task', name: 'offer_response_to_task', description: 'Offer Response To Task', category: 'Offer' },
  { id: 'update_loan_level_attributes', name: 'update_loan_level_attributes', description: 'Update Loan Level Attributes', category: 'Loan' },
  { id: 'interest_rate_push', name: 'interest_rate_push', description: 'Interest Rate Push', category: 'Loan' },
  { id: 'processing_fee_push', name: 'processing_fee_push', description: 'Processing Fee Push', category: 'Fee' },
  { id: 'intiate_ekyc', name: 'intiate_ekyc', description: 'Initiate eKYC', category: 'KYC' },
  { id: 'digilocker_link_to_task', name: 'digilocker_link_to_task', description: 'Digilocker Link To Task', category: 'KYC' },
  { id: 'fetch_ekyc', name: 'fetch_ekyc', description: 'Fetch eKYC', category: 'KYC' },
  { id: 'aadhar_data_to_task', name: 'aadhar_data_to_task', description: 'Aadhaar Data To Task', category: 'KYC' },
  { id: 'selfie_doc_upload', name: 'selfie_doc_upload', description: 'Selfie Doc Upload', category: 'Document' },
  { id: 'app_push', name: 'app_push', description: 'App Push', category: 'Notification' },
  { id: 'rejection_callback_webhook', name: 'rejection_callback_webhook', description: 'Rejection Callback Webhook', category: 'Webhook' },
  { id: 'penny_verification_failure', name: 'penny_verification_failure', description: 'Penny Verification Failure', category: 'Verification' },
  { id: 'stp_nstp_callback_webhook', name: 'stp_nstp_callback_webhook', description: 'STP NSTP Callback Webhook', category: 'Webhook' },
  { id: 'penny_verification', name: 'penny_verification', description: 'Penny Verification', category: 'Verification' },
  { id: 'Initial_Digilocker_Name_Match_lcf_response', name: 'Initial_Digilocker_Name_Match_lcf_response', description: 'Initial Digilocker Name Match LCF Response', category: 'KYC' },
  { id: 'doc_status_to_task', name: 'doc_status_to_task', description: 'Doc Status To Task', category: 'Document' },
  { id: 'initiate_enach', name: 'initiate_enach', description: 'Initiate eNACH', category: 'NACH' },
  { id: 'enach_link_response_to_task', name: 'enach_link_response_to_task', description: 'eNACH Link Response To Task', category: 'NACH' },
  { id: 'fetch_enach', name: 'fetch_enach', description: 'Fetch eNACH', category: 'NACH' },
  { id: 'fetch_enach_response_to_task', name: 'fetch_enach_response_to_task', description: 'Fetch eNACH Response To Task', category: 'NACH' },
  { id: 'generate_otp', name: 'generate_otp', description: 'Generate OTP', category: 'Authentication' },
  { id: 'verify_otp', name: 'verify_otp', description: 'Verify OTP', category: 'Authentication' },
  { id: 'doc_push_369', name: 'doc_push_369', description: 'Doc Push 369', category: 'Document' },
  { id: 'status_callback_webhook', name: 'status_callback_webhook', description: 'Status Callback Webhook', category: 'Webhook' },
  { id: 'utr_callback_webhook', name: 'utr_callback_webhook', description: 'UTR Callback Webhook', category: 'Webhook' },
  { id: 'utr_to_task', name: 'utr_to_task', description: 'UTR To Task', category: 'Payment' },
  { id: 'dedupe_secondary', name: 'dedupe_secondary', description: 'Dedupe Secondary', category: 'Dedupe' },
  { id: 'processing_fee_push_secondary', name: 'processing_fee_push_secondary', description: 'Processing Fee Push Secondary', category: 'Fee' }
];
