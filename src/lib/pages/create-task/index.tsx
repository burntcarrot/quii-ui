import { Grid } from "@chakra-ui/react";

import Nav from "../get-task-by-id/components/Nav";

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
