import { Node } from '../types/graph';

export function calculateNodePositions(n: number, width: number, height: number): Node[] {
  const nodes: Node[] = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.35;

  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    nodes.push({
      id: i,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  return nodes;
}
