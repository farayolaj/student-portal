import TourGuide from "@/components/common/tour/tour-guide";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ACTIONS, CallBackProps, EVENTS, ORIGIN, STATUS } from "react-joyride";
import {
  completeTour,
  goToStep,
  playTour,
  stopTour,
  TourAction,
} from "./actions";
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
    isCompleted: false,
  });

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (state.stepIndex > 0) dispatch(playTour());
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events, state.stepIndex]);

  const handleTourCallback = useCallback(
    (data: CallBackProps) => {
      const { action, index, origin, status, type, step } = data;

      if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
        dispatch(stopTour());
      }

      if (
        ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(
          type
        )
      ) {
        // Update state to advance the tour
        if (action === ACTIONS.PREV) {
          if (step.data?.prevPage) {
            dispatch(stopTour());
            dispatch(goToStep(index - 1));
            router.push(step.data.prevPage);
          } else dispatch(goToStep(index - 1));
        } else if (action === ACTIONS.NEXT) {
          if (step.data?.nextPage) {
            dispatch(stopTour());
            dispatch(goToStep(index + 1));
            router.push(step.data.nextPage);
          } else dispatch(goToStep(index + 1));
        }
      } else if (
        ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)
      ) {
        dispatch(completeTour());
      }

      console.groupCollapsed(
        type === EVENTS.TOUR_STATUS ? `${type}:${status}` : type
      );
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
