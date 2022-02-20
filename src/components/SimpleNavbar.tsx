import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'

export function SimpleNavbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const navBorderColor = useColorModeValue('gray.200', 'gray.600')
  const navBg = useColorModeValue('white', 'gray.800')
  return (
    <Flex
      alignItems='center'
      h='60px'
      border='1px solid'
      borderWidth='0 0 1px 0'
      borderColor={navBorderColor}
      position='fixed'
      top={0}
      width='100%'
      background={navBg}
      zIndex={100}
    >
      <Container maxW='container.xl' display='flex' justifyContent='space-between' alignItems='center'>
        <HStack>
          <Heading fontSize='xl'>katrade</Heading>
        </HStack>
        <HStack spacing='20px'>
          <Menu isLazy>
            <MenuButton fontWeight={300}>
              คาเทรด <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem fontWeight={300}>Katrade คือ?</MenuItem>
              <MenuItem fontWeight={300}>
                คุณจะทำให้โลก <b> ดีขึ้น</b>
              </MenuItem>
              <MenuItem fontWeight={300}>ทีมพัฒนา</MenuItem>
            </MenuList>
          </Menu>
          <Menu isLazy>
            <MenuButton fontWeight={300}>
              เรียนรู้ <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem fontWeight={300}>ขั้นตอนการใช้คาเทรด</MenuItem>
              <MenuItem fontWeight={300}>ข้อตกลงและนโยบายการใช้งาน</MenuItem>
              <MenuItem fontWeight={300}>คำแนะนำ</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack spacing='20px'>
          <IconButton
            onClick={toggleColorMode}
            aria-label='Search database'
            rounded='full'
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />
        </HStack>
      </Container>
    </Flex>
  )
}
