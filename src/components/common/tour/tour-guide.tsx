import { useBreakpointValue } from "@chakra-ui/react";
import React, { ComponentProps } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";

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
  disableOverlayClose = true,
}) => {
  // Use Chakra UI colors for consistency
  const bg = "white";
  const primaryColor = "#38A169"; // Primary color from the theme

  const customStyles: ComponentProps<typeof Joyride>["styles"] = {
    options: {
      primaryColor,
      backgroundColor: bg,
      overlayColor: "rgba(0, 0, 0, 0.5)",
      spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
      zIndex: 10000,
    },
    tooltip: {
      backgroundColor: bg,
      borderRadius: "8px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      fontSize: "14px",
      padding: "20px",
    },
    tooltipTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "8px",
    },
    tooltipContent: {
      fontSize: "1rem",
      lineHeight: "1.5",
      marginBottom: "16px",
    },
    buttonNext: {
      backgroundColor: primaryColor,
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      padding: "8px 16px",
      cursor: "pointer",
      outline: "none",
      transition: "background-color 0.2s",
      minWidth: "60px",
      height: "36px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "1",
      textAlign: "center",
    },
    buttonBack: {
      backgroundColor: "transparent",
      border: `1px solid ${primaryColor}`,
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      padding: "8px 16px",
      cursor: "pointer",
      outline: "none",
      marginRight: "8px",
      transition: "background-color 0.2s",
      minWidth: "60px",
      height: "36px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "1",
      textAlign: "center",
    },
    buttonSkip: {
      backgroundColor: "transparent",
      border: "none",
      fontSize: "12px",
      cursor: "pointer",
      outline: "none",
      textDecoration: "underline",
      marginRight: "auto",
      padding: "4px 8px",
    },
    buttonClose: {
      backgroundColor: "transparent",
      border: "none",
      color: "#718096",
      fontSize: "12px",
      cursor: "pointer",
      outline: "none",
      position: "absolute",
      right: "8px",
      top: "8px",
      width: "16px",
      height: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "2px",
      transition: "background-color 0.2s",
      lineHeight: "1",
    },
  };
  const scrollOffset = useBreakpointValue([100, null, 200]);

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
      scrollOffset={scrollOffset}
    />
  );
};

export default TourGuide;
