import {
  Box,
  HStack,
  RadioGroupProps,
  RadioProps,
  StackDivider,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type RadioButtonGroupProps = {
  labels: string[];
  options?: ReactNode[];
  values: (string | number)[];
} & Omit<RadioGroupProps, "children">;

const RadioButtonGroup: FC<RadioButtonGroupProps> = (props) => {
  const { getRootProps, getRadioProps } = useRadioGroup(props);

  const group = getRootProps();

  return (
    <HStack
      bg="white"
      spacing={0}
      divider={<StackDivider />}
      borderRadius="md"
      align="stretch"
      w="fit-content"
      h="fit-content"
      {...group}
    >
      {props.values.map((value, idx) => {
        const radio = getRadioProps({ value });
        return (
          <RadioButton key={value} {...radio}>
            {props.options ? props.options[idx] : props.labels[idx]}
          </RadioButton>
        );
      })}
    </HStack>
  );
};

export default RadioButtonGroup;

const RadioButton: FC<RadioProps> = (props) => {
  const { getInputProps, getCheckboxProps, getLabelProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      as="label"
      {...getLabelProps()}
      _first={{
        "& > div": {
          borderLeftRadius: "md",
        },
      }}
      _last={{
        "& > div": {
          borderRightRadius: "md",
        },
      }}
      h="full"
    >
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        _checked={{
          bg: "primary.500",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        _hover={{
          bg: "primary.50",
          _checked: {
            bg: "primary.500",
          },
        }}
        px={4}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};
