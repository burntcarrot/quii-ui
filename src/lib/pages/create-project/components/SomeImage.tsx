import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useCookies } from "react-cookie";

import ErrorMessage from "./ErrorMessage";

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
  // const [username, setUsername] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  // const [cookies, setCookie] = useCookies(["token"]);
  const username = document.cookie.replace(
    /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const { width, height } = useWindowSize();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectURL = `/projects/${projectName}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          );
          const URI = `http://localhost:8080/api/u/${username}/create`;
          const response = await fetch(URI, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username,
              name: projectName,
              description,
              github_url: github,
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
      // setUsername("");
      setProjectName("");
      setDescription("");
      setGithub("");
    }
  };

  return (
    <Flex
      minH="10vh"
      align="center"
      justify="center"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        {created ? (
          <>
            <Confetti width={width} height={height} />
            <Heading fontSize="4xl" textAlign="center">
              Woohoo!
            </Heading>
            <Text fontSize="lg" color="gray.600">
              You just a created a new project! 🥳
            </Text>
            <Button
              as="a"
              size="lg"
              bg="pink.400"
              color="white"
              _hover={{
                bg: "pink.500",
              }}
              // TODO: use project URL here
              href="/projects"
              rightIcon={<ArrowRightIcon />}
            >
              Take me to the project
            </Button>
          </>
        ) : (
          <>
            <Stack align="center">
              <Heading fontSize="4xl" textAlign="center">
                Create Project
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Create a new project ✌️
              </Text>
            </Stack>
            <Box
              rounded="lg"
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="lg"
              p={8}
            >
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <Stack spacing={4}>
                  {/* <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setUsername(event.currentTarget.value)
                      }
                    />
                  </FormControl> */}
                  <FormControl id="projectName" isRequired>
                    <FormLabel>Project Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setProjectName(event.currentTarget.value)
                      }
                    />
                  </FormControl>
                  <FormControl id="description" isRequired>
                    <FormLabel>Project Description</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setDescription(event.currentTarget.value)
                      }
                    />
                  </FormControl>
                  <FormControl id="github" isRequired>
                    <FormLabel>GitHub URL</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) => setGithub(event.currentTarget.value)}
                    />
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: "blue.500",
                      }}
                      type="submit"
                    >
                      Create
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </>
        )}
      </Stack>
    </Flex>
  );
}
