import { markNotificationsRead } from "@/api/notifications.mutations";
import { notificationQueries } from "@/api/notifications.queries";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineNotifications,
} from "react-icons/md";

export const NotificationBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // Fetch notification count
  const {
    data: notificationCount,
    isLoading: isCountLoading,
    error: countError,
  } = useQuery(notificationQueries.getCount());

  // Fetch notifications
  const {
    data: notificationsData,
    isLoading: isNotificationsLoading,
    error: notificationsError,
  } = useQuery({ ...notificationQueries.getPage(page, 10), enabled: isOpen });

  // Reset to page 1 when popover opens
  const handleOpen = () => {
    setPage(1);
    onOpen();
  };

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  const handleNextPage = useCallback(() => {
    const totalPages = notificationsData?.paging?.totalPages;
    if (totalPages && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [page, notificationsData?.paging?.totalPages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "ArrowLeft" && page > 1) {
        event.preventDefault();
        handlePreviousPage();
      } else if (event.key === "ArrowRight") {
        const totalPages = notificationsData?.paging?.totalPages;
        if (totalPages && page < totalPages) {
          event.preventDefault();
          handleNextPage();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    page,
    notificationsData?.paging?.totalPages,
    handlePreviousPage,
    handleNextPage,
  ]);

  // Mark notifications as read mutation
  const markReadMutation = useMutation({
    mutationFn: markNotificationsRead,
    onSuccess: () => {
      // Invalidate and refetch notification queries
      queryClient.invalidateQueries({ queryKey: notificationQueries.all() });
    },
  });

  const notifications = notificationsData?.notifications || [];

  const handleMarkAsRead = (notificationId: string) => {
    markReadMutation.mutate({ ids: [notificationId] });
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={onClose}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Box position="relative" cursor="pointer">
          <IconButton
            aria-label="Notifications"
            icon={<Icon as={MdOutlineNotifications} boxSize={6} />}
            variant="ghost"
            size="lg"
            _hover={{ bg: "gray.100" }}
          />
          {notificationCount > 0 && (
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
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w="400px" maxH="500px" overflow="hidden">
        <PopoverHeader>
          <Flex justify="space-between" align="center">
            <VStack spacing={0} align="flex-start">
              <Text fontWeight="bold" fontSize="lg">
                Notifications
              </Text>
              {notificationsData?.paging?.totalCount && (
                <Text fontSize="xs" color="gray.500">
                  {notificationsData.paging.totalCount} total notifications
                </Text>
              )}
            </VStack>
          </Flex>
        </PopoverHeader>
        <PopoverBody p={0} maxH="400px" overflowY="auto">
          {isCountLoading || isNotificationsLoading ? (
            <Flex justify="center" align="center" h="200px">
              <Spinner size="lg" color="primary.500" />
            </Flex>
          ) : countError || notificationsError ? (
            <Flex justify="center" align="center" h="200px" direction="column">
              <Text color="red.500" fontSize="sm">
                Error loading notifications
              </Text>
              <Button
                size="sm"
                variant="ghost"
                mt={2}
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: notificationQueries.all(),
                  });
                }}
              >
                Try again
              </Button>
            </Flex>
          ) : notifications.length === 0 ? (
            <Flex justify="center" align="center" h="200px">
              <Text color="gray.500" fontSize="sm">
                No notifications yet
              </Text>
            </Flex>
          ) : (
            <VStack spacing={0} align="stretch">
              {notifications.map((notification, index) => {
                const title = notification.title;
                const message = notification.message;
                const timeAgo = formatDistanceToNow(notification.createdAt, {
                  addSuffix: true,
                });

                return (
                  <Box key={notification.id}>
                    <Box
                      p={4}
                      bg={"gray.50"}
                      _hover={{ bg: "gray.100" }}
                      position="relative"
                    >
                      <VStack spacing={1} align="flex-start" flex={1} minW={0}>
                        <Flex
                          w="full"
                          justify="space-between"
                          align="flex-start"
                        >
                          <Text
                            fontWeight={"semibold"}
                            fontSize="sm"
                            color={"gray.900"}
                            noOfLines={2}
                            flex={1}
                          >
                            {title}
                          </Text>
                        </Flex>
                        <Text
                          fontSize="xs"
                          color="gray.600"
                          noOfLines={3}
                          w="full"
                        >
                          {message}
                        </Text>
                        <Flex justify="space-between" align="center" w="full" mt={2}>
                          <Text fontSize="xs" color="gray.500">
                            {timeAgo}
                          </Text>
                          <Button
                            size="xs"
                            variant="outline"
                            colorScheme="primary"
                            onClick={() => handleMarkAsRead(notification.id)}
                            isLoading={markReadMutation.isPending && markReadMutation.variables?.ids.includes(notification.id)}
                          >
                            Mark as read
                          </Button>
                        </Flex>
                      </VStack>
                    </Box>
                    {index < notifications.length - 1 && <Divider />}
                  </Box>
                );
              })}
              {notificationsData?.paging?.totalPages &&
                notificationsData.paging.totalPages > 1 && (
                  <Box p={4} borderTop="1px" borderColor="gray.200">
                    <VStack spacing={2}>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Showing {(page - 1) * 10 + 1}-
                        {Math.min(
                          page * 10,
                          notificationsData.paging.totalCount || 0
                        )}{" "}
                        of {notificationsData.paging.totalCount || 0}
                      </Text>
                      <HStack justify="space-between" align="center" w="full">
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="primary"
                          leftIcon={<Icon as={MdChevronLeft} />}
                          onClick={handlePreviousPage}
                          isDisabled={page <= 1}
                        >
                          Previous
                        </Button>

                        <Text fontSize="sm" color="gray.600">
                          {page} / {notificationsData.paging.totalPages}
                        </Text>

                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="primary"
                          rightIcon={<Icon as={MdChevronRight} />}
                          onClick={handleNextPage}
                          isDisabled={
                            page >= notificationsData.paging.totalPages
                          }
                        >
                          Next
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                )}
            </VStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
