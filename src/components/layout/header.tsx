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
  SkeletonText,
  Spacer,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDashboardInfo } from "../../hooks/dashboard/use-dashboard-info";
import useAuth from "../../hooks/use-auth";

export const Header: FC = () => {
  const auth = useAuth();
  // Change this to use the profile url later
  const dashboardInfo = useDashboardInfo();
  const fullName = `${dashboardInfo.data?.user?.firstName} ${
    dashboardInfo.data?.user.otherNames || ""
  } ${dashboardInfo.data?.user?.lastName}`;

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
        <Menu>
          <MenuButton>
            <HStack>
              {dashboardInfo.isLoading ? (
                <SkeletonText />
              ) : (
                <Text display={["none", null, "initial"]}>{fullName}</Text>
              )}
              <Avatar name={fullName} size="sm" />
            </HStack>
          </MenuButton>
          <MenuList
            boxShadow="md"
            sx={{ "& > *:hover": { bgColor: "primary.200" } }}
          >
            <MenuItem as={NextLink} href={"#"}>
              Profile
            </MenuItem>
            <MenuItem onClick={auth.logout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};
