import CustomYouTubePlayer from "@/components/landing/CustomYoutube";
import FeaturesCard from "@/components/landing/FeaturesCard";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Nav";
import UpdateCard from "@/components/landing/UpdatesCard";
import { Box, Button, Text, useToast, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useAuth } from "oidc-react";
import { useEffect } from "react";
import { DASHBOARD } from "../constants/routes";

function snakeToSentence(snake: string) {
  return snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function LandingPage() {
  const { userData } = useAuth();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  useEffect(() => {
    if (error && errorDescription) {
      toast({
        title: snakeToSentence(error),
        description: errorDescription,
        status: "error",
        isClosable: true,
      });
    }
  }, [error, errorDescription, toast]);

  if (userData) {
    push(DASHBOARD);
  }

  return (
    <Box height="max-content">
      <Navbar />
      <Hero />
      <Box
        pl={{ base: "1rem", lg: "6rem" }}
        pr={{ base: "1rem", lg: "0rem" }}
        py={{ base: "3rem", lg: "8.5rem" }}
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column-reverse", lg: "row" }}
      >
        <VStack
          w={{ base: "100%", lg: "40%" }}
          mt={{ base: "2rem", lg: 0 }}
          alignItems={"flex-start"}
          mb="2rem"
        >
          <Text
            fontWeight={700}
            fontSize={{ base: "2.5rem", lg: "3rem" }}
            lineHeight={{ base: "3rem", lg: "4rem" }}
          >
            Empowering Learning,
            <br /> Anytime, Anywhere
          </Text>
          <Text
            pt="1rem"
            pb="1.5rem"
            w="90%"
            color="#606060"
            fontSize={"1.25rem"}
            lineHeight={"2rem"}
          >
            The Distance Learning Centre, University of Ibadan, is committed to
            providing flexible, high-quality education tailored for students and
            professionals worldwide.
          </Text>

          <Button w="12rem" bg="#38A169" color="white">
            Learn More
          </Button>
        </VStack>

        <CustomYouTubePlayer videoId="NPhVPQE6CUw?si=bx5iosvh5t3cr1n8" />
      </Box>
      {/* Features */}
      <Box
        bg="#38A169"
        px={{ base: "1rem", lg: "6rem" }}
        py={{ base: "3rem", lg: "5rem" }}
        display={"flex"}
        flexDirection={"column"}
        backgroundImage={"url(/landing-page/features-pattern.png)"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"right"}
      >
        <Text color="white" fontWeight={700} fontSize={"2.25rem"}>
          Portal Features
        </Text>
        <Text color="white">
          Easily navigate your student portal with tools designed for seamless
          learning and academic management.
        </Text>

        <Box
          justifyContent={{ base: "center", lg: "flex-start" }}
          alignItems={"center"}
          display={"flex"}
          flexWrap={"wrap"}
          gap="2rem"
          mt={{ base: "2rem", lg: "3rem" }}
        >
          <FeaturesCard
            title="Auto-Generated Matric Number"
            description="Receive automatic matric number upon registration."
          />
          <FeaturesCard
            title="Institutional Email Generation"
            description="Get a personalized institutional email address."
          />{" "}
          <FeaturesCard
            title="School Calendar & Events"
            description="Stay updated on important academic dates and events."
          />{" "}
          <FeaturesCard
            title="Smart Link to Instructors"
            description="Directly connect with course instructors and e-tutors."
          />{" "}
          <FeaturesCard
            title="Seamless Mobile Class Access"
            description="Automatic access to Mobile Class dashboard from the portal"
          />{" "}
          <FeaturesCard
            title="Flexible Payments"
            description="Choose from various payment options (full, semester or part semester)."
          />{" "}
          <FeaturesCard
            title="Programme Services"
            description="Access programme services online"
          />{" "}
          <FeaturesCard
            title="Streamlined Experience"
            description="Enhanced portal, LMS, and webinar integration."
          />
        </Box>

        <Button
          alignSelf={"center"}
          bg="white"
          color="#38A169"
          mt="3rem"
          w="10rem"
        >
          See More
        </Button>
      </Box>
      {/* Apply */}
      <Box
        w="85%"
        display={{ base: "none", lg: "flex" }}
        position={"relative"}
        justifyContent={"center"}
        height={"75vh"}
        my={"8.5rem"}
        mx="auto"
      >
        <Image
          fill
          style={{
            objectFit: "cover",
            borderRadius: "1rem",
          }}
          src="/landing-page/Image.png"
          alt="apply image"
        />

        <Box
          gap={"1rem"}
          bg={"white"}
          w={"45%"}
          p={"2.5rem"}
          borderRadius={".5rem"}
          position={"absolute"}
          bottom={"-35%"}
          left="5rem"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          boxShadow={"0px 12px 24px -6px rgba(24, 26, 42, 0.12)"}
        >
          <Text
            borderRadius={".345rem"}
            fontWeight={600}
            bg="#38A169"
            color="white"
            px="10px"
            py="4px"
            fontSize={"14px"}
          >
            Distance Learning Centre, UI – March 15, 2025
          </Text>
          <Text fontWeight={700} fontSize={"2.25rem"}>
            Admission for 2024/2025 Session Now Open
          </Text>
          <Text color="#777777" fontSize={"1.1rem"} fontWeight={500}>
            Applications are now open for the new academic session! Explore
            flexible programs designed for working professionals and students
            worldwide.
          </Text>
          <Button
            as={Link}
            href="https://modeofstudy.ui.edu.ng"
            mt=".5rem"
            w="12rem"
            bg="#38A169"
            color="white"
          >
            Apply Now
          </Button>
        </Box>
      </Box>
      {/* Apply Mobile */}
      <Box
        gap={"1rem"}
        bg={"white"}
        w={"95%"}
        mx="auto"
        p={"1rem"}
        my="2rem"
        borderRadius={".5rem"}
        display={{ base: "flex", lg: "none" }}
        flexDirection={"column"}
        alignItems={"flex-start"}
        boxShadow={"0px 12px 24px -6px rgba(24, 26, 42, 0.12)"}
      >
        <Text
          borderRadius={".345rem"}
          fontWeight={600}
          bg="#38A169"
          color="white"
          px="10px"
          py="4px"
          fontSize={"12px"}
        >
          Distance Learning Centre, UI – March 15, 2025
        </Text>
        <Text fontWeight={700} fontSize={"2rem"}>
          Admission for 2024/2025 Session Now Open
        </Text>
        <Text color="#777777" fontSize={"1.1rem"} fontWeight={500}>
          Applications are now open for the new academic session! Explore
          flexible programs designed for working professionals and students
          worldwide.
        </Text>
        <Button
          as={Link}
          href="https://modeofstudy.ui.edu.ng"
          mt=".5rem"
          w="12rem"
          bg="#38A169"
          color="white"
        >
          Apply Now
        </Button>
      </Box>{" "}
      {/* Updates */}
      <Box
        mb="5rem"
        mt={{ lg: "15rem" }}
        px={{ base: "1rem", lg: "6rem" }}
        flexDirection={"column"}
        display="flex"
      >
        <Text
          color="#181A2A"
          pb="2rem"
          fontSize={"1.75rem"}
          fontWeight={700}
          pt="2rem"
        >
          School Updates
        </Text>

        <Box display={"flex"} gap="1.25rem" flexWrap={"wrap"}>
          <UpdateCard
            image="/landing-page/beach.png"
            date="March 10, 2025"
            title="Course Registration Deadline Announced"
            description="All students are advised to complete their course registration before the deadline to avoid penalties."
          />
          <UpdateCard
            image="/landing-page/2.png"
            date="March 10, 2025"
            title="Virtual Orientation for New Students"
            description="Join our live orientation session to learn about UI DLC resources, academic guidelines, and student support services."
          />{" "}
          <UpdateCard
            image="/landing-page/3.png"
            date="March 10, 2025"
            title="Academic Calendar Released for 2025 Session"
            description="Stay updated with important dates, including lecture schedules, exams, and registration deadlines."
          />{" "}
          <UpdateCard
            image="/landing-page/4.png"
            date="March 10, 2025"
            title="Course Registration Deadline Announced"
            description="All students are advised to complete their course registration before the deadline to avoid penalties."
          />
          <UpdateCard
            image="/landing-page/5.png"
            date="March 10, 2025"
            title="Virtual Orientation for New Students"
            description="Join our live orientation session to learn about UI DLC resources, academic guidelines, and student support services."
          />{" "}
          <UpdateCard
            image="/landing-page/3.png"
            date="March 10, 2025"
            title="Academic Calendar Released for 2025 Session"
            description="Stay updated with important dates, including lecture schedules, exams, and registration deadlines."
          />{" "}
        </Box>

        <Button
          border="1px solid #696A75"
          alignSelf={"center"}
          bg={"transparent"}
          fontSize={"1rem"}
          _hover={{ background: "#696A75", color: "white" }}
          color="#696A75"
          mt="2rem"
          w="8rem"
        >
          View All Post
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}

LandingPage.layoutProps = {
  show: false,
  isAuthenticated: false,
};
