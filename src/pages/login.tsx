import { Flex, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useAuth } from "oidc-react";
import { DASHBOARD, HOME } from "../constants/routes";

export default function LoginProcessor() {
  const { userData } = useAuth();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  if (userData) {
    push(DASHBOARD);
  } else if (
    searchParams.has("error") ||
    searchParams.has("error_description")
  ) {
    push({
      pathname: HOME,
      search: searchParams.toString(),
    });
  }

  return (
    <Flex
      w={"full"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"gray.200"}
    >
      <Flex
        justify={"center"}
        align={"center"}
        bg={"primary.50"}
        p={16}
        rounded={"lg"}
      >
        <Spinner size={"xl"} color="primary" thickness="4px" />
      </Flex>
    </Flex>
  );
}

LoginProcessor.layoutProps = {
  show: false,
  isAuthenticated: false,
};
