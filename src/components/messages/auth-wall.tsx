import { LinkIcon } from "@chakra-ui/icons";
import { Center, Button } from "@chakra-ui/react";
import { useGapiAuth } from "../common/gapi-auth";

type AuthWallProps = {
  onAuth: () => void;
};

export default function AuthWall({ onAuth }: AuthWallProps) {
  const { isAuthorised, requestAuth } = useGapiAuth();

  if (isAuthorised) return null;

  return (
    <Center
      pos="absolute"
      w="full"
      h="calc(100% - 2rem)"
      top={0}
      left={0}
      backdropFilter="auto"
      backdropBlur="sm"
      backdropBrightness="40%"
    >
      <Button onClick={() => requestAuth({ onAuth })}>
        <LinkIcon mr={2} />
        <span>Connect School Email Address</span>
      </Button>
    </Center>
  );
}
