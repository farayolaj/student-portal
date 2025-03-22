import { Card, CardBody, useToast } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { paymentQueries } from "../../api/payment.queries";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentDetail from "../../components/payments/details/payment-detail";
import PaymentTransactionDetail from "../../components/payments/details/payment-transactions";

export default function PaymentDetails() {
  const router = useRouter();
  const slug = (router.query.slug as string).split("-");
  const id = slug[0];
  const transactionRef = slug[1] || undefined;
  const transactionType = slug[2] || undefined;
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    data: payment,
    error: paymentError,
    isLoading: paymentIsLoading,
  } = useQuery(
    paymentQueries.detailsBy(id, transactionRef, transactionType as any)
  );

  useEffect(() => {
    if (paymentError) {
      const error = paymentError as any;
      toast({
        title: "Error fetching payment details",
        description: error.message,
        status: "error",
        duration: 3000,
        id: `payment-detail-error-${id}`,
        isClosable: true,
      });
    }
  }, [paymentError, id, toast]);

  return (
    <>
      <Seo title="Payment Details" />
      <PageTitle showBackButton>Payment Details</PageTitle>
      <Card>
        <CardBody pt="1.5rem" px="1.875rem" pb="2rem">
          <PaymentDetail payment={payment} />
          <PaymentTransactionDetail
            hasPaid={payment?.status === "paid"}
            transaction={payment?.transaction}
            onRequery={(isPaid) => {
              if (isPaid) {
                queryClient.invalidateQueries(paymentQueries.mainList());
              }
            }}
            isLoading={paymentIsLoading}
          />
        </CardBody>
      </Card>
    </>
  );
}
