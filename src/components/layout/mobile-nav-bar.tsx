import {
  useDisclosure,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Box,
} from "@chakra-ui/react";
import { IoMenuOutline } from "react-icons/io5";
import Navigation from "./navigation";

export default function MobileNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        display={["unset", null, "none"]}
        aria-label="Toggle navigation bar"
        size="lg"
        variant="transparent"
        icon={<IoMenuOutline size="2rem" />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          <DrawerBody>
            <Box mt={12}>
              <Navigation isOpen />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
