import { useRef } from "react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import {
  useColorMode,
  Button,
  Flex,
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Input,
  DrawerFooter,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MAX_WIDTH } from "../lib/constants";

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
`;

const Hamburger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <IconButton my={2} ref={btnRef} aria-label="Menu" onClick={onOpen}>
        <FiMenu />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <NextLink href="/" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    p={[1, 4]}
                    style={{ fontWeight: 600 }}
                  >
                    🏡 Home
                  </Button>
                </NextLink>
                <NextLink href="/blog" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    p={[1, 4]}
                    style={{ fontWeight: 600 }}
                  >
                    📝 Blog
                  </Button>
                </NextLink>
                <NextLink href="/about" passHref>
                  <Button
                    as="a"
                    variant="ghost"
                    p={[1, 4]}
                    style={{ fontWeight: 600 }}
                  >
                    👨‍💻 Sobre mí
                  </Button>
                </NextLink>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <IconButton
                aria-label="Toggle dark mode"
                ml={4}
                onClick={toggleColorMode}
              >
                {colorMode === "dark" ? <FiSun /> : <FiMoon />}
              </IconButton>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const showTopNavbar = useBreakpointValue({ base: false, sm: true });

  const navBgColor = {
    light: "white",
    dark: "gray.800",
  };

  return (
    <Flex
      flexDirection="row"
      bg={navBgColor[colorMode]}
      justifyContent="center"
      alignItems="flex-start"
    >
      <StickyNav
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth={MAX_WIDTH}
        width="100%"
        as="nav"
        p={4}
        mt={[0, 2]}
        mb={2}
        mx="auto"
      >
        <NextLink href="/" passHref>
          <Button as="a" variant="ghost" p={[1, 4]} style={{ fontWeight: 600 }}>
            Lucas Bernalte
          </Button>
        </NextLink>
        {showTopNavbar ? (
          <Box>
            <NextLink href="/blog" passHref>
              <Button
                as="a"
                variant="ghost"
                p={[1, 4]}
                style={{ fontWeight: 600 }}
              >
                📝 Blog
              </Button>
            </NextLink>
            <NextLink href="/about" passHref>
              <Button
                as="a"
                variant="ghost"
                p={[1, 4]}
                style={{ fontWeight: 600 }}
              >
                👨‍💻 Sobre mí
              </Button>
            </NextLink>
            <IconButton
              aria-label="Toggle dark mode"
              ml={4}
              onClick={toggleColorMode}
            >
              {colorMode === "dark" ? <FiSun /> : <FiMoon />}
            </IconButton>
          </Box>
        ) : (
          <Hamburger />
        )}
      </StickyNav>
    </Flex>
  );
};

export default Navbar;
