import TourGuide from "@/components/common/tour/tour-guide";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { ACTIONS, CallBackProps, EVENTS, ORIGIN, STATUS } from "react-joyride";
import { goToStep, stopTour, TourAction } from "./actions";
import reducer, { TourState } from "./reducer";

type TourContextType = {
  state: TourState;
  dispatch: Dispatch<TourAction>;
};

export const TourContext = createContext<TourContextType | undefined>(
  undefined
);

export default function TourProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {
    tour: null,
    isRunning: false,
    stepIndex: 0,
  });

  const handleTourCallback = useCallback(
    (data: CallBackProps) => {
      const { action, index, origin, status, type, step } = data;

      if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
        dispatch(stopTour());
      }

      if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
        // Update state to advance the tour
        if (action === ACTIONS.PREV) {
          if (step.data?.prevPage) router.push(step.data.prevPage);
          dispatch(goToStep(index - 1));
        } else {
          if (step.data?.nextPage) router.push(step.data.nextPage);
          dispatch(goToStep(index + 1));
        }
      } else if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        dispatch(stopTour());
      }

      console.groupCollapsed(type);
      console.log(data);
      console.groupEnd();
    },
    [router]
  );

  const contextState = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TourContext.Provider value={contextState}>
      {children}

      {state.tour && (
        <TourGuide
          steps={state.tour.steps}
          isRunning={state.isRunning}
          stepIndex={state.stepIndex}
          onCallback={handleTourCallback}
        />
      )}
    </TourContext.Provider>
  );
}
