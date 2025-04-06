import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Flex,
  Divider,
} from "@chakra-ui/react";
import beach from "../images/home/beach.png";
import resort from "../images/home/6.png";
import rock from "../images/home/4.png";
import car from "../images/home/5.png";
import Seo from "../components/common/seo";
import PageTitle from "../components/common/page-title";

interface CourseMaterial {
  id: string;
  title: string;
  description: string;
  imageUrl: StaticImageData;
  isGES: boolean;
}

const Bookstore: React.FC = () => {
  const [materials, setMaterials] = useState<CourseMaterial[]>([
    {
      id: "1",
      title: "CSC 101",
      description: "Introduction to Computer Science",
      imageUrl: rock,
      isGES: false,
    },
    {
      id: "2",
      title: "PHY 102",
      description: "Fundamentals of Physics",
      imageUrl: beach,
      isGES: false,
    },
    {
      id: "3",
      title: "GES 101",
      description: "Use of English and Communication Skills",
      imageUrl: car,
      isGES: true,
    },
    {
      id: "4",
      title: "CHM 103",
      description: "General Chemistry",
      imageUrl: resort,
      isGES: false,
    },
    {
      id: "5",
      title: "GES 201",
      description: "Entrepreneurship and Innovation",
      imageUrl: rock,
      isGES: true,
    },
    {
      id: "6",
      title: "BIO 104",
      description: "Introduction to Biological Sciences",
      imageUrl: resort,
      isGES: false,
    },
    {
      id: "7",
      title: "GES 201",
      description: "Entrepreneurship and Innovation",
      imageUrl: rock,
      isGES: true,
    },
    {
      id: "8",
      title: "BIO 104",
      description: "Introduction to Biological Sciences",
      imageUrl: beach,
      isGES: false,
    },
  ]);

  const [selectedMaterials, setSelectedMaterials] = useState<
    Record<string, { material: CourseMaterial; quantity: number }>
  >({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleMaterialSelect = (
    material: CourseMaterial,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedMaterials((prev) => ({
        ...prev,
        [material.id]: { material, quantity: 1 },
      }));
    } else {
      const newSelected = { ...selectedMaterials };
      delete newSelected[material.id];
      setSelectedMaterials(newSelected);
    }
  };

  const handleQuantityChange = (materialId: string, value: string) => {
    const quantity = parseInt(value) || 0;
    if (quantity < 1) return;

    setSelectedMaterials((prev) => ({
      ...prev,
      [materialId]: {
        ...prev[materialId],
        quantity,
      },
    }));
  };

  const calculateSubtotal = () => {
    return Object.values(selectedMaterials).reduce(
      (total, { material, quantity }) => {
        const price = material.isGES ? 2000 : 800;
        return total + price * quantity;
      },
      0
    );
  };

  const calculateServiceCharge = () => {
    const subtotal = calculateSubtotal();
    return subtotal === 0 ? 0 : subtotal + 505;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceCharge();
  };

  const handleCheckout = () => {
    onOpen();
  };

  const confirmPurchase = () => {
    onClose();
    toast({
      title: "Purchase Successful",
      description: "Your course materials have been ordered.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setSelectedMaterials({});
  };

  return (
    <>
      <Seo title="Registered Courses" />
      <PageTitle showBackButton>Registered Courses</PageTitle>
      <Flex p={6} gap={6} direction={"column"}>
        <Box flex={1}>
          <Box display={"flex"} gap="1rem" justifyContent={"space-between"}>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {materials.map((material) => (
                <GridItem key={material.id}>
                  <Card
                    variant="outline"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                  >
                    <CardBody flex={1} p="1rem">
                      <Box
                        position="relative"
                        height="180px"
                        width="100%"
                        mb={4}
                      >
                        <Image
                          src={material.imageUrl}
                          alt={material.title}
                          fill
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                      </Box>
                      <Stack spacing="3">
                        <Heading size="md" fontWeight={"semibold"}>
                          {material.title}
                          {material.isGES && (
                            <Badge ml={2} colorScheme="purple">
                              GES
                            </Badge>
                          )}
                        </Heading>
                        <Text>{material.description}</Text>
                        <Text color="green" fontWeight={"bold"} fontSize="lg">
                          ₦{material.isGES ? "2,000" : "800"}
                        </Text>
                      </Stack>
                    </CardBody>
                    <CardFooter pt="0">
                      <Flex
                        width="100%"
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={3}
                      >
                        <Flex gap="0.5rem">
                          <Checkbox
                            colorScheme="green"
                            isChecked={!!selectedMaterials[material.id]}
                            onChange={(e) =>
                              handleMaterialSelect(material, e.target.checked)
                            }
                          />
                          Place Order
                        </Flex>
                        {selectedMaterials[material.id] && (
                          <NumberInput
                            min={1}
                            size="sm"
                            maxW={20}
                            value={selectedMaterials[material.id].quantity}
                            onChange={(value) =>
                              handleQuantityChange(material.id, value)
                            }
                            colorScheme="green"
                            focusBorderColor="green"
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        )}
                      </Flex>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>

            <Box
              width={{ base: "100%", lg: "350px" }}
              p={4}
              bg="white"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              alignSelf="flex-start"
              position={{ lg: "sticky" }}
              top={{ lg: "6" }}
            >
              <Text fontWeight={"bold"} fontSize={"1.3rem"} mb={4}>
                Order Summary
              </Text>
              {Object.values(selectedMaterials).map(
                ({ material, quantity }, index) => (
                  <Box key={material.id} mb={2}>
                    <Text>
                      {index + 1}. {material.title} x {quantity} = ₦
                      {(material.isGES ? 2000 : 800) * quantity}
                    </Text>
                  </Box>
                )
              )}
              <Divider my={4} />
              <Text>Subtotal: ₦{calculateSubtotal().toLocaleString()}</Text>
              <Text>
                Service Charge: ₦{calculateServiceCharge().toLocaleString()}
              </Text>
              <Text fontSize={"1.2rem"} fontWeight="bold" mt={2}>
                Total: ₦{calculateTotal().toLocaleString()}
              </Text>

              <Button
                mt={4}
                colorScheme="green"
                width="max-content"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Checkout Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Purchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={1}>You are about to purchase:</Text>
              {Object.values(selectedMaterials).map(
                ({ material, quantity }, index) => (
                  <Text key={material.id}>
                    {index + 1}. {material.title} x {quantity}
                  </Text>
                )
              )}
              <Text pt="1rem" fontStyle={"italic"} fontWeight={"semibold"}>
                NB: Kindly pick up the books at the New Administrative Complex -
                CBT Centre, UI Extension, Ajibode-Sasa Road, Ibadan.
              </Text>
              <Text
                fontSize={"1.25rem"}
                mt={4}
                fontWeight="bold"
                textTransform={"uppercase"}
              >
                Total: ₦{calculateTotal().toLocaleString()}
              </Text>
            </ModalBody>
            <ModalFooter justifyContent={"start"}>
              <Button colorScheme="red" w="10rem" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isDisabled={calculateTotal() === 0}
                colorScheme="green"
                onClick={confirmPurchase}
              >
                Confirm Purchase
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default Bookstore;
