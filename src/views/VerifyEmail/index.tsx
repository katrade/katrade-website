import { Button, Code, Container, Heading, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { SimpleNavbar } from '../../components/SimpleNavbar'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  return (
    <>
      <Helmet>
        <title>โปรดยืนยันอีเมลของคุณ</title>
      </Helmet>
      <SimpleNavbar />
      <Container maxW='container.lg' my='120px'>
        <Heading mt='50px' mb='20px' fontSize='xl'>สวัสดีคุณ {searchParams.get('fname')?.toUpperCase()} {searchParams.get('lname')?.toUpperCase()}</Heading>
        <Heading mb='50px' fontSize='xl'>เราได้ส่งอีเมลยืนยันการสมัครบัญชี katrade ไปที่</Heading>
        <Code p='10px' fontSize='lg' rounded={10} colorScheme='teal'>{searchParams.get('email')}</Code>
        <Text my='20px'>หากไม่ได้รับอีเมลยืนยันภายใน 5 นาที คุณสามารถ <Button size='sm'>ขออีเมลยืนยัน</Button> ได้อีกครั้ง</Text>
        <Text my='20px'>หากยืนยันเรียบร้อยแล้ว คุณสามารถ <Link to='/' style={{textDecoration: 'underline', cursor: 'pointer'}}>เข้าสู่ระบบ</Link> ด้วยบัญชีใหม่ของคุณได้ทันที</Text>
      </Container>
    </>
  )
}
