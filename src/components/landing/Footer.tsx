import { Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => {
  return (
    <Box display={"flex"} flexDir={"column"} bg="#01011A" px="6rem" pt="4.5rem">
      <HStack
        justifyContent={"space-between"}
        borderBottom={"1px solid #E1E4ED"}
        pb="2.5rem"
      >
        <VStack alignItems={"flex-start"}>
          <Image
            src={"/landing-page/ui-logo.png"}
            alt="logo"
            width={50}
            height={50}
          />
          <Text fontSize={"1.25rem"} color={"white"} fontWeight={700}>
            Distance Learning Center
          </Text>
          <Text fontSize={"1rem"} fontWeight={400} color={"white"}>
            University of Ibadan
          </Text>
        </VStack>

        <VStack alignItems={"flex-start"} w="25%">
          <Text fontSize={"1rem"} color={"white"} fontWeight={700}>
            Need Help? Get Supported!{" "}
          </Text>
          <Text fontSize={"1rem"} color={"white"}>
            Access personalized Learner Support and Academic Advising services
            anytime, anywhere!{" "}
          </Text>
        </VStack>
      </HStack>

      <HStack
        justifyContent={"space-between"}
        borderBottom={"1px solid #E1E4ED"}
        alignItems={"flex-start"}
        pb="4.5rem"
        pt="2.5rem"
      >
        <VStack alignItems={"flex-start"} w="20%">
          <Text fontSize={"1rem"} color={"white"} fontWeight={700}>
            Visit Self Help
          </Text>
          <Text fontSize={"1rem"} color={"white"}>
            Explore the knowledge base system for portal, LMS and programme
            informations
          </Text>
          <Link
            pt=".5rem"
            color="#007AFF"
            href="https://dlcportal.ui.edu.ng/i-help"
          >
            https://dlcportal.ui.edu.ng/i-help
          </Link>
        </VStack>

        <VStack alignItems={"flex-start"} w="20%">
          <Text fontSize={"1rem"} color={"white"} fontWeight={700}>
            Web Ic Mobile Class
          </Text>
          <Text fontSize={"1rem"} color={"white"}>
            Connect with experienced E-Tutors on your course page and Mobile
            Class app for academic advisory.
          </Text>
          <Link
            pt=".5rem"
            color="#007AFF"
            href="https://dlcportal.ui.edu.ng/i-help"
          >
            Connect now
          </Link>
        </VStack>

        <VStack alignItems={"flex-start"} w="25%">
          <Text fontSize={"1rem"} color={"white"} fontWeight={700}>
            Contact us
          </Text>
          <HStack gap="1rem">
            <Image
              src={"/landing-page/Email.svg"}
              alt="email icon"
              width={50}
              height={50}
            />
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"14px"} color={"white"} fontWeight={400}>
                Whatsapp Ic:
              </Text>
              <Text
                mt="0rem !important"
                fontSize={"14px"}
                color={"white"}
                fontWeight={700}
                cursor={"pointer"}
                as={Link}
                href="https://wa.me/2348104812619"
                isExternal
              >
                0810 481 2619
              </Text>
            </VStack>
          </HStack>

          <Text fontSize={"14px"} color={"white"} fontWeight={400}>
            Get general academic guidance and planning
          </Text>

          <HStack gap="1rem" mt="1.5rem !important">
            <Image
              src={"/landing-page/Email.svg"}
              alt="email icon"
              width={50}
              height={50}
            />
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"14px"} color={"white"} fontWeight={400}>
                Email:
              </Text>

              <Link
                mt="0rem !important"
                color="#007AFF"
                href="mailto:ssu@dlc.ui.edu.ng"
              >
                ssu@dlc.ui.edu.ng
              </Link>
            </VStack>
          </HStack>

          <HStack gap="1rem" mt="1.5rem !important">
            <Image
              src={"/landing-page/Email.svg"}
              alt="email icon"
              width={50}
              height={50}
            />
            <VStack alignItems={"flex-start"}>
              <Text fontSize={"14px"} color={"white"} fontWeight={400}>
                Phone:
              </Text>
              <Text
                mt="0rem !important"
                fontSize={"14px"}
                color={"white"}
                fontWeight={700}
              >
                0816 140 0584 <br />
                (9am - 3pm | Mon - Fri)
              </Text>
            </VStack>
          </HStack>
          <Text fontSize={"14px"} color={"white"} fontWeight={400}>
            Resolve technical issues and programme concerns{" "}
          </Text>
        </VStack>
      </HStack>

      <Text textAlign="center" py="1.5rem" color="#B4B9C9">
        UI-ODeL is dedicated to your success! Contact us today
      </Text>
    </Box>
  );
};

export default Footer;
