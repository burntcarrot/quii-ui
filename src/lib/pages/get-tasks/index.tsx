import { Grid } from "@chakra-ui/react";
import Nav from "../get-task-by-id/components/Nav";
import SomeImage from "./components/SomeImage";
import SomeText from "./components/SomeText";

const GetTask = () => {
  return (
    <Grid gap={4}>
      <Nav />
      <SomeText />
      <SomeImage />
    </Grid>
  );
};

export default GetTask;
