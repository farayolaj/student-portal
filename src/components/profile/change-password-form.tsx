import { useChangePassword } from "@/api/auth/use-change-password";
import {
  Heading,
  Box,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const { mutate: changePassword } = useChangePassword();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== newPasswordAgain) return;

    changePassword(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setNewPasswordAgain("");
          toast({
            title: "Password Updated",
            description: "Your password has been changed successfully",
            status: "success",
            isClosable: true,
          });
        },
        onError: (err) => {
          const error = err as Error;
          toast({
            title: "Error Updating Password",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Box>
      <Heading
        as="h3"
        size="sm"
        mb={4}
        textTransform="uppercase"
        color="gray.500"
        fontWeight="extrabold"
        fontSize="sm"
      >
        Change Password
      </Heading>
      <chakra.form
        display="flex"
        flexDir="column"
        gap={4}
        onSubmit={handleSubmit}
      >
        <FormControl isRequired>
          <FormLabel>Current Password</FormLabel>
          <Input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
          />
        </FormControl>
        <FormControl isInvalid={newPassword !== newPasswordAgain} isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </FormControl>
        <FormControl isInvalid={newPassword !== newPasswordAgain} isRequired>
          <FormLabel>New Password Again</FormLabel>
          <Input
            type="password"
            value={newPasswordAgain}
            onChange={(e) => setNewPasswordAgain(e.target.value)}
            autoComplete="new-password"
          />
          <FormErrorMessage>Ensure new passwords are the same</FormErrorMessage>
        </FormControl>
        <Button type="submit">Change Password</Button>
      </chakra.form>
    </Box>
  );
}
