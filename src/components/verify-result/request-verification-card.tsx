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
  Spinner,
  useToast,
  ListItem,
} from "@chakra-ui/react";
import { useState, useRef, Fragment } from "react";
import DocumentUpload from "./document-upload";
import { IoCheckmarkCircle, IoCloseCircle, IoTime } from "react-icons/io5";
import { useUploadDocument } from "@/api/verify-result/use-upload-document";
import { useProfile } from "@/api/user/use-profile";
import queryClient from "@/lib/query-client";
import { useVerificationResult } from "@/api/verify-result/use-verification-result";
import { useDocumentUploads } from "@/api/verify-result/use-document-uploads";
import ReadonlyDocumentUpload from "./readonly-document-upload";

type RequestVerificationCardProps = {
  isDisabled?: boolean;
};

export default function RequestVerificationCard({
  isDisabled,
}: RequestVerificationCardProps) {
  const profileRes = useProfile();
  const [documents, setDocuments] = useState<DocumentUploadValue[]>([
    { id: crypto.randomUUID(), file: null, documentTypeId: "" },
  ]);
  const verificationResultRes = useVerificationResult();
  const status = verificationResultRes.data;
  const documentUploadsRes = useDocumentUploads();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef(null);
  const isSubmitDisabled = documents.reduce<boolean>((prev, curr) => {
    if (curr.file === null) return true;

    if (curr.documentTypeId === "others" && !curr.customTitle) return true;

    return false;
  }, false);

  const uploadDocument = useUploadDocument();

  const onSubmit = () => {
    setIsSubmitting(true);
    Promise.all(
      documents.map((doc) =>
        uploadDocument.mutateAsync({
          file: doc.file as File,
          studentId: profileRes.data?.academicProfile.id as string,
          documentTypeId:
            doc.documentTypeId === "others" ? undefined : doc.documentTypeId,
          customName: doc.customTitle,
        })
      )
    )
      .then(() => {
        queryClient.invalidateQueries(["verification_result"]);
        queryClient.invalidateQueries(["document-uploads"]);
      })
      .catch((err) => {
        toast({
          title: "An error occurred while uploading.",
          description: err.message,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const addDocument = () => {
    setDocuments([
      ...documents,
      { id: crypto.randomUUID(), file: null, documentTypeId: "" },
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
              {status === "not_found"
                ? documents.map((doc) => (
                    <Fragment key={doc.id}>
                      <DocumentUpload
                        value={doc}
                        onChange={(newValue) => {
                          setDocuments((prev) =>
                            prev.map((document) =>
                              document.id === doc.id ? newValue : document
                            )
                          );
                        }}
                        onRemove={() => {
                          setDocuments((prev) =>
                            prev.filter((d) => d.id !== doc.id)
                          );
                        }}
                        showRemoveButton={documents.length > 1}
                        isDisabled={status !== "not_found"}
                      />
                      <StackDivider w="full" borderWidth={2} />
                    </Fragment>
                  ))
                : documentUploadsRes.data?.map((doc) => (
                    <Fragment key={doc.id}>
                      <ReadonlyDocumentUpload value={doc} />
                      <StackDivider w="full" borderWidth={2} />
                    </Fragment>
                  ))}
              {status === "not_found" && (
                <Flex
                  direction={["column", null, "row"]}
                  justify="space-between"
                  gap={4}
                  w="full"
                >
                  <Button
                    display="inline-flex"
                    gap={2}
                    alignItems="center"
                    variant="outline"
                    isDisabled={isSubmitting}
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
                  <Button
                    onClick={onOpen}
                    isDisabled={isDisabled || isSubmitDisabled || isSubmitting}
                    title={isSubmitDisabled ? "Fill all fields" : undefined}
                    minW={24}
                  >
                    {isSubmitting ? <Spinner /> : "Submit Uploads"}
                  </Button>
                </Flex>
              )}
            </VStack>
            {status !== "not_found" && (
              <Box>
                <Heading size="md" mt={12}>
                  Status
                </Heading>
                {status === "pending" ? (
                  <Text
                    mt={2}
                    display="inline-flex"
                    gap={4}
                    alignItems="center"
                  >
                    <Icon as={IoTime} color="yellow" boxSize={6} />
                    Your request is currently being processed. Please check
                    back.
                  </Text>
                ) : status === "verified" ? (
                  <Text
                    mt={2}
                    display="inline-flex"
                    gap={4}
                    alignItems="center"
                  >
                    <Icon as={IoCheckmarkCircle} color="green" boxSize={6} />
                    Your result has been successfully verified.
                  </Text>
                ) : (
                  <>
                    <Text
                      mt={2}
                      display="inline-flex"
                      gap={4}
                      alignItems="center"
                    >
                      <Icon as={IoCloseCircle} color="red" boxSize={6} />
                      Your result could not be verified successfully.
                    </Text>
                    <UnorderedList ml={16}>
                      {documentUploadsRes.data?.map((doc) => (
                        <ListItem key={doc.id}>{doc.reason}</ListItem>
                      ))}
                    </UnorderedList>
                  </>
                )}
              </Box>
            )}
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
                  onSubmit();
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
