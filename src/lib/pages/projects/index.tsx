import { Grid } from "@chakra-ui/react";

import CTASection from "./components/CTASection";
import SomeImage from "./components/SomeImage";
import Nav from "./components/Nav";
import SomeText from "./components/SomeText";

const Projects = () => {
  return (
    <Grid gap={4}>
      <Nav />
      <SomeText />
      <SomeImage />
      {/* <CTASection /> */}
    </Grid>
  );
};

export default Projects;
