import useAuth from "@/hooks/use-auth";
import { Flex, Avatar, Box, Input, Button } from "@chakra-ui/react";

export default function ProfileImage() {
  const auth = useAuth();

  return (
    <Flex justify="center" align="center">
      <Box w="fit-content" h="fit-content" pos="relative">
        <Box h="15rem" w="15rem" pos="relative">
          <Avatar rounded="md" size="full" src={auth.user?.profileImage} />
        </Box>
        {!auth.user?.profileImage && (
          <Flex
            w="full"
            h="full"
            pos="absolute"
            top={0}
            left={0}
            justify="center"
            align="center"
            backdropFilter="auto"
            backdropBlur="sm"
          >
            <Input type="file" srOnly />
            <Button size="sm">Upload Image</Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
