import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { paymentQueries } from "../../api/payment.queries";
import PaymentCountdownModal from "./payment-countdown-modal";

export default function MakeSundryPaymentModal() {
  const [showPaymentCountdown, setShowPaymentCountdown] = useState(false);
  const { query, push } = useRouter();
  const { data: sundryPayments = [] } = useQuery(paymentQueries.sundryList());
  const [selectedPaymentId, setSelectedPaymentId] = useState<
    string | undefined
  >();
  const selectedPayment = sundryPayments.find(
    (payment) => payment.id === selectedPaymentId
  );
  const selectedPaymentPrerequisites =
    selectedPayment?.prerequisites?.filter((pre) => !pre.isPaid) ?? [];

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sundry: _, ...queryRest } = query;
      return push({ query: queryRest });
    },
  });

  useEffect(() => {
    if (query.sundry == "open") {
      onOpen();
    }
  }, [query.sundry, onOpen]);

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
                <AutoComplete
                  openOnFocus
                  value={selectedPaymentId}
                  onChange={(value) => {
                    setSelectedPaymentId(value);
                  }}
                >
                  <AutoCompleteInput
                    as={Input}
                    variant="primary"
                    placeholder="Select a Fee: Search or select a fee"
                  />
                  <AutoCompleteList>
                    {sundryPayments.map((payment) => (
                      <AutoCompleteItem
                        key={`${payment.id}-${payment.transactionRef}`}
                        value={payment.id}
                        label={payment.title}
                        textTransform="capitalize"
                      >
                        {payment.title}
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
              </FormControl>
              <FormControl isDisabled isRequired>
                <FormLabel _disabled={{ opacity: 1 }}>Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement>₦</InputLeftElement>
                  <Input
                    type="number"
                    placeholder="Enter an emount"
                    value={selectedPayment?.amount || ""}
                  />
                </InputGroup>
                {selectedPaymentPrerequisites.length > 0 && (
                  <FormHelperText>
                    Prerequisites:{" "}
                    {selectedPaymentPrerequisites
                      ?.map((pre) => pre.description)
                      ?.join(", ")}
                  </FormHelperText>
                )}
              </FormControl>
              <Flex justify="center" gap={8} w="100%">
                <Button colorScheme="red" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => setShowPaymentCountdown(true)}
                  isDisabled={
                    !selectedPaymentId ||
                    !selectedPayment?.isActive ||
                    selectedPaymentPrerequisites.length > 0
                  }
                  minW={24}
                >
                  Pay
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {selectedPayment && showPaymentCountdown && (
        <PaymentCountdownModal
          payment={selectedPayment}
          onClose={() => {
            setShowPaymentCountdown(false);
          }}
        />
      )}
    </>
  );
}
