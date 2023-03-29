import { useUpdateProfile } from "@/api/user/use-update-profile";
import {
  Flex,
  useToast,
  Modal,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  chakra,
} from "@chakra-ui/react";
import { useState } from "react";
import isMobile from "validator/lib/isMobilePhone";
import isEmail from "validator/lib/isEmail";

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    phone: string;
    alternativeEmail: string;
  };
  onSuccess: () => void;
};

export default function EditProfileModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: EditProfileModalProps) {
  const { mutate: updateProfile } = useUpdateProfile();
  const toast = useToast();

  const [phone, setPhone] = useState(initialData.phone);
  const [alternativeEmail, setAlternativeEmail] = useState(
    initialData.alternativeEmail
  );

  const handleUpdateProfile = () => {
    if (!isMobile(phone || "", "en-NG")) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        status: "error",
        isClosable: true,
      });
    } else if (!isEmail(alternativeEmail || "")) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address",
        status: "error",
        isClosable: true,
      });
    } else {
      updateProfile(
        { phone, alternativeEmail },
        {
          onSuccess: () => {
            toast({
              title: "Profile updated",
              description: "Your profile has been updated successfully",
              status: "success",
              isClosable: true,
            });
            onSuccess();
            onClose();
          },
          onError: (err) => {
            const error = err as Error;
            toast({
              title: "Error updating profile",
              description: error.message,
              status: "error",
              isClosable: true,
            });
          },
        }
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <chakra.form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProfile();
            }}
          >
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={!isMobile(phone || "", "en-NG")}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Alternative Email</FormLabel>
              <Input
                type="email"
                value={alternativeEmail}
                onChange={(e) => setAlternativeEmail(e.target.value)}
                isInvalid={!isEmail(alternativeEmail || "")}
              />
            </FormControl>
            <Flex justify="center" mt={8} mb={4}>
              <Button type="submit">Update Profile</Button>
            </Flex>
          </chakra.form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
