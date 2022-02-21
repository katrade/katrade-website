import {
  AspectRatio,
  Box,
  Center,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Tag,
  HStack,
  useColorModeValue,
  Divider,
  Avatar,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { backendRoot } from '../../axios/instance'
import { Navbar } from '../../components/Navbar'
import { Item } from '../Market/interfaces/Item'
import Picture from './Picture'
import { BsFillCircleFill } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import { User } from '../../interfaces/user'
import { useAuth } from '../../hooks/useAuth'
import Footer from '../../components/Footer'

export default function ItemPage() {
  const { itemId } = useParams()
  const { user } = useAuth()
  const [item, setItem] = useState<Item>()
  const [error, setError] = useState<boolean>(false)
  const [owner, setOwner] = useState<User>()

  const [currentPictureIndex, setCurentPictureIndex] = useState<number>(0)

  const detailBoxBg = useColorModeValue('gray.50', 'gray.900')
  const requirementBoxBg = useColorModeValue('gray.100', 'gray.700')
  const pictureSelctorBg = useColorModeValue('gray.200', 'gray.700')
  const detailColor = useColorModeValue('gray.500', 'gray.300')
  const dividerColor = useColorModeValue('gray.300', 'gray.600')

  async function getOwner(ownerId: string) {
    await backendRoot
      .get(`/user/searchId?id=${ownerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('t')}`,
        },
      })
      .then((res) => {
        setOwner(res.data)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }

  async function getItem() {
    await backendRoot
      .get(`/inventory/getInventoryById?id=${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('t')}`,
        },
      })
      .then((res) => {
        setItem(res.data)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }

  function isFavorite() {
    if (!item || !user) return false
    return (item.favourite.includes(user._id))
  }

  useEffect(() => {
    getItem()
  }, [])

  useEffect(() => {
    if (item) getOwner(item.owner)
  }, [item])

  if (!item)
    return (
      <Center minH='100vh'>
        <CircularProgress isIndeterminate color='green.300' />
      </Center>
    )

  return (
    <>
      <Navbar />
      <Container maxW='container.lg' py='100px'>
        <Heading mb='30px'>{item.name}</Heading>
        <HStack>
          <Tag colorScheme='green'>{item.category.parentCategoryTh}</Tag>
          <Tag colorScheme='green'>{item.category.childCategoryTh}</Tag>
        </HStack>
        <Box className='row' mt='40px' mx='0'>
          <Box className='col-lg ps-0'>
            <AspectRatio
              ratio={4 / 3}
              minH='200px'
              maxH='100%'
              boxShadow='0 30px 30px #0000001d'
              rounded={10}
              overflow='hidden'
            >
              <Image src={item.pictures[currentPictureIndex]} />
            </AspectRatio>
            <Flex bg={pictureSelctorBg} p='10px' rounded={10} mt='20px'>
              {item.pictures.map((pic, index) => (
                <Picture
                  src={pic}
                  index={index}
                  key={index}
                  currentIndex={currentPictureIndex}
                  set={setCurentPictureIndex}
                />
              ))}
            </Flex>
            <Flex w='100%' my='20px'>
              <Flex w='50%' pr='10px'>
                <Button w='full' size='lg' colorScheme='red' variant={isFavorite() ? 'solid' : 'outline'}>
                  <AiFillHeart size='20px'/>
                </Button>
              </Flex>
              <Flex w='50%' pl='10px'>
                <Button w='full' size='lg' colorScheme='green' fontSize='20px'>
                  แลกเปลี่ยน
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box className='col-lg'>
            <Box p='20px' bg={detailBoxBg} rounded={20} className='fly-in-top-1'>
              <Heading fontSize='1.4rem' mb='20px' display='flex' alignItems='center'>
                <BsFillCircleFill className='me-2' color='#1ee68f' />
                รายละเอียด
              </Heading>
              <Text color={detailColor}>{item.detail}</Text>
              <Divider my='20px' color={dividerColor} />
              <Heading fontSize='1.4rem' mb='20px' display='flex' alignItems='center'>
                <BsFillCircleFill className='me-2' color='#ffcc54' />
                ความต้องการ
              </Heading>
              {item.require.map((req, index) => (
                <Box p='10px' bg={requirementBoxBg} rounded={10} mb='10px'>
                  <Text>
                    {req.reqCat.parentCategoryTh} {'>'} {req.reqCat.childCategoryTh}
                  </Text>
                  <Text color={detailColor}>{req.detail}</Text>
                </Box>
              ))}
            </Box>
            {!owner ? null : (
              <Box mt='20px' p='20px' bg={detailBoxBg} rounded={20} className='fly-in-top-2'>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Flex alignItems='center'>
                    <Avatar
                      name={`${owner.firstname} ${owner.lastname}`}
                      src={owner.profilePic}
                      size='md'
                      className='me-3'
                    />
                    <Text fontWeight={500}>{`${owner.firstname} ${owner.lastname}`.toUpperCase()}</Text>
                  </Flex>
                  <HStack>
                    <Button colorScheme='blue' variant='outline' size='sm'>
                      แชท
                    </Button>
                    <Button colorScheme='blue' variant='outline' size='sm'>
                      ติดตาม
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
