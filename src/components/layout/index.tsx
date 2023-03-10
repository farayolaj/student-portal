import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { LOGIN } from "../../constants/routes";
import useAuth from "../../hooks/use-auth";
import EventSidebar from "./event-sidebar";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export type LayoutProps = {
  show?: boolean;
  isAuthenticated?: boolean;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  show = true,
  isAuthenticated = true,
}) => {
  const { user, authToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !authToken) {
      router.push(LOGIN);
    }
  }, [isAuthenticated, authToken, router]);

  if (isAuthenticated && !user) {
    return null;
  }

  if (!show) return <>{children}</>;

  return (
    <Flex pos="relative" direction="column">
      <Header />
      <Flex>
        <Sidebar />
        <Box h="calc(100vh - 4rem)" pos="relative" overflowY="auto" w="full">
          <Flex pos="relative" minH="full" bg="gray.200">
            <Box
              alignSelf="flex-start"
              as="main"
              w="100%"
              pos="sticky"
              top="0rem"
              p={6}
              pr={[null, null, 4]}
            >
              {children}
            </Box>
            <EventSidebar />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
