import { ArrowRightIcon } from "@chakra-ui/icons";
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
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const SomeImage = () => {
  const [books, setBooks] = useState(null);
  // const [cookies, setCookie] = useCookies();
  // const [usernameCookie, setUsernameCookie] = useCookies();

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      // const { token } = cookies.token;
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const username = document.cookie.replace(
        /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const URI = `http://localhost:8080/api/u/${username}/projects`;
      const response = await fetch(URI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
                bg={useColorModeValue("#fff0f5", "#522d80")}
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
                      {book.description}
                    </Text>
                    <Button
                      as="a"
                      size="sm"
                      bg="#FF007A"
                      color="white"
                      _hover={{
                        bg: "FF007A",
                      }}
                      // TODO: use project URL here
                      href={"/projects/" + book.name.toLowerCase()}
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
