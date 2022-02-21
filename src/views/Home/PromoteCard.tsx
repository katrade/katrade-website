import { AspectRatio, Badge, Box, HStack, Image, Tag, TagLabel, Text, useColorModeValue } from '@chakra-ui/react'
import { Item } from '../Market/interfaces/Item'
import { AiFillHeart } from 'react-icons/ai'

export default function PromoteCard({ data }: { data: Item }) {
  const { name, detail, _id, username, pictures, favourite } = data
  const bg = useColorModeValue('gray.50', 'gray.900')
  return (
    <Box
      minW='240px'
      w='240px'
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
        <Badge colorScheme='red' display='flex' alignItems='center' w='fit-content' my='20px'>
          <AiFillHeart className='me-2' />
          {favourite.length}
        </Badge>
      </Box>
    </Box>
  )
}
