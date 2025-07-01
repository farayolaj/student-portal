import { paymentQueries } from "@/api/payment.queries";
import { useFetchReceipt } from "@/api/payment/use-fetch-receipt";
import { useSession } from "@/api/user/use-session";
import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";
import ConfirmPaymentModal from "../confirm-payment-modal";

type PaymentDetailProps = {
  payment: Payment;
};

export default function PaymentDetail({ payment }: PaymentDetailProps) {
  const [showPaymentCountdown, setShowPaymentCountdown] = useState(false);
  const sessionRes = useSession(payment.sessionId || "");
  const descriptionArr = [
    payment.level ? `${payment.level} Level` : undefined,
    payment.programme,
    sessionRes.data?.name,
    payment.semester,
  ];
  const description = descriptionArr.filter(Boolean).join(" | ");
  let statusIcon: JSX.Element;
  let statusText: string;

  const toast = useToast({
    isClosable: true,
  });
  const receipt = useFetchReceipt({
    rrr: payment.transaction?.rrr || "",
    onError: (error) => {
      toast({
        status: "error",
        title: "Error",
        description: error.message,
      });
    },
  });

  if (payment.status === "paid") {
    if (payment.paymentOption === "part") {
      statusIcon = <IoCheckmarkCircle color="blue" />;
      statusText = "Partially Paid";
    } else {
      statusIcon = <IoCheckmarkCircle color="green" />;
      statusText = "Paid";
    }
  } else {
    statusIcon = <IoTime color="orange" />;
    statusText = "Unpaid";
  }

  const [isPreselectedSelected, setIsPreselectedSelected] = useState(true);
  const total = payment.amount
    ? payment.amount +
      (isPreselectedSelected ? payment.preselected?.amount || 0 : 0)
    : 0;

  const prerequisites =
    payment.prerequisites?.filter((pre) => !pre.isPaid) || [];

  useEffect(() => {
    if (payment.transaction) {
      setIsPreselectedSelected(payment.containsPreselected);
    }
  }, [payment.transaction, payment.containsPreselected]);

  const { data: pendingTransactions } = useQuery(
    paymentQueries.pendingTransactions(payment.id, payment.sessionId!)
  );
  const hasPending = !!pendingTransactions && pendingTransactions.length > 0;
  const [paymentToConfirm, setPaymentToConfirm] = useState(payment);

  return (
    <Box>
      {payment && showPaymentCountdown && (
        <ConfirmPaymentModal
          payment={paymentToConfirm}
          includePreselected={isPreselectedSelected}
          onClose={() => {
            setShowPaymentCountdown(false);
          }}
        />
      )}
      {hasPending && (
        <Flex bg="lightgrey" flexDirection={"column"} p={2} mb={8} gap={4}>
          <Text as="span" fontWeight="semibold" textAlign="center">
            You have conflicting and pending payment(s) in progress at{" "}
            {pendingTransactions
              .map((item) => (
                <Link
                  key={`${item.paymentId}-${item.transactionRef}`}
                  as={NextLink}
                  href={buildPaymentDetailUrl({
                    id: item.paymentId,
                    trxRef: item.transactionRef,
                    trxType: item.transactionType,
                  })}
                  color={"#0000EE"}
                  textDecorationStyle="solid"
                  textDecorationLine="underline"
                >
                  {item.description}
                </Link>
              ))
              .reduce((prev, curr, idx) => {
                if (idx !== 0 && idx === prerequisites.length - 1)
                  prev.push(" and ");
                else if (idx !== 0) prev.push(", ");
                prev.push(curr);
                return prev;
              }, [] as (JSX.Element | string)[])}
            . Please, click the link to complete the payment or cancel it before
            proceeding.
          </Text>
        </Flex>
      )}
      {prerequisites.length > 0 && (
        <Center bg="lightgrey" p={2} mb={8}>
          <Text as="span" fontWeight="semibold" textAlign="center">
            Requires payment of{" "}
            {prerequisites
              .map((payment) => (
                <Link
                  key={`${payment.id}-${payment.transactionRef}`}
                  as={NextLink}
                  href={buildPaymentDetailUrl({
                    id: payment.id || "",
                    trxRef: payment.transactionRef,
                    trxType: payment.transactionType,
                  })}
                  color={"#0000EE"}
                  textDecorationStyle="solid"
                  textDecorationLine="underline"
                >
                  {payment.description} {"(click here to pay)"}
                </Link>
              ))
              .reduce((prev, curr, idx) => {
                if (idx !== 0 && idx === prerequisites.length - 1)
                  prev.push(" and ");
                else if (idx !== 0) prev.push(", ");
                prev.push(curr);
                return prev;
              }, [] as (JSX.Element | string)[])}{" "}
          </Text>
        </Center>
      )}
      <Flex
        direction={["column", null, "row"]}
        justify="space-between"
        align={[null, null, "center"]}
        rowGap={8}
      >
        <Flex direction="column" fontSize="xl">
          <Text as="span" fontWeight="semibold">
            {payment.title || "Loading..."}
          </Text>
          <Text as="span" fontSize="3xl" fontWeight="bold">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(total)}
          </Text>
          <Text as="span" mt={2} fontSize="sm">
            {description}
          </Text>
          <Flex gap={2} align="center" mt={4}>
            {statusIcon}
            <Text as="span" fontSize="md">
              {statusText}
            </Text>
          </Flex>
        </Flex>
        {!payment ? (
          <Button paddingInline={16}>
            <Spinner color="white" />
          </Button>
        ) : payment.status === "paid" ? (
          <Button
            onClick={() => {
              receipt.intiateFetch();
            }}
            isDisabled={receipt.isLoading}
            minW="7.8rem"
          >
            {receipt.isLoading ? <Spinner color="white" size="xs" /> : "Print"}
          </Button>
        ) : (
          <Flex direction="column">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                isDisabled={
                  !payment.isActive ||
                  prerequisites.length > 0 ||
                  receipt.isLoading ||
                  hasPending
                }
              >
                {payment.isActive ? "Pay Now" : "Payment Closed"}
              </MenuButton>
              <MenuList>
                <MenuItem
                  py={3}
                  onClick={() => {
                    setPaymentToConfirm(payment);
                    setShowPaymentCountdown(true);
                  }}
                >
                  Full Payment - (
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(total)}
                  )
                </MenuItem>
                {payment.subPayments?.map((grp) => (
                  <MenuItem
                    py={3}
                    onClick={() => {
                      setPaymentToConfirm({
                        ...payment,
                        id: grp.id,
                        paymentOption: grp.paymentOption,
                        paymentType: grp.paymentType,
                        amount: grp.amount,
                        title: grp.description,
                      });
                      setShowPaymentCountdown(true);
                    }}
                    key={grp.id}
                  >
                    {grp.description} - (
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(
                      grp.amount +
                        (isPreselectedSelected
                          ? payment.preselected?.amount || 0
                          : 0)
                    )}
                    )
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Text as="span" fontSize="sm" fontWeight="semibold" mt={8}>
              {Boolean(payment.dueDate.getTime()) &&
                `Due ${payment.dueDate.toLocaleDateString()}`}
            </Text>
          </Flex>
        )}
      </Flex>
      <Heading as="h3" size="md" mt={6}>
        Items
      </Heading>
      <CheckboxGroup
        colorScheme="primary"
        isDisabled={Boolean(payment.transaction)}
      >
        <SimpleGrid
          columns={1}
          spacing={4}
          mt={4}
          color="blackAlpha.700"
          sx={{
            "& span[data-disabled]": {
              opacity: 1,
            },
          }}
        >
          <Checkbox isChecked isDisabled>
            Main (
            {Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(payment.amount || 0)}
            )
          </Checkbox>
          {payment.preselected && (
            <Checkbox
              isChecked={isPreselectedSelected}
              onChange={() => setIsPreselectedSelected((prev) => !prev)}
            >
              {payment.preselected.title} (
              {Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(payment.preselected.amount)}
              )
            </Checkbox>
          )}
        </SimpleGrid>
      </CheckboxGroup>
    </Box>
  );
}
