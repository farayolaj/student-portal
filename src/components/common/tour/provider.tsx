import TourGuide from "@/components/common/tour-guide";
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useReducer,
} from "react";
import { CallBackProps } from "react-joyride";
import { TourAction } from "./actions";
import reducer, { TourState } from "./reducer";

type TourContextType = {
  state: TourState;
  dispatch: Dispatch<TourAction>;
};

export const TourContext = createContext<TourContextType | undefined>(
  undefined
);

export default function TourProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    tour: null,
    isRunning: false,
    stepIndex: 0,
  });

  const handleTourCallback = useCallback((data: CallBackProps) => {
    console.log(data);
  }, []);

  return (
    <TourContext.Provider value={{ state, dispatch }}>
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
