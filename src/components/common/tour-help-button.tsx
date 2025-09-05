import React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoHelpCircleOutline, IoPlayOutline, IoRefreshOutline } from 'react-icons/io5';

export interface TourHelpButtonProps {
  onStartTour: () => void;
  onResetTour?: () => void;
  isCompleted?: boolean;
  tourName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
}

export const TourHelpButton: React.FC<TourHelpButtonProps> = ({
  onStartTour,
  onResetTour,
  isCompleted = false,
  tourName = 'interactive tour',
  size = 'md',
  variant = 'ghost',
}) => {
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  if (!onResetTour) {
    // Simple tooltip button when no reset functionality needed
    return (
      <Tooltip
        label={isCompleted ? `Restart ${tourName}` : `Start ${tourName}`}
        placement="bottom"
        hasArrow
      >
        <IconButton
          aria-label={isCompleted ? `Restart ${tourName}` : `Start ${tourName}`}
          icon={<Icon as={isCompleted ? IoRefreshOutline : IoPlayOutline} />}
          size={size}
          variant={variant}
          _hover={{ bg: hoverBg }}
          onClick={onStartTour}
          colorScheme={isCompleted ? 'blue' : 'green'}
        />
      </Tooltip>
    );
  }

  // Menu button with options when reset functionality is available
  return (
    <Menu>
      <Tooltip label="Help & Tours" placement="bottom" hasArrow>
        <MenuButton
          as={IconButton}
          aria-label="Help and tours"
          icon={<Icon as={IoHelpCircleOutline} />}
          size={size}
          variant={variant}
          _hover={{ bg: hoverBg }}
          colorScheme="blue"
        />
      </Tooltip>
      <MenuList>
        <MenuItem
          icon={<Icon as={isCompleted ? IoRefreshOutline : IoPlayOutline} />}
          onClick={onStartTour}
        >
          {isCompleted ? `Restart ${tourName}` : `Start ${tourName}`}
        </MenuItem>
        {onResetTour && isCompleted && (
          <MenuItem
            icon={<Icon as={IoRefreshOutline} />}
            onClick={onResetTour}
          >
            Reset tour progress
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default TourHelpButton;