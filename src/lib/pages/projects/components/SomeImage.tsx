import {
  Box,
  Flex,
  Image,
  Link,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Center,
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjQ5NDlmNDYtYzk3My00NjQxLTkyNmYtYjE5NmZiMTk3ZjgyIiwicm9sZSI6InVzZXIiLCJleHAiOjE2NTI2MjA5ODd9.mQdjufC7IUQIs7ypnJnHGsXXb-pmCD-N9v7zfmZhfXA",
          },
          body: JSON.stringify({ username: "carrot" }),
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
                maxW="350px"
                w="full"
                bg={useColorModeValue("teal.200", "gray.800")}
                boxShadow="2xl"
                rounded="lg"
                pos="relative"
                zIndex={1}
              >
                {/* <Box
                  rounded="lg"
                  mt={-12}
                  pos="relative"
                  height="230px"
                  _after={{
                    transition: "all .3s ease",
                    content: '""',
                    w: "full",
                    h: "full",
                    pos: "absolute",
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${IMAGE})`,
                    filter: "blur(15px)",
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: "blur(20px)",
                    },
                  }}
                > */}
                {/* <Image
                    rounded="lg"
                    height={230}
                    width={282}
                    objectFit="cover"
                    src={IMAGE}
                  /> */}
                {/* </Box> */}

                {/* <Stack pt={1} align="center">
                  <Text
                    color="gray.500"
                    fontSize="sm"
                    textTransform="uppercase"
                  >
                    Brand
                  </Text> */}
                {/* <Heading fontSize="2xl" fontFamily="body" fontWeight={400}>
                    {book.name}
                  </Heading> */}
                <Stack direction="row" align="center">
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
                  <Text textDecoration="line-through" color="gray.600">
                    Completed
                  </Text>
                </Stack>
                {/* </Stack> */}
              </Box>
            </Center>
          ))}
        </div>
      )}
    </>
  );
};

export default SomeImage;
