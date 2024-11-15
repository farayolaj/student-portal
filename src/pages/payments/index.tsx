import { useMainPayments } from "@/api/payment/use-main-payments";
import { Box, Card, CardBody, Center, Divider, Heading, Link, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import NextLink from "next/link";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import PaymentControl from "../../components/payments/payment-control";
import PaymentSummary from "../../components/payments/payment-summary";
import useAuth from "../../hooks/use-auth";
import { VERIFY_RESULT } from "@/constants/routes";
import { useProfile } from "@/api/user/use-profile";

const ScreeningInfo = () => {
  return (
    <>
      <Box>
        <Card>
          <CardBody>
            <Heading fontSize="medium" fontWeight="semibold">
            Please start your screening/verification process. You can use the link for your online verification.&nbsp;
            <Link as={NextLink} href={VERIFY_RESULT}>Click here</Link>
            </Heading>
          </CardBody>
        </Card>
      </Box>
    </>
  );
}

export default function Payments() {
  const { user } = useAuth();
  const profile = useProfile();
  const [statusFilter, setStatusFilter] = useState("all");
  const mainPaymentRes = useMainPayments();
  const payments = mainPaymentRes.data ?? [];
  const sortedPayments = payments.sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === "unpaid") return -1;
    else return 1;
  });
  const filteredPayments = sortedPayments.filter((payment) => {
    if (statusFilter === "all") return true;
    return statusFilter === payment.status;
  });

  const currentPayments = filteredPayments.filter((payment) => {
    return payment.sessionId === user?.currentSessionId;
  });

  const stalePayments = filteredPayments.filter((payment) => {
    return payment.sessionId !== user?.currentSessionId;
  });

  return (
    <>
      <Seo title="Payments" />
      <PageTitle showBackButton>Payments</PageTitle>
      <PaymentControl
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      {mainPaymentRes.isLoading ? (
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
          <SimpleGrid mt={8}>
            {profile?.data?.user.isFresher && !profile?.data?.user?.isVerified && (
              <ScreeningInfo />
            )}
            </SimpleGrid>
            
          <SimpleGrid columns={[1, null, 3]} gap={8} mt={8} mb={8}>
            {currentPayments.map((payment) => (
              <PaymentSummary
                payment={payment}
                key={`${payment.id}-${payment.transactionRef}`}
              />
            ))}
          </SimpleGrid>

          {/* chakra divider(hr) could not display, to be looked into */}
          <Box
            display={currentPayments.length === 0 || stalePayments.length === 0 ? "none" : "block"}
            w={"100%"}
            height={".05rem"}
            background={"green"}
          ></Box>

          <SimpleGrid columns={[1, null, 3]} gap={8} mt={8}>
            {stalePayments.map((payment) => (
              <PaymentSummary
                payment={payment}
                key={`${payment.id}-${payment.transactionRef}`}
              />
            ))}
            </SimpleGrid>
        </>
      ) :
        profile?.data?.user.isFresher && !profile?.data?.user?.isVerified ? (
          <Center mt={8} py={16}>
            <ScreeningInfo />
          </Center>
        ) :
        (
        <Center mt={8} py={16}>
          You currently have no payment to make.
        </Center>
      )}
    </>
  );
}
