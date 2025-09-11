import { Step } from "react-joyride";
import { actionTypes, TourAction } from "./actions";

export type TourState = {
  tour: {
    key: string;
    steps: Array<Step>;
  } | null;
  isRunning: boolean;
  stepIndex: number;
};

export default function reducer(state: TourState, action: TourAction) {
  switch (action.type) {
    case actionTypes.SET_TOUR:
      return {
        ...state,
        tour: action.payload,
      };
    case actionTypes.START_TOUR:
      return {
        ...state,
        isRunning: true,
      };
    default:
      return state;
  }
}
