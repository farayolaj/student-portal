import React from 'react';
import Joyride, { CallBackProps, Step, Styles } from 'react-joyride';
import { useColorModeValue } from '@chakra-ui/react';

export interface TourGuideProps {
  steps: Step[];
  isRunning: boolean;
  stepIndex?: number;
  onCallback: (data: CallBackProps) => void;
  continuous?: boolean;
  showProgress?: boolean;
  showSkipButton?: boolean;
  disableOverlayClose?: boolean;
}

export const TourGuide: React.FC<TourGuideProps> = ({
  steps,
  isRunning,
  stepIndex = 0,
  onCallback,
  continuous = true,
  showProgress = true,
  showSkipButton = true,
  disableOverlayClose = false,
}) => {
  // Use Chakra UI colors for consistency
  const bg = useColorModeValue('white', 'gray.800');
  const primaryColor = '#38A169'; // Primary color from the theme
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const customStyles: Styles = {
    options: {
      primaryColor,
      backgroundColor: bg,
      textColor,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
      zIndex: 10000,
    },
    tooltip: {
      backgroundColor: bg,
      borderRadius: '8px',
      border: `1px solid ${borderColor}`,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      fontSize: '14px',
      maxWidth: '320px',
      padding: '20px',
    },
    tooltipTitle: {
      color: textColor,
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    tooltipContent: {
      color: textColor,
      lineHeight: '1.5',
      marginBottom: '16px',
    },
    buttonNext: {
      backgroundColor: primaryColor,
      borderRadius: '6px',
      border: 'none',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      cursor: 'pointer',
      outline: 'none',
      transition: 'background-color 0.2s',
    },
    buttonBack: {
      backgroundColor: 'transparent',
      border: `1px solid ${borderColor}`,
      borderRadius: '6px',
      color: textColor,
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      cursor: 'pointer',
      outline: 'none',
      marginRight: '8px',
      transition: 'background-color 0.2s',
    },
    buttonSkip: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'gray.500',
      fontSize: '12px',
      cursor: 'pointer',
      outline: 'none',
      textDecoration: 'underline',
      marginRight: 'auto',
    },
    buttonClose: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'gray.500',
      fontSize: '16px',
      cursor: 'pointer',
      outline: 'none',
      position: 'absolute',
      right: '8px',
      top: '8px',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  const locale = {
    back: 'Previous',
    close: '✕',
    last: 'Finish',
    next: 'Next',
    nextLabelWithProgress: (opts: { stepIndex: number; totalSteps: number }) =>
      `Next (${opts.stepIndex + 1}/${opts.totalSteps})`,
    open: 'Open the dialog',
    skip: 'Skip tour',
  };

  return (
    <Joyride
      steps={steps}
      run={isRunning}
      stepIndex={stepIndex}
      callback={onCallback}
      continuous={continuous}
      showProgress={showProgress}
      showSkipButton={showSkipButton}
      disableOverlayClose={disableOverlayClose}
      styles={customStyles}
      locale={locale}
      hideCloseButton={false}
      scrollToFirstStep={true}
      spotlightClicks={false}
      disableBeacon={false}
      floaterProps={{
        disableAnimation: false,
      }}
    />
  );
};

export default TourGuide;