import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import book1 from "../../images/bookstore/book-bg-1.png";
import book2 from "../../images/bookstore/book-bg-2.png";
import book3 from "../../images/bookstore/book-bg-3.png";
import book4 from "../../images/bookstore/book-bg-4.png";
import book5 from "../../images/bookstore/book-bg-5.jpg";
import book6 from "../../images/bookstore/book-bg-6.jpg";
import book7 from "../../images/bookstore/book-bg-7.jpg";
import book8 from "../../images/bookstore/book-bg-8.jpg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import {
  cancelBookstorePayment,
  checkoutBookstore,
  initiateBookstorePayment,
} from "../../api/bookstore.mutations";
import { bookstoreQueries } from "../../api/bookstore.queries";
import { useBookstore } from "../../api/bookstore/use-list-bookstore";
import PageTitle from "../../components/common/page-title";
import useRemitaInline from "../../components/common/remita-inline";
import Seo from "../../components/common/seo";

interface CourseMaterial {
  id: string;
  title: string;
  isGES: boolean;
  price: string;
  code: string;
  quantity: string;
}

const Bookstore: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: bookStoreList, isLoading } = useBookstore();
  const checkoutMutation = useMutation({
    mutationFn: checkoutBookstore,
  });
  const {
    mutate: cancelPaymentMutation,
    isPending: cancelPaymentMutationIsPending,
  } = useMutation({
    mutationFn: cancelBookstorePayment,
  });

  const handleCancelOrder = useCallback(() => {
    if (orderId) {
      cancelPaymentMutation(
        { order_id: orderId },
        {
          onSuccess: () => {
            toast({
              title: "Order Cancelled",
              description: "Your order has been cancelled successfully.",
              status: "success",
              isClosable: true,
            });
            queryClient.invalidateQueries(bookstoreQueries.books());
            onClose();
          },
          onError: (error) => {
            toast({
              title: "Error cancelling order",
              description: error.message,
              status: "error",
              isClosable: true,
            });
            onClose();
          },
        }
      );
    }
  }, [cancelPaymentMutation, onClose, orderId, queryClient, toast]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(120);

      // Start countdown
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleCancelOrder();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [handleCancelOrder, isOpen]);

  const handleCheckout = () => {
    const booksToCheckout = Object.values(selectedMaterials).map(
      ({ material, quantity }) => ({
        id: parseInt(material.id),
        qty: quantity,
      })
    );

    checkoutMutation.mutate(
      { books: booksToCheckout },
      {
        onSuccess: (response) => {
          setOrderId(response.orderId);
          onOpen();
        },
        onError: (error) => {
          toast({
            title: "Error checking out",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        },
      }
    );
  };

  const initiatePaymentMutation = useMutation({
    mutationFn: initiateBookstorePayment,
  });

  const { initPayment } = useRemitaInline({
    isLive: process.env.NODE_ENV === "production",
    onSuccess: (res) => {
      if (process.env.NODE_ENV === "development") console.log(res);

      queryClient.invalidateQueries(bookstoreQueries.books());
      queryClient.invalidateQueries(bookstoreQueries.transactions());
      toast({
        status: "success",
        title: "Payment Successful",
        description:
          "If payment doesn't reflect immediately, requery transaction status later.",
      });
    },
    onError: (res) => {
      if (process.env.NODE_ENV === "development") console.error(res);

      toast({
        status: "error",
        title: "Payment Failed",
        description: "Please try again later.",
      });
    },
  });

  const initialisePayment = () => {
    initiatePaymentMutation.mutate(
      {
        order_id: orderId || "",
      },
      {
        onError: (error) => {
          const err = error as Error;
          toast({
            status: "error",
            title: "Error initializing payment",
            description: err.message,
          });
        },
        onSuccess: (data) => {
          onClose();
          initPayment({
            amount: parseInt(data.payment_details.total_amount),
            key: data.split_payment.public_key || "",
            processRrr: true,
            transactionId: data.split_payment.transaction_id,
            extendedData: {
              customFields: [
                {
                  name: "rrr",
                  value: data.split_payment.rrr,
                },
              ],
            },
          });
        },
      }
    );
  };

  const images: StaticImageData[] = [
    book1,
    book2,
    book3,
    book4,
    book5,
    book6,
    book7,
    book8,
  ];

  const [selectedMaterials, setSelectedMaterials] = useState<
    Record<string, { material: CourseMaterial; quantity: number }>
  >({});

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
        const price = parseInt(material.price);
        return total + price * quantity;
      },
      0
    );
  };

  const calculateServiceCharge = () => {
    const subtotal = calculateSubtotal();
    return subtotal === 0 ? 0 : 505;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceCharge();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  return (
    <>
      <Seo title="Online Bookstore" />
      <PageTitle showBackButton>Online Bookstore</PageTitle>
      <Button as={Link} href={"/bookstore/transaction"} mb="1rem">
        Bookstore Transactions
      </Button>
      <Flex gap={6} direction={"column"}>
        <Box flex={1}>
          <Box
            display={"flex"}
            flexDir={{ base: "column-reverse", md: "row" }}
            gap="1rem"
            justifyContent={"space-between"}
          >
            {isLoading ? (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} w={"20rem"} h={"20rem"} />
                ))}
              </Grid>
            ) : bookStoreList?.length === 0 ? (
              <Box w="100%" borderRadius={"1rem"} boxShadow={"md"}>
                No Books Available
              </Box>
            ) : (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                {bookStoreList?.map(
                  (material: CourseMaterial, index: number) => {
                    const image = images[index % images.length];
                    return (
                      <GridItem key={material.id}>
                        <Card
                          flexDirection="column"
                          variant="outline"
                          height="100%"
                          display="flex"
                          opacity={material.quantity === "0" ? 0.5 : 1}
                        >
                          <CardBody flex={1} p="1rem">
                            <Box
                              position="relative"
                              height="180px"
                              width="100%"
                              mb={4}
                            >
                              <Image
                                src={image}
                                alt={material.title}
                                fill
                                style={{
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                            </Box>
                            <Stack spacing="3">
                              <Flex justifyContent={"space-between"}>
                                <Text>{material.code}</Text>
                                {material.quantity === "0" && (
                                  <Badge colorScheme="red">Out of Stock</Badge>
                                )}
                              </Flex>
                              <Heading size="md" fontWeight={"semibold"}>
                                {material.title}
                                {material.code.includes("GES") && (
                                  <Badge ml={2} colorScheme="purple">
                                    GES
                                  </Badge>
                                )}
                              </Heading>
                              <Text
                                color="green"
                                fontWeight={"bold"}
                                fontSize="lg"
                              >
                                ₦{material.price}
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
                                    handleMaterialSelect(
                                      material,
                                      e.target.checked
                                    )
                                  }
                                  isDisabled={
                                    material.quantity === "0" ||
                                    checkoutMutation?.isPending
                                  }
                                />
                                Place Order
                              </Flex>
                              {selectedMaterials[material.id] && (
                                <NumberInput
                                  min={0}
                                  max={parseInt(material.quantity)}
                                  size="sm"
                                  maxW={20}
                                  value={
                                    selectedMaterials[material.id].quantity
                                  }
                                  onChange={(value) =>
                                    handleQuantityChange(material.id, value)
                                  }
                                  colorScheme="green"
                                  focusBorderColor="green"
                                >
                                  <NumberInputField
                                    max={parseInt(material.quantity)}
                                  />
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
                    );
                  }
                )}
              </Grid>
            )}

            <Box
              width={{ base: "100%", lg: "350px" }}
              p={4}
              bg="white"
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              top={{ lg: "6" }}
              alignSelf="flex-start"
              position={{ lg: "sticky" }}
            >
              <Text fontWeight={"bold"} fontSize={"1.3rem"} mb={4}>
                Order Summary
              </Text>
              {Object.values(selectedMaterials).map(
                ({ material, quantity }, index) => (
                  <Box key={material.id} mb={2}>
                    <Text>
                      {index + 1}. {material.title} x {quantity} = ₦
                      {parseInt(material.price) * quantity}
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
                disabled={calculateTotal() === 0 || checkoutMutation?.isPending}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Checkout Modal */}
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Confirm Purchase
              <Text fontSize={"sm"} color="red" mt={1}>
                This order auto-cancels in {formatTime(timeLeft)}
              </Text>
            </ModalHeader>

            <ModalBody>
              <Text mb={1}>You are about to purchase:</Text>
              {Object.values(selectedMaterials).map(
                ({ material, quantity }, index) => (
                  <Text key={material.id} fontWeight={"bold"}>
                    {index + 1}. {material.title} x {quantity}
                  </Text>
                )
              )}
              <Text
                pt="1rem"
                fontSize={"sm"}
                fontStyle={"italic"}
                fontWeight={"normal"}
                color="grey"
              >
                NB: <br />- Kindly pick up the books at the New Administrative
                Complex - CBT Centre, UI Extension, Ajibode-Sasa Road, Ibadan.
                <br />
                -Payment should be completed within 24hours for transaction to
                be valid.
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
              <Button
                colorScheme="red"
                w="10rem"
                mr={3}
                onClick={handleCancelOrder}
                isDisabled={cancelPaymentMutationIsPending}
              >
                Cancel Purchase
              </Button>
              <Button
                colorScheme="green"
                onClick={initialisePayment}
                isDisabled={
                  initiatePaymentMutation.isPending ||
                  !orderId ||
                  cancelPaymentMutationIsPending
                }
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
