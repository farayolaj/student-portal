import { VStack, Text, Link, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IconType } from "react-icons/lib";
import {
  IoHomeOutline,
  IoBookOutline,
  IoDocumentsOutline,
  IoDocumentTextOutline,
  IoReceiptOutline,
  IoPersonOutline,
  IoCalendarOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import * as routes from "../../constants/routes";

type NavigationProps = {
  isOpen: boolean;
};

const Navigation: FC<NavigationProps> = ({ isOpen }) => {
  const { pathname } = useRouter();

  return (
    <VStack align="flex-start" gap={2} px={0} mx={0}>
      <NavLink
        title="Dashboard"
        icon={IoHomeOutline}
        href={routes.HOME}
        isOpen={isOpen}
        isActive={pathname === routes.HOME}
      />
      <NavLink
        title="Courses"
        icon={IoBookOutline}
        href={routes.REGISTERED_COURSES}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.REGISTERED_COURSES)}
      />
      <NavLink
        title="Mobile Class LMS"
        icon={IoPhonePortraitOutline}
        href="https://dlclms.ui.edu.ng"
        isOpen={isOpen}
        isActive={false}
        isExternal
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
        title="Events"
        icon={IoCalendarOutline}
        href={routes.EVENTS}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.EVENTS)}
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
};

const NavLink: FC<NavLinkProps> = ({
  title,
  href,
  icon,
  isOpen,
  isActive,
  isExternal,
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
    </Link>
  );
};
