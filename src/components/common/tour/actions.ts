import { Step } from "react-joyride";

export const actionTypes = {
  PLAY_TOUR: "PLAY_TOUR",
  START_TOUR: "START_TOUR",
  STOP_TOUR: "STOP_TOUR",
  GO_TO_STEP: "GO_TO_STEP",
} as const;

export function startTour(key: string, steps: Array<Step>) {
  return {
    type: actionTypes.START_TOUR,
    payload: {
      key,
      steps,
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

export type TourAction =
  | ReturnType<typeof playTour>
  | ReturnType<typeof startTour>
  | ReturnType<typeof stopTour>
  | ReturnType<typeof goToStep>;
