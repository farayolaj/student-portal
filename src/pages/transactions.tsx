import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";
import TransactionTable from "../components/transactions/transaction-table";
import { payments } from "../data/payments";

export default function Transactions() {
  return (
    <>
      <Seo title="Transactions" />
      <PageTitle showBackButton>Transactions</PageTitle>
      <TransactionTable
        transactions={payments.reduce(
          (arr, p) => (p.transactions ? [...arr, ...p.transactions] : arr),
          [] as Transaction[]
        )}
      />
    </>
  );
}
