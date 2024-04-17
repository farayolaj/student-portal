import { useInitiateTransaction } from "@/api/payment/use-initiate-transaction";
import { useSundryPayments } from "@/api/payment/use-sundry-payments";
import { PAYMENTS } from "@/constants/routes";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  StackDivider,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import EventCalendar from "../common/events/event-calendar";
import useRemitaInline from "../common/remita-inline";

const mostSubscribedSundryCodes = ["76", "6"];

const DisplayPanel: FC = () => {
  const sundryPaymentsQuery = useSundryPayments({
    select: (data) =>
      data
        .filter((sundry) =>
          mostSubscribedSundryCodes.includes(sundry.code || "")
        )
        .sort((a, b) => {
          const aIndex = mostSubscribedSundryCodes.indexOf(a.code || "");
          const bIndex = mostSubscribedSundryCodes.indexOf(b.code || "");
          return aIndex - bIndex;
        }),
  });

  const toast = useToast();
  const router = useRouter();

  const initiateTransaction = useInitiateTransaction();
  const { initPayment } = useRemitaInline({
    isLive: process.env.NODE_ENV === "production",
    onSuccess: (res: any) => {
      if (process.env.NODE_ENV === "development") console.log(res);

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

  const initialisePayment = (payment: Payment) => {
    initiateTransaction.mutate(
      {
        id: payment.id,
        paymentType: payment.paymentType,
        transactionRef: undefined,
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
    <VStack
      align="flex-start"
      divider={<StackDivider borderColor="#878785" />}
      spacing={"28px"}
      pb={"2rem"}
    >
      {sundryPaymentsQuery.data?.map((sundry) => (
        <Flex key={sundry.id} direction={"column"} w="full" gap={1}>
          <Text as="p">{sundry.title}</Text>
          <Flex justify={"space-between"} align={"center"}>
            <Text as="span">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(sundry.amount)}
            </Text>
            <Button
              variant={"outline"}
              sx={{
                color: "#2B7B51",
                borderColor: "#2B7B51",
                borderWidth: "3px",
                _hover: { bg: "#2B7B51", color: "white" },
              }}
              w="fit-content"
              size="md"
              alignSelf={"flex-end"}
              onClick={() => initialisePayment(sundry)}
              isDisabled={initiateTransaction.isLoading}
            >
              Pay
            </Button>
          </Flex>
        </Flex>
      ))}
      <Button
        alignSelf={"center"}
        onClick={() => {
          router.push(`${PAYMENTS}?sundry=open`);
        }}
      >
        See other fees &rarr;
      </Button>
    </VStack>
  );
};

const sidebarContent = {
  [PAYMENTS as string]: {
    title: "School Board",
    component: <DisplayPanel />,
  },
  DEFAULT: {
    title: "School Board",
    component: (
      <>
        {" "}
        <DisplayPanel /> <EventCalendar />{" "}
      </>
    ),
  },
};

const SchoolBoardSidebar: FC = () => {
  const { pathname } = useRouter();

  const content = sidebarContent[pathname] || sidebarContent["DEFAULT"];

  return (
    <VStack
      display={["none", null, "flex"]}
      as="aside"
      w="25%"
      p={4}
      gap={8}
      position="sticky"
      top="0rem"
      alignSelf="flex-start"
    >
      <Card w="full">
        <CardHeader>
          <Text as="span" fontSize="lg" fontWeight="bold">
            {content["title"]}
          </Text>
        </CardHeader>
        <CardBody>{content["component"]}</CardBody>
      </Card>
    </VStack>
  );
};

export default SchoolBoardSidebar;
