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
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

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
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const username = document.cookie.replace(
    /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const isError = projectName.split(" ").length > 1;

  const { width, height } = useWindowSize();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          // use dash
          projectName.replace(/\s/g , "-");

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
          if (data.data !== null) {
            resolve();
          } else {
            setError("Failed to create project.");
            reject();
          }
        }, 3000);
      });

      setCreated(true);
      // window.location = "/projects";
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
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
              bg="#FF007A"
              color="white"
              _hover={{
                bg: "pink.500",
              }}

              href={"/projects/" + projectName.toLowerCase().replace(/\s/g , "-")}
              rightIcon={<ArrowRightIcon />}
            >
              Take me to the project
            </Button>
          </>
        ) : (
          <>
            <Stack align="center">
              <Heading fontSize="4xl" textAlign="center">
                Create a Project
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Start your journey. 🚀
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
                  <FormControl id="projectName" isRequired isInvalid={isError}>
                    <FormLabel>Project Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setProjectName(event.currentTarget.value)
                      }
                    />
                    {!isError ? (
                      <FormHelperText>
                        Please use a project name without spaces.
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        No! Project name should not contain spaces.
                      </FormErrorMessage>
                    )}
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
                      bg="#7f00ff"
                      color="white"
                      _hover={{
                        bg: "#8f00ff",
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
