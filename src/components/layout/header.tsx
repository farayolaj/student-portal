import { PROFILE } from "@/constants/routes";
import {
  Avatar,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";
import { MdArrowDropDown } from "react-icons/md";
import useAuth from "../../hooks/use-auth";
import logo from "../../images/ui-logo.png";
import MobileCalendar from "./mobile-calendar";
import MobileNavBar from "./mobile-nav-bar";

export const Header: FC = () => {
  const auth = useAuth();
  const user = auth.user;
  const fullName = `${user?.firstName} ${user?.otherNames || ""} ${
    user?.lastName
  }`.replace("undefined", "");

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
        <MobileNavBar />
        <Image height={48} src={logo} alt="Logo" />
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
      <Flex gap={8} align="center">
        <MobileCalendar />
        <Menu>
          <MenuButton>
            <HStack>
              {auth.isLoggingIn ? (
                <SkeletonText />
              ) : (
                <Text display={["none", null, "initial"]}>{fullName}</Text>
              )}
              <SkeletonCircle isLoaded={!auth.isLoggingIn}>
                <Avatar
                  name={fullName}
                  size="sm"
                  src={user?.profileImage}
                  getInitials={(name) => {
                    const names = name.split(" ");
                    return `${names[0].at(0)}${names
                      .at(-1)
                      ?.at(0)}`.toUpperCase();
                  }}
                />
              </SkeletonCircle>
              <Icon as={MdArrowDropDown} />
            </HStack>
          </MenuButton>
          <MenuList
            boxShadow="md"
            sx={{ "& > *:hover": { bgColor: "primary.200" } }}
          >
            <MenuItem as={NextLink} href={PROFILE}>
              Profile
            </MenuItem>
            <MenuItem onClick={auth.logout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};
