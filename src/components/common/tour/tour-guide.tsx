import { useColorModeValue } from '@chakra-ui/react';
import React, { ComponentProps } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

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

  // Inject custom CSS to fix button content
  React.useEffect(() => {
    const styleId = 'joyride-button-fix';
    const existingStyle = document.getElementById(styleId);

    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .react-joyride__tooltip button[data-action="primary"]:empty::after {
          content: "Next";
          color: white;
        }
        .react-joyride__tooltip button[data-action="back"]:empty::after {
          content: "Previous";
          color: inherit;
        }
        .react-joyride__tooltip button[data-action="close"] {
          font-size: 12px !important;
          width: 16px !important;
          height: 16px !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

  const customStyles: ComponentProps<typeof Joyride>['styles'] = {
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
      color: '#ffffff !important',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      cursor: 'pointer',
      outline: 'none',
      transition: 'background-color 0.2s',
      minWidth: '60px',
      height: '36px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '1',
      textAlign: 'center',
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
      minWidth: '60px',
      height: '36px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: '1',
      textAlign: 'center',
    },
    buttonSkip: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#718096',
      fontSize: '12px',
      cursor: 'pointer',
      outline: 'none',
      textDecoration: 'underline',
      marginRight: 'auto',
      padding: '4px 8px',
    },
    buttonClose: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#718096',
      fontSize: '12px',
      cursor: 'pointer',
      outline: 'none',
      position: 'absolute',
      right: '8px',
      top: '8px',
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '2px',
      transition: 'background-color 0.2s',
      lineHeight: '1',
    },
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
      hideCloseButton={false}
      scrollToFirstStep={true}
      spotlightClicks={false}
    />
  );
};

export default TourGuide;