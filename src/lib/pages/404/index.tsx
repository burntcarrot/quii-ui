import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Page404 = () => {
  const history = useHistory();

  const handleBackToHome = () => history.push("/");

  return (
    <Grid gap={4} textAlign="center">
      <Heading></Heading>

      <Box maxWidth={[400, 600]} marginX="auto">
        <Text fontWeight={600} fontSize={"2xl"}>Quii found you taking the wrong route.</Text>
        <Text fontSize={256}>🐥</Text>
      </Box>

      <Box>
        <Button onClick={handleBackToHome} bg="#FF007A" colorScheme={"pink"}>Oi! Take me back!</Button>
      </Box>
    </Grid>
  );
};

export default Page404;
