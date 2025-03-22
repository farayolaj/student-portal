import { useProfile } from "@/api/user/use-profile";
import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import PayVerificationFeeCard from "@/components/verify-result/pay-verification-fee-card";
import RequestVerificationCard from "@/components/verify-result/request-verification-card";
import { Alert } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  isVerificationTransactionError,
  verifyResultQueries,
} from "../api/verify-result.queries";

export default function Profile() {
  const { data } = useQuery(
    verifyResultQueries.resultVerificationTransactionVerification()
  );

  const profile = useProfile();

  return (
    <>
      <Seo title="Result Verification" />
      <PageTitle showBackButton>Result Verification</PageTitle>

      {profile?.data?.user.has_upload_verification_doc === false && (
        <Alert status="warning" mb="1rem" fontSize={18}>
          You need to upload your document for verification,<b>NOW.</b>
        </Alert>
      )}
      {data && <PayVerificationFeeCard data={data} />}
      {data && !isVerificationTransactionError(data) && (
        <RequestVerificationCard isDisabled={!data?.isPaid} />
      )}
    </>
  );
}

Profile.layoutProps = {
  isAuthenticated: true,
};
