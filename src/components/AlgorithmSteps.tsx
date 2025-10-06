import { AlgorithmStep } from '../types/graph';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface AlgorithmStepsProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  onStepChange: (index: number) => void;
  onPlayPause: () => void;
  onReset: () => void;
}

export function AlgorithmSteps({
  steps,
  currentStepIndex,
  isPlaying,
  onStepChange,
  onPlayPause,
  onReset,
}: AlgorithmStepsProps) {
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      onStepChange(currentStepIndex + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Algorithm Steps</h2>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 min-h-24">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {currentStepIndex + 1}
          </div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium leading-relaxed">
              {currentStep.message}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous step"
        >
          <SkipBack className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={onPlayPause}
          disabled={isLastStep && !isPlaying}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next step"
        >
          <SkipForward className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={onReset}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          title="Reset to start"
        >
          <RotateCcw className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex-1 ml-4">
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={currentStepIndex}
            onChange={(e) => onStepChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Step 1</span>
            <span className="text-xs text-gray-600 font-medium">
              {currentStepIndex + 1} / {steps.length}
            </span>
            <span className="text-xs text-gray-500">Step {steps.length}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Algorithm Info</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>Visited Nodes:</span>
            <span className="font-medium text-gray-800">
              {Array.from(currentStep.visitedNodes).sort((a, b) => a - b).join(', ') || 'None'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Current Component:</span>
            <span className="font-medium text-gray-800">
              {currentStep.currentComponent.length > 0
                ? `[${currentStep.currentComponent.join(', ')}]`
                : 'None'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Components Found:</span>
            <span className="font-medium text-gray-800">
              {currentStep.allComponents.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
