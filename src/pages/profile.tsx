import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import ChangePasswordForm from "@/components/profile/change-password-form";
import ProfileDetails from "@/components/profile/profile-details";
import ProfileImage from "@/components/profile/profile-image";
import { Box, Card, CardBody, Flex, Grid } from "@chakra-ui/react";

export default function Profile() {
  return (
    <>
      <Seo title="Profile" />
      <PageTitle showBackButton>Profile</PageTitle>
      <Card>
        <CardBody p={10} h="min-content">
          <Grid
            gridTemplateColumns={["1fr", null, "40% calc(60% - 3rem)"]}
            gap={12}
            alignItems="flex-start"
          >
            <Flex direction="column" gap={20}>
              <ProfileImage />
              <Box display={["none", null, "initial"]}>
                <ChangePasswordForm />
              </Box>
            </Flex>
            <ProfileDetails />
            <Box display={[null, null, "none"]}>
              <ChangePasswordForm />
            </Box>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
}

Profile.layoutProps = {
  isAuthenticated: false,
};
