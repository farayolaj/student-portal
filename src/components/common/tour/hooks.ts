import { useContext } from "react";
import { TourContext } from "./provider";
import { TourState } from "./reducer";

export function useTourState<T = TourState>(
  selector?: (state: TourState) => T
) {
  const context = useContext(TourContext);

  if (!context) {
    throw new Error("useTourState must be used within a TourProvider");
  }

  return selector ? selector(context.state) : context.state;
}

export function useTourDispatch() {
  const context = useContext(TourContext);

  if (!context) {
    throw new Error("useTourDispatch must be used within a TourProvider");
  }

  return context.dispatch;
}
