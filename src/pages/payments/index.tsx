import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentControl from "../../components/payments/payment-control";
import PaymentSummary from "../../components/payments/payment-summary";

const payments: Payment[] = [
  {
    id: "1",
    type: "tuition",
    amount: 1000000,
    entryMode: "Direct Entry",
    level: "400",
    programme: "Computer Science",
    session: "2021/2022",
    semester: "First Semester",
    status: "unpaid",
    title: "Tuition Fee",
    dueDate: new Date(2021, 2, 1),
  },
  {
    id: "2",
    type: "secondary",
    amount: 1000000,
    programme: "Computer Science",
    session: "2021/2022",
    status: "paid",
    title: "Acceptance Fee",
    dueDate: new Date(2021, 2, 1),
  },
  {
    id: "3",
    type: "general",
    amount: 1000000,
    status: "partial",
    title: "Health Fee",
    dueDate: new Date(2021, 2, 1),
  },
  {
    id: "4",
    type: "custom",
    amount: 1000000,
    status: "paid",
    title: "School Fee Balance",
  },
];

export default function Payments() {
  const [statusFilter, setStatusFilter] = useState("all");
  const sortedPayments = payments.sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "unpaid") return -1;
    if (b.status === "unpaid") return 1;
    if (a.status === "partial") return -1;
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
