import { IconButton, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IoDownloadOutline } from "react-icons/io5";

type CourseMaterialDownloadProps = {
  link: string;
  yPlacement?: "top" | "bottom";
  xPlacement?: "left" | "right";
  includeText?: boolean;
};

const CourseMaterialDownload: FC<CourseMaterialDownloadProps> = ({
  link,
  yPlacement,
  xPlacement,
  includeText = false,
}) => {
  const placement: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } = {};

  placement[yPlacement || "top"] = 4;
  placement[xPlacement || "right"] = 4;

  return (
    <Link
      href={link}
      pos="absolute"
      {...placement}
      p={2}
      zIndex={100}
      lineHeight={0}
      display="inline-flex"
      gap={4}
      alignItems="center"
      title="Download course material"
      isExternal
    >
      {includeText && <Text as="span">Download Course Material</Text>}
      <IconButton
        aria-label="Download course material"
        role="presentation"
        icon={<IoDownloadOutline />}
        size="sm"
        p={1}
      />
    </Link>
  );
};

export default CourseMaterialDownload;
