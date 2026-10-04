export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  created_at?: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  record?: ContactMessage;
  isSimulated?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  tags: string[];
}

export interface UseCaseItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  impactMetric: string;
  impactLabel: string;
  tags: string[];
  capabilities: string[];
}

export interface TechNode {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  specs: string[];
  latency: string;
}
