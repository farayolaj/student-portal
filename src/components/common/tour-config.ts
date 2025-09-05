import { Step } from 'react-joyride';

// Tour steps for webinar functionality
export const webinarTourSteps: Step[] = [
  {
    target: '[data-tour="webinar-title"]',
    content: 'This is the webinar details page where you can view information about the webinar including its title, schedule, and description.',
    title: 'Welcome to Webinars!',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '[data-tour="webinar-join-button"]',
    content: 'Click this button to join a live webinar or watch a recorded session. The button will be enabled when the webinar is live or when a recording is available.',
    title: 'Joining Webinars',
    placement: 'top',
  },
  {
    target: '[data-tour="webinar-comments-section"]',
    content: 'This is the comments section where you can read and participate in discussions about the webinar.',
    title: 'Webinar Discussions',
    placement: 'top',
  },
  {
    target: '[data-tour="webinar-comment-form"]',
    content: 'Use this form to post your questions, thoughts, or feedback about the webinar. Your comments will be visible to other participants.',
    title: 'Adding Comments',
    placement: 'top',
  },
];

// Tour steps for notification functionality
export const notificationTourSteps: Step[] = [
  {
    target: '[data-tour="notification-bell"]',
    content: 'This is your notification center. Click here to view all your notifications including course updates, webinar announcements, and important messages.',
    title: 'Stay Updated with Notifications',
    placement: 'bottom-end',
    disableBeacon: true,
  },
  {
    target: '[data-tour="notification-badge"]',
    content: 'The red badge shows the number of unread notifications. The number will update as you receive new notifications.',
    title: 'Notification Count',
    placement: 'bottom',
  },
];

// Combined tour for complete webinar experience
export const completeWebinarTourSteps: Step[] = [
  {
    target: '[data-tour="notification-bell"]',
    content: 'First, let\'s check your notifications. This is where you\'ll receive updates about new webinars and course announcements.',
    title: 'Welcome to the Learning Portal!',
    placement: 'bottom-end',
    disableBeacon: true,
  },
  {
    target: '[data-tour="webinar-title"]',
    content: 'This is a webinar details page. Here you can see all the information about the webinar including the title, schedule, and description.',
    title: 'Webinar Information',
    placement: 'bottom',
  },
  {
    target: '[data-tour="webinar-join-button"]',
    content: 'This is the most important button! Click here to join live webinars or watch recorded sessions. Make sure to join on time for live sessions.',
    title: 'Accessing Webinars',
    placement: 'top',
  },
  {
    target: '[data-tour="webinar-comments-section"]',
    content: 'Below the webinar access area, you\'ll find the comments section where you can engage with other learners and instructors.',
    title: 'Community Discussion',
    placement: 'top',
  },
  {
    target: '[data-tour="webinar-comment-form"]',
    content: 'Use this form to ask questions, share insights, or provide feedback. Engaging in discussions enhances your learning experience!',
    title: 'Participate in Discussions',
    placement: 'top',
  },
];

// Helper function to get tour steps based on context
export const getTourSteps = (tourType: 'webinar' | 'notifications' | 'complete'): Step[] => {
  switch (tourType) {
    case 'webinar':
      return webinarTourSteps;
    case 'notifications':
      return notificationTourSteps;
    case 'complete':
      return completeWebinarTourSteps;
    default:
      return completeWebinarTourSteps;
  }
};

// Tour configuration constants
export const TOUR_CONFIG = {
  STORAGE_KEY_PREFIX: 'edutech_tour',
  TOURS: {
    WEBINAR_GUIDE: 'webinar_guide',
    NOTIFICATION_GUIDE: 'notification_guide',
    COMPLETE_GUIDE: 'complete_guide',
  },
  DEFAULT_OPTIONS: {
    continuous: true,
    showProgress: true,
    showSkipButton: true,
    disableOverlayClose: false,
  },
} as const;