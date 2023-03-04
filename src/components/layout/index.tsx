import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import EventSidebar from "./event-sidebar";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex minW="100vw" h="100vh" direction="column" overflowY="hidden">
      <Header />
      <Flex w="full" h="calc(100vh - 5rem)" bg="gray.200" overflowY="hidden">
        <Sidebar />
        <Flex w="full" h="full" overflowY="scroll">
          <Box as="main" w="full" h="100vh" p={6} pr={4}>
            {children}
          </Box>
          <EventSidebar />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
