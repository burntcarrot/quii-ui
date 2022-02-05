import { Grid } from "@chakra-ui/react";

import LoginPage from "./components/SomeImage";
import HeaderSS from "lib/pages/home/components/HeaderSS";

const Home = () => {
  return (
    <Grid gap={4}>
      {/* <SomeText /> */}
      <HeaderSS />
      <LoginPage />
      {/* <CTASection /> */}
      {/* <SimpleThreeColumns /> */}
    </Grid>
  );
};

export default Home;
