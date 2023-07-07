import { usePaymentDetail } from "@/api/payment/use-payment-detail";
import { Card, CardBody, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentDetail from "../../components/payments/details/payment-detail";
import PaymentTransactionDetail from "../../components/payments/details/payment-transactions";
import { useEffect } from "react";

export default function PaymentDetails() {
  const router = useRouter();
  const [id, transactionRef] = router.query.slug as string[];
  const toast = useToast();
  const paymentRes = usePaymentDetail({
    variables: { id, transactionRef: transactionRef },
  });

  useEffect(() => {
    if (paymentRes.error) {
      const error = paymentRes.error as any;
      toast({
        title: "Error fetching payment details",
        description: error.message,
        status: "error",
        duration: 3000,
        id: `payment-detail-error-${id}`,
        isClosable: true,
      });
    }
  }, [paymentRes.error, id, toast]);

  return (
    <>
      <Seo title="Payment Details" />
      <PageTitle showBackButton>Payment Details</PageTitle>
      <Card>
        <CardBody pt="1.5rem" px="1.875rem" pb="2rem">
          <PaymentDetail
            payment={paymentRes.data}
            onPaymentSuccess={() => paymentRes.refetch()}
          />
          <PaymentTransactionDetail
            hasPaid={paymentRes.data?.status === "paid"}
            transaction={paymentRes.data?.transaction}
            onRequery={(_) => {
              paymentRes.refetch();
            }}
            isLoading={paymentRes.isInitialLoading}
          />
        </CardBody>
      </Card>
    </>
  );
}
