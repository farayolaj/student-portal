import { Button, Flex, Icon } from "@chakra-ui/react";
import { IoPrintOutline } from "react-icons/io5";
import RadioButtonGroup from "../common/radio-button-group";
import MakeSundryPaymentModal from "./make-sundry-payment-modal";

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
      <Flex justify="center" wrap={["wrap", null, "initial"]} gap={4}>
        <MakeSundryPaymentModal />
        <Button display="inline-flex" gap={2} isDisabled>
          <Icon as={IoPrintOutline} boxSize={6} /> Print Ledger
        </Button>
      </Flex>
      <RadioButtonGroup
        labels={["All", "Unpaid", "Paid"]}
        values={["all", "unpaid", "paid"]}
        value={statusFilter}
        onChange={onStatusFilterChange}
      />
    </Flex>
  );
}
