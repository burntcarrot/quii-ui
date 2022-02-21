/* eslint-disable react/jsx-no-useless-fragment */
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Center,
  Button,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SomeImage = () => {
  const [books, setBooks] = useState(null);
  const projectParams = useParams();

  // + adding the use
  useEffect(() => {
    getData();

    async function getData() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const username = document.cookie.replace(
        /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      const URI = `http://localhost:8080/api/u/${username}/projects/${projectParams.projectName}/tasks`;
      const response = await fetch(URI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const d = await response.json();
      console.log(d);
      // let tid = 0;
      // for (let x in d.data) {
      //   tid += 1;
      //   x.task_id = "task_" + tid.toString();
      // }
      setBooks(d.data);
    }
  }, [projectParams.projectName]);

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
                bg={useColorModeValue("#fff0f5", "gray.800")}
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
                      fontSize="xl"
                      color={useColorModeValue("#7f00ff", "white")}
                      fontFamily="body"
                      fontWeight={400}
                    >
                      {book.name}
                    </Heading>
                    <Text
                      fontWeight={600}
                      fontSize="xl"
                      color={useColorModeValue("#7f00ff", "white")}
                    >
                      {book.type}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize="l"
                      color={useColorModeValue("#7f00ff", "white")}
                    >
                      {book.status}
                    </Text>
                    <Button
                      as="a"
                      size="sm"
                      bg="#FF007A"
                      color="white"
                      _hover={{
                        bg: "FF007A",
                      }}
                      href={"/projects/" + projectParams.projectName + "/tasks/" + book.id}
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
