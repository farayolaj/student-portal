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
  Spinner,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initiateTransaction } from "../../api/payment.mutations";
import { paymentQueries } from "../../api/payment.queries";
import useRemitaInline from "../common/remita-inline";

export default function MakeSundryPaymentModal() {
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
      const { sundry, ...queryRest } = query;
      return push({ query: queryRest });
    },
  });
  const toast = useToast();

  useEffect(() => {
    if (query.sundry == "open") {
      onOpen();
    }
  }, [query.sundry, onOpen]);

  const queryClient = useQueryClient();
  const initiateTransactionMutation = useMutation({
    mutationFn: initiateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(paymentQueries.mainList());
    },
  });
  const { initPayment } = useRemitaInline({
    isLive: process.env.NODE_ENV === "production",
    onSuccess: (res: any) => {
      if (process.env.NODE_ENV === "development") console.log(res);

      queryClient.invalidateQueries(paymentQueries.mainList());
      queryClient.invalidateQueries(paymentQueries.transactionsList());

      toast({
        status: "success",
        title: "Payment Successful",
        description:
          "If payment doesn't reflect immediately, requery transaction status later.",
      });
    },
    onError: (res: any) => {
      if (process.env.NODE_ENV === "development") console.error(res);

      toast({
        status: "error",
        title: "Payment Failed",
        description: "Please try again later.",
      });
    },
  });

  const initialisePayment = () => {
    initiateTransactionMutation.mutate(
      {
        id: selectedPayment?.id || "",
        paymentType: selectedPayment?.paymentType || "sundry",
        transactionRef: undefined,
      },
      {
        onError: (error) => {
          const err = error as Error;
          toast({
            status: "error",
            title: "Error initializing payment",
            description: err.message,
          });
        },
        onSuccess: (data) => {
          onClose();
          initPayment({
            key: data.transaction?.publicKey || "",
            processRrr: true,
            transactionId: data.transaction?.id,
            extendedData: {
              customFields: [
                {
                  name: "rrr",
                  value: data.transaction?.rrr,
                },
              ],
            },
          });
        },
      }
    );
  };

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
                    {sundryPayments.map((payment, cid) => (
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
                  onClick={initialisePayment}
                  isDisabled={
                    !selectedPaymentId ||
                    !selectedPayment?.isActive ||
                    selectedPaymentPrerequisites.length > 0
                  }
                  minW={24}
                >
                  {initiateTransactionMutation.isPending ? (
                    <Spinner color="white" size="xs" />
                  ) : (
                    "Pay"
                  )}
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
