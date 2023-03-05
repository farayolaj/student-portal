import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Navigation from "./navigation";

export const Sidebar: FC = () => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <Flex
      display={["none", null, "flex"]}
      bg="white"
      as="aside"
      minW={isOpen ? "15%" : "unset"}
      flexDir="column"
      gap={8}
      boxShadow="lg"
      py={6}
    >
      <Flex justify="center" px={2}>
        <IconButton
          aria-label="Toggle navigation bar"
          size="lg"
          variant="transparent"
          icon={<IoMenuOutline size="2rem" />}
          onClick={onToggle}
        />
      </Flex>
      <Navigation isOpen={isOpen} />
    </Flex>
  );
};
