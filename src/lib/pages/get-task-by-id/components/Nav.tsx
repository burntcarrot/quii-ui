import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";

import ThemeToggle from "lib/components/layout/ThemeToggle";

const Links = ["quii"];

const Logout = (event) => {
  event.preventDefault();
  window.location = "/";
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href="#"
  >
    {children}
  </Link>
);

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projectParams = useParams();
  const new_url = `/projects/${projectParams.projectName}/tasks/new`

  return (
    <Box bg={useColorModeValue("white", "gray.800")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Heading as="a" fontSize={24} href="/">
            quii
          </Heading>
        </HStack>
        <Flex alignItems="center">
          <Button
            as="a"
            href={new_url}
            variant="solid"
            bg="#FF007A"
            colorScheme={"pink"}
            size="sm"
            mr={4}
            leftIcon={<AddIcon />}
          >
            <Text color="white">New Task</Text>
          </Button>
          <Menu>
            <MenuButton
              mr={5}
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar
                size="sm"
                bg="white.400"
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/310/front-facing-baby-chick_1f425.png"
              />
            </MenuButton>
            <MenuList>
              <a href="/profile"><MenuItem>Edit Profile</MenuItem></a>
              <MenuDivider />
              <MenuItem onClick={Logout}>
                Logout <RiLogoutBoxRLine />
              </MenuItem>
            </MenuList>
          </Menu>
          <ThemeToggle />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Nav;
