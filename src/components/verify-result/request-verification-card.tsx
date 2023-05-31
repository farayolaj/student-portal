import { AddIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Card,
  CardHeader,
  Heading,
  CardBody,
  VStack,
  StackDivider,
  Flex,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Box,
  Text,
  Icon,
  UnorderedList,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import DocumentUpload, { DocumentUploadValue } from "./document-upload";
import { IoCheckmarkCircle, IoCloseCircle, IoTime } from "react-icons/io5";

export default function RequestVerificationCard() {
  const [documents, setDocuments] = useState<DocumentUploadValue[]>([
    { id: crypto.randomUUID(), file: null, title: "wedding" },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const isDisabled = false;
  const isSuccessful = false;

  const addDocument = () => {
    setDocuments([
      ...documents,
      { id: crypto.randomUUID(), file: null, title: "wedding" },
    ]);
  };

  return (
    <>
      <Box pos="relative">
        <Card
          p={4}
          mt={8}
          filter="auto"
          brightness={isDisabled ? "40%" : undefined}
          blur={isDisabled ? "2px" : undefined}
        >
          <CardHeader>
            <Heading size="md">Upload Documents</Heading>
          </CardHeader>
          <CardBody>
            <VStack as="form" gap={4} w="full" align="flex-start" px={4}>
              {documents.map((doc, idx) => (
                <>
                  <DocumentUpload
                    key={idx}
                    value={doc}
                    onChange={(newValue) => {
                      const newDocuments = [...documents];
                      newDocuments[idx] = newValue;
                      setDocuments(newDocuments);
                    }}
                    onRemove={() => {
                      const newDocuments = [...documents];
                      newDocuments.splice(idx, 1);
                      setDocuments(newDocuments);
                    }}
                    showRemoveButton={documents.length > 1}
                  />
                  <StackDivider w="full" borderWidth={2} />
                </>
              ))}
              {!isSuccessful && (
                <Flex justify="space-between" w="full">
                  <Button
                    display="inline-flex"
                    gap={2}
                    alignItems="center"
                    variant="outline"
                  >
                    <AddIcon />
                    <Text
                      as="span"
                      h="fit-content"
                      mt={1}
                      onClick={addDocument}
                    >
                      Add Another Document
                    </Text>
                  </Button>
                  <Button onClick={onOpen} isDisabled={isDisabled}>
                    Submit Uploads
                  </Button>
                </Flex>
              )}
            </VStack>
            <Box>
              <Heading size="md" mt={12}>
                Status
              </Heading>
              <Text mt={2} display="inline-flex" gap={4} alignItems="center">
                <Icon as={IoTime} color="yellow" boxSize={6} />
                Your request is currently being processed. Please check back.
              </Text>
              <Text mt={2} display="inline-flex" gap={4} alignItems="center">
                <Icon as={IoCheckmarkCircle} color="green" boxSize={6} />
                Your result has been successfully verified.
              </Text>
              <Text mt={2} display="inline-flex" gap={4} alignItems="center">
                <Icon as={IoCloseCircle} color="red" boxSize={6} />
                Your result could not be verified successfully for the following
                reason(s):
              </Text>
              <UnorderedList ml={16}>
                <li>Incorrect details</li>
                <li>Incorrect documents</li>
              </UnorderedList>
            </Box>
          </CardBody>
        </Card>
        {isDisabled && (
          <Box
            pos="absolute"
            top={0}
            left={0}
            w="full"
            h="full"
            bg="primary.200"
            opacity={0.4}
          />
        )}
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Request Result Verification
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to submit your uploads for verification?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="outline" ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  // onSendRequest();
                }}
                ml={3}
              >
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
