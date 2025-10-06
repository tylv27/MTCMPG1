import { AlgorithmStep } from '../types/graph';

export function findConnectedComponents(
  adjacencyMatrix: number[][],
  n: number
): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<number>();
  const allComponents: number[][] = [];

  steps.push({
    type: 'start',
    message: 'Starting connected components algorithm using Depth-First Search (DFS)',
    visitedNodes: new Set(visited),
    currentComponent: [],
    allComponents: [],
  });

  for (let startNode = 0; startNode < n; startNode++) {
    if (!visited.has(startNode)) {
      const component: number[] = [];

      steps.push({
        type: 'start',
        message: `Found unvisited node ${startNode}. Starting new component exploration.`,
        currentNode: startNode,
        visitedNodes: new Set(visited),
        currentComponent: [],
        allComponents: [...allComponents],
      });

      dfsWithSteps(startNode, adjacencyMatrix, visited, component, steps, allComponents, n);

      allComponents.push([...component]);

      steps.push({
        type: 'component_complete',
        message: `Component ${allComponents.length} complete: [${component.join(', ')}]`,
        visitedNodes: new Set(visited),
        currentComponent: [...component],
        allComponents: [...allComponents],
      });
    }
  }

  steps.push({
    type: 'all_complete',
    message: `Algorithm complete! Found ${allComponents.length} connected component${allComponents.length !== 1 ? 's' : ''}.`,
    visitedNodes: new Set(visited),
    currentComponent: [],
    allComponents: [...allComponents],
  });

  return steps;
}

function dfsWithSteps(
  node: number,
  adjacencyMatrix: number[][],
  visited: Set<number>,
  component: number[],
  steps: AlgorithmStep[],
  allComponents: number[][],
  n: number
): void {
  visited.add(node);
  component.push(node);

  steps.push({
    type: 'visit',
    message: `Visiting node ${node}. Added to current component.`,
    currentNode: node,
    visitedNodes: new Set(visited),
    currentComponent: [...component],
    allComponents: [...allComponents],
  });

  for (let neighbor = 0; neighbor < n; neighbor++) {
    if (adjacencyMatrix[node][neighbor] === 1) {
      if (!visited.has(neighbor)) {
        steps.push({
          type: 'explore',
          message: `Exploring edge ${node} → ${neighbor}. Node ${neighbor} is unvisited, continuing DFS.`,
          currentNode: node,
          visitedNodes: new Set(visited),
          currentComponent: [...component],
          allComponents: [...allComponents],
          exploringEdge: { from: node, to: neighbor },
        });

        dfsWithSteps(neighbor, adjacencyMatrix, visited, component, steps, allComponents, n);
      } else {
        steps.push({
          type: 'explore',
          message: `Exploring edge ${node} → ${neighbor}. Node ${neighbor} already visited, skipping.`,
          currentNode: node,
          visitedNodes: new Set(visited),
          currentComponent: [...component],
          allComponents: [...allComponents],
          exploringEdge: { from: node, to: neighbor },
        });
      }
    }
  }
}

export function generateRandomGraph(n: number): number[][] {
  const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

  const edgeProbability = Math.min(0.3, 3 / n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.random() < edgeProbability) {
        matrix[i][j] = 1;
        matrix[j][i] = 1;
      }
    }
  }

  return matrix;
}

export function createAdjacencyMatrix(n: number, edges: { from: number; to: number }[]): number[][] {
  const matrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));

  edges.forEach(edge => {
    matrix[edge.from][edge.to] = 1;
    matrix[edge.to][edge.from] = 1;
  });

  return matrix;
}
