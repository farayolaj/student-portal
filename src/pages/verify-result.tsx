import { useVerifyResultVerificationTransaction } from "@/api/verify-result/use-verify-result-verification-transaction";
import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import PayVerificationFeeCard from "@/components/verify-result/pay-verification-fee-card";
import RequestVerificationCard from "@/components/verify-result/request-verification-card";

export default function Profile() {
  const resultVerificationTransaction =
    useVerifyResultVerificationTransaction();

  return (
    <>
      <Seo title="Result Verification" />
      <PageTitle showBackButton>Result Verification</PageTitle>
      <PayVerificationFeeCard
        paymentId={resultVerificationTransaction.data?.paymentId}
        isPaid={resultVerificationTransaction.data?.isPaid}
      />
      <RequestVerificationCard
        isDisabled={!resultVerificationTransaction.data?.isPaid}
      />
    </>
  );
}

Profile.layoutProps = {
  isAuthenticated: true,
};
