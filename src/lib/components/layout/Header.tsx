import { Box, Flex, Heading, Stack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Link to="/">
        <Heading as="h1" size="lg">
          <Flex marginY={4} justifyContent="center" gridGap={2}>
            {/* <AiFillGithub /> */}
            moxie.
          </Flex>
        </Heading>
      </Link>

      <Box marginLeft="auto">
        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            as="a"
            fontSize="sm"
            fontWeight={400}
            variant="link"
            href="/login"
          >
            Sign In
          </Button>
          <Button
            as="a"
            display={{ base: "none", md: "inline-flex" }}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="pink.500"
            href="/register"
            _hover={{
              bg: "pink.600",
            }}
          >
            Sign Up
          </Button>
          <ThemeToggle />
        </Stack>
      </Box>
    </Flex>
  );
};

export default Header;
