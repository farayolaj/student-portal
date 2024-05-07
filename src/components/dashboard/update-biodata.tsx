import { useBiodataUpdate } from "@/api/dashboard/use-biodata-update";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  chakra,
  CheckboxGroup,
  Checkbox,
  Stack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Textarea,
  RadioGroup,
  Radio,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

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
  "Not applicable (NA)",
];

type FormState = {
  next_of_kin: string;
  next_of_kin_phone: string;
  next_of_kin_addr: string;
  gender: string;
  dob: string;
  disabilities: string[];
};

const initialFormState: FormState = {
  next_of_kin: "",
  next_of_kin_phone: "",
  next_of_kin_addr: "",
  gender: "",
  dob: "",
  disabilities: [],
};

const UpdateBioData = () => {
  const [selectedDisabilities, setSelectedDisabilities] = useState<string[]>(
    []
  );

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [otherDis, setOtherDis] = useState<any>();

  const { mutate: submitForm } = useBiodataUpdate();
  const toast = useToast();
  const router = useRouter();

  const handleCheckboxChange = (item: string, e: any) => {
    if (item === "Not applicable (NA)") {
      setSelectedDisabilities(["Not applicable (NA)"]);
    } else {
      setSelectedDisabilities((prevSelected) => {
        if (prevSelected.includes("Not applicable (NA)")) {
          return [item];
        } else {
          if (prevSelected.includes(item)) {
            return prevSelected.filter((selectedItem) => selectedItem !== item);
          } else {
            return [...prevSelected, item];
          }
        }
      });
    }

    setFormState((prevState) => ({
      ...prevState,
      disabilities: selectedDisabilities,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitForm(formState, {
      onSuccess: () => {
        toast({
          title: "BioData Update Form Submitted",
          description: "Your biodata form has been submitted",
          status: "success",
          isClosable: true,
        });
        setFormState(initialFormState);
        // router.reload();
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
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      disabilities: selectedDisabilities,
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
          Student Biodata Update
        </Heading>
      </CardHeader>
      <CardBody>
        <chakra.form onSubmit={handleSubmit}>
          <Heading fontSize={"1rem"} pb={"1rem"}>
            Disabilities
          </Heading>
          <CheckboxGroup colorScheme="green">
            <Stack
              direction={["column", "row"]}
              flexWrap={"wrap"}
              gap={"1.5rem"}
            >
              {disabilityData.map((item, index) => (
                <Checkbox
                  key={index}
                  value={item}
                  ml={"0rem !important"}
                  onChange={(e) => handleCheckboxChange(item, e)}
                >
                  {item}
                </Checkbox>
              ))}
              <FormControl w={"25rem"} display={"flex"} alignItems={"center"}>
                <FormLabel fontWeight={400} w={"max-content"}>
                  Others
                </FormLabel>
                <Input
                  focusBorderColor={"green"}
                  type="text"
                  onChange={(e) => setOtherDis(e.target.value)}
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
              />
            </FormControl>
          </HStack>

          <Heading fontSize={"1rem"} pb={"1rem"} pt={"2rem"}>
            Gender
          </Heading>

          <RadioGroup colorScheme="green">
            <Stack
              flexWrap={"wrap"}
              gap={"1.5rem"}
              direction={["column", "row"]}
            >
              <Radio
                onChange={handleInputChange}
                ml={"0rem !important"}
                name="gender"
                value={"Male"}
              >
                Male
              </Radio>
              <Radio
                ml={"0rem !important"}
                onChange={handleInputChange}
                value={"Female"}
                name="gender"
              >
                Female
              </Radio>
            </Stack>
          </RadioGroup>

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

          <Button mt={"2rem"} type="submit" alignSelf={"flex-end"}>
            Submit Form
          </Button>
        </chakra.form>
      </CardBody>
    </Card>
  );
};

export default UpdateBioData;
