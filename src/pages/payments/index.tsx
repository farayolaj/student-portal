import { useAllPayments } from "@/api/payment/use-all-payments";
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentControl from "../../components/payments/payment-control";
import PaymentSummary from "../../components/payments/payment-summary";

export default function Payments() {
  const [statusFilter, setStatusFilter] = useState("all");
  const paymentsRes = useAllPayments({
    select: (payments) => [
      ...payments.main,
      ...payments.sundry.filter((payment) => payment.status === "paid"),
    ],
  });
  const mainPayments = paymentsRes.data || [];
  const sortedPayments = mainPayments.sort((a, b) => {
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
      {paymentsRes.isLoading ? (
        <Center py={16}>
          <Spinner
            size="xl"
            emptyColor="gray.200"
            color="primary.500"
            thickness="4px"
          />
        </Center>
      ) : filteredPayments.length > 0 ? (
        <SimpleGrid columns={[1, null, 3]} gap={8} mt={8}>
          {filteredPayments.map((payment) => (
            <PaymentSummary payment={payment} key={payment.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Center mt={8} py={16}>
          You currently have no payment to make.
        </Center>
      )}
    </>
  );
}
