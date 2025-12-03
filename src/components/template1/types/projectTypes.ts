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
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}
