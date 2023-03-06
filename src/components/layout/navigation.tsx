import { VStack, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  IoHomeOutline,
  IoBookOutline,
  IoDocumentTextOutline,
  IoReceiptOutline,
  IoCardOutline,
  IoCalendarOutline,
  IoPersonOutline,
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
        title="Results"
        icon={IoDocumentTextOutline}
        href="#"
        isOpen={isOpen}
        isActive={pathname.startsWith("#")}
      />
      <NavLink
        title="Payments"
        icon={IoReceiptOutline}
        href={routes.PAYMENTS}
        isOpen={isOpen}
        isActive={pathname.startsWith(routes.PAYMENTS)}
      />
      <NavLink
        title="Transactions"
        icon={IoCardOutline}
        href="#"
        isOpen={isOpen}
        isActive={pathname.startsWith("#")}
      />
      <NavLink
        title="Calendar"
        icon={IoCalendarOutline}
        href="#"
        isOpen={isOpen}
        isActive={pathname.startsWith("#")}
      />
      <NavLink
        title="Profile"
        icon={IoPersonOutline}
        href="#"
        isOpen={isOpen}
        isActive={pathname.startsWith("#")}
      />
    </VStack>
  );
};

export default Navigation;

type NavLinkProps = {
  title: string;
  href: string;
  icon: FC<{ size: string; "aria-label": string }>;
  isOpen: boolean;
  isActive: boolean;
};

const NavLink: FC<NavLinkProps> = ({ title, href, icon, isOpen, isActive }) => {
  const Component = icon;
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
    >
      <Component size="1.5em" aria-label={title} />
      <Text as="span" display={isOpen ? "unset" : "none"}>
        {title}
      </Text>
    </Link>
  );
};
