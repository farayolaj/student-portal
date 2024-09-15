import { useVerifyTransaction } from "@/api/payment/use-verify-transaction";
import { Button, useToast } from "@chakra-ui/react";

type PaymentTransactionsProps = {
  transaction?: Transaction;
  isLoading?: boolean;
  onSuccess: () => void;
};

const RequeryButton = ({ transaction, onSuccess }: PaymentTransactionsProps) => {
  const toast = useToast();

  const verifyTransaction = useVerifyTransaction({
    variables: { rrr: transaction?.rrr ?? "" },
  });

  return (
    <Button
      size="sm"
      colorScheme="green"
      isDisabled={verifyTransaction.isLoading}
      onClick={() => {
        verifyTransaction.refetch().then((res) => {
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
