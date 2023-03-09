import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Input,
  VStack,
  Flex,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEventHandler, useState } from "react";

const DESCRIPTION_CHAR_LIMIT = 60;

export default function MakeCustomPaymentModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const descriptionCharLeft = DESCRIPTION_CHAR_LIMIT - description.length;

  const onDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (ev) => {
    setDescription(ev.target.value.slice(0, DESCRIPTION_CHAR_LIMIT));
  };

  return (
    <>
      <Button onClick={onOpen}>Make Custom Payment</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make Custom Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              as="form"
              spacing={4}
              onSubmit={(ev) => {
                ev.preventDefault();
              }}
            >
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Select placeholder="Select a suitable title...">
                  <option>Additional Tuition Fee</option>
                  <option>Levy</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter a description..."
                  noOfLines={2}
                  value={description}
                  onChange={onDescriptionChange}
                />
                <FormHelperText>
                  {descriptionCharLeft} characters left.
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Session</FormLabel>
                <Select placeholder="Select a session...">
                  <option>2020/2021</option>
                  <option>2021/2022</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Semester</FormLabel>
                <Select placeholder="Select a semester...">
                  <option>Not Applicable</option>
                  <option>First Semester</option>
                  <option>Second Semester</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Level</FormLabel>
                <Select placeholder="Select applicable level...">
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement>₦</InputLeftElement>
                  <Input type="number" placeholder="Enter an emount" />
                </InputGroup>
              </FormControl>
              <Flex justify="center" gap={8} w="100%">
                <Button colorScheme="red" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
