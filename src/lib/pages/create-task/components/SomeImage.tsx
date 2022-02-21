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
import { useParams } from "react-router-dom";
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
  const [taskName, setTaskName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [task_id, setTaskID] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  // const [cookies, setCookie] = useCookies(["token"]);
  const username = document.cookie.replace(
    /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const projectName = document.cookie.replace(
    /(?:(?:^|.*;\s*)project\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const projectParams = useParams();

  const { width, height } = useWindowSize();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const projectURL = `/projects/${projectName}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(async () => {
          const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
          );

          const URI = `http://localhost:8080/api/u/${username}/projects/${projectName}/tasks/new`;
          const body_post = JSON.stringify({
            username,
            project_name: projectName,
            name: taskName,
            type: type,
            status: status,
          });
          const response = await fetch(URI, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              username,
              project_name: projectName,
              name: taskName,
              type: type,
              status: status,
            }),
          });
          const data = await response.json();
          // eslint-disable-next-line no-console
          console.log(body_post);
          console.log(data);
          setTaskID(data.data.id)
          if (data.data !== null) {
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
      setError("Failed to create a task.");
      setTaskName("");
      setType("");
      setStatus("");
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
              You just a created a new task! 🥳
            </Text>
            <Button
              as="a"
              size="lg"
              bg="#FF007A"
              color="white"
              _hover={{
                bg: "pink.500",
              }}
              // TODO: use project URL here
              href={"/projects/" + projectName + "/tasks/" + task_id}
              rightIcon={<ArrowRightIcon />}
            >
              Take me to the task!
            </Button>
          </>
        ) : (
          <>
            <Stack align="center">
              <Heading fontSize="4xl" textAlign="center">
                Create a Task
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Minimal tasks. More focus. 🎯
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
                  <FormControl id="taskName" isRequired>
                    <FormLabel>Task Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setTaskName(event.currentTarget.value)
                      }
                    />
                  </FormControl>
                  <FormControl id="type" isRequired>
                    <FormLabel>Task Type</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) =>
                        setType(event.currentTarget.value)
                      }
                    />
                  </FormControl>
                  <FormControl id="status" isRequired>
                    <FormLabel>Task Status</FormLabel>
                    <Input
                      type="text"
                      onChange={(event) => setStatus(event.currentTarget.value)}
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
