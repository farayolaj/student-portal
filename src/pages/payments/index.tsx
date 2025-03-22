import { useProfile } from "@/api/user/use-profile";
import ScreeningInfo from "@/components/payments/screening-info";
import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { paymentQueries } from "../../api/payment.queries";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentControl from "../../components/payments/payment-control";
import PaymentSummary from "../../components/payments/payment-summary";

export default function Payments() {
  const profile = useProfile();
  const [statusFilter, setStatusFilter] = useState("all");
  const { data = [], isLoading } = useQuery(paymentQueries.mainList());
  const sortedPayments = data.sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "unpaid") return -1;
    else return 1;
  });
  const filteredPayments = sortedPayments.filter((payment) => {
    if (statusFilter === "all") return true;
    return statusFilter === payment.status;
  });

  const currentPayments = filteredPayments.filter((payment) => {
    return payment.sessionId === profile.data?.user?.currentSessionId;
  });

  const stalePayments = filteredPayments.filter((payment) => {
    return payment.sessionId !== profile.data?.user?.currentSessionId;
  });

  return (
    <>
      <Seo title="Payments" />
      <PageTitle showBackButton>Payments</PageTitle>
      <PaymentControl
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      {isLoading ? (
        <Center py={16}>
          <Spinner
            size="xl"
            emptyColor="gray.200"
            color="primary.500"
            thickness="4px"
          />
        </Center>
      ) : filteredPayments.length > 0 ? (
        <>
          <SimpleGrid columns={[1, null, 3]} gap={8} mt={8} mb={8}>
            {currentPayments.map((payment) =>
              profile?.data?.user.isFresher &&
              !profile?.data?.user?.isVerified &&
              payment?.isSchoolFee ? (
                <PaymentSummary
                  payment={payment}
                  isFresherSchoolFee={true}
                  key={`${payment.id}-${payment.transactionRef}`}
                />
              ) : (
                <PaymentSummary
                  payment={payment}
                  isFresherSchoolFee={false}
                  key={`${payment.id}-${payment.transactionRef}`}
                />
              )
            )}
          </SimpleGrid>

          {/* chakra divider(hr) could not display, to be looked into */}
          <Box
            display={
              currentPayments.length === 0 || stalePayments.length === 0
                ? "none"
                : "block"
            }
            w={"100%"}
            height={".05rem"}
            background={"green"}
          ></Box>

          <SimpleGrid columns={[1, null, 3]} gap={8} mt={8}>
            {stalePayments.map((payment) =>
              profile?.data?.user.isFresher &&
              !profile?.data?.user?.isVerified &&
              payment?.isSchoolFee ? (
                <PaymentSummary
                  payment={payment}
                  isFresherSchoolFee={true}
                  key={`${payment.id}-${payment.transactionRef}`}
                />
              ) : (
                <PaymentSummary
                  payment={payment}
                  isFresherSchoolFee={false}
                  key={`${payment.id}-${payment.transactionRef}`}
                />
              )
            )}
          </SimpleGrid>
        </>
      ) : profile?.data?.user.isFresher && !profile?.data?.user?.isVerified ? (
        <Center mt={8} py={16}>
          <ScreeningInfo />
        </Center>
      ) : (
        <Center mt={8} py={16}>
          You currently have no payment to make.
        </Center>
      )}
    </>
  );
}
