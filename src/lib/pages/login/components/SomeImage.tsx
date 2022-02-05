import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";

import ErrorMessage from "lib/pages/create-project/components/ErrorMessage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [usernameCookie, setUsernameCookie] = useCookies(["username"]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
          const d = await response.json();
          // set cookie
          setCookie("token", d.data.token, { path: "/" });
          setUsernameCookie("username", username, { path: "/" });
          // eslint-disable-next-line no-console
          if (d !== undefined) {
            resolve();
          } else {
            reject();
          }
        }, 3000);
      });

      // setCreated(true);
      window.location = "/projects";
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      setError("Invalid username or password");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Flex
      minH="10vh"
      align="center"
      justify="center"
      bg={useColorModeValue("white", "gray.800")}
    >
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Heading fontSize="4xl">Sign in to your account</Heading>
            <Text fontSize="lg" color="gray.600">
              to enjoy all of our cool <Link color="blue.400">features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
