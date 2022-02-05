import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  HStack,
  Link,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Center,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

const SomeImage = () => {
  const [books, setBooks] = useState(null);

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch(
        "http://localhost:8080/api/u/carrot/projects",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjQ5NDlmNDYtYzk3My00NjQxLTkyNmYtYjE5NmZiMTk3ZjgyIiwicm9sZSI6InVzZXIiLCJleHAiOjE2NTI2MjA5ODd9.mQdjufC7IUQIs7ypnJnHGsXXb-pmCD-N9v7zfmZhfXA",
          },
        }
      );
      const d = await response.json();
      console.log(d);

      // store the data into our books variable
      setBooks(d.data);
    }
  }, []);

  return (
    <>
      {books && (
        <div className="books">
          {books.map((book, _index) => (
            <Center>
              <Box
                role="group"
                p={5}
                m={5}
                maxW="600px"
                w="full"
                bg={useColorModeValue("teal.200", "gray.800")}
                boxShadow="2xl"
                rounded="lg"
                pos="relative"
                zIndex={1}
              >
                <Stack direction="column">
                  <Flex
                    padding="auto"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {/* <HStack spacing={"auto"} justifyContent="space-between" alignItems="center"> */}
                    <Heading
                      pr={5}
                      fontSize="2xl"
                      fontFamily="body"
                      fontWeight={400}
                    >
                      {book.name}
                    </Heading>
                    <Text
                      fontWeight={600}
                      fontSize="xl"
                      color={useColorModeValue("indigo.400", "teal.200")}
                    >
                      {book.description}
                    </Text>
                    <Button
                      as="a"
                      size="sm"
                      bg="green.400"
                      color="white"
                      _hover={{
                        bg: "green.600",
                      }}
                      // TODO: use project URL here
                      href="/projects"
                      rightIcon={<ArrowRightIcon />}
                    >
                      Open
                    </Button>
                  </Flex>
                  {/* </HStack> */}
                </Stack>
              </Box>
            </Center>
          ))}
        </div>
      )}
    </>
  );
};

export default SomeImage;
