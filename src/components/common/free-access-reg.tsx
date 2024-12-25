import { useFreeAccessReg } from "@/api/common/use-free-access-reg";
import { useProfile } from "@/api/user/use-profile";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaSimCard } from "react-icons/fa";

function isGloPhoneNumber(phoneNumber: string) {
  if (/^\+?234/.test(phoneNumber)) {
    phoneNumber = phoneNumber.replace(/^\+?234/, "0");
  }

  const prefix = phoneNumber.slice(0, 4);
  const GLO_PREFIXES = ["0805", "0807", "0705", "0811", "0815", "0905", "0915"];
  return GLO_PREFIXES.includes(prefix);
}

export default function FreeAccessRegistration() {
  const profile = useProfile();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: profile.data?.user.telcoNumber === null });
  const cancelRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");

  const toast = useToast();

  const freeAccessRegMutation = useFreeAccessReg({
    onSuccess(data, variables, context) {
      toast({
        title: "Free access registration successful",
        description:
          "You can now access the Mobile Class LMS without data charges.",
        status: "success",
        isClosable: true,
      });
      onClose();
    },
    onError(err) {
      toast({
        title: "Free access registration failed",
        description: (err as Error).message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as any}
      onClose={() => {
        onClose();
      }}
      isCentered
      closeOnOverlayClick={false}
      scrollBehavior="inside"
    >
      <AlertDialogOverlay>
        <AlertDialogContent overflow={"clip"} maxW={[null, null, "50%"]}>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            textAlign={"center"}
          >
            <Text as="span">
              Free Access to Mobile Class LMS (GLO SIM Required)
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody sx={{ "& > p": { mt: 2 } }}>
            <Text>
              In a bid to open access, the DLC Management is pleased to offer
              free access (no data charges) to the Mobile Class LMS for all
              learners and instructors.
            </Text>
            <Text>To activate free data access:</Text>
            <OrderedList>
              <ListItem>
                Enter your active GLO SIM card number in the field provided
                below.
              </ListItem>
              <ListItem>
                Your phone number will be submitted for processing with Telco.
              </ListItem>
            </OrderedList>

            <FormControl
              isInvalid={!!phoneNumber && !isGloPhoneNumber(phoneNumber)}
            >
              <InputGroup mt={4} w={[null, null, "50%"]} colorScheme="primary">
                <InputLeftElement pointerEvents="none">
                  <FaSimCard />
                </InputLeftElement>
                <Input
                  type="tel"
                  placeholder="Enter your GLO SIM card number"
                  value={phoneNumber}
                  onChange={(ev) => setPhoneNumber(ev.target.value)}
                  maxLength={
                    phoneNumber.startsWith("0")
                      ? 11
                      : phoneNumber.startsWith("+")
                        ? 14
                        : 13
                  }
                />
              </InputGroup>
              <FormErrorMessage>
                Ensure the phone number is a GLO phone number.
              </FormErrorMessage>
            </FormControl>

            <Text>
              <strong>Important:</strong>
              <UnorderedList>
                <ListItem>
                  You must use the registered GLO SIM on your device to access
                  the Mobile Class app/LMS without data charges.
                </ListItem>
                <ListItem>
                  ⁠An active data plan is required, but you will not be charged
                  for Mobile Class usage. Fair usage policy may apply.
                </ListItem>
              </UnorderedList>
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              mx="auto"
              onClick={() => {
                freeAccessRegMutation.mutate({ phoneNumber });
              }}
              isLoading={freeAccessRegMutation.isLoading}
              isDisabled={
                freeAccessRegMutation.isLoading ||
                !isGloPhoneNumber(phoneNumber)
              }
            >
              Submit
            </Button>
            <Button
              ref={cancelRef as any}
              mx="auto"
              colorScheme="blackAlpha"
              onClick={() => {
                onClose();
              }}
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
