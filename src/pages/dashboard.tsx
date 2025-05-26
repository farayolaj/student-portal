import InitiateResultVerificationCard from "@/components/dashboard/initiate-result-verification-card";
import PraticumFormCard from "@/components/dashboard/practicum-form-card";
import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";
import CoursesCard from "../components/dashboard/courses-card";
import PaymentsCard from "../components/dashboard/payments-card";
import ProfileCard from "../components/dashboard/profile-card";

export default function Home() {
  // const profile = useProfile();
  return (
    <>
      <Seo title="Dashboard" />
      <PageTitle>Dashboard</PageTitle>
      {/* {profile.data && (
        <Box mb={8}>
          <LMSOrientationSurvey
            isFresher={profile.data.user.isFresher}
            orientationAttendance={profile.data.user.orientationAttendance}
            orientationAttendanceDate={
              profile.data.user.orientationAttendanceDate
            }
            orientationSeatNo={profile.data.user.orientationSeatNo}
          />
        </Box>
      )} */}
      <ProfileCard />
      <InitiateResultVerificationCard />
      {/* <UpdateBioData /> */}
      <PraticumFormCard />
      <CoursesCard />
      <PaymentsCard />
    </>
  );
}
