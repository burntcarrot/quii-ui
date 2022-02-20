import { Grid } from "@chakra-ui/react";

import SimpleThreeColumns from "./components/Features";
import Hero from "./components/SomeImage";
// import SomeText from "./components/SomeText";

const Home = () => {
  return (
    <Grid gap={4}>
      <Hero />
      <SimpleThreeColumns />
    </Grid>
  );
};

export default Home;
