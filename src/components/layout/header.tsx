import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export const Header: FC = () => {
  return (
    <HStack
      position="sticky"
      top="0px"
      zIndex={999}
      as="header"
      bg="white"
      py={4}
      px={8}
      borderBottom="1px"
      borderColor="blackAlpha.300"
      h="5rem"
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
      <Spacer />
      <Flex gap={8}>
        <IconButton
          aria-label="Check Notifications"
          size="lg"
          variant="transparent"
          icon={<IoNotificationsOutline size="2rem" />}
        />
        <HStack>
          <Text display={["none", null, "initial"]}>Adamu Olatunji Ciroma</Text>
          <Avatar name="Adamu Olatunji Ciroma" size="md" />
        </HStack>
      </Flex>
    </HStack>
  );
};
