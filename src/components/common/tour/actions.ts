import { Step } from "react-joyride";

export const actionTypes = {
  SET_TOUR: "SET_TOUR",
  START_TOUR: "START_TOUR",
} as const;

export function setTour(key: string, steps: Array<Step>) {
  return {
    type: actionTypes.SET_TOUR,
    payload: {
      key,
      steps,
    },
  };
}

export function startTour() {
  return {
    type: actionTypes.START_TOUR,
  };
}

export type TourAction =
  | ReturnType<typeof setTour>
  | ReturnType<typeof startTour>;
