import { Grid } from "@chakra-ui/react";
import HeaderSS from "../home/components/HeaderSS";

import RegisterPage from "./components/SomeImage";

const Register = () => {
  return (
    <Grid gap={4}>
      {/* <SomeText /> */}
      <HeaderSS />
      <RegisterPage />
      {/* <CTASection /> */}
      {/* <SimpleThreeColumns /> */}
    </Grid>
  );
};

export default Register;
