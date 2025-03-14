import { useProfile } from "@/api/user/use-profile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  chakra,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateBiodata } from "../../api/dashboard.mutations";

const disabilityData = [
  "Attention deficit hyperactivity disorder (ADHD)",
  "Autism",
  "Learning disability",
  "Mobility impairment",
  "Hearing impairment",
  "Neuroligical disorder",
  "Psychological disorder",
  "Physical disability",
  "Speech or language impairment",
  "Vision impairment",
  "None",
];

type FormState = {
  next_of_kin: string;
  next_of_kin_phone: string;
  next_of_kin_addr: string;
  gender: string;
  dob: string;
  disabilities: string[];
  otherDisabilities: string;
};

const initialFormState: FormState = {
  next_of_kin: "",
  next_of_kin_phone: "",
  next_of_kin_addr: "",
  gender: "",
  dob: "",
  disabilities: [],
  otherDisabilities: "",
};

const UpdateBioData = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const { data: profile } = useProfile({
    onSuccess(data) {
      setFormState((prevState) => ({
        ...prevState,
        gender: data.user.gender,
      }));
    },
  });

  const { mutate: submitForm } = useMutation({
    mutationFn: updateBiodata,
  });
  const toast = useToast();

  const handleCheckboxChange = (newValues: string[]) => {
    newValues = newValues.filter((value) => !!value);

    const newDisabilities: string[] = [];
    if (newValues.includes("None")) {
      newDisabilities.push("None");
    } else {
      newDisabilities.push(...newValues);
    }

    setFormState((prevState) => ({
      ...prevState,
      disabilities: newDisabilities,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitForm(
      {
        ...formState,
        disabilities: formState.otherDisabilities
          ? [...formState.disabilities, formState.otherDisabilities]
          : formState.disabilities,
      },
      {
        onSuccess: () => {
          toast({
            title: "BioData Update Form Submitted",
            description: "Your biodata form has been submitted",
            status: "success",
            isClosable: true,
          });
        },
        onError: (err) => {
          const error = err as Error;
          toast({
            title: "Error Submitting biodata Form",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        },
      }
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card
      height={"max-content"}
      background={"white"}
      display="flex"
      p={"1rem"}
      mt={"2rem"}
    >
      <CardHeader>
        <Heading as="h1" fontSize="md">
          Instruction: We kindly ask that you personally update your biodata to
          ensure all information is correct and up-to-date. Thank you.
        </Heading>
      </CardHeader>
      <CardBody>
        <chakra.form onSubmit={handleSubmit}>
          <Heading fontSize={"1rem"} pb={"1rem"}>
            Disabilities
          </Heading>
          <CheckboxGroup
            colorScheme="green"
            value={formState.disabilities}
            onChange={handleCheckboxChange}
          >
            <Stack
              direction={["column", "row"]}
              flexWrap={"wrap"}
              gap={"1.5rem"}
            >
              {disabilityData.map((item, index) => (
                <Checkbox
                  borderColor={"black"}
                  key={index}
                  value={item}
                  ml={"0rem !important"}
                >
                  {item}
                </Checkbox>
              ))}
              <FormControl w={"25rem"} display={"flex"} alignItems={"center"}>
                <FormLabel fontWeight={400} w={"max-content"}>
                  Other
                </FormLabel>
                <Input
                  focusBorderColor={"green"}
                  type="text"
                  borderColor={"black"}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      otherDisabilities: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Stack>
          </CheckboxGroup>

          <Heading fontSize={"1rem"} pb={"1rem"} pt={"2rem"}>
            Next of Kin
          </Heading>

          <HStack
            rowGap={"1rem"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            <FormControl w="47%">
              <FormLabel fontWeight={400} w={"max-content"}>
                Name
              </FormLabel>
              <Input
                type="text"
                name="next_of_kin"
                value={formState.next_of_kin}
                onChange={handleInputChange}
                isRequired
                borderColor={"black"}
              />
            </FormControl>
            <FormControl w={"47%"}>
              <FormLabel fontWeight={400} w={"max-content"}>
                Phone No.
              </FormLabel>
              <Input
                type="number"
                name="next_of_kin_phone"
                value={formState.next_of_kin_phone}
                onChange={handleInputChange}
                isRequired
                borderColor={"black"}
              />
            </FormControl>
            <FormControl w={"47%"} ml={"0rem !important"}>
              <FormLabel fontWeight={400} w={"max-content"}>
                Address
              </FormLabel>
              <Textarea
                name="next_of_kin_addr"
                value={formState.next_of_kin_addr}
                onChange={handleInputChange}
                isRequired
                borderColor={"black"}
              />
            </FormControl>
          </HStack>

          {profile && profile?.user.gender.length === 0 && (
            <>
              <Heading fontSize={"1rem"} pb={"1rem"} pt={"2rem"}>
                Gender
              </Heading>
              <RadioGroup
                colorScheme="green"
                value={formState.gender}
                onChange={(newGender) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    gender: newGender,
                  }))
                }
              >
                <Stack
                  flexWrap={"wrap"}
                  gap={"1.5rem"}
                  direction={["column", "row"]}
                >
                  <Radio ml={"0rem !important"} name="gender" value={"Male"}>
                    Male
                  </Radio>
                  <Radio ml={"0rem !important"} value={"Female"} name="gender">
                    Female
                  </Radio>
                </Stack>
              </RadioGroup>
            </>
          )}

          {profile && isNaN(profile.user.dob_new.valueOf()) && (
            <FormControl w={"45%"} mt={"2rem"}>
              <FormLabel fontWeight={700} w={"max-content"}>
                Date of Birth
              </FormLabel>
              <Input
                type="date"
                name="dob"
                value={formState.dob}
                onChange={handleInputChange}
              />
            </FormControl>
          )}

          <Button mt={"2rem"} type="submit" alignSelf={"flex-end"}>
            Submit Form
          </Button>
        </chakra.form>
      </CardBody>
    </Card>
  );
};

export default UpdateBioData;
