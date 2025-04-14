import { bookstoreQueries } from "@/api/bookstore.queries";
import { cancelBookstorePayment } from "../../api/bookstore.mutations";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface BookItem {
  course_id: string;
  bookstore_id: string;
  title: string;
  quantity: string;
  price: string;
  amount: string;
}

interface BookOrder {
  id: string;
  session: string;
  order_id: string;
  total_amount: string;
  book_status: string;
  payment_description: string;
  payment_status: string;
  book_items: BookItem[];
}

interface CancelOrderButtonProps {
  order: BookOrder;
}

const CancelTransactionButton: React.FC<CancelOrderButtonProps> = ({
  order,
}) => {
  const cancelPaymentMutation = useMutation({
    mutationFn: cancelBookstorePayment,
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const handleCancelOrder = () => {
    if (order.order_id) {
      cancelPaymentMutation.mutate(
        { order_id: order.order_id },
        {
          onSuccess: () => {
            toast({
              title: "Order Cancelled",
              description: "Your order has been cancelled successfully.",
              status: "success",
              isClosable: true,
            });
            queryClient.invalidateQueries(bookstoreQueries.transactions());
          },
          onError: (error) => {
            toast({
              title: "Error cancelling order",
              description: error.message,
              status: "error",
              isClosable: true,
            });
          },
        }
      );
    }
  };
  return (
    <Button
      colorScheme="green"
      size="sm"
      width="max-content"
      onClick={handleCancelOrder}
      disabled={cancelPaymentMutation?.isPending}
      display={order.book_status === "pending" ? "block" : "none"}
    >
      Cancel
    </Button>
  );
};

export default CancelTransactionButton;
