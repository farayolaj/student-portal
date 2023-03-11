import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import useAuth from "../../hooks/use-auth";

export const Header: FC = () => {
  const auth = useAuth();

  return (
    <HStack
      position="sticky"
      top="0px"
      zIndex={999}
      as="header"
      bg="white"
      py={2}
      px={8}
      borderBottom="1px"
      borderColor="blackAlpha.300"
      h="4rem"
      w="full"
    >
      <Flex gap={4} align="center">
        <Box boxSize={12} bg="black" />
        <Text
          display={["none", null, "initial"]}
          as="span"
          fontSize="lg"
          fontWeight="semibold"
        >
          University of Ibadan
        </Text>
      </Flex>
      <Spacer h="min-content" />
      <Flex gap={8}>
        <IconButton
          aria-label="Check Notifications"
          size="md"
          variant="transparent"
          icon={<IoNotificationsOutline size="1.5rem" />}
        />
        <HStack>
          <Text display={["none", null, "initial"]}>Adamu Olatunji Ciroma</Text>
          <Menu>
            <MenuButton>
              <Avatar name="Adamu Olatunji Ciroma" size="sm" />
            </MenuButton>
            <MenuList boxShadow="md">
              <MenuItem onClick={auth.logout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </HStack>
  );
};
