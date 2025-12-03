import React from "react";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCardProps {
  title: string;
  type: string;
  stack: string[];
  metrics: ProjectMetric[];
  children: React.ReactNode;
}

