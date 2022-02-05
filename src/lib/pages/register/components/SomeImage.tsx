import { ArrowRightIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

import ErrorMessage from "lib/pages/create-project/components/ErrorMessage";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const { width, height } = useWindowSize();

  const isError = password.length < 8;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          const response = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              password,
              role: "user",
            }),
          });
          const data = await response.json();
          // eslint-disable-next-line no-console
          console.log(data);
          if (data !== undefined) {
            resolve();
          } else {
            reject();
          }
        }, 3000);
      });

      setCreated(true);
      // window.location = "/projects";
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      setError("Invalid username or password");
      setUsername("");
      setEmail("");
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
      <Stack align="center" spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        {created ? (
          <>
            <Confetti width={width} height={height} />
            <Heading fontSize="4xl" textAlign="center">
              Congratulations!
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Welcome to PM! 🥳
            </Text>
            <Button
              as="a"
              size="lg"
              bg="pink.400"
              color="white"
              _hover={{
                bg: "pink.500",
              }}
              href="/login"
              rightIcon={<ArrowRightIcon />}
            >
              Login and start your journey
            </Button>
          </>
        ) : (
          <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
            <Stack align="center">
              <Heading fontSize="4xl" textAlign="center">
                Sign up
              </Heading>
              <Text fontSize="lg" color="gray.600">
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded="lg"
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="lg"
              p={8}
            >
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <Stack spacing={4}>
                  <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setUsername(event.currentTarget.value)
                      }
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      onChange={(event) => setEmail(event.currentTarget.value)}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired isInvalid={isError}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        onChange={(event) =>
                          setPassword(event.currentTarget.value)
                        }
                      />
                      <InputRightElement h="full">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {!isError ? (
                      <FormHelperText>
                        Password length should be minimum 8 characters.
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        Failed to set password. Remember: Password length should
                        be minimum 8 characters.
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      loadingText="Submitting"
                      size="lg"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align="center">
                      Already a user? <Link color="blue.400">Login</Link>
                    </Text>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        )}
      </Stack>
    </Flex>
  );
}
