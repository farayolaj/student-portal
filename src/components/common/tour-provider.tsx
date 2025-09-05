import React, { createContext, useContext, ReactNode } from 'react';
import { useTour } from '@/hooks/useTour';
import { 
  getTourSteps, 
  TOUR_CONFIG 
} from '@/components/common/tour-config';
import TourGuide from '@/components/common/tour-guide';

interface TourContextType {
  webinarTour: ReturnType<typeof useTour>;
  notificationTour: ReturnType<typeof useTour>;
  completeTour: ReturnType<typeof useTour>;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTourContext must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  // Initialize different tours
  const webinarTour = useTour({
    tourKey: TOUR_CONFIG.TOURS.WEBINAR_GUIDE,
    steps: getTourSteps('webinar'),
    autoStart: false,
  });

  const notificationTour = useTour({
    tourKey: TOUR_CONFIG.TOURS.NOTIFICATION_GUIDE,
    steps: getTourSteps('notifications'),
    autoStart: false,
  });

  const completeTour = useTour({
    tourKey: TOUR_CONFIG.TOURS.COMPLETE_GUIDE,
    steps: getTourSteps('complete'),
    autoStart: false,
  });

  const contextValue: TourContextType = {
    webinarTour,
    notificationTour,
    completeTour,
  };

  return (
    <TourContext.Provider value={contextValue}>
      {children}
      
      {/* Render active tour guides */}
      {webinarTour.isRunning && (
        <TourGuide
          steps={webinarTour.steps}
          isRunning={webinarTour.isRunning}
          stepIndex={webinarTour.tourState.stepIndex}
          onCallback={webinarTour.handleTourCallback}
        />
      )}
      
      {notificationTour.isRunning && (
        <TourGuide
          steps={notificationTour.steps}
          isRunning={notificationTour.isRunning}
          stepIndex={notificationTour.tourState.stepIndex}
          onCallback={notificationTour.handleTourCallback}
        />
      )}
      
      {completeTour.isRunning && (
        <TourGuide
          steps={completeTour.steps}
          isRunning={completeTour.isRunning}
          stepIndex={completeTour.tourState.stepIndex}
          onCallback={completeTour.handleTourCallback}
        />
      )}
    </TourContext.Provider>
  );
};