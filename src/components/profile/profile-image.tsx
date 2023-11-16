import { useProfile } from "@/api/user/use-profile";
import { useUpdateProfileImage } from "@/api/user/use-update-profile-picture";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ProfileImage() {
  const profile = useProfile();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [uploadedImg, setUploadedImg] = useState<string | undefined>(undefined);
  const updateProfile = useUpdateProfileImage({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile image updated successfully",
        status: "success",
        isClosable: true,
      });
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (err) => {
      if (uploadedImg) {
        URL.revokeObjectURL(uploadedImg);
        setUploadedImg(undefined);
      }

      const error = err as Error;
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    return () => {
      if (uploadedImg) URL.revokeObjectURL(uploadedImg);
    };
  }, [uploadedImg]);

  const onImageUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];

    if (!file) {
      toast({
        title: "Error",
        description: "No file was selected",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (file.size > 1024 * 100) {
      toast({
        title: "Error",
        description: "File size is too large. Ensure it is less than 100kb.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImg(imageUrl);

    updateProfile.mutate({
      file,
    });
  };

  return (
    <Flex justify="center" align="center">
      <Box w="fit-content" h="fit-content" pos="relative">
        <Box h="15rem" w="15rem" pos="relative">
          <Avatar
            rounded="md"
            size="full"
            src={profile.data?.user?.profileImage || uploadedImg}
          />
        </Box>
        {updateProfile.isLoading && (
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
            <Spinner size={"xl"} thickness="5px" color="primary.500" />
          </Flex>
        )}
        {!profile.data?.user?.profileImage && !uploadedImg && (
          <Flex
            as="label"
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
            <Button as="label" size="sm" isDisabled={updateProfile.isLoading}>
              <Input
                type="file"
                accept="image/*"
                srOnly
                onChange={onImageUpload}
                isDisabled={updateProfile.isLoading}
              />
              Upload Image
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}
