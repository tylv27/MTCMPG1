export interface Edge {
  from: number;
  to: number;
}

export interface GraphState {
  n: number;
  edges: Edge[];
  adjacencyMatrix: number[][];
}

export interface AlgorithmStep {
  type: 'start' | 'visit' | 'explore' | 'component_complete' | 'all_complete';
  message: string;
  currentNode?: number;
  visitedNodes: Set<number>;
  currentComponent: number[];
  allComponents: number[][];
  exploringEdge?: { from: number; to: number };
}

export interface Node {
  id: number;
  x: number;
  y: number;
}
