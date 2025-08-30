import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import formatDuration from "date-fns/formatDuration";
import { FC } from "react";
import { IoPlayCircleOutline, IoPlayOutline } from "react-icons/io5";

interface Recording {
  id: string;
  dateRecorded: Date;
  duration: number;
  url: string;
}

interface WebinarRecordingsProps {
  recordings: Recording[];
}

const WebinarRecordings: FC<WebinarRecordingsProps> = ({ recordings }) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box>
      <Flex align="center" gap={2} mb={4}>
        <Icon as={IoPlayCircleOutline} color="green.500" />
        <Heading size="md">Recordings</Heading>
      </Flex>
      {recordings.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {recordings.map((recording) => (
            <Box
              key={recording.id}
              p={4}
              border="1px"
              borderColor={borderColor}
              rounded="md"
            >
              <Flex justify="space-between" align="center" wrap="wrap">
                <Box>
                  <Text fontWeight="semibold">
                    {new Intl.DateTimeFormat("en-NG", {
                      dateStyle: "full",
                      timeStyle: "short",
                      hour12: true,
                    }).format(recording.dateRecorded)}
                  </Text>
                  <HStack spacing={4} mt={1}>
                    <Text fontSize="sm" color="gray.600">
                      {formatDuration({
                        hours: Math.floor(recording.duration / 3600),
                        minutes: Math.floor((recording.duration % 3600) / 60),
                        seconds: Math.floor(recording.duration % 60),
                      })}
                    </Text>
                    <Text fontSize="sm" color="gray.600"></Text>
                  </HStack>
                </Box>
                <Button
                  leftIcon={<Icon as={IoPlayOutline} />}
                  size="sm"
                  colorScheme="green"
                  variant="outline"
                  as={Link}
                  href={recording.url}
                  isExternal
                >
                  Play Recording
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text color="gray.500" textAlign="center" py={8}>
          No recordings available yet.
        </Text>
      )}
    </Box>
  );
};

export default WebinarRecordings;
