import { useEffect, useRef } from 'react';
import { Node } from '../types/graph';
import { calculateNodePositions } from '../utils/graphLayout';

interface GraphVisualizationProps {
  n: number;
  adjacencyMatrix: number[][];
  currentNode?: number;
  visitedNodes: Set<number>;
  currentComponent: number[];
  allComponents: number[][];
  exploringEdge?: { from: number; to: number };
}

export function GraphVisualization({
  n,
  adjacencyMatrix,
  currentNode,
  visitedNodes,
  currentComponent,
  allComponents,
  exploringEdge,
}: GraphVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    if (nodesRef.current.length !== n) {
      nodesRef.current = calculateNodePositions(n, width, height);
    }

    const nodes = nodesRef.current;

    ctx.clearRect(0, 0, width, height);

    const componentColors = [
      '#3b82f6',
      '#ef4444',
      '#10b981',
      '#f59e0b',
      '#8b5cf6',
      '#ec4899',
      '#06b6d4',
      '#84cc16',
    ];

    const getNodeColor = (nodeId: number): string => {
      for (let i = 0; i < allComponents.length; i++) {
        if (allComponents[i].includes(nodeId)) {
          return componentColors[i % componentColors.length];
        }
      }

      if (currentComponent.includes(nodeId)) {
        return '#6366f1';
      }

      if (visitedNodes.has(nodeId)) {
        return '#9ca3af';
      }

      return '#d1d5db';
    };

    ctx.lineWidth = 2;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (adjacencyMatrix[i][j] === 1) {
          const nodeI = nodes[i];
          const nodeJ = nodes[j];

          const isExploring = exploringEdge &&
            ((exploringEdge.from === i && exploringEdge.to === j) ||
             (exploringEdge.from === j && exploringEdge.to === i));

          if (isExploring) {
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 4;
          } else {
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 2;
          }

          ctx.beginPath();
          ctx.moveTo(nodeI.x, nodeI.y);
          ctx.lineTo(nodeJ.x, nodeJ.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      const color = getNodeColor(node.id);
      const isActive = currentNode === node.id;

      ctx.beginPath();
      ctx.arc(node.x, node.y, isActive ? 28 : 24, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      if (isActive) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.stroke();
      } else {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id.toString(), node.x, node.y);
    });

  }, [n, adjacencyMatrix, currentNode, visitedNodes, currentComponent, allComponents, exploringEdge]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Graph Visualization</h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        className="border-2 border-gray-200 rounded-lg"
      />
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
          <span className="text-sm text-gray-600">Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white"></div>
          <span className="text-sm text-gray-600">Current Component</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-4 border-yellow-400"></div>
          <span className="text-sm text-gray-600">Active Node</span>
        </div>
      </div>
    </div>
  );
}
