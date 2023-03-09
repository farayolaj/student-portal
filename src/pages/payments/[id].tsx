import { useRouter } from "next/router";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentDetail from "../../components/payments/details/payment-detail";
import PaymentTransactionDetail from "../../components/payments/details/payment-transactions";
import { payments } from "../../data/payments";

export default function PaymentDetails() {
  const router = useRouter();
  const id = router.query.id;
  console.log(typeof id);
  const payment = payments.find((p) => p.id == id) as Payment;

  return (
    <>
      <Seo title="Payment Details" />
      <PageTitle showBackButton>Payment Details</PageTitle>
      <PaymentDetail payment={payment} />
      <PaymentTransactionDetail transaction={payment.transactions?.at(0)} />
    </>
  );
}
