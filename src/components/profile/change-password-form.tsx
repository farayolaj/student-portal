import {
  Heading,
  Box,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

export default function ChangePasswordForm() {
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
      <chakra.form display="flex" flexDir="column" gap={4}>
        <FormControl>
          <FormLabel>Current Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>New Password Again</FormLabel>
          <Input type="password" />
        </FormControl>
        <Button type="submit">Change Password</Button>
      </chakra.form>
    </Box>
  );
}
