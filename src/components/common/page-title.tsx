import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

type PageTitleProps = {
  /**
   * @default false
   */
  showBackButton?: boolean;
};

const PageTitle: FC<PropsWithChildren<PageTitleProps>> = ({
  children,
  showBackButton = false,
}) => {
  const router = useRouter();

  return (
    <Flex align="center" gap={2} mb={6}>
      {showBackButton && (
        <IconButton
          aria-label="Go back"
          size="lg"
          variant="transparent"
          icon={<IoArrowBackOutline size="1.5rem" />}
          onClick={() => router.back()}
        />
      )}
      <Heading as="h1" size="md" fontWeight="bold">
        {children}
      </Heading>
    </Flex>
  );
};

export default PageTitle;
