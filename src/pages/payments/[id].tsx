import { usePaymentDetail } from "@/api/payment/use-payment-detail";
import { Card, CardBody } from "@chakra-ui/react";
import { useRouter } from "next/router";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentDetail from "../../components/payments/details/payment-detail";
import PaymentTransactionDetail from "../../components/payments/details/payment-transactions";

export default function PaymentDetails() {
  const router = useRouter();
  const id = router.query.id as string;
  const paymentRes = usePaymentDetail({ variables: { id } });

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
            transaction={paymentRes.data?.transaction}
            onRequery={(_) => {
              paymentRes.refetch();
            }}
            isLoading={paymentRes.isLoading}
          />
        </CardBody>
      </Card>
    </>
  );
}
