import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentControl from "../../components/payments/payment-control";
import PaymentSummary from "../../components/payments/payment-summary";
import { payments } from "../../data/payments";

export default function Payments() {
  const [statusFilter, setStatusFilter] = useState("all");
  const sortedPayments = payments.sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "unpaid") return -1;
    else return 1;
  });
  const filteredPayments = sortedPayments.filter((payment) => {
    if (statusFilter === "all") return true;
    return statusFilter === payment.status;
  });

  return (
    <>
      <Seo title="Payments" />
      <PageTitle showBackButton>Payments</PageTitle>
      <PaymentControl
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <SimpleGrid columns={[1, null, 3]} gap={8} mt={8}>
        {filteredPayments.map((payment) => (
          <PaymentSummary payment={payment} key={payment.title} />
        ))}
      </SimpleGrid>
    </>
  );
}
