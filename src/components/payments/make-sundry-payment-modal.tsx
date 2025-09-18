import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
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
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { paymentQueries } from "../../api/payment.queries";
import ConfirmPaymentModal from "./confirm-payment-modal";

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

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
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
              </FormControl>
              {selectedPaymentPrerequisites.length > 0 && (
                <Center bg="lightgrey" p={2} mb={8} w="full">
                  <Text as="span" fontWeight="semibold" textAlign="center">
                    Requires payment of{" "}
                    {selectedPaymentPrerequisites
                      .map((payment) => (
                        <Link
                          key={`${payment.id}-${payment.transactionRef}`}
                          as={NextLink}
                          href={buildPaymentDetailUrl({
                            id: payment.id || "",
                            trxRef: payment.transactionRef,
                            trxType: payment.transactionType,
                          })}
                          color={"#0000EE"}
                          textDecorationStyle="solid"
                          textDecorationLine="underline"
                        >
                          {payment.description} {"(click here to pay)"}
                        </Link>
                      ))
                      .reduce((prev, curr, idx) => {
                        if (
                          idx !== 0 &&
                          idx === selectedPaymentPrerequisites.length - 1
                        )
                          prev.push(" and ");
                        else if (idx !== 0) prev.push(", ");
                        prev.push(curr);
                        return prev;
                      }, [] as (JSX.Element | string)[])}{" "}
                  </Text>
                </Center>
              )}
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
        <ConfirmPaymentModal
          payment={selectedPayment}
          onClose={() => {
            setShowPaymentCountdown(false);
          }}
        />
      )}
    </>
  );
}
