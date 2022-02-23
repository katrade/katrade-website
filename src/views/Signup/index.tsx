import { Box, Button, Container, Divider, Heading, Input, Text, useColorModeValue } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { SimpleNavbar } from '../../components/SimpleNavbar'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { StyledLink } from '../../components/StyledLink'
export default function Signup() {

  async function handleGeneralUserRegister(e: any) {
    e.preventDefault()
    alert('registeration begins')
  }

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <SimpleNavbar />
      <Container maxW='container.lg' my='120px'>
        <Heading my='50px'>เลือกประเภทบัญชี katrade ที่คุณต้องการ</Heading>
        <Heading fontSize='xl' mt='60px' textDecoration='underline'>
          สมัครบัญชีนิสิต
        </Heading>
        <Text my='30px'>หากเป็นนิสิตปัจจุบัน คุณสามารถสมัครสมาชิคด้วยบัญชีนนทรีได้</Text>
        <StyledLink to='/signup/nontsri'>
          <Button colorScheme='teal'>
            <BsFillCheckCircleFill className='me-3' />
            ฉันเป็นนิสิตปัจจุบัน
          </Button>
        </StyledLink>
        <Divider my='40px' color={useColorModeValue('gray.200', 'gray.700')} />
        <Heading fontSize='xl' mt='60px' textDecoration='underline'>
          สมัครบัญชีทั่วไป
        </Heading>
        <Text my='30px'>
          ตามนโยบายความปลอดภัยของระบบ คาเทรดจะแสดงบัญชีของนิสิตมหาวิทยาลัยเกษตรศาสตร์แตกต่างออกไปจากบัญชีทั่วไป
          เพื่อให้ผู้ใช้งานทุกคนสามารถแยกแยะประเภทของผู้ใช้งานได้อย่างปลอดภัย
          *ความสามารถของบัญชีนิสิตและบัญชีทั่วไปจะไม่เท่ากัน
        </Text>
        <form onSubmit={handleGeneralUserRegister}>
          <Box my='20px'>
            <Text mb='10px' fontSize='1.2rem'>
              ชื่อจริง
            </Text>
            <Input size='lg' variant='filled' maxW='600px' placeholder='ไทยหรืออังกฤษก็ได้' />
          </Box>
          <Box my='20px'>
            <Text mb='10px' fontSize='1.2rem'>
              นามสกุล
            </Text>
            <Input size='lg' variant='filled' maxW='600px' placeholder='ไทยหรืออังกฤษก็ได้' />
          </Box>
          <Box my='20px'>
            <Text mb='10px' fontSize='1.2rem'>
              เบอร์โทรศัพท์
            </Text>
            <Input size='lg' variant='filled' maxW='600px' />
          </Box>
          <Box my='20px'>
            <Text mb='10px' fontSize='1.2rem'>
              อีเมล
            </Text>
            <Input
              type='email'
              size='lg'
              variant='filled'
              maxW='600px'
              placeholder='อีเมลที่สามารถรับข้อความยืนยันได้เท่านั้น'
            />
          </Box>
          <Box my='20px'>
            <Text mb='10px' fontSize='1.2rem'>
              รหัสผ่าน
            </Text>
            <Input type='password' size='lg' variant='filled' maxW='600px' />
          </Box>
          <Box my='20px'>
            <Text mb='10px' fontSize='1.2rem'>
              ยืนยันรหัสผ่าน
            </Text>
            <Input type='password' size='lg' variant='filled' maxW='600px' />
          </Box>
          <Box my='40px'>
            <Button type='submit' w='100%' maxW='600px' size='lg' colorScheme='messenger'>
              สร้างบัญชี
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}
