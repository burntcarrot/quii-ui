import { Grid } from "@chakra-ui/react";

import CTASection from "./components/CTASection";
import SimpleThreeColumns from "./components/Features";
import Hero from "./components/SomeImage";
// import SomeText from "./components/SomeText";

const Home = () => {
  return (
    <Grid gap={4}>
      {/* <SomeText /> */}
      <Hero />
      {/* <CTASection /> */}
      <SimpleThreeColumns />
    </Grid>
  );
};

export default Home;
