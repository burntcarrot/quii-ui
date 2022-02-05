import { Grid } from "@chakra-ui/react";

import CTASection from "./components/CTASection";
import SomeImage from "./components/SomeImage";
import SomeText from "./components/SomeText";

const Profile = () => {
  return (
    <Grid gap={4}>
      {/* <SomeText /> */}
      <SomeImage />
      {/* <CTASection /> */}
    </Grid>
  );
};

export default Profile;
