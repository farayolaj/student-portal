import { PAYMENTS } from "@/constants/routes";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Spacer,
  StackDivider,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { paymentQueries } from "../../api/payment.queries";
import { useProfile } from "../../api/user/use-profile";
import book from "../../images/bookstore/book-bg-4.png";
import EventCalendar from "../common/events/event-calendar";
import ConfirmPaymentModal from "../payments/confirm-payment-modal";

const mostSubscribedSundryCodes = ["91", "76", "57"];

const DisplayPanel: FC = () => {
  const { data: sundryPayments = [] } = useQuery({
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

  const router = useRouter();
  const profile = useProfile();

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
                      <PayButton
                        payment={sundry}
                        unVerifiedFresher={unVerifiedFresher}
                      />
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

                    <PayButton
                      payment={sundry}
                      unVerifiedFresher={unVerifiedFresher}
                    />
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

      <Box pos="relative" rounded="md" overflow="hidden">
        <Box pos="absolute" w="full" h="full">
          <Image
            src={book}
            alt=""
            role="presentation"
            style={{ objectFit: "cover" }}
            fill
          />
        </Box>
        <VStack
          w="full"
          h="full"
          p={2}
          pos="relative"
          bgColor="blackAlpha.700"
          color="white"
        >
          <Text w="80%" textAlign={"center"} fontWeight="bold" color="white">
            Get affordable books for as low as #800
          </Text>
          <Spacer />
          <Button as={Link} href="/bookstore" fontSize="sm">
            Check Bookstore
          </Button>
        </VStack>
      </Box>
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

function PayButton({
  payment,
  unVerifiedFresher,
}: {
  payment: Payment;
  unVerifiedFresher?: boolean;
}) {
  const [showPaymentCountdown, setShowPaymentCountdown] = useState(false);

  return (
    <>
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
        onClick={() => setShowPaymentCountdown(true)}
        isDisabled={unVerifiedFresher}
      >
        Pay
      </Button>
      {showPaymentCountdown && (
        <ConfirmPaymentModal
          payment={payment}
          onClose={() => {
            setShowPaymentCountdown(false);
          }}
        />
      )}
    </>
  );
}
