import { useState } from 'react';
import { Plus, Trash2, Shuffle } from 'lucide-react';

interface InputFormProps {
  onSubmit: (n: number, edges: { from: number; to: number }[]) => void;
  onRandomGenerate: (n: number) => void;
}

export function InputForm({ onSubmit, onRandomGenerate }: InputFormProps) {
  const [n, setN] = useState<number>(6);
  const [mode, setMode] = useState<'manual' | 'random'>('random');
  const [edges, setEdges] = useState<{ from: number; to: number }[]>([]);
  const [fromNode, setFromNode] = useState<string>('');
  const [toNode, setToNode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddEdge = () => {
    setError('');
    const from = parseInt(fromNode);
    const to = parseInt(toNode);

    if (isNaN(from) || isNaN(to)) {
      setError('Please enter valid numbers');
      return;
    }

    if (from < 0 || from >= n || to < 0 || to >= n) {
      setError(`Nodes must be between 0 and ${n - 1}`);
      return;
    }

    if (from === to) {
      setError('Cannot create self-loop');
      return;
    }

    const edgeExists = edges.some(
      (e) => (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );

    if (edgeExists) {
      setError('Edge already exists');
      return;
    }

    setEdges([...edges, { from, to }]);
    setFromNode('');
    setToNode('');
  };

  const handleRemoveEdge = (index: number) => {
    setEdges(edges.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setError('');
    if (mode === 'manual') {
      onSubmit(n, edges);
    } else {
      onRandomGenerate(n);
    }
  };

  const handleNChange = (value: number) => {
    setN(value);
    setEdges([]);
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Graph Configuration</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Nodes (n)
            </label>
            <input
              type="range"
              min="6"
              max="12"
              value={n}
              onChange={(e) => handleNChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-center mt-2">
              <span className="text-3xl font-bold text-blue-600">{n}</span>
              <span className="text-sm text-gray-600 ml-2">nodes</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Graph Creation Mode
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMode('random');
                  setEdges([]);
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  mode === 'random'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Shuffle className="inline-block w-5 h-5 mr-2" />
                Random
              </button>
              <button
                onClick={() => {
                  setMode('manual');
                  setEdges([]);
                  setError('');
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  mode === 'manual'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Manual
              </button>
            </div>
          </div>

          {mode === 'manual' && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Edges</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  placeholder="From"
                  value={fromNode}
                  onChange={(e) => setFromNode(e.target.value)}
                  min="0"
                  max={n - 1}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="flex items-center text-gray-500">→</span>
                <input
                  type="number"
                  placeholder="To"
                  value={toNode}
                  onChange={(e) => setToNode(e.target.value)}
                  min="0"
                  max={n - 1}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddEdge}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="text-sm text-red-600 mb-3">{error}</div>
              )}

              {edges.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <p className="text-sm font-medium text-gray-600">
                    Edges ({edges.length}):
                  </p>
                  {edges.map((edge, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">
                        {edge.from} ↔ {edge.to}
                      </span>
                      <button
                        onClick={() => handleRemoveEdge(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={mode === 'manual' && edges.length === 0}
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
          >
            {mode === 'random' ? 'Generate Random Graph' : 'Create Graph'}
          </button>
        </div>
      </div>
    </div>
  );
}
