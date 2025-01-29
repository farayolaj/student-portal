import { LOGIN } from "@/constants/routes";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "oidc-react";
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { useProfile } from "../../api/user/use-profile";
import FreeAccessRegistration from "../common/free-access-reg";
import PortalAlert from "../common/portal-alert";
import ScreeningInfo from "../payments/screening-info";
import { Header } from "./header";
import SchoolBoardSidebar from "./schoolboard-sidebar";
import { Sidebar } from "./sidebar";

export type LayoutProps = {
  isAuthenticated?: boolean;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  isAuthenticated = true,
}) => {
  const [connectivityText, setConnectivityText] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    const onOffline = () => {
      setConnectivityText(
        "You are currently offline. Please, connect to the internet."
      );
      setIsOnline(false);
    };
    const onOnline = () => {
      setConnectivityText("Nice! You are back online.");
      setIsOnline(true);
      setTimeout(() => setConnectivityText(""), 1500);
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  let child: ReactNode;
  const { userData } = useAuth();
  const profile = useProfile();

  if (!isAuthenticated) child = children;
  else if (!userData) {
    if (typeof window !== "undefined") push(LOGIN); // Router API is not available on the server
    child = null;
  } else
    child = (
      <Flex pos="relative" direction="column">
        <PortalAlert />
        <FreeAccessRegistration />
        <Header />
        <Flex>
          <Sidebar />
          <Box
            h="calc(100vh - 4rem)"
            pos="relative"
            overflowY="auto"
            w="full"
            bg="gray.200"
            sx={{
              scrollbarGutter: [null, null, "stable"],
              "&::-webkit-scrollbar": {
                width: [null, null, "10px"],
              },
              "&::-webkit-scrollbar-track": {
                background: [null, null, "gray.200"],
              },
              "&::-webkit-scrollbar-thumb": {
                background: [null, null, "gray.400"],
                borderRadius: [null, null, "16px"],
              },
            }}
          >
            {profile?.data?.user.isFresher &&
              !profile?.data?.user?.isVerified && <ScreeningInfo />}
            <Box
              display={"flex"}
              flexDirection={{ base: "column", lg: "row" }}
              pos="relative"
              minH="full"
            >
              <Box
                alignSelf="flex-start"
                as="main"
                w="100%"
                // pos="sticky"
                top="0rem"
                p={6}
                pr={[null, null, 4]}
                pb={6}
              >
                {children}
              </Box>
              <SchoolBoardSidebar />
            </Box>
          </Box>
        </Flex>
      </Flex>
    );

  return (
    <>
      {child}
      {!!connectivityText && (
        <Box
          pos="fixed"
          bottom={0}
          w="full"
          p={2}
          textAlign="center"
          bg={isOnline ? "green" : "red"}
          color="white"
        >
          {connectivityText}
        </Box>
      )}
    </>
  );
};

export default Layout;
