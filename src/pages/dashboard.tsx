import NewFeatureTour from "@/components/common/new-feature-tour";
import InitiateResultVerificationCard from "@/components/dashboard/initiate-result-verification-card";
import PraticumFormCard from "@/components/dashboard/practicum-form-card";
import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";
import CoursesCard from "../components/dashboard/courses-card";
import PaymentsCard from "../components/dashboard/payments-card";
import ProfileCard from "../components/dashboard/profile-card";

export default function Home() {
  return (
    <>
      <Seo title="Dashboard" />
      <PageTitle>Dashboard</PageTitle>
      <ProfileCard />
      <NewFeatureTour />
      <InitiateResultVerificationCard />
      <PraticumFormCard />
      <PaymentsCard />
      <CoursesCard />
    </>
  );
}
