import {
  Alert,
  AlertIcon,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
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
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { SimpleNavbar } from '../../components/SimpleNavbar'
import { Item } from '../Market/interfaces/Item'
import { backendRoot } from '../../axios/instance'
import PromoteCard from './PromoteCard'
import { BiWorld } from 'react-icons/bi'
import Footer from '../../components/Footer'
import { Helmet } from 'react-helmet'
import { StyledLink } from '../../components/StyledLink'
import earthImg from '../../images/earth.png'
export function Home() {
  const inputBorderColor = useColorModeValue('gray.200', 'gray.700')
  const signUpCardBg = useColorModeValue('gray.50', 'gray.900')
  const loginDivider = useColorModeValue('gray.300', 'gray.700')
  const quoteColor = useColorModeValue('green.400', 'green.200')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState(false)

  const [allItems, setAllItems] = useState<Item[]>()

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

  async function getAllItems() {
    const response = await backendRoot.get('/inventory/getAllInventory', {
      headers: { Authorization: `Bearer ${localStorage.getItem('t')}` },
    })
    setAllItems(response.data)
  }

  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <>
      <Helmet>
        <title>Katrade - Trade your items</title>
      </Helmet>
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
                    <StyledLink to='/signin/nontsri' style={{ width: '100%' }}>
                      <Button size='lg' w='100%' colorScheme='teal' marginTop='30px !important'>
                        เข้าสู่ระบบด้วย KU
                      </Button>
                    </StyledLink>
                    <StyledLink to='/signup' style={{ width: '100%' }}>
                      <Button size='lg' w='100%' colorScheme='messenger' marginTop='10px !important'>
                        สมัครสมาชิก
                      </Button>
                    </StyledLink>
                  </VStack>
                </form>
              </Box>
            </Box>
          </Box>
          {!allItems ? null : (
            <Box my='60px' className='fly-in-top-2'>
              <Heading textAlign='center' mb='30px'>
                มองหาสิ่งเหล่านี้อยู่หรือไม่?
              </Heading>
              <Flex overflow='auto' py='30px'>
                {allItems
                  .filter((item) => item.favourite.length > 0)
                  .map((item: Item, id: number) => (
                    <PromoteCard data={item} key={id} />
                  ))}
              </Flex>
            </Box>
          )}
        </Container>
      </Center>
      <Box bg='gray.900'>
        <Container maxW='container.lg' py='60px' color='white'>
          <Box className='row m-0'>
            <Box className='col-lg'>
              <Heading fontSize='5.5rem'>
                ลด
                <Heading as='span' color='green.200' fontSize='5.5rem'>
                  ขยะ
                </Heading>
              </Heading>
              <Text fontSize='3rem' fontWeight={400}>
                จากสิ่งของที่ไม่ใช้แล้ว
              </Text>
              <Box my='50px'>
                <Text fontSize='lg'>
                  สิ่งของที่คุณไม่ใช้แล้ว ไม่ใช่ขยะเสมอไปเพราะอาจมีคนต้องการมัน ลองนำไปแลกดูสิ
                  คุณอาจจะได้สิ่งที่เป็นประโยชน์สำหรับคุณกลับมา
                </Text>
                <Button bg='green.400' color='white' my='20px' _hover={{ bg: undefined }}>
                  อ่านบทความ
                </Button>
              </Box>
            </Box>
            <Flex className='col-lg' justifyContent='center'>
              {/* <BiWorld color='#09e89e' size='80%'/> */}
              <Image
                src={earthImg}
                alt='earth'
                boxSize='300px'
              />
            </Flex>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  )
}
