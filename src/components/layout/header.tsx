import { useProfile } from "@/api/user/use-profile";
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
import { useAuth } from "oidc-react";
import { FC } from "react";
import { MdArrowDropDown } from "react-icons/md";
import logo from "../../images/ui-logo.png";
import { NotificationBox } from "../common/notification-box";
import MobileCalendar from "./mobile-calendar";
import MobileNavBar from "./mobile-nav-bar";

export const Header: FC = () => {
  const auth = useAuth();
  const profile = useProfile();
  const user = profile.data?.user;
  const fullName = `${user?.lastName.toUpperCase()}, ${user?.firstName} ${
    user?.otherNames || ""
  }`.replace("undefined", "");

  // const { data: universityRoomLink } = useQuery(
  //   userQueries.universityRoomLink()
  // );

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
        <Flex direction="column">
          <Text
            display={["none", null, "initial"]}
            as="span"
            fontSize="lg"
            fontWeight="bold"
          >
            Distance Learning Centre
          </Text>
          <Text
            display={["none", null, "initial"]}
            as="span"
            fontSize="sm"
            fontWeight="semibold"
          >
            University of Ibadan
          </Text>
        </Flex>
      </Flex>
      <Spacer h="min-content" />
      <Flex gap={4} align="center">
        {/* {universityRoomLink && (
          <IconButton
            aria-label="Open university common room"
            icon={<Icon as={IoChatbubbleOutline} boxSize={6} />}
            variant="ghost"
            size="lg"
            isDisabled={!universityRoomLink}
            onClick={() =>
              universityRoomLink && window.open(universityRoomLink, "_blank")
            }
            data-tour-id="university-room-btn"
          />
        )} */}
        <MobileCalendar />
        <NotificationBox />
        <Menu>
          <MenuButton>
            <HStack>
              {auth.isLoading ? (
                <SkeletonText />
              ) : (
                <Text display={["none", null, "initial"]}>{fullName}</Text>
              )}
              <SkeletonCircle isLoaded={!auth.isLoading}>
                <Avatar
                  name={fullName}
                  size="sm"
                  src={user?.profileImage}
                  getInitials={(name) => {
                    const names = name
                      .split(" ")
                      .filter((name) => Boolean(name));
                    const initials = `${names[0].at(0)}${names
                      .at(-1)
                      ?.at(0)}`.toUpperCase();
                    return initials;
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
            <MenuItem onClick={() => auth.signOutRedirect()}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};
