import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { commonQueries } from "../../api/common.queries";

export default function PortalAlert() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = useRef();

  const { data } = useQuery(commonQueries.portalAlert());

  return data?.header || data?.body ? (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
      scrollBehavior="inside"
    >
      <AlertDialogOverlay>
        <AlertDialogContent maxW={[null, null, "50%"]}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {data?.header || "Portal Alert"}
          </AlertDialogHeader>

          <AlertDialogBody
            sx={{ "& > p": { mt: 2 } }}
            dangerouslySetInnerHTML={{ __html: data?.body ?? "" }}
          ></AlertDialogBody>

          <AlertDialogFooter>
            <Button mx="auto" ref={cancelRef as any} onClick={onClose}>
              Okay
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  ) : null;
}
