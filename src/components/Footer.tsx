import { Box, Center, Container, Flex, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Flex minH='200px' bg='gray.900' alignItems='center'>
      <Container maxW='container.lg'>
        <Center>
          <Box textAlign='center'>
            <Text color='gray.500'>Proudly made by Computer Engineering students @Kasetsart University, Thailand.</Text>
            <Text color='white'>© 2022 Katrade</Text>
          </Box>
        </Center>
      </Container>
    </Flex>
  )
}
