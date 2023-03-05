import { SimpleGrid } from "@chakra-ui/react";
import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";
import CoursesCard from "../components/dashboard/courses-card";
import PaymentsCard from "../components/dashboard/payments-card";
import ProfileCard from "../components/dashboard/profile-card";
import TransactionsCard from "../components/dashboard/transactions-card";

export default function Home() {
  return (
    <>
      <Seo title="Dashboard" />
      <PageTitle>Dashboard</PageTitle>
      <ProfileCard />
      <CoursesCard />
      <SimpleGrid mt={8} columns={[1, null, null, 2]} gap={8}>
        <PaymentsCard />
        <TransactionsCard />
      </SimpleGrid>
    </>
  );
}
