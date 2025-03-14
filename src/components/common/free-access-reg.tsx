import { useProfile } from "@/api/user/use-profile";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  OrderedList,
  Select,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaSimCard } from "react-icons/fa";
import { registerForFreeAccess } from "../../api/common.mutations";

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
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: profile.data?.user.telcoNumber === null,
  });
  const cancelRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isGloSubscriber, setIsGloSubscriber] = useState(true);
  const [otherNetwork, setOtherNetwork] = useState("");

  const toast = useToast();

  const freeAccessRegMutation = useMutation({
    mutationFn: registerForFreeAccess,
    onSuccess() {
      toast({
        title: isGloSubscriber ? "Free access registration successful" : "",
        description: isGloSubscriber
          ? "You can now access the Mobile Class LMS without data charges."
          : "Your preference has been saved",
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
              <ListItem>
                You will be notified when your free data becomes active.
              </ListItem>
            </OrderedList>

            <Checkbox
              mt="1rem"
              isChecked={isGloSubscriber}
              onChange={() => setIsGloSubscriber(!isGloSubscriber)}
              colorScheme="green"
            >
              <strong>
                I subscribe to GLO Network (uncheck if you don’t).
              </strong>
            </Checkbox>
            {isGloSubscriber ? (
              <FormControl
                isInvalid={!!phoneNumber && !isGloPhoneNumber(phoneNumber)}
              >
                <InputGroup
                  mt={4}
                  w={[null, null, "50%"]}
                  colorScheme="primary"
                >
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
                    isRequired
                    focusBorderColor="green.500"
                  />
                </InputGroup>
                <FormErrorMessage>
                  Ensure the phone number is a GLO phone number.
                </FormErrorMessage>
              </FormControl>
            ) : (
              <FormControl my={4}>
                <Select
                  placeholder="Select your network"
                  value={otherNetwork}
                  onChange={(e) => setOtherNetwork(e.target.value)}
                  w={[null, null, "50%"]}
                  isRequired
                  focusBorderColor="green.500"
                >
                  <option value="MTN">MTN</option>
                  <option value="Airtel">Airtel</option>
                  <option value="9Mobile">9Mobile</option>
                </Select>
              </FormControl>
            )}

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
            {isGloSubscriber ? (
              <Button
                mx="auto"
                onClick={() => {
                  freeAccessRegMutation.mutate({ phoneNumber });
                }}
                isLoading={freeAccessRegMutation.isPending}
                isDisabled={
                  freeAccessRegMutation.isPending ||
                  !isGloPhoneNumber(phoneNumber)
                }
                w="5rem"
              >
                Submit
              </Button>
            ) : (
              <Button
                mx="auto"
                onClick={() => {
                  freeAccessRegMutation.mutate({ phoneNumber: otherNetwork });
                }}
                isLoading={freeAccessRegMutation.isPending}
                isDisabled={
                  freeAccessRegMutation.isPending || otherNetwork === ""
                }
                w="5rem"
              >
                Submit
              </Button>
            )}

            <Button
              ref={cancelRef as any}
              mx="auto"
              colorScheme="blackAlpha"
              onClick={() => {
                onClose();
              }}
              w="5rem"
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
