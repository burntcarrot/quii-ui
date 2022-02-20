import { Grid } from "@chakra-ui/react";
import Nav from "./components/Nav";
import SomeImage from "./components/SomeImage";

const GetProject = () => {
  return (
    <Grid gap={4}>
      <Nav />
      <SomeImage />
    </Grid>
  );
};

export default GetProject;
