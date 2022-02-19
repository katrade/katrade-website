import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Avatar,
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
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { BsFillChatDotsFill, BsFillCartFill } from 'react-icons/bs'
import { MdBackpack } from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa'

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const navBorderColor = useColorModeValue('gray.200', 'gray.600')
  const navBg = useColorModeValue('white', 'gray.800')
  const { user, signout } = useAuth()

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
          <Tooltip label='แชท' aria-label='chat-tooltip'>
            <IconButton aria-label='' rounded='full' icon={<BsFillChatDotsFill />} />
          </Tooltip>
          <Tooltip label='คำขอแลกเปลี่ยน' aria-label='request-tooltip'>
            <IconButton rounded='full' aria-label='' icon={<BsFillCartFill />} />
          </Tooltip>
          <Tooltip label='คลังของฉัน' aria-label='inventory-tooltip'>
            <IconButton rounded='full' aria-label='' icon={<MdBackpack />} />
          </Tooltip>
          <Tooltip
            label={colorMode === 'light' ? 'พระจันทร์ช่างเงียบเหงา' : 'สวัสดีพระอาทิตย์'}
            aria-label='chat-tooltip'
          >
            <IconButton
              onClick={toggleColorMode}
              aria-label='Search database'
              rounded='full'
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            />
          </Tooltip>
          <Menu>
            <MenuButton
              as={Avatar}
              w='fit-content'
              h='fit-content'
              bg='transparent'
              icon={
                <Avatar
                  w='40px'
                  h='40px'
                  size='sm'
                  cursor='pointer'
                  name={user ? `${user?.firstname} ${user?.lastname}` : ''}
                  src={user?.profilePic}
                />
              }
            />
            <MenuList>
              <MenuItem fontWeight={300}>สิ่งของของคุณ</MenuItem>
              <MenuItem fontWeight={300}>คำขอ</MenuItem>
              <MenuItem fontWeight={300}>แชท</MenuItem>
              <MenuItem fontWeight={300}>บัญชี</MenuItem>
              <MenuItem
                fontWeight={400}
                color={useColorModeValue('red.400', 'red.200')}
                _hover={{ bg: useColorModeValue('red.100', 'red.600') }}
                onClick={signout}
              >
                <FaSignOutAlt className="me-2"/> ออกจากระบบ
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Container>
    </Flex>
  )
}
