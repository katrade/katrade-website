import { Box, Center, Container, Flex, Text } from '@chakra-ui/react'
import { AiFillGithub } from 'react-icons/ai'

export default function Footer() {
  return (
    <Flex minH='200px' bg='gray.900' alignItems='center'>
      <Container maxW='container.lg'>
        <Center>
          <Box textAlign='center'>
            <Text color='gray.500'>
              ✌🏻 Proudly made by Computer Engineering students @Kasetsart University, Thailand.
            </Text>
            <Center my='20px'>
              <AiFillGithub color='#ffffff70' size='30px'/>
            </Center>
          </Box>
        </Center>
      </Container>
    </Flex>
  )
}
