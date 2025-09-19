import { LMS_LOGIN_URL } from "@/constants/config";
import { Badge, Icon, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  IoCalendarOutline,
  IoDocumentsOutline,
  IoDocumentTextOutline,
  IoHomeOutline,
  IoLibraryOutline,
  IoPersonOutline,
  IoPhonePortraitOutline,
  IoReceiptOutline,
  IoShieldCheckmarkOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { IconType } from "react-icons/lib";
import * as routes from "../../constants/routes";

type NavigationProps = {
  isOpen: boolean;
};

const Navigation: FC<NavigationProps> = ({ isOpen }) => {
  const { pathname } = useRouter();

  // const { data: universityRoomLink } = useQuery(
  //   userQueries.universityRoomLink()
  // );

  return (
    <VStack align="flex-start" gap={2} px={0} mx={0}>
      <NavLink
        title="Dashboard"
        icon={IoHomeOutline}
        href={routes.DASHBOARD}
        isOpen={isOpen}
        isActive={pathname === routes.DASHBOARD}
      />
      {/* {universityRoomLink && (
        <NavLink
          title="Common Room"
          icon={IoChatbubbleOutline}
          href={universityRoomLink}
          isOpen={isOpen}
          isActive={false}
          badge="New"
          isExternal
        />
      )} */}
      <NavLink
        title="Verify Result"
        icon={IoShieldCheckmarkOutline}
        href={routes.VERIFY_RESULT}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.VERIFY_RESULT)}
      />
      <NavLink
        title="Course Registration"
        icon={IoLibraryOutline}
        href={routes.COURSE_REGISTRATION}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.COURSE_REGISTRATION)}
      />
      <NavLink
        title="Bookstore"
        icon={IoStorefrontOutline}
        href={routes.BOOK_STORE}
        isOpen={isOpen}
        badge="New"
        isActive={pathname.startsWith(routes.BOOK_STORE)}
      />
      <NavLink
        title="Mobile Class SSO"
        icon={IoPhonePortraitOutline}
        href={LMS_LOGIN_URL}
        isOpen={isOpen}
        isActive={false}
        badge="New"
        isExternal
      />
      <NavLink
        title="Events"
        icon={IoCalendarOutline}
        href={routes.EVENTS}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.EVENTS)}
      />
      <NavLink
        title="Results"
        icon={IoDocumentTextOutline}
        href={routes.RESULTS}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.RESULTS)}
      />
      <NavLink
        title="Payments"
        icon={IoReceiptOutline}
        href={routes.PAYMENTS}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.PAYMENTS)}
      />
      <NavLink
        title="Documents"
        icon={IoDocumentsOutline}
        href={routes.DOCUMENTS}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.DOCUMENTS)}
      />
      <NavLink
        title="Profile"
        icon={IoPersonOutline}
        href={routes.PROFILE}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.PROFILE)}
      />
    </VStack>
  );
};

export default Navigation;

type NavLinkProps = {
  title: string;
  href: string;
  icon: IconType;
  isOpen: boolean;
  isActive: boolean;
  isExternal?: boolean;
  badge?: string;
};

const NavLink: FC<NavLinkProps> = ({
  title,
  href,
  icon,
  isOpen,
  isActive,
  isExternal,
  badge,
}) => {
  return (
    <Link
      bg={isActive ? "primary.100" : "transparent"}
      w="full"
      py={2}
      px={2}
      as={NextLink}
      display="inline-flex"
      justifyContent={isOpen ? "initial" : "center"}
      alignItems="center"
      gap={2}
      href={href}
      color="initial"
      _hover={{ textDecoration: "none", bg: "primary.50" }}
      isExternal={isExternal}
    >
      <Icon as={icon} boxSize="1.5em" title={title} aria-label={title} />
      <Text as="span" display={isOpen ? "unset" : "none"}>
        {title}
      </Text>
      {badge && (
        <Badge colorScheme="primary" variant={"solid"}>
          {badge}
        </Badge>
      )}
    </Link>
  );
};
