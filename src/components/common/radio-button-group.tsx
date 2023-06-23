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
  isEachDisabled?: boolean[];
} & Omit<RadioGroupProps, "children">;

const RadioButtonGroup: FC<RadioButtonGroupProps> = (props) => {
  const { getRootProps, getRadioProps, htmlProps } = useRadioGroup(props);

  const group = getRootProps();

  return (
    <HStack
      bg="white"
      spacing={0}
      divider={
        <StackDivider
          style={{
            marginTop: "8px",
            marginBottom: "8px",
          }}
        />
      }
      borderRadius="md"
      align="stretch"
      w="fit-content"
      h="fit-content"
      {...htmlProps}
      {...group}
    >
      {props.values.map((value, idx) => {
        const radio = getRadioProps({ value });
        return (
          <RadioButton
            key={value}
            {...radio}
            isDisabled={props.isEachDisabled?.at(idx)}
          >
            {props.options ? props.options[idx] : props.labels[idx]}
          </RadioButton>
        );
      })}
    </HStack>
  );
};

export default RadioButtonGroup;

const RadioButton: FC<RadioProps> = (props) => {
  const { getInputProps, getRadioProps, getLabelProps } = useRadio(props);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box
      as="label"
      display="contents"
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
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        {...radio}
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
        _disabled={{
          bg: "gray",
          color: "white",
        }}
        px={4}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};
