// eslint-disable-next-line react/jsx-no-useless-fragment

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

const GitStatsComponent = () => {
  const [languages, setLanguages] = useState(null);
  // const [cookies, setCookie] = useCookies();
  // const [usernameCookie, setUsernameCookie] = useCookies();

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
        const URI_Github =
        "https://api.github.com/repos/burntcarrot/peavote/languages";
      const github_response = await fetch(URI_Github, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      const l = await github_response.json();
      console.log(Object.keys(l));

      // https://api.github.com/repos/burntcarrot/peavote/languages

      // store the data into our books variable
      // setBooks(d.data[0]);
      const k = Object.keys(l);
      setLanguages(k);
    }
  }, []);

  return (
    <>
      {languages && (
        <div className="books">
          {languages.map((book, _index) => (
            <Center>
              <Box
                role="group"
                p={5}
                m={5}
                maxW="600px"
                w="full"
                bg={useColorModeValue("blue.400", "gray.800")}
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
                    <Heading
                      pr={5}
                      fontSize="2xl"
                      fontFamily="body"
                      fontWeight={400}
                    >
                      {book}
                    </Heading>
                    {/* <Text
                      fontWeight={600}
                      fontSize="xl"
                      color={useColorModeValue("indigo.400", "teal.200")}
                    >
                      Sample
                    </Text> */}
                  </Flex>
                </Stack>
              </Box>
            </Center>
          ))}
        </div>
      )}
    </>
  );
};

export default GitStatsComponent;
