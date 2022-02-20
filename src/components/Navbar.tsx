import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
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
  Switch,
  Text,
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
        <div className='desktop-only'>
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
                  <FaSignOutAlt className='me-2' /> ออกจากระบบ
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </div>
        <div className='mobile-only'>
          <Menu>
            <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} variant='outline' />
            <MenuList>
              <Flex p='20px' alignItems='center' bg='green.400' color='white'>
                <Avatar
                  size='sm'
                  cursor='pointer'
                  name={user ? `${user?.firstname} ${user?.lastname}` : ''}
                  src={user?.profilePic}
                  me='20px'
                />
                <Text fontWeight={500} fontSize='md'>
                  {user ? `${user.firstname}  ${user?.lastname[0]}.`.toUpperCase() : ''}
                </Text>
              </Flex>
              <Flex alignItems='center' padding='20px' bg={useColorModeValue('gray.200', 'gray.800')}>
                <Text me='20px'>
                  <MoonIcon me='10px' />
                  โหมดกลางคืน
                </Text>
                <Switch colorScheme='green' isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
              </Flex>
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
                <FaSignOutAlt className='me-2' /> ออกจากระบบ
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Container>
    </Flex>
  )
}
