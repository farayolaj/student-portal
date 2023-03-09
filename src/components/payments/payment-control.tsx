import { Button, Flex } from "@chakra-ui/react";
import RadioButtonGroup from "../common/radio-button-group";
import MakeCustomPaymentModal from "./make-custom-payment-modal";

type PaymentControlProps = {
  statusFilter: string;
  onStatusFilterChange: (newValue: string) => void;
};

export default function PaymentControl({
  statusFilter,
  onStatusFilterChange,
}: PaymentControlProps) {
  return (
    <Flex
      wrap={["wrap", null, "nowrap"]}
      justify={["center", null, "space-between"]}
      gap={4}
    >
      <MakeCustomPaymentModal />
      <RadioButtonGroup
        labels={["All", "Unpaid", "Paid"]}
        values={["all", "unpaid", "paid"]}
        value={statusFilter}
        onChange={onStatusFilterChange}
      />
    </Flex>
  );
}
