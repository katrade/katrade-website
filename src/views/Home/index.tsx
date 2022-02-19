import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Divider,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { SimpleNavbar } from '../../components/SimpleNavbar'

export function Home() {
  const inputBorderColor = useColorModeValue('gray.200', 'gray.700')
  const signUpCardBg = useColorModeValue('gray.50', 'gray.900')
  const loginDivider = useColorModeValue('gray.300', 'gray.700')
  const quoteColor = useColorModeValue('green.400', 'green.200')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState(false)

  const { signin, user } = useAuth()
  const navigate = useNavigate()

  async function handleFormSubmit(e: any) {
    e.preventDefault()
    setIsLoading(true)
    setError(false)
    signin(email, password)
      .then(() => {
        onClose()
      })
      .catch((error) => {
        setError(true)
        onClose()
      })
  }
  function onClose() {
    setIsLoading(false)
  }
  return (
    <>
      <SimpleNavbar />
      <Center minHeight='100vh'>
        <Modal isOpen={isLoading} onClose={onClose} isCentered closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent w='fit-content' bg='transparent' boxShadow='none' border='none'>
            <CircularProgress isIndeterminate color='green.300' />
          </ModalContent>
        </Modal>
        <Container maxW='container.lg' marginY='60px'>
          <Box className='row m-0'>
            {/* <Image
              src="https://github.com/katrade/katrade-website/blob/master/src/pics/main5.png?raw=true"
              position="absolute"
              bottom="100px"
              right="20%"
              w="100%"
              maxW="900px"
              zIndex={-1}
              opacity={0.5}
            /> */}
            <Box className='col-lg my-5 p-4'>
              <Heading fontSize='3rem' fontWeight={600} marginY='30px' className='fly-in-top-1'>
                <Heading display='inline' fontSize='3rem' fontWeight={600} color={quoteColor}>
                  แลกเปลี่ยน
                </Heading>
                สิ่งของที่ชอบ กับของที่ใช่
              </Heading>
              <Text fontSize='lg' className='fly-in-top-2'>
                เริ่มต้นใช้ katrade เพื่อหาสิ่งที่คุณต้องการกับชุมชน KU ดูสิ ได้สร้างความสัมพันธ์กับเพื่อนๆ พี่ๆ น้องๆ
                รวมถึงบุคคลากรต่างคณะ รวมถึงยังช่วยให้มหาวิทยาลัยน่าอยู่ขึ้นด้วย
              </Text>
              <List spacing={3} marginY='40px'>
                <ListItem fontSize='2.4rem' display='flex' alignItems='center'>
                  <ListIcon as={MdCheckCircle} color='green.300' />
                  ได้ของ
                </ListItem>
                <ListItem fontSize='2.4rem' display='flex' alignItems='center'>
                  <ListIcon as={MdCheckCircle} color='green.400' />
                  ได้เพื่อน
                </ListItem>
                <ListItem fontSize='2.4rem' display='flex' alignItems='center'>
                  <ListIcon as={MdCheckCircle} color='green.500' />
                  ลดขยะ
                </ListItem>
              </List>
            </Box>
            <Box className='col-lg my-5'>
              {!user ? null : (
                <VStack marginBottom='30px' className='fly-in-top-1'>
                  <Text fontWeight={500}>ดำเนินการต่อในชื่อ</Text>
                  <Button h='auto' py='10px' w='100%' colorScheme='gray' onClick={() => navigate('/market')}>
                    <Avatar
                      size='md'
                      cursor='pointer'
                      name={user ? `${user?.firstname} ${user?.lastname}` : ''}
                      src={user?.profilePic}
                      me='20px'
                    />
                    <Text fontWeight={300} fontSize='lg'>
                      {user ? `${user.firstname} ${user.lastname}` : ''}
                    </Text>
                  </Button>
                </VStack>
              )}

              <Box
                bg={signUpCardBg}
                padding='20px'
                rounded={20}
                boxShadow={useColorModeValue('0 50px 60px #0000001e', '0 50px 60px #0000004f')}
                className='fly-in-top-2'
              >
                <form onSubmit={handleFormSubmit}>
                  <VStack marginY='30px'>
                    <Input
                      type='email'
                      size='lg'
                      variant='filled'
                      placeholder='Email address'
                      fontWeight={300}
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                    <Input
                      type='password'
                      size='lg'
                      variant='filled'
                      placeholder='Password'
                      fontWeight={300}
                      value={password}
                      onChange={(e: any) => setPassword(e.target.value)}
                    />
                    {!error ? null : (
                      <Alert status='error' fontWeight={300} rounded={10}>
                        <AlertIcon />
                        อีเมลหรือรหัสผ่านไม่ถูกต้อง ลองอีกครั้ง
                      </Alert>
                    )}
                    <Button
                      size='lg'
                      w='100%'
                      colorScheme='green'
                      marginTop='30px !important'
                      type='submit'
                      disabled={email === '' || password == ''}
                    >
                      เข้าสู่ระบบ
                    </Button>
                    <Divider color={loginDivider} marginY='20px !important' />
                    <Button size='lg' w='100%' colorScheme='messenger' marginTop='30px !important'>
                      สมัครสมาชิก
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Box>
          </Box>
        </Container>
      </Center>
    </>
  )
}
