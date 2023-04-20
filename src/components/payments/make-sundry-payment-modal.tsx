import { useAllPayments } from "@/api/payment/use-all-payments";
import { useAllSessions } from "@/api/user/use-all-sessions";
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
  FormLabel,
  Select,
  Input,
  VStack,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";

export default function MakeSundryPaymentModal() {
  const { data: session } = useAllSessions();
  const paymentsRes = useAllPayments({ select: (payments) => payments.sundry });
  const sundryPayments = paymentsRes.data || [];
  const [selectedPaymentId, setSelectedPaymentId] = useState<
    string | undefined
  >();
  const selectedPayment = sundryPayments.find(
    (payment) => payment.id === selectedPaymentId
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCustomPayment, setIsCustomPayment] = useState(false);

  return (
    <>
      <Button onClick={onOpen}>Make Sundry Payment</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make Sundry Payment</ModalHeader>
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
                <Select
                  placeholder="Select a fee..."
                  onInput={(ev) => {
                    setSelectedPaymentId(ev.currentTarget.value);
                  }}
                >
                  {sundryPayments.map((payment) => (
                    <option key={payment.id}>{payment.title}</option>
                  ))}
                </Select>
              </FormControl>
              {/* <FormControl display="inline-flex" alignItems="center" gap={4}>
                <Checkbox
                  isChecked={isCustomPayment}
                  onChange={(ev) => setIsCustomPayment(ev.target.checked)}
                />
                <FormLabel mb={0}>Custom Payment</FormLabel>
              </FormControl> */}
              <FormControl isDisabled={!isCustomPayment} isRequired>
                <FormLabel>Session</FormLabel>
                <Select
                  placeholder="Select a session..."
                  value={
                    isCustomPayment
                      ? undefined
                      : session?.find(
                          (session) => selectedPayment?.sessionId === session.id
                        )?.id
                  }
                >
                  {session?.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isDisabled={!isCustomPayment} isRequired>
                <FormLabel>Level</FormLabel>
                <Select placeholder="Select applicable level...">
                  {session?.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.level}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isDisabled={!isCustomPayment} isRequired>
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
