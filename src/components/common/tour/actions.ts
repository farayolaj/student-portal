import { Step } from "react-joyride";

export const actionTypes = {
  PLAY_TOUR: "PLAY_TOUR",
  SET_TOUR: "SET_TOUR",
  STOP_TOUR: "STOP_TOUR",
  GO_TO_STEP: "GO_TO_STEP",
  COMPLETE_TOUR: "COMPLETE_TOUR",
  RESET_TOUR: "RESET_TOUR",
} as const;

export function setTour(
  key: string,
  steps: Array<Step>,
  onComplete?: () => void
) {
  return {
    type: actionTypes.SET_TOUR,
    payload: {
      key,
      steps,
      onComplete,
    },
  };
}

export function playTour() {
  return {
    type: actionTypes.PLAY_TOUR,
  };
}

export function stopTour() {
  return {
    type: actionTypes.STOP_TOUR,
  };
}

export function goToStep(index: number) {
  return {
    type: actionTypes.GO_TO_STEP,
    payload: index,
  };
}

export function completeTour() {
  return {
    type: actionTypes.COMPLETE_TOUR,
  };
}

export function resetTour() {
  return {
    type: actionTypes.RESET_TOUR,
  };
}

export type TourAction =
  | ReturnType<typeof playTour>
  | ReturnType<typeof setTour>
  | ReturnType<typeof stopTour>
  | ReturnType<typeof goToStep>
  | ReturnType<typeof completeTour>
  | ReturnType<typeof resetTour>;
