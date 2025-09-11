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
    case actionTypes.START_TOUR:
      return {
        ...state,
        tour: action.payload,
        isRunning: true,
      };
    case actionTypes.PLAY_TOUR:
      return {
        ...state,
        isRunning: true,
      };
    case actionTypes.STOP_TOUR:
      return {
        ...state,
        isRunning: false,
      };
    case actionTypes.GO_TO_STEP:
      if (
        action.payload < 0 ||
        (state.tour && action.payload >= state.tour.steps.length)
      ) {
        return state;
      }
      return {
        ...state,
        stepIndex: action.payload,
      };
    default:
      return state;
  }
}
