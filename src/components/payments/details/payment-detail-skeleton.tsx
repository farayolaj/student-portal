import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  SimpleGrid,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import { IoTime } from "react-icons/io5";

export default function PaymentDetailSkeleton() {
  return (
    <Box>
      <Flex
        direction={["column", null, "row"]}
        justify="space-between"
        align={[null, null, "center"]}
        rowGap={8}
      >
        <Flex direction="column" fontSize="xl">
          <SkeletonText
            mt={2}
            skeletonHeight="1.68rem"
            w="15rem"
            noOfLines={1}
          />
          <SkeletonText
            mt={2}
            skeletonHeight="2.5rem"
            w="9.8rem"
            noOfLines={1}
          />
          <SkeletonText
            mt={4}
            skeletonHeight="1.18rem"
            w="9rem"
            noOfLines={1}
          />
          <Flex gap={2} align="center" mt={4}>
            <IoTime color="orange" />
            <SkeletonText
              mt={2}
              skeletonHeight="1.4rem"
              w="3rem"
              noOfLines={1}
            />
          </Flex>
        </Flex>
        <Button paddingInline={16}>
          <Spinner color="white" />
        </Button>
      </Flex>
      <Heading as="h3" size="md" mt={6}>
        Items
      </Heading>
      <CheckboxGroup colorScheme="primary" isDisabled>
        <SimpleGrid
          columns={1}
          spacing={4}
          mt={4}
          color="blackAlpha.700"
          sx={{
            "& span[data-disabled]": {
              opacity: 1,
            },
          }}
        >
          <Checkbox isChecked isDisabled>
            <SkeletonText
              mt={2}
              skeletonHeight="1.4rem"
              w="9rem"
              noOfLines={1}
            />
          </Checkbox>
        </SimpleGrid>
      </CheckboxGroup>
    </Box>
  );
}
