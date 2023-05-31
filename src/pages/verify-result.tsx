import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import PayVerificationFeeCard from "@/components/verify-result/pay-verification-fee-card";
import RequestVerificationCard from "@/components/verify-result/request-verification-card";

export default function Profile() {
  return (
    <>
      <Seo title="Result Verification" />
      <PageTitle showBackButton>Result Verification</PageTitle>
      <PayVerificationFeeCard />
      <RequestVerificationCard />
    </>
  );
}

Profile.layoutProps = {
  isAuthenticated: true,
};
