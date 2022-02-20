import {
  Box,
  Flex,
  Image,
  Link,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SomeImage = () => {
  const [books, setBooks] = useState(null);

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch(
        // "https://www.anapioficeandfire.com/api/books"
        "http://localhost:8080/api/profile/burntcarrot"
      );
      const data = await response.json();
      console.log(data);

      // store the data into our books variable
      setBooks(data);
    }
  }, []);

  return (
    <>
      {/* <Box textAlign="center" marginX="auto" maxWidth={[280, 400]}>
        <Image width={400} src="/assets/Building blocks-amico.svg" />
        <Link fontSize="xs" href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </Link>
      </Box> */}

      {books && (
        <div className="books">
          <Flex
            minH="10vh"
            align="center"
            justify="center"
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack
              spacing={4}
              w="full"
              maxW="md"
              bg={useColorModeValue("white", "gray.700")}
              rounded="xl"
              boxShadow="lg"
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Hi there @{books.data.username}!
              </Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <i>{books.data.email}</i>
                {/* <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                /> */}
              </FormControl>
            </Stack>
          </Flex>
        </div>
      )}
    </>
  );
};

export default SomeImage;
