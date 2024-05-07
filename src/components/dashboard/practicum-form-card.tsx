import { usePracticumEligibility } from "@/api/dashboard/use-practicum-form-eligibility";
import { usePracticumRequestForm } from "@/api/dashboard/use-praticum-form-submit";
import { useDownloadDocument } from "@/api/document/use-download-document";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Textarea,
  Text,
  Badge,
  Box,
  HStack,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

type FormState = {
  schoolLocationDesc: string;
  schoolContact: string;
  schoolState: string;
  schoolPhone: string;
  schoolName: string;
  schoolCity: string;
  schoolLGA: string;
};

const initialFormState: FormState = {
  schoolLocationDesc: "",
  schoolContact: "",
  schoolState: "",
  schoolPhone: "",
  schoolName: "",
  schoolCity: "",
  schoolLGA: "",
};

const PraticumFormCard = () => {
  const toast = useToast();
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const { mutate: submitForm } = usePracticumRequestForm();

  const { data: eligibility } = usePracticumEligibility();
  const { intiateFetch, isLoading } = useDownloadDocument({
    url: eligibility?.payload?.print_url,
    onError: (error) => {
      toast({
        title: error.message,
        description: `Practicum form could not be downloaded. Please try again later.`,
        status: "error",
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitForm(formState, {
      onSuccess: () => {
        toast({
          title: "Practicum Form Submitted",
          description: "Your practicum form has been submitted",
          status: "success",
          isClosable: true,
        });
        setFormState(initialFormState);
        router.reload();
      },
      onError: (err) => {
        const error = err as Error;
        toast({
          title: "Error Submitting Practicum Form",
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
    }));
  };

  const DisplaySupervisor = ({ practicumForm } : any) => {
    return (
      <>
        <Card
        height={"max-content"}
        background={"white"}
        display="flex"
        p={"1rem"}
        mt={"2rem"}
        >
          <CardHeader>
            <Heading as="h2" fontSize="md">
              {`${practicumForm?.course_code}`} Practicum Form
            </Heading>
          </CardHeader>
          <CardBody>
            <Box mb="1">
              <HStack>
                <Text fontSize="md" fontWeight="600">Approved Practicum School:</Text>
                <span>{practicumForm?.approved_practicum_school}</span> 
              </HStack>
            </Box>
            <Box>
              <HStack>
                <Text fontSize="md" fontWeight="600">Supervisor:</Text>
                <span>{practicumForm?.approved_supervisor}</span> 
              </HStack>
            </Box>

            {
              practicumForm?.print_url && practicumForm?.print_url.length > 0 && (
                <Box>
                  <Text>
                    Click the link to download your document { }
                    <Badge colorScheme="green" p="2" borderRadius="md">
                      <Link href="#" onClick={() => intiateFetch()}> Practicum Letter</Link>
                    </Badge>
                  </Text>
                </Box>
              )
            }
            
          </CardBody>
        </Card>
      </>
    )
  }

  return (
    <>
      {
        eligibility?.status && eligibility?.payload?.is_submitted && (
          <DisplaySupervisor practicumForm={eligibility?.payload} />
        )
      }
      
      <Card
        height={"max-content"}
        background={"white"}
        display={
          eligibility?.status && !eligibility?.payload?.is_submitted
            ? "flex"
            : "none"
        }
        p={"1rem"}
        mt={"2rem"}
      >
        <CardHeader>
          <Heading as="h2" fontSize="md">
            {`${eligibility?.payload.course_code}`} Practicum Form
          </Heading>
        </CardHeader>
        <CardBody>
          <chakra.form
            justifyContent={"space-between"}
            onSubmit={handleSubmit}
            alignItems={"center"}
            flexWrap={"wrap"}
            display={"flex"}
            rowGap={"2rem"}
          >
            <FormControl isRequired w={"47%"}>
              <FormLabel>Proposed School Name</FormLabel>
              <Input
                type="text"
                name="schoolName"
                value={formState.schoolName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired w={"47%"}>
              <FormLabel>Proposed School Contact Address</FormLabel>
              <Textarea
                name="schoolContact"
                value={formState.schoolContact}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired w={"45%"}>
              <FormLabel>Proposed School City</FormLabel>
              <Input
                type="text"
                name="schoolCity"
                value={formState.schoolCity}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired w={"47%"}>
              <FormLabel>Proposed School Local Government</FormLabel>
              <Input
                type="text"
                name="schoolLGA"
                value={formState.schoolLGA}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired w={"47%"}>
              <FormLabel>Proposed School State</FormLabel>
              <Input
                type="text"
                name="schoolState"
                value={formState.schoolState}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired w={"47%"}>
              <FormLabel>Proposed School Location Description</FormLabel>
              <Textarea
                name="schoolLocationDesc"
                value={formState.schoolLocationDesc}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl isRequired w={"47%"}>
              <FormLabel>Student Active Telephone Number</FormLabel>
              <Input
                type="number"
                name="schoolPhone"
                value={formState.schoolPhone}
                onChange={handleInputChange}
              />
            </FormControl>

            <Button type="submit" alignSelf={"flex-end"}>
              Submit Form
            </Button>
          </chakra.form>
        </CardBody>
      </Card>
    </>
    
  );
};

export default PraticumFormCard;
