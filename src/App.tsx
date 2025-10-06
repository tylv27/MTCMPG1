import { useState, useEffect } from 'react';
import { InputForm } from './components/InputForm';
import { GraphVisualization } from './components/GraphVisualization';
import { AdjacencyMatrix } from './components/AdjacencyMatrix';
import { AlgorithmSteps } from './components/AlgorithmSteps';
import { Results } from './components/Results';
import { AlgorithmStep } from './types/graph';
import {
  findConnectedComponents,
  generateRandomGraph,
  createAdjacencyMatrix,
} from './utils/graphAlgorithms';
import { Network } from 'lucide-react';

function App() {
  const [graphState, setGraphState] = useState<{
    n: number;
    adjacencyMatrix: number[][];
  } | null>(null);
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (isPlaying && currentStepIndex < algorithmSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStepIndex === algorithmSteps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStepIndex, algorithmSteps.length]);

  const handleManualSubmit = (n: number, edges: { from: number; to: number }[]) => {
    const matrix = createAdjacencyMatrix(n, edges);
    setGraphState({ n, adjacencyMatrix: matrix });
    const steps = findConnectedComponents(matrix, n);
    setAlgorithmSteps(steps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleRandomGenerate = (n: number) => {
    const matrix = generateRandomGraph(n);
    setGraphState({ n, adjacencyMatrix: matrix });
    const steps = findConnectedComponents(matrix, n);
    setAlgorithmSteps(steps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setGraphState(null);
    setAlgorithmSteps([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const currentStep = algorithmSteps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Network className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Connected Components Analyzer
            </h1>
          </div>
          <p className="text-gray-600">
            Visualize and understand graph connected components using Depth-First Search
          </p>
        </header>

        {!graphState ? (
          <div className="max-w-2xl mx-auto">
            <InputForm
              onSubmit={handleManualSubmit}
              onRandomGenerate={handleRandomGenerate}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                New Graph
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AdjacencyMatrix
                  matrix={graphState.adjacencyMatrix}
                  n={graphState.n}
                />
                <Results components={currentStep.allComponents} />
              </div>

              <div className="space-y-6">
                <GraphVisualization
                  n={graphState.n}
                  adjacencyMatrix={graphState.adjacencyMatrix}
                  currentNode={currentStep.currentNode}
                  visitedNodes={currentStep.visitedNodes}
                  currentComponent={currentStep.currentComponent}
                  allComponents={currentStep.allComponents}
                  exploringEdge={currentStep.exploringEdge}
                />
                <AlgorithmSteps
                  steps={algorithmSteps}
                  currentStepIndex={currentStepIndex}
                  isPlaying={isPlaying}
                  onStepChange={setCurrentStepIndex}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  onReset={() => setCurrentStepIndex(0)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
