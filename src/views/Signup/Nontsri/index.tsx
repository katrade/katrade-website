import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { backendRoot } from '../../../axios/instance'
import Field from './Field'
import { Student } from './interfaces/student'
export default function Nontsri() {
  const accountBoxBg = useColorModeValue('gray.50', 'gray.900')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [nontsriAccount, setNontsriAccount] = useState<Student>()
  const [confirmation, setConfirmation] = useState<{ username: string; password: string }>()
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const dividerColor = useColorModeValue('gray.300', 'gray.600')

  async function verify() {
    setError(false)
    setLoading(true)
    await backendRoot
      .post(
        '/auth/validateNontsriAccount',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        setNontsriAccount(res.data.student)
        setConfirmation({
          username: username,
          password: password,
        })
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
      })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    verify()
  }

  async function selectThisAccount() {
    await backendRoot.post('/auth/signupNontsri', 
    {
      username: confirmation?.username,
      password: confirmation?.password
    })
    .then(res => {
      if (res.data.success) {
        console.log(res.data.token)
      }
    })
  }

  return (
    <Center minH='100vh'>
      <Box className='row m-0' w='100%' maxW='900px'>
        <Box className='col-lg'>
          <Center my='20px'>
            <Image src='https://upload.wikimedia.org/wikipedia/commons/9/97/KU_Logo.png' w='30%' />
          </Center>
          <form onSubmit={handleSubmit}>
            <Box mb='20px'>
              <Text mb='10px'>บัญชีนนทรี</Text>
              <Input
                size='lg'
                variant='filled'
                placeholder='เช่น b62xxxxxxxx หรือของบุคคลกร'
                value={username}
                onChange={(e: any) => setUsername(e.target.value)}
              />
            </Box>
            <Box mb='20px'>
              <Text mb='10px'>รหัสผ่าน</Text>
              <Input
                type='password'
                size='lg'
                variant='filled'
                placeholder='รหัสผ่านบัญชีผู้ใช้นนทรี'
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </Box>
            <Button type='submit' colorScheme='teal' size='lg' w='100%'>
              ตรวจสอบ
            </Button>
          </form>
        </Box>
        <Box className='col-lg'>
          {loading ? (
            <Center my='30px'>
              <Spinner size='xl' color='teal.300' speed='1s' thickness='4px' />
            </Center>
          ) : null}
          {error ? (
            <Alert status='error' rounded={10} flexWrap='wrap'>
              <AlertIcon />
              <AlertTitle mr={2}>Authentication failed</AlertTitle>
              <AlertDescription mt='10px'>
                บัญชีผู้ใช้ นนทรี อาจไม่ถูกต้องหรืออาจเกิดข้อผิดพลาดขึ้นบนเซิร์ฟเวอร์ของเรา กรุณาลองอีกครั้ง
              </AlertDescription>
            </Alert>
          ) : null}
          {!nontsriAccount ? (
            <Alert status='info' rounded={10} flexWrap='wrap'>
              <AlertIcon />
              <AlertTitle mr={2}>ตรวจสอบบัญชีนนทรีก่อนสมัครใช้งาน katrade</AlertTitle>
              <AlertDescription mt='10px'>
                โปรดตรวจสอบบัญชีนนทรีให้ถูกต้องก่อนเชื่อมต่อเข้ากับบัญชี katrade ของคุณ
                คุณจะไม่สามารถแก้ไขข้อมูลภายหลังได้ตามนโยบายความปลอดภัยของนิสิตบนแพลทฟอร์ม katrade
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Box minH='300px' bg={accountBoxBg} rounded={20} p='20px' className='fly-in-top-2'>
                <HStack spacing='20px' flexWrap='wrap'>
                  <Avatar name={`${nontsriAccount.firstNameEn} ${nontsriAccount.lastNameEn}`} size='lg'></Avatar>
                  <Box>
                    <Text
                      fontWeight={500}
                    >{`${nontsriAccount.titleTh} ${nontsriAccount.firstNameTh} ${nontsriAccount.lastNameTh}`}</Text>
                    <Text fontWeight={500}>{`${nontsriAccount.titleEn.toUpperCase()} ${nontsriAccount.firstNameEn} ${
                      nontsriAccount.lastNameEn
                    }`}</Text>
                  </Box>
                </HStack>
                <Divider color={dividerColor} my='20px' />
                <Field title='รหัสนิสิต' text={nontsriAccount.stdCode} />
                <Field title='คณะ' text={nontsriAccount.facultyNameTh} />
                <Field title='สาขาวิชา' text={nontsriAccount.majorNameTh} />
                <Field title='วิทยาเขต' text={nontsriAccount.campusNameTh} />
                <Field title='ระดับปริญญา' text={nontsriAccount.edulevelNameTh} />
              </Box>
              <Button
                w='100%'
                size='lg'
                colorScheme='messenger'
                my='20px'
                className='fly-in-top-2'
                onClick={selectThisAccount}
              >
                <BsFillCheckCircleFill className='me-2' />
                ฉันจะสมัครบัญชีในนามของบุคคลคนนี้
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Center>
  )
}
