import { Grid } from "@chakra-ui/react";

import HeaderSS from "lib/pages/home/components/HeaderSS";

import LoginPage from "./components/SomeImage";

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
