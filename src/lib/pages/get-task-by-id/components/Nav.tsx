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
  Heading,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useEffect, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import ThemeToggle from "lib/components/layout/ThemeToggle";

const Links = ["quii"];

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

const Logout = (event) => {
  event.preventDefault();
  window.location = "/";
}

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projectParams = useParams();
  const [cookies, setCookie] = useCookies(["project"]);

  let new_url = window.location + "/new";
  const handleSubmit = async (event) => {
    event.preventDefault();
    setCookie("project", projectParams.projectName, { path: "/" });
    window.location = "/create-task"
  };

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
            // href="/create-task"
            onClick={handleSubmit}
            href={new_url}
            // href="#"
            variant="solid"
            bg="#FF007A"
            colorScheme={"pink"}
            size="sm"
            mr={4}
            leftIcon={<AddIcon />}
          >
            New Task
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
