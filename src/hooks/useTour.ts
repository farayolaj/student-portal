import { useCallback, useState } from 'react';
import { Step, CallBackProps } from 'react-joyride';

export interface TourState {
  isRunning: boolean;
  stepIndex: number;
  completed: boolean;
}

export interface UseTourOptions {
  tourKey: string;
  steps: Step[];
  autoStart?: boolean;
  skipPersistence?: boolean;
}

export const useTour = ({ 
  tourKey, 
  steps, 
  autoStart = false, 
  skipPersistence = false 
}: UseTourOptions) => {
  // Check if tour has been completed before
  const getInitialState = (): TourState => {
    if (skipPersistence) {
      return {
        isRunning: autoStart,
        stepIndex: 0,
        completed: false,
      };
    }

    try {
      const saved = localStorage.getItem(`tour_${tourKey}`);
      if (saved) {
        const parsedState = JSON.parse(saved);
        // If tour was completed, don't auto-start
        if (parsedState.completed) {
          return {
            isRunning: false,
            stepIndex: 0,
            completed: true,
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load tour state from localStorage:', error);
    }

    return {
      isRunning: autoStart,
      stepIndex: 0,
      completed: false,
    };
  };

  const [tourState, setTourState] = useState<TourState>(getInitialState);

  // Save tour state to localStorage
  const saveTourState = useCallback((state: TourState) => {
    if (skipPersistence) return;
    
    try {
      localStorage.setItem(`tour_${tourKey}`, JSON.stringify(state));
    } catch (error) {
      console.warn('Failed to save tour state to localStorage:', error);
    }
  }, [tourKey, skipPersistence]);

  // Start the tour
  const startTour = useCallback(() => {
    const newState = { isRunning: true, stepIndex: 0, completed: false };
    setTourState(newState);
    saveTourState(newState);
  }, [saveTourState]);

  // Stop the tour
  const stopTour = useCallback(() => {
    const newState = { ...tourState, isRunning: false };
    setTourState(newState);
    saveTourState(newState);
  }, [tourState, saveTourState]);

  // Reset the tour (clear completion state)
  const resetTour = useCallback(() => {
    const newState = { isRunning: false, stepIndex: 0, completed: false };
    setTourState(newState);
    saveTourState(newState);
  }, [saveTourState]);

  // Mark tour as completed
  const completeTour = useCallback(() => {
    const newState = { isRunning: false, stepIndex: 0, completed: true };
    setTourState(newState);
    saveTourState(newState);
  }, [saveTourState]);

  // Handle tour callback events
  const handleTourCallback = useCallback((data: CallBackProps) => {
    const { index, status } = data;

    if (status === 'finished' || status === 'skipped') {
      completeTour();
    } else if (data.type === 'step:after') {
      const newState = { ...tourState, stepIndex: index + 1 };
      setTourState(newState);
      saveTourState(newState);
    }
  }, [tourState, completeTour, saveTourState]);

  return {
    tourState,
    steps,
    startTour,
    stopTour,
    resetTour,
    completeTour,
    handleTourCallback,
    isCompleted: tourState.completed,
    isRunning: tourState.isRunning,
  };
};