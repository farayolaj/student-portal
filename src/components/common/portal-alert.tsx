import { usePortalAlert } from "@/api/common/use-portal-alert";
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
import { useRef } from "react";

export default function PortalAlert() {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = useRef();

  const portalAlert = usePortalAlert();

  return portalAlert.data?.header || portalAlert.data?.body ? (
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
            {portalAlert.data?.header || "Portal Alert"}
          </AlertDialogHeader>

          <AlertDialogBody
            sx={{ "& > p": { mt: 2 } }}
            dangerouslySetInnerHTML={{ __html: portalAlert.data?.body }}
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
