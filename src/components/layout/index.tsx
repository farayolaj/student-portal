import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import EventSidebar from "./event-sidebar";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex pos="relative" direction="column">
      <Header />
      <Flex>
        <Sidebar />
        <Box h="calc(100vh - 5rem)" pos="relative" overflowY="auto" w="full">
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
