import { Box, Icon, Link } from "@chakra-ui/react";
import { FC } from "react";
import { IoDownloadOutline } from "react-icons/io5";

type CourseMaterialDownloadProps = {
  link: string;
};

const CourseMaterialDownload: FC<CourseMaterialDownloadProps> = ({ link }) => {
  return (
    <Link
      variant="button"
      href={link}
      pos="absolute"
      top={4}
      right={4}
      p={2}
      zIndex={100}
      lineHeight={0}
      colorScheme="primary"
      title="Download course material"
      isExternal
    >
      <Icon as={IoDownloadOutline} boxSize={6} />
    </Link>
  );
};

export default CourseMaterialDownload;
