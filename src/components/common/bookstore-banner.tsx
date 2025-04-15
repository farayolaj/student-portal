import bookimage from "../../images/bookstore/book-bg-5.jpg";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  Text,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import book from "../../images/bookstore/book-bg-3.png";

const BookstoreDialog = () => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = useRef();

  return (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      closeOnOverlayClick={false}
      onClose={() => onClose()}
      scrollBehavior="inside"
      leastDestructiveRef={cancelRef as any}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${book.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
            zIndex: -1,
          }}
          overflow={"clip"}
          maxW={[null, null, "50%"]}
        >
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            <Text as="span">Introducing the new DLC Online Bookstore</Text>
          </AlertDialogHeader>

          <AlertDialogBody sx={{ "& > p": { mt: 2 } }}>
            <Text
              fontSize={"1.2rem"}
              textAlign={"center"}
              lineHeight={"1.8rem"}
              w={"95%"}
              m="auto"
              fontWeight={700}
              color={"black"}
            >
              Stop photocopying/reading obsolete GES materials! Get affordable,
              interactive course books from just ₦800 on DLC Online Bookstore.
              Shop Now for a Smarter and Effective study Experience from Your
              Portal!
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter justifyContent={"center"} gap="2rem">
            <Button as={Link} onClick={onClose} href="/bookstore" w="max-content" bg="green">
              Check Bookstore
            </Button>
            <Button
              ref={cancelRef as any}
              bg="grey"
              onClick={() => {
                onClose();
              }}
              w="10rem"
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default BookstoreDialog;
