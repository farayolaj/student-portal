import { getProfile, useProfile } from "@/api/user/use-profile";
import {
  isVerificationTransactionError,
  useVerifyResultVerificationTransaction,
} from "@/api/verify-result/use-verify-result-verification-transaction";
import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import PayVerificationFeeCard from "@/components/verify-result/pay-verification-fee-card";
import RequestVerificationCard from "@/components/verify-result/request-verification-card";
import { Text, Alert } from "@chakra-ui/react";

export default function Profile() {
  const resultVerificationTransaction =
    useVerifyResultVerificationTransaction();

  const profile = useProfile();

  return (
    <>
      <Seo title="Result Verification" />
      <PageTitle showBackButton>Result Verification</PageTitle>

      {profile?.data?.user.has_upload_verification_doc !== false && (
        <Alert status="warning" pb="1rem">
          You need to upload your document for verification, NOW.
        </Alert>
      )}
      {resultVerificationTransaction.data && (
        <PayVerificationFeeCard data={resultVerificationTransaction.data} />
      )}
      {resultVerificationTransaction.data &&
        !isVerificationTransactionError(resultVerificationTransaction.data) && (
          <RequestVerificationCard
            isDisabled={!resultVerificationTransaction.data?.isPaid}
          />
        )}
    </>
  );
}

Profile.layoutProps = {
  isAuthenticated: true,
};
