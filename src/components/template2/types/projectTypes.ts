export interface Project {
  title: string;
  problem: string;
  solution: string;
  tags: string[];
  metrics: {
    scope: string;
    impact: string;
  };
  arch: string[];
  githubUrl?: string;
  demoUrl?: string;
  visibility?: 'enterprise' | 'public';
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  desc: string;
  responsibilities: string[];
  stack: string[];
  highlight: boolean;
}

export interface LeadershipArea {
  title: string;
  highlights: string[];
  metric: string;
}