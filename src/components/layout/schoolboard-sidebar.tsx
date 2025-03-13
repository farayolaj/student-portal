import { useInitiateTransaction } from "@/api/payment/use-initiate-transaction";
import { PAYMENTS } from "@/constants/routes";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  StackDivider,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import { paymentQueries } from "../../api/payment.queries";
import { useProfile } from "../../api/user/use-profile";
import EventCalendar from "../common/events/event-calendar";
import useRemitaInline from "../common/remita-inline";

const mostSubscribedSundryCodes = ["75", "57"];

const DisplayPanel: FC = () => {
  const { data: sundryPayments } = useQuery({
    ...paymentQueries.sundryList(),
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

  const { data: allTransactions } = useQuery(paymentQueries.transactionsList());
  const paidPartPayment = allTransactions?.filter(
    (item) => item.isPartPayment && item.status === "success"
  );

  const currentSchoolFee = allTransactions?.filter(
    (item) => item.isCurrentSchoolFee && item.status === "success"
  );

  const partPaymentIds = allTransactions
    ?.filter((item) => item.isPartPayment)
    .map((idx) => idx.encodedId);

  const toast = useToast();
  const router = useRouter();
  const profile = useProfile();

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

  const unVerifiedFresher =
    profile?.data?.user.isFresher && !profile?.data?.user?.isVerified;

  return (
    <VStack
      align="flex-start"
      divider={<StackDivider borderColor="#878785" />}
      spacing={"28px"}
      pb={"2rem"}
    >
      {paidPartPayment && paidPartPayment.length > 0
        ? sundryPayments?.map(
            (sundry) =>
              !partPaymentIds?.includes(sundry.id) && (
                <Tooltip
                  label="Credentials verification required"
                  isDisabled={!unVerifiedFresher}
                  placement={"top"}
                  key={sundry.id}
                  bg="red"
                  hasArrow
                  isOpen={unVerifiedFresher}
                >
                  <Flex
                    opacity={unVerifiedFresher ? "0.4" : "none"}
                    direction={"column"}
                    cursor="pointer"
                    gap={1}
                    w="full"
                  >
                    <Text as="p">{sundry.title}</Text>e{" "}
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
                        isDisabled={
                          initiateTransaction.isLoading || unVerifiedFresher
                        }
                      >
                        Pay
                      </Button>
                    </Flex>
                  </Flex>
                </Tooltip>
              )
          )
        : sundryPayments?.map((sundry) =>
            currentSchoolFee?.length === 0 ? (
              <Tooltip
                label="Credentials verification required"
                isDisabled={!unVerifiedFresher}
                placement={"top"}
                key={sundry.id}
                bg="red"
                hasArrow
                isOpen={unVerifiedFresher}
              >
                <Flex
                  opacity={unVerifiedFresher ? "0.4" : "none"}
                  direction={"column"}
                  cursor="pointer"
                  gap={1}
                  w="full"
                >
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
                      isDisabled={
                        initiateTransaction.isLoading || unVerifiedFresher
                      }
                    >
                      Pay
                    </Button>
                  </Flex>
                </Flex>
              </Tooltip>
            ) : (
              ""
            )
          )}
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
      w={{ base: "100%", lg: "25%" }}
      display="flex"
      p={4}
      gap={8}
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
