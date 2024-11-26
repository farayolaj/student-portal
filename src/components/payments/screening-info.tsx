import { Box, Card, CardBody, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { VERIFY_RESULT } from "@/constants/routes";
import { useProfile } from "@/api/user/use-profile";

const ScreeningInfo = () => {
  const hasPaidOlevelRes = useProfile({
    select: (data) => data.user.hasPaidOlevelVerification,
  });

  return (
    <>
      <Box w={{base:"100%",md:"75%"}}>
        <Card>
          <CardBody>
            {hasPaidOlevelRes?.data === false ? (
              <Heading fontSize="medium" fontWeight="semibold">
                Please start your screening/verification process.
                <Link px=".2rem" as={NextLink} href={VERIFY_RESULT}>
                  Click here
                </Link>
                for online verification
              </Heading>
            ) : (
              <Heading fontSize={"1rem"}>Verification in Progress</Heading>
            )}
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default ScreeningInfo;
