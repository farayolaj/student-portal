import { useFetchReceipt } from "@/api/payment/use-fetch-receipt";
import { useSession } from "@/api/user/use-session";
import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";
import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  SkeletonText,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";
import PaymentCountdownModal from "../payment-countdown-modal";

type PaymentDetailProps = {
  payment?: Payment;
};

export default function PaymentDetail({ payment }: PaymentDetailProps) {
  const [showPaymentCountdown, setShowPaymentCountdown] = useState(false);
  const sessionRes = useSession(payment?.sessionId || "");
  const descriptionArr = [
    payment?.level ? `${payment.level} Level` : undefined,
    payment?.programme,
    sessionRes.data?.name,
    payment?.semester,
  ];
  const description = descriptionArr.filter(Boolean).join(" | ");
  let statusIcon: JSX.Element;
  let statusText: string;

  const toast = useToast({
    isClosable: true,
  });
  const receipt = useFetchReceipt({
    rrr: payment?.transaction?.rrr || "",
    onError: (error) => {
      toast({
        status: "error",
        title: "Error",
        description: error.message,
      });
    },
  });

  if (payment?.status === "paid") {
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
  const total = payment?.amount
    ? payment.amount +
      (isPreselectedSelected ? payment.preselected?.amount || 0 : 0)
    : 0;

  const prerequisites =
    payment?.prerequisites?.filter((pre) => !pre.isPaid) || [];

  useEffect(() => {
    if (payment?.transaction) {
      setIsPreselectedSelected(payment.containsPreselected);
    }
  }, [payment?.transaction, payment?.containsPreselected]);

  return (
    <Box>
      {payment && showPaymentCountdown && (
        <PaymentCountdownModal
          payment={payment}
          includePreselected={isPreselectedSelected}
          onClose={() => {
            setShowPaymentCountdown(false);
          }}
          timeout={300}
        />
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
          {payment ? (
            <Text as="span" fontWeight="semibold">
              {payment?.title || "Loading..."}
            </Text>
          ) : (
            <SkeletonText
              mt={2}
              skeletonHeight="1.68rem"
              w="15rem"
              noOfLines={1}
              isLoaded={!!payment}
            />
          )}
          {payment ? (
            <Text as="span" fontSize="3xl" fontWeight="bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(total)}
            </Text>
          ) : (
            <SkeletonText
              mt={2}
              skeletonHeight="2.5rem"
              w="9.8rem"
              noOfLines={1}
            />
          )}
          {payment ? (
            <Text as="span" mt={2} fontSize="sm">
              {description}
            </Text>
          ) : (
            <SkeletonText
              mt={4}
              skeletonHeight="1.18rem"
              w="9rem"
              noOfLines={1}
              isLoaded={!!payment}
            />
          )}
          <Flex gap={2} align="center" mt={4}>
            {statusIcon}
            {payment ? (
              <Text as="span" fontSize="md">
                {statusText}
              </Text>
            ) : (
              <SkeletonText
                mt={2}
                skeletonHeight="1.4rem"
                w="3rem"
                noOfLines={1}
                isLoaded={!!payment}
              />
            )}
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
            <Button
              onClick={() => setShowPaymentCountdown(true)}
              isDisabled={
                !payment.isActive ||
                prerequisites.length > 0 ||
                receipt.isLoading
              }
            >
              {payment.isActive ? "Pay Now" : "Payment Closed"}
            </Button>
            <Text as="span" fontSize="sm" fontWeight="semibold" mt={8}>
              {Boolean(payment.dueDate.getTime()) &&
                `Due ${payment.dueDate?.toLocaleDateString()}`}
            </Text>
          </Flex>
        )}
      </Flex>
      <Heading as="h3" size="md" mt={6}>
        Items
      </Heading>
      <CheckboxGroup
        colorScheme="primary"
        isDisabled={Boolean(payment?.transaction)}
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
            }).format(payment?.amount || 0)}
            )
          </Checkbox>
          {payment?.preselected && (
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
