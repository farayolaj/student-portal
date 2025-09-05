import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  Textarea,
  VStack,
  Badge,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  IoNotifications,
  IoPlay,
  IoCalendarOutline,
  IoChatbubbleOutline,
} from 'react-icons/io5';
import { useTourContext } from '@/components/common/tour-provider';
import TourHelpButton from '@/components/common/tour-help-button';

// Demo page to showcase the tour functionality without requiring authentication
const TourDemoPage: React.FC = () => {
  const { completeTour, notificationTour } = useTourContext();

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <Flex justify="space-between" align="center">
          <Heading size="xl" color="primary.500">
            Interactive Tour Demo
          </Heading>
          <HStack spacing={4}>
            {/* Mock Notification Bell */}
            <Box position="relative" data-tour="notification-bell">
              <IconButton
                aria-label="Notifications"
                icon={<Icon as={IoNotifications} boxSize={6} />}
                variant="ghost"
                size="lg"
                _hover={{ bg: "gray.100" }}
              />
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="red"
                borderRadius="full"
                minW="20px"
                h="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
                data-tour="notification-badge"
              >
                3
              </Badge>
            </Box>

            {/* Tour Help Buttons */}
            <TourHelpButton
              onStartTour={notificationTour.startTour}
              onResetTour={notificationTour.resetTour}
              isCompleted={notificationTour.isCompleted}
              tourName="notification guide"
              size="sm"
            />
            <TourHelpButton
              onStartTour={completeTour.startTour}
              onResetTour={completeTour.resetTour}
              isCompleted={completeTour.isCompleted}
              tourName="complete guide"
              size="sm"
            />
          </HStack>
        </Flex>

        <Text color="gray.600" fontSize="lg">
          This demo page showcases the interactive tour functionality implemented with React-Joyride.
          Click the help buttons above to start different tour experiences.
        </Text>

        {/* Mock Webinar Section */}
        <Card>
          <CardHeader>
            <VStack align="stretch" spacing={4}>
              <Flex align="center" gap={3} data-tour="webinar-title">
                <Icon as={IoPlay} boxSize={8} color="blue.500" />
                <Box>
                  <Heading size="lg" display="inline">
                    Introduction to Distance Learning
                  </Heading>
                  <Badge ms={3} colorScheme="green" variant="solid">
                    Available
                  </Badge>
                </Box>
              </Flex>

              <Flex align="center" gap={2}>
                <Icon as={IoCalendarOutline} color="gray.500" />
                <Text fontSize="sm" fontWeight="semibold">
                  December 15, 2024 at 2:00 PM
                </Text>
              </Flex>

              <Text color="gray.600" lineHeight="tall">
                Join us for an interactive session covering the fundamentals of distance learning,
                platform navigation, and best practices for online education success.
              </Text>
            </VStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              {/* Join Button Section */}
              <Card bg="blue.50" borderColor="blue.200">
                <CardBody>
                  <VStack spacing={4}>
                    <Button
                      leftIcon={<Icon as={IoPlay} />}
                      colorScheme="blue"
                      size="lg"
                      data-tour="webinar-join-button"
                      onClick={() => alert('This would normally join the webinar!')}
                    >
                      Join Webinar
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              {/* Comments Section */}
              <Box data-tour="webinar-comments-section">
                <Flex align="center" gap={2} mb={4}>
                  <Icon as={IoChatbubbleOutline} color="blue.500" />
                  <Heading size="md">Comments & Discussion</Heading>
                </Flex>

                {/* Comment Form */}
                <Box data-tour="webinar-comment-form">
                  <VStack spacing={4}>
                    <Textarea
                      placeholder="Share your thoughts, ask questions, or provide feedback..."
                      minH="100px"
                      resize="vertical"
                    />
                    <Flex justify="flex-end" w="full">
                      <Button
                        colorScheme="primary"
                        size="sm"
                        onClick={() => alert('This would post your comment!')}
                      >
                        Post Comment
                      </Button>
                    </Flex>
                  </VStack>
                </Box>

                {/* Sample Comments */}
                <VStack spacing={4} align="stretch" mt={6}>
                  <Card>
                    <CardBody>
                      <VStack align="flex-start" spacing={2}>
                        <HStack>
                          <Text fontWeight="semibold" fontSize="sm">
                            John Doe
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            2 hours ago
                          </Text>
                        </HStack>
                        <Text fontSize="sm">
                          Great introduction to the platform! Looking forward to the upcoming sessions.
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <VStack align="flex-start" spacing={2}>
                        <HStack>
                          <Text fontWeight="semibold" fontSize="sm">
                            Jane Smith
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            4 hours ago
                          </Text>
                        </HStack>
                        <Text fontSize="sm">
                          Is there a recording available for those who missed the live session?
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Instructions */}
        <Card bg="green.50" borderColor="green.200">
          <CardBody>
            <VStack align="flex-start" spacing={3}>
              <Heading size="md" color="green.700">
                How to Use the Interactive Tours
              </Heading>
              <VStack align="flex-start" spacing={2} fontSize="sm">
                <Text>
                  <strong>Notification Tour:</strong> Click the first help button to learn about notifications
                </Text>
                <Text>
                  <strong>Complete Tour:</strong> Click the second help button for a full walkthrough
                </Text>
                <Text>
                  <strong>Navigation:</strong> Use Next/Previous buttons or arrow keys to navigate tours
                </Text>
                <Text>
                  <strong>Skip:</strong> Click "Skip tour" to exit anytime
                </Text>
                <Text>
                  <strong>Reset:</strong> Tours remember completion status - use reset to restart
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

// Export with layout props to disable authentication requirement
TourDemoPage.layoutProps = {
  isAuthenticated: false,
};

export default TourDemoPage;