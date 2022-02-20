import { Grid } from "@chakra-ui/react";

import Nav from "../projects/components/Nav";

import RegisterPage from "./components/SomeImage";

const CreateTask = () => {
  return (
    <Grid gap={4}>
      <Nav />
      <RegisterPage />
    </Grid>
  );
};

export default CreateTask;
