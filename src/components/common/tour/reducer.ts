import { Step } from "react-joyride";
import { actionTypes, TourAction } from "./actions";

export type TourState = {
  tour: {
    key: string;
    steps: Array<Step>;
  } | null;
  isRunning: boolean;
  stepIndex: number;
  isCompleted: boolean;
};

export default function reducer(state: TourState, action: TourAction) {
  switch (action.type) {
    case actionTypes.SET_TOUR:
      const isCompleted = Boolean(
        window.localStorage.getItem(`tour-${action.payload.key}-completed`)
      );
      return {
        ...state,
        tour: action.payload,
        isCompleted,
        stepIndex: 0,
        isRunning: isCompleted ? false : state.isRunning,
      };
    case actionTypes.PLAY_TOUR:
      return {
        ...state,
        isRunning: state.isCompleted ? false : true,
      };
    case actionTypes.STOP_TOUR:
      return {
        ...state,
        isRunning: false,
      };
    case actionTypes.GO_TO_STEP:
      return {
        ...state,
        stepIndex: action.payload,
      };
    case actionTypes.COMPLETE_TOUR:
      window.localStorage.setItem(`tour-${state.tour?.key}-completed`, "true");
      return {
        ...state,
        isRunning: false,
        isCompleted: true,
        stepIndex: 0,
      };
    case actionTypes.RESET_TOUR:
      window.localStorage.removeItem(`tour-${state.tour?.key}-completed`);
      return {
        ...state,
        isCompleted: false,
        stepIndex: 0,
      };
    default:
      return state;
  }
}
