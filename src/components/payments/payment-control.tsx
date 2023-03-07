import { Button, Flex } from "@chakra-ui/react";
import RadioButtonGroup from "../common/radio-button-group";

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
      <Button>Make Custom Payment</Button>
      <RadioButtonGroup
        labels={["All", "Unpaid", "Partial", "Paid"]}
        values={["all", "unpaid", "partial", "paid"]}
        value={statusFilter}
        onChange={onStatusFilterChange}
      />
    </Flex>
  );
}
