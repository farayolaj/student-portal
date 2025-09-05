# Interactive Guide Implementation with React-Joyride

This implementation provides an interactive guide system using React-Joyride to help users navigate webinars, commenting, and notifications functionality.

## Features

### 📚 Tour System
- **Global Tour Provider**: Centralized tour management across the application
- **Multiple Tour Types**: Separate tours for webinars, notifications, and complete guides
- **Persistent State**: Tours remember completion status using localStorage
- **Customizable**: Easy to add new tour steps and configure different tours

### 🎯 Tour Types

#### 1. Notification Tour
- Highlights the notification bell icon
- Shows notification badge functionality
- Accessible from the header on any page

#### 2. Webinar Tour
- Guides through webinar details page
- Shows how to join webinars
- Explains commenting functionality

#### 3. Complete Tour
- Comprehensive walkthrough covering all features
- Starts with notifications and continues through webinar functionality

### 🛠️ Components

#### Core Components
- `TourProvider`: Global context provider for tour management
- `TourGuide`: Wrapper around react-joyride with custom styling
- `TourHelpButton`: Reusable help button to trigger tours
- `useTour`: Custom hook for tour state management

#### Integration Points
- **Header**: Notification tour trigger button
- **Webinar Pages**: Complete tour trigger and tour targets
- **Comment Sections**: Tour targets for commenting functionality

### 🎨 Styling
- Consistent with Chakra UI theme
- Matches application color scheme (#38A169 primary)
- Responsive design for different screen sizes
- Accessible tooltips and navigation

### 📍 Tour Targets

The following elements have `data-tour` attributes for tour targeting:

#### Notifications
- `data-tour="notification-bell"`: Notification icon button
- `data-tour="notification-badge"`: Red notification count badge

#### Webinars
- `data-tour="webinar-title"`: Webinar title and header section
- `data-tour="webinar-join-button"`: Join/Playback button
- `data-tour="webinar-comments-section"`: Comments container
- `data-tour="webinar-comment-form"`: Comment input form

### 🚀 Usage

#### Starting a Tour
```typescript
import { useTourContext } from '@/components/common/tour-provider';

const { completeTour, notificationTour } = useTourContext();

// Start the complete webinar tour
completeTour.startTour();

// Start the notification tour
notificationTour.startTour();
```

#### Adding New Tour Steps
1. Update `tour-config.ts` with new steps
2. Add `data-tour` attributes to target elements
3. Configure tour in `TourProvider` if needed

#### Tour State Management
- Tours automatically save completion state
- Users can reset tours through the help button
- Tours won't auto-restart once completed

### 🔧 Configuration

Tour configuration is centralized in `src/components/common/tour-config.ts`:

```typescript
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
};
```

### 🎪 Accessibility
- Keyboard navigation support (Arrow keys for pagination)
- Screen reader friendly content
- High contrast tooltips
- Focus management during tours

### 🔄 Future Enhancements
- Analytics tracking for tour completion
- Dynamic tour content based on user role
- Multi-language tour support
- Advanced tour triggers (first-time users, feature updates)

## Files Modified/Created

### New Files
- `src/hooks/useTour.ts` - Tour state management hook
- `src/components/common/tour-guide.tsx` - React-Joyride wrapper
- `src/components/common/tour-config.ts` - Tour steps configuration
- `src/components/common/tour-help-button.tsx` - Help button component
- `src/components/common/tour-provider.tsx` - Global tour context

### Modified Files
- `src/pages/_app.tsx` - Added TourProvider
- `src/pages/courses/[courseId]/webinar/[webinarId].tsx` - Added tour integration
- `src/components/courses/webinars/webinar-comments.tsx` - Added tour targets
- `src/components/common/notification-box.tsx` - Added tour targets
- `src/components/layout/header.tsx` - Added tour help button

## Dependencies Added
- `react-joyride@2.9.3` - Interactive tour library