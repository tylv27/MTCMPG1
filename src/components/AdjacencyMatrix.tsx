interface AdjacencyMatrixProps {
  matrix: number[][];
  n: number;
}

export function AdjacencyMatrix({ matrix, n }: AdjacencyMatrixProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Matriz de Adyacencia</h2>
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-8 h-8 text-center text-sm font-semibold text-gray-600"></th>
              {Array.from({ length: n }, (_, i) => (
                <th key={i} className="w-8 h-8 text-center text-sm font-semibold text-gray-600">
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <td className="w-8 h-8 text-center text-sm font-semibold text-gray-600">
                  {i}
                </td>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`w-8 h-8 text-center text-sm border ${
                      cell === 1
                        ? 'bg-blue-100 text-blue-800 font-bold'
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
