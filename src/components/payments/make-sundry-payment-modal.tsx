import { useSundryPayments } from "@/api/payment/use-sundry-payments";
import { useInitiateTransaction } from "@/api/payment/use-initiate-transaction";
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
  useToast,
  Spinner,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import useRemitaInline from "../common/remita-inline";

export default function MakeSundryPaymentModal() {
  const paymentsRes = useSundryPayments();
  const sundryPayments = paymentsRes.data || [];
  const [selectedPaymentId, setSelectedPaymentId] = useState<
    string | undefined
  >();
  const selectedPayment = sundryPayments.find(
    (payment) => payment.id === selectedPaymentId
  );
  const selectedPaymentPrerequisites =
    selectedPayment?.prerequisites?.filter((pre) => !pre.isPaid) ?? [];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initiateTransaction = useInitiateTransaction();
  const { initPayment } = useRemitaInline({
    isLive: process.env.NODE_ENV === "production",
    onSuccess: (res: any) => {
      if (process.env.NODE_ENV === "development") console.log(res);

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
    initiateTransaction.mutate(
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
                <Select
                  placeholder="Select a fee..."
                  value={selectedPaymentId}
                  onInput={(ev) => {
                    setSelectedPaymentId(ev.currentTarget.value);
                  }}
                >
                  {sundryPayments.map((payment) => (
                    <option
                      key={`${payment.id}-${payment.transactionRef}`}
                      value={payment.id}
                    >
                      {payment.title}
                    </option>
                  ))}
                </Select>
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
                  {initiateTransaction.isLoading ? (
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
