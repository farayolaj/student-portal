import { useMainPayments } from "@/api/payment/use-main-payments";
import { useFetchReceipt } from "@/api/payment/use-fetch-receipt";
import { useInitiateTransaction } from "@/api/payment/use-initiate-transaction";
import { useSession } from "@/api/user/use-session";
import useRemitaInline from "@/components/common/remita-inline";
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
import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";
import NextLink from "next/link";
import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";

type PaymentDetailProps = {
  payment?: Payment;
  onPaymentSuccess: () => void;
};

export default function PaymentDetail({
  payment,
  onPaymentSuccess,
}: PaymentDetailProps) {
  const sessionRes = useSession(payment?.sessionId || "");
  const mainPayments = useMainPayments();
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
    statusIcon = <IoCheckmarkCircle color="green" />;
    statusText = "Paid";
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

  const initiateTransaction = useInitiateTransaction();
  const { initPayment } = useRemitaInline({
    isLive: process.env.NODE_ENV === "production",
    onSuccess: (res: any) => {
      if (process.env.NODE_ENV === "development") console.log(res);

      onPaymentSuccess();
      toast({
        status: "success",
        title: "Payment Successful",
        description:
          "If payment doesn't reflect immediately, requery transaction status later.",
      });
    },
    onError: (res: any) => {
      if (process.env.NODE_ENV === "development") console.error(res);

      toast({
        status: "error",
        title: "Payment Failed",
        description: "Please try again later.",
      });
    },
  });

  const initialisePayment = () => {
    initiateTransaction.mutate(
      {
        id: payment?.id || "",
        preselectedId: isPreselectedSelected
          ? payment?.preselected?.id
          : undefined,
        paymentType: "main",
      },
      {
        onError: (error) => {
          const err = error as Error;
          toast({
            status: "error",
            title: "Error initializing payment",
            description: err.message,
          });
        },
        onSuccess: (data) => {
          initPayment({
            key: data.transaction?.publicKey || "",
            processRrr: true,
            transactionId: data.transaction?.id,
            extendedData: {
              customFields: [
                {
                  name: "rrr",
                  value: data.transaction?.rrr,
                },
              ],
            },
          });
        },
      }
    );
  };

  return (
    <Box>
      {prerequisites.length > 0 && (
        <Center bg="#ffe599" p={2} mb={8}>
          <Text as="span" fontWeight="semibold">
            Requires{" "}
            {prerequisites
              .map((pre) => (
                <Link
                  key={pre.id}
                  as={NextLink}
                  href={buildPaymentDetailUrl(
                    payment.id || "",
                    payment.transactionRef
                  )}
                >
                  {pre.description}
                </Link>
              ))
              .reduce((prev, curr, idx) => {
                if (idx !== 0) prev.push(" and ");
                prev.push(curr);
                return prev;
              }, [] as (JSX.Element | string)[])}{" "}
            to be paid.
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
            {receipt.isLoading ? (
              <Spinner color="white" size="xs" />
            ) : (
              "Print"
            )}
          </Button>
        ) : (
          <Flex direction="column">
            <Button
              onClick={initialisePayment}
              isDisabled={
                !payment.isActive ||
                prerequisites.length > 0 ||
                initiateTransaction.isLoading ||
                receipt.isLoading
              }
            >
              {initiateTransaction.isLoading ? (
                <Spinner color="white" size="xs" />
              ) : payment.isActive ? (
                "Pay Now"
              ) : (
                "Payment Closed"
              )}
            </Button>
            <Text as="span" fontSize="sm" fontWeight="semibold" mt={8}>
              {payment.dueDate &&
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
              onChange={(_e) => setIsPreselectedSelected((prev) => !prev)}
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
