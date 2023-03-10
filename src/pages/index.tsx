import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";
import CoursesCard from "../components/dashboard/courses-card";
import PaymentsCard from "../components/dashboard/payments-card";
import ProfileCard from "../components/dashboard/profile-card";
import { useDashboardInfo } from "../hooks/dashboard/use-dashboard-info";

export default function Home() {
  const dashboardInfo = useDashboardInfo();

  return (
    <>
      <Seo title="Dashboard" />
      <PageTitle>Dashboard</PageTitle>
      <ProfileCard
        cgpa={dashboardInfo?.data?.cpga}
        entryMode={dashboardInfo?.data?.programme?.entryMode}
        level={dashboardInfo?.data?.programme?.level}
        matricNo={dashboardInfo?.data?.user?.matricNumber}
        programme={dashboardInfo?.data?.programme?.programme}
      />
      <CoursesCard />
      <PaymentsCard />
    </>
  );
}
