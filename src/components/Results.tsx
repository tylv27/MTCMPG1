interface ResultsProps {
  components: number[][];
}

export function Results({ components }: ResultsProps) {
  const componentColors = [
    'bg-blue-100 text-blue-800 border-blue-300',
    'bg-red-100 text-red-800 border-red-300',
    'bg-green-100 text-green-800 border-green-300',
    'bg-yellow-100 text-yellow-800 border-yellow-300',
    'bg-purple-100 text-purple-800 border-purple-300',
    'bg-pink-100 text-pink-800 border-pink-300',
    'bg-cyan-100 text-cyan-800 border-cyan-300',
    'bg-lime-100 text-lime-800 border-lime-300',
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Connected Components</h2>

      <div className="mb-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
        <p className="text-lg font-semibold text-green-800">
          Total Components: <span className="text-2xl">{components.length}</span>
        </p>
      </div>

      <div className="space-y-3">
        {components.map((component, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${componentColors[index % componentColors.length]}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Component {index + 1}:</span>
              <span className="font-mono text-lg">
                [{component.join(', ')}]
              </span>
            </div>
            <div className="mt-2 text-sm opacity-75">
              Size: {component.length} node{component.length !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">About DFS Algorithm</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Depth-First Search (DFS) algorithm explores each unvisited node by going as deep
          as possible before backtracking. This naturally identifies all nodes reachable from
          a starting point, forming a connected component. The process repeats for any remaining
          unvisited nodes until all components are found.
        </p>
      </div>
    </div>
  );
}
