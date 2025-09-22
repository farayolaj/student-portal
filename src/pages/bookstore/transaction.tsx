import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { bookstoreQueries } from "../../api/bookstore.queries";
import CancelTransactionButton from "../../components/bookstore/cancel-transaction";
import RepeatOrderButton from "../../components/bookstore/repeat-transaction";
import CustomTable from "../../components/common/custom-table";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";

interface BookItem {
  course_id: string;
  bookstore_id: string;
  title: string;
  quantity: string;
  price: string;
  amount: string;
}

interface BookOrder {
  id: string;
  session: string;
  order_id: string;
  total_amount: string;
  book_status: string;
  payment_description: string;
  payment_status: string;
  book_items: BookItem[];
}

const columnHelper = createColumnHelper<BookOrder>();

const BookstoreTransactionsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState<BookOrder | null>(null);
  const { data, isLoading, error } = useQuery(bookstoreQueries.transactions());

  const handleViewDetails = (order: BookOrder) => {
    setSelectedOrder(order);
    onOpen();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge colorScheme="yellow">Pending</Badge>;
      case "completed":
        return <Badge colorScheme="green">Completed</Badge>;
      case "cancelled":
        return <Badge colorScheme="red">Cancelled</Badge>;
      default:
        return <Badge colorScheme="gray">Unknown</Badge>;
    }
  };

  const columns = [
    columnHelper.display({
      id: "serialNumber",
      header: "S/N",
      cell: (props) => <Text>{props.row.index + 1}</Text>,
    }),
    columnHelper.accessor("order_id", {
      header: "Order ID",
      cell: (props) => <Text fontWeight="medium">{props.getValue()}</Text>,
    }),
    columnHelper.accessor("total_amount", {
      header: "Amount",
      cell: (props) => (
        <Text>
          ₦
          {parseFloat(props.getValue()).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
          })}
        </Text>
      ),
    }),
    columnHelper.accessor("book_status", {
      header: "Status",
      cell: (props) => getStatusBadge(props.getValue()),
    }),
    columnHelper.accessor("payment_description", {
      header: "Description",
      cell: (props) => (
        <Text noOfLines={1} maxW="300px">
          {props.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor("id", {
      header: "Actions",
      cell: (props) => (
        <Flex gap=".5rem">
          <Button
            size="sm"
            colorScheme="green"
            onClick={() => handleViewDetails(props.row.original)}
          >
            View Details
          </Button>
          <RepeatOrderButton order={props.row.original} />
          <CancelTransactionButton order={props.row.original} />
        </Flex>
      ),
    }),
  ];

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <>
        <Seo title="Bookstore Transactions" />
        <PageTitle showBackButton>Bookstore Transactions</PageTitle>
        <Box textAlign="center" py={10}>
          <Text color="red.500">
            Error loading transactions: {(error as Error).message}
          </Text>
        </Box>
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <Seo title="Bookstore Transactions" />
        <PageTitle showBackButton>Bookstore Transactions</PageTitle>
        <Box textAlign="center" py={10}>
          <Text>No transactions found</Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <Seo title="Bookstore Transactions" />
      <PageTitle showBackButton>Bookstore Transactions</PageTitle>
      <Box mt={6}>
        <CustomTable columns={columns} data={data} />
      </Box>

      {/* Order Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {getStatusBadge(selectedOrder?.book_status || "")}
            {selectedOrder && (
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Order ID: {selectedOrder.order_id}
                </Text>
                <Text mb={4}>
                  Total Amount: ₦
                  {parseFloat(selectedOrder.total_amount).toLocaleString(
                    "en-NG",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </Text>

                <Box overflowX="auto">
                  <CustomTable
                    columns={[
                      {
                        header: "Book Title",
                        accessorKey: "title",
                      },
                      {
                        header: "Qty",
                        accessorKey: "quantity",
                        cell: (props) => <Text>{props.getValue()}</Text>,
                      },
                      {
                        header: "Price",
                        accessorKey: "price",
                        cell: (props) => (
                          <Text>
                            ₦
                            {parseFloat(props.getValue()).toLocaleString(
                              "en-NG",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </Text>
                        ),
                      },
                      {
                        header: "Amount",
                        accessorKey: "amount",
                        cell: (props) => (
                          <Text>
                            ₦
                            {parseFloat(props.getValue()).toLocaleString(
                              "en-NG",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </Text>
                        ),
                      },
                    ]}
                    data={selectedOrder.book_items}
                  />
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookstoreTransactionsPage;
