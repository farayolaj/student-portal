import { useProfile } from "@/api/user/use-profile";
import { deleteComment, postComment } from "@/api/webinar.mutations";
import { webinarQueries } from "@/api/webinar.queries";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Icon,
  IconButton,
  Skeleton,
  SkeletonText,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
  IoChatbubbleOutline,
  IoPersonCircleOutline,
  IoTrashOutline,
} from "react-icons/io5";

interface WebinarCommentsProps {
  webinar: Webinar;
}

const WebinarComments: FC<WebinarCommentsProps> = ({ webinar }) => {
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 20;

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const commentBg = useColorModeValue("gray.50", "gray.600");

  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: profile } = useProfile();

  const {
    data: commentsData,
    isLoading,
    error,
  } = useQuery(webinarQueries.commentsBy(webinar.id, { page, perPage }));

  const postCommentMutation = useMutation({
    mutationFn: () => postComment(webinar.id, comment),
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({
        queryKey: [...webinarQueries.comments(), webinar.id],
      });
      toast({
        title: "Comment Posted",
        description: "Your comment has been posted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Posting Comment",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...webinarQueries.comments(), webinar.id],
      });
      toast({
        title: "Comment Deleted",
        description: "Your comment has been deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Deleting Comment",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      postCommentMutation.mutate();
    }
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const loadMoreComments = () => {
    setPage((prev) => prev + 1);
  };

  const loadPreviousComments = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  return (
    <Box>
      <Flex align="center" gap={2} mb={4}>
        <Icon as={IoChatbubbleOutline} color="blue.500" />
        <Heading size="md">Comments</Heading>
      </Flex>
      <VStack spacing={6} align="stretch">
        {/* Comment Form */}
        {webinar.enableComments && (
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!postCommentMutation.error}>
                <Textarea
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  minH="100px"
                  resize="vertical"
                />
                {postCommentMutation.error && (
                  <FormErrorMessage>
                    {postCommentMutation.error.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Flex justify="flex-end" w="full">
                <Button
                  type="submit"
                  colorScheme="primary"
                  isLoading={postCommentMutation.isPending}
                  isDisabled={!comment.trim() || postCommentMutation.isPending}
                  size="sm"
                >
                  Post Comment
                </Button>
              </Flex>
            </VStack>
          </Box>
        )}

        {/* Comments List */}
        {error ? (
          <Text color="red.500" textAlign="center" py={8}>
            Error loading comments. Please try again later.
          </Text>
        ) : isLoading ? (
          <VStack spacing={4} align="stretch">
            {[1, 2, 3].map((i) => (
              <Box key={i} p={4} bg={commentBg} rounded="md">
                <HStack spacing={3} mb={2}>
                  <Skeleton w="8" h="8" rounded="full" />
                  <Skeleton h="4" w="150px" />
                </HStack>
                <SkeletonText noOfLines={2} spacing="2" skeletonHeight="2" />
              </Box>
            ))}
          </VStack>
        ) : commentsData && commentsData.comments.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {commentsData.comments.map((comment) => (
              <Box
                key={comment.id}
                p={4}
                bg={commentBg}
                rounded="md"
                border="1px"
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="flex-start" mb={2}>
                  <HStack spacing={3}>
                    <Icon
                      as={IoPersonCircleOutline}
                      boxSize={8}
                      color="gray.500"
                    />
                    <VStack align="flex-start" spacing={0}>
                      <Text fontWeight="semibold" fontSize="sm">
                        {comment.author.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatDate(comment.createdAt)}
                      </Text>
                    </VStack>
                  </HStack>
                  {profile?.academicProfile.id === comment.author.id && (
                    <IconButton
                      aria-label="Delete comment"
                      icon={<Icon as={IoTrashOutline} />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDelete(comment.id)}
                      isLoading={deleteCommentMutation.isPending}
                    />
                  )}
                </Flex>
                <Text fontSize="sm" lineHeight="tall" pl={11}>
                  {comment.content}
                </Text>
              </Box>
            ))}

            {/* Pagination Controls */}
            {commentsData.paging.totalPages > 1 && (
              <Flex justify="center" align="center" gap={4} pt={4}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadPreviousComments}
                  isDisabled={page === 1}
                  isLoading={isLoading}
                >
                  Previous
                </Button>
                <Text fontSize="sm" color="gray.500">
                  Page {page} of {commentsData.paging.totalPages}
                </Text>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadMoreComments}
                  isDisabled={page >= commentsData.paging.totalPages}
                  isLoading={isLoading}
                >
                  Next
                </Button>
              </Flex>
            )}

            {/* Comments Stats */}
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Showing {(page - 1) * perPage + 1} to{" "}
              {Math.min(page * perPage, commentsData.paging.totalCount)} of{" "}
              {commentsData.paging.totalCount} comments
            </Text>
          </VStack>
        ) : !webinar.enableComments ? (
          <Text color="gray.500" textAlign="center" py={8}>
            Comments are disabled.
          </Text>
        ) : (
          <Text color="gray.500" textAlign="center" py={8}>
            No comments yet. Be the first to comment!
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default WebinarComments;
