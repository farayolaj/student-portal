import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { LOGIN } from "../../constants/routes";
import useAuth from "../../hooks/use-auth";
import { Header } from "./header";
import SchoolBoardSidebar from "./schoolboard-sidebar";
import { Sidebar } from "./sidebar";

export type LayoutProps = {
  show?: boolean;
  isAuthenticated?: boolean;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  show = true,
  isAuthenticated = true,
}) => {
  const [connectivityText, setConnectivityText] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const onOffline = () => {
      setConnectivityText(
        "You are currently offline. Please, connect to the internet."
      );
      setIsOnline(false);
    };
    const onOnline = () => {
      setConnectivityText("Nice! You are back online.");
      setIsOnline(true);
      setTimeout(() => setConnectivityText(""), 1500);
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  const { user, authToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !authToken) {
      router.push(LOGIN);
    }
  }, [isAuthenticated, authToken, router]);

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = useRef();

  let child: ReactNode;

  if (isAuthenticated && !user) child = null;
  else if (!show) child = children;
  else
    child = (
      <Flex pos="relative" direction="column">
        <Header />
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef as any}
          onClose={onClose}
          isCentered
          closeOnOverlayClick={false}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Important Notice
              </AlertDialogHeader>

              <AlertDialogBody sx={{ "& > p": { mt: 2 } }}>
                <p>
                  Payment of School Fees and Course Registration has effectively
                  closed{" "}
                  <Text as="span" fontWeight="semibold">
                    15th Sept., 2023
                  </Text>{" "}
                  for graduating students, and{" "}
                  <Text as="span" fontWeight="semibold">
                    17th Sept., 2023
                  </Text>{" "}
                  for returning students.
                </p>
                <p>
                  To pay for transactions in a smooth way, use Remita Inline on
                  the portal. Do not copy RRR to pay outside the portal remita
                  inline platform. If you are not prepared to pay, do not
                  initiate transaction: any initiated transaction must be
                  completed the same day for seamless user experience.
                </p>

                <p>Thank you.</p>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button mx="auto" ref={cancelRef as any} onClick={onClose}>
                  Okay
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Flex>
          <Sidebar />
          <Box
            h="calc(100vh - 4rem)"
            pos="relative"
            overflowY="auto"
            w="full"
            bg="gray.200"
            sx={{
              scrollbarGutter: [null, null, "stable"],
              "&::-webkit-scrollbar": {
                width: [null, null, "10px"],
              },
              "&::-webkit-scrollbar-track": {
                background: [null, null, "gray.200"],
              },
              "&::-webkit-scrollbar-thumb": {
                background: [null, null, "gray.400"],
                borderRadius: [null, null, "16px"],
              },
            }}
          >
            <Flex pos="relative" minH="full">
              <Box
                alignSelf="flex-start"
                as="main"
                w="100%"
                pos="sticky"
                top="0rem"
                p={6}
                pr={[null, null, 4]}
                pb={16}
              >
                {children}
              </Box>
              <SchoolBoardSidebar />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    );

  return (
    <>
      {child}
      {!!connectivityText && (
        <Box
          pos="fixed"
          bottom={0}
          w="full"
          p={2}
          textAlign="center"
          bg={isOnline ? "green" : "red"}
          color="white"
        >
          {connectivityText}
        </Box>
      )}
    </>
  );
};

export default Layout;
