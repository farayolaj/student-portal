import { Button, useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { paymentQueries } from "../../api/payment.queries";

type PaymentTransactionsProps = {
  transaction?: Transaction;
  isLoading?: boolean;
  onSuccess: () => void;
};

const RequeryButton = ({
  transaction,
  onSuccess,
}: PaymentTransactionsProps) => {
  const toast = useToast();

  const { isLoading, refetch } = useQuery(
    paymentQueries.verifyTransaction(transaction?.rrr ?? "")
  );

  return (
    <Button
      size="sm"
      colorScheme="yellow"
      isDisabled={isLoading}
      onClick={() => {
        refetch().then((res) => {
          if (res.data) {
            toast({
              title: "Payment is successful",
              status: "success",
              duration: 3000,
              id: `payment-requery-response-${transaction?.rrr}`,
              isClosable: true,
            });
            onSuccess();
          } else {
            toast({
              title: "Payment is still pending",
              status: "info",
              duration: 3000,
              id: `payment-requery-response-${transaction?.rrr}`,
              isClosable: true,
            });
          }
        });
      }}
    >
      Requery
    </Button>
  );
};

export default RequeryButton;
