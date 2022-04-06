import { Box, Button, Center, Container, Divider, Heading, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendRoot } from '../../axios/instance'
import { useAuth } from '../../hooks/useAuth'

export default function NontsriLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { signinNontsri } = useAuth()

  async function handleSigninWithNontsri(e: any) {
    e.preventDefault()
    if (!username || !password) return alert('Some field was missing!')
    setIsLoading(true)
    await signinNontsri(username, password)
      .then(() => {
        navigate('/market')
      })
      .catch((err) => alert(err))
    setIsLoading(false)
  }

  return (
    <Container maxW='container.xl'>
      <Center minH='100vh'>
        <form onSubmit={handleSigninWithNontsri}>
          <Box textAlign='center'>
            <Heading size='lg' mb='30px'>
              เข้าสู่ระบบด้วย KU
            </Heading>
            <Text>สำหรับนิสิตมหาวิทยาลัยเกษตรศาสตร์ที่สร้างบัญชี Katrade ด้วย Nontsri account</Text>
            <Input
              minW='300px'
              mt='30px'
              size='lg'
              placeholder='เช่น b62xxxxxxxx'
              type='text'
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
            <Input
              minW='300px'
              mt='10px'
              size='lg'
              placeholder='รหัสผ่านของคุณ'
              type='password'
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button type='submit' colorScheme='teal' w='100%' h='50px' my='20px' isLoading={isLoading}>
              เข้าสู่ระบบ
            </Button>

            <Divider opacity={0.3} my='40px' />
            <Text>หากยังไม่มีบัญชี katrade</Text>
            <Button colorScheme='messenger' w='100%' h='50px' my='20px'>
              สร้างบัญชี Katrade ตอนนี้เลย
            </Button>
          </Box>
        </form>
      </Center>
    </Container>
  )
}
