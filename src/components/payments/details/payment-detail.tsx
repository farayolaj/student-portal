import { useProfile } from "@/api/user/use-profile";
import { useSession } from "@/api/user/use-session";
import RemitaInline from "@/components/common/remita-inline";
import {
  Button,
  Card,
  CardBody,
  Flex,
  SkeletonText,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IoCheckmarkCircle } from "react-icons/io5";

type PaymentDetailProps = {
  payment?: Payment;
  onPaymentSuccess: () => void;
};

export default function PaymentDetail({
  payment,
  onPaymentSuccess,
}: PaymentDetailProps) {
  const profileRes = useProfile();
  const sessionRes = useSession(payment?.sessionId || "");
  const descriptionArr = [
    payment?.level ? `${payment.level} Level` : undefined,
    payment?.programme,
    sessionRes.data?.name,
    payment?.semester,
  ];
  const description = descriptionArr.filter(Boolean).join(" | ");
  let statusColor: string;
  let statusText: string;

  const toast = useToast();

  if (payment?.status === "paid") {
    statusColor = "green";
    statusText = "Paid";
  } else {
    statusColor = "yellow";
    statusText = "Unpaid";
  }

  return (
    <Card>
      <CardBody>
        <Flex justify="space-between" align="center">
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
                }).format(payment?.amount || 0)}
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
              <IoCheckmarkCircle color={statusColor} />
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
            <Button isDisabled>Print Receipt</Button>
          ) : (
            <Flex direction="column">
              <Button
                as={RemitaInline}
                isLive={process.env.NODE_ENV === "production"}
                data={{
                  key: payment.transaction?.publicKey || "",
                  customerId: profileRes.data?.user?.email as string,
                  firstName: profileRes.data?.user?.firstName as string,
                  lastName: profileRes.data?.user?.lastName as string,
                  email: profileRes.data?.user?.email as string,
                  amount: payment.amount,
                  narration: payment.title,
                  processRrr: true,
                  transactionId: payment.transaction?.referenceNumber,
                  extendedData: {
                    customFields: [
                      {
                        name: "rrr",
                        value: payment.transaction?.rrr,
                      },
                    ],
                  },
                }}
                onSuccess={() => {
                  onPaymentSuccess();
                  toast({
                    status: "success",
                    title: "Payment Successful",
                    description:
                      "If payment doesn't reflect immediately, requery transaction status later.",
                  });
                }}
                onError={() => {
                  toast({
                    status: "error",
                    title: "Payment Failed",
                    description: "Please try again later.",
                  });
                }}
                text="Pay Now"
              />
              <Text as="span" fontSize="sm" fontWeight="semibold" mt={8}>
                {payment.dueDate &&
                  `Due ${payment.dueDate?.toLocaleDateString()}`}
              </Text>
            </Flex>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}
