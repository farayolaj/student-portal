import { useFetchReceipt } from "@/api/payment/use-fetch-receipt";
import { useSession } from "@/api/user/use-session";
import RemitaInline from "@/components/common/remita-inline";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  SimpleGrid,
  SkeletonText,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";

type PaymentDetailProps = {
  payment?: Payment;
  onPaymentSuccess: () => void;
};

const additionalItems = [
  {
    id: "1",
    title: "Additional Item 1",
    price: 1000,
  },
  {
    id: "2",
    title: "Additional Item 2",
    price: 2000,
  },
  {
    id: "3",
    title: "Additional Item 3",
    price: 3000,
  },
];

export default function PaymentDetail({
  payment,
  onPaymentSuccess,
}: PaymentDetailProps) {
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
    trxId: payment?.transaction?.id || "",
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

  const [selectedAdditionalItems, setSelectedAdditionalItems] = useState<
    string[]
  >([]);
  const total = payment?.amount
    ? payment.amount +
      additionalItems
        .filter((item) => selectedAdditionalItems.includes(item.id))
        .reduce((acc, item) => acc + item.price, 0)
    : 0;

  return (
    <Box>
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
              "Print Receipt"
            )}
          </Button>
        ) : (
          <Flex direction="column">
            <Button
              as={RemitaInline}
              isLive={process.env.NODE_ENV === "production"}
              data={{
                key: payment.transaction?.publicKey || "",
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
              onSuccess={(res: any) => {
                if (process.env.NODE_ENV === "development") console.log(res);

                onPaymentSuccess();
                toast({
                  status: "success",
                  title: "Payment Successful",
                  description:
                    "If payment doesn't reflect immediately, requery transaction status later.",
                });
              }}
              onError={(res: any) => {
                if (process.env.NODE_ENV === "development") console.error(res);

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
      <Heading as="h3" size="md" mt={6}>
        Items
      </Heading>
      <CheckboxGroup
        onChange={(values) => setSelectedAdditionalItems(values as string[])}
        colorScheme="primary"
        isDisabled={Boolean(payment?.transaction)}
      >
        <SimpleGrid columns={[1, null, 2]} spacing={4} mt={4}>
          <Checkbox isChecked isDisabled>
            Main (
            {Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(payment?.amount || 0)}
            )
          </Checkbox>
          {additionalItems.map((item) => (
            <Checkbox key={item.id} value={item.id}>
              {item.title} (
              {Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(item.price)}
              )
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </Box>
  );
}
