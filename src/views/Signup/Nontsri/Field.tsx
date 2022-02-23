import { Box, useColorModeValue, Text } from '@chakra-ui/react'

export default function Field({ title, text }: { title: string; text: string }) {
  const bgColor = useColorModeValue('gray.100', 'gray.800')
  const dynamicGreenColor = useColorModeValue('green.500', 'green.300')
  const dynamicDetailColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box p='10px' rounded={10} bg={bgColor} my='10px'>
      <Text color={dynamicGreenColor} fontWeight={500}>
        {title}
      </Text>
      <Text color={dynamicDetailColor}>{text}</Text>
    </Box>
  )
}
