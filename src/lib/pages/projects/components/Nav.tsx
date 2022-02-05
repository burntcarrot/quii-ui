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
import type { ReactNode } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";

import ThemeToggle from "lib/components/layout/ThemeToggle";

const Links = ["pm"];

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
            pm
          </Heading>
        </HStack>
        <Flex alignItems="center">
          <Button
            as="a"
            href="/create"
            variant="solid"
            colorScheme="teal"
            size="sm"
            mr={4}
            leftIcon={<AddIcon />}
          >
            New Project
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
                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Edit Profile</MenuItem>
              <MenuDivider />
              <MenuItem>
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
