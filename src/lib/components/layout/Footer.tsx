import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="sm">
        {new Date().getFullYear()} -{" "}
        <Link href="https://aadhav.me" isExternal>
          aadhav.me
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
