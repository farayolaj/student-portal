import { useRouter } from "next/router";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentDetailOverview from "../../components/payments/details/payment-detail-overview";
import PaymentTransactions from "../../components/payments/details/payment-transactions";
import { payments } from "../../data/payments";

export default function PaymentDetails() {
  const router = useRouter();
  const id = router.query.id;
  console.log(typeof id);
  const payment = payments.find((p) => p.id == id) as Payment;

  const sortedTransactions =
    payment.transactions?.sort(
      (a, b) => b.dateInitiated.getTime() - a.dateInitiated.getTime()
    ) || [];

  return (
    <>
      <Seo title="Payment Details" />
      <PageTitle showBackButton>Payment Details</PageTitle>
      <PaymentDetailOverview payment={payment} />
      <PaymentTransactions transactions={sortedTransactions} />
    </>
  );
}
