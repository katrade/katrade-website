import { AspectRatio, Box, HStack, Image, Tag, TagLabel, Text, useColorModeValue } from '@chakra-ui/react'
import { Item } from './interfaces/Item'
import { MatchInstance } from './interfaces/Match'

export default function SimpleCard({ data }: { data: Item }) {
  const { name, detail, _id, username, pictures } = data
  const bg = useColorModeValue('gray.50', 'gray.900')
  return (
    <Box
      maxW='220px'
      w={window.innerWidth < 430 ? '169px' : '100%'}
      mt='10px'
      me='10px'
      overflow='hidden'
      border='1px solid'
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      rounded={6}
      bg={bg}
    >
      <AspectRatio ratio={4 / 3} w='100%'>
        <Image src={pictures[0]} alt={`item-${_id}`} objectFit='cover' />
      </AspectRatio>
      <Box p='10px'>
        <Text whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' fontWeight={400}>
          {name}
        </Text>
        <Text
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          color={useColorModeValue('gray.500', 'gray.400')}
          fontSize='14px'
        >
          {detail}
        </Text>
        <Text
          textAlign='end'
          color={useColorModeValue('green.500', 'green.200')}
          mt='20px'
          fontWeight={400}
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          โดย {username}
        </Text>
      </Box>
    </Box>
  )
}
