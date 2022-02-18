import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navBorderColor = useColorModeValue("gray.200", "gray.600")
  const navBg = useColorModeValue("white", "gray.800")
  return (
    <Flex
      alignItems="center"
      h="60px"
      border="1px solid"
      borderWidth="0 0 1px 0"
      borderColor={navBorderColor}
      position="fixed"
      top={0}
      width="100%"
      background={navBg}
      zIndex={100}
    >
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack>
          <Heading fontSize="xl">katrade</Heading>
        </HStack>
        <HStack>
          <IconButton
            onClick={toggleColorMode}
            aria-label="Search database"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </HStack>
      </Container>
    </Flex>
  );
}
