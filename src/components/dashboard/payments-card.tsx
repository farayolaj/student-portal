import { useSession } from "@/api/user/use-session";
import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Link,
  Spinner,
  StackDivider,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarDays } from "date-fns";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IoTime } from "react-icons/io5";
import { paymentQueries } from "../../api/payment.queries";
import { useProfile } from "../../api/user/use-profile";
import * as routes from "../../constants/routes";

const PaymentsCard: FC = () => {
  const { data = [], isLoading } = useQuery({
    ...paymentQueries.mainList(),
    select: (payments) => {
      return payments.filter((payment) => payment.status === "unpaid");
    },
  });

  const profile = useProfile();

  if (isLoading || data.length === 0) return null;

  return (
    <>
      <Card mt={6}>
        <CardHeader
          display="flex"
          justifyContent="space-between"
          flexWrap={["wrap", null, "initial"]}
        >
          <Heading as="h2" fontSize="md">
            Outstanding Payment
          </Heading>
          <Text as="span" w={["full", null, "initial"]} textAlign="right">
            <Link as={NextLink} href={routes.PAYMENTS}>
              Check all payments &rarr;
            </Link>
          </Text>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Center py={10}>
              <Spinner size="lg" color="primary" />
            </Center>
          ) : data && data.length > 0 ? (
            <VStack divider={<StackDivider />} gap={6}>
              {data.map((payment) =>
                profile?.data?.user.isFresher &&
                !profile?.data?.user?.isVerified &&
                payment?.isSchoolFee ? (
                  <PaymentItem
                    key={`${payment.id}-${payment.transactionRef}`}
                    payment={payment}
                    isSchoolFee={true}
                  />
                ) : (
                  <PaymentItem
                    key={`${payment.id}-${payment.transactionRef}`}
                    payment={payment}
                    isSchoolFee={false}
                  />
                )
              )}
            </VStack>
          ) : (
            <Center py={10}>
              <Text>You have no outstanding payments</Text>
            </Center>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default PaymentsCard;

type PaymentItemProps = {
  payment: Payment;
  isSchoolFee: boolean;
};

const PaymentItem: FC<PaymentItemProps> = ({ payment, isSchoolFee }) => {
  const { push } = useRouter();
  const sessionRes = useSession(payment?.sessionId || "");

  if (!payment) return null;

  const isDue = payment.dueDate.getTime() < Date.now();
  const statusColor = isDue ? "red" : "yellow";
  const statusText = isDue
    ? "Payment is due"
    : `Payment due in ${differenceInCalendarDays(
        payment.dueDate,
        new Date()
      )} days`;
  const showPreselected =
    (payment.transaction && payment.containsPreselected) || payment.preselected;
  let amount = payment.amount;

  if (showPreselected) amount += payment.preselected?.amount || 0;

  return (
    <>
      <Tooltip
        isDisabled={!isSchoolFee}
        label="Credentials verification required"
        placement={"top"}
        bg="red"
        hasArrow
        isOpen={isSchoolFee}
      >
        <Flex
          w="full"
          direction={["column", null, "row"]}
          align={["flex-end", null, "center"]}
          justify="space-between"
          rowGap={4}
          cursor="pointer"
          opacity={isSchoolFee ? "0.4" : "none"}
        >
          <Flex direction="column" w="full">
            <Text as="span" fontSize="2xl">
              {Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(amount)}
            </Text>
            <Text>
              {payment.title}
              {showPreselected && " with " + payment.preselected?.title}
              {sessionRes.data && " | " + sessionRes.data.name}
            </Text>
            {Boolean(payment.dueDate.getTime()) && (
              <Text
                mt={4}
                fontSize="sm"
                display="inline-flex"
                gap={2}
                w="fit-content"
                alignItems="center"
              >
                <IoTime color={statusColor} /> <span>{statusText}</span>
              </Text>
            )}
          </Flex>
          <Button
            onClick={() =>
              push(
                buildPaymentDetailUrl({
                  id: payment.id,
                  trxRef: payment.transactionRef,
                  trxType: payment.transactionType,
                })
              )
            }
            w="fit-content"
            isDisabled={!payment.isActive || isSchoolFee}
          >
            {payment.isActive ? "View Details" : "Payment Closed"}
          </Button>
        </Flex>
      </Tooltip>
    </>
  );
};
