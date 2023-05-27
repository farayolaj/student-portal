import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";

export default function Profile() {
  return (
    <>
      <Seo title="Result Verification" />
      <PageTitle showBackButton>Result Verification</PageTitle>
    </>
  );
}

Profile.layoutProps = {
  isAuthenticated: true,
};
