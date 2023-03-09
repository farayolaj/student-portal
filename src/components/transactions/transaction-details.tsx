import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

type TransactionDetailsProps = {
  transaction: Transaction;
};

export default function TransactionDetails({
  transaction,
}: TransactionDetailsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>View Details</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={[1, null, 2]} gap={4}>
              <DetailItem
                name="Transaction Reference"
                value={transaction.referenceNumber}
              />
              <DetailItem
                name="Amount"
                value={new Intl.NumberFormat("en-NG", {
                  currency: "NGN",
                  style: "currency",
                }).format(transaction.amount / 100)}
              />
              <DetailItem name="Description" value={transaction.description} />
              <DetailItem
                name="Date Initiated"
                value={transaction.dateInitiated.toLocaleDateString("en-NG", {
                  dateStyle: "long",
                })}
              />
              {transaction.datePayed && (
                <DetailItem
                  name="Date Payed"
                  value={transaction.datePayed.toLocaleDateString("en-NG", {
                    dateStyle: "long",
                  })}
                />
              )}
              <DetailItem
                name="Status"
                value={
                  transaction.status[0].toUpperCase() +
                  transaction.status.slice(1)
                }
              />
              <DetailItem name="RRR" value={transaction.rrr} />
            </SimpleGrid>

            <Flex justify="center" mt={8} mb={4}>
              {transaction.status === "failed" ? null : transaction.status ===
                "pending" ? (
                <Flex gap={8}>
                  <Button>Re-query Transaction</Button>
                  <Button>Retry Transaction</Button>
                </Flex>
              ) : (
                <Button>Request Receipt</Button>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

type DetailItemProps = {
  name: string;
  value: number | string;
};

function DetailItem({ name, value }: DetailItemProps) {
  return (
    <VStack align="flex-start" spacing={0.5}>
      <Text fontSize="xs" fontWeight="bold" color="grey">
        {name.toUpperCase()}
      </Text>
      <Text fontWeight="semibold">{value}</Text>
    </VStack>
  );
}
