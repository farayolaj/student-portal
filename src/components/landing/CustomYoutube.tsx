import React, { useState } from "react";
import { Box, AspectRatio, IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

interface CustomYouTubePlayerProps {
  videoId: string;
}

const CustomYouTubePlayer: React.FC<CustomYouTubePlayerProps> = ({
  videoId,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = (): void => {
    setIsPlaying(true);
  };

  return (
    <Box
      position="relative"
      borderRadius="1rem"
      overflow="hidden"
      boxShadow="lg"
      bg="black"
    //   maxW="800px"
      width={"45%"}
      mx="auto"
    >
      {!isPlaying ? (
        <Box
          position="relative"
          width="100%"
          paddingBottom="56.25%" 
          bg="black"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            aria-label="Play video"
            icon={<FaPlay />}
            isRound
            size="lg"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="gray.300"
            color="black"
            _hover={{ bg: "gray.400" }}
            onClick={handlePlay}
          />
        </Box>
      ) : (
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={videoId}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      )}
    </Box>
  );
};

export default CustomYouTubePlayer;
