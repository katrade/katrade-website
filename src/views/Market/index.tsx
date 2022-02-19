import { Box, Center, Container, Flex, Grid, GridItem, Heading, HStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { backendRoot } from '../../axios/instance'
import { Navbar } from '../../components/Navbar'
import AuthWrapper from '../../components/Wrapper/AuthWrapper'
import { useAuth } from '../../hooks/useAuth'
import Card from './Card'
import { Item } from './interfaces/Item'
import { MatchInstance } from './interfaces/Match'
import SimpleCard from './SimpleCard'

export default function Market() {
  const [matchItems, setMatchItems] = useState<MatchInstance[]>()
  const [allItems, setAllItems] = useState<Item[]>()
  const [show, setShow] = useState<boolean>(false)
  const { user } = useAuth()

  async function getMatchItems() {
    const response = await backendRoot.get('/inventory/getMatch', {
      headers: { Authorization: `Bearer ${localStorage.getItem('t')}` },
    })
    setMatchItems(response.data)
  }

  async function getAllItems() {
    const response = await backendRoot.get('/inventory/getAllInventory', {
      headers: { Authorization: `Bearer ${localStorage.getItem('t')}` },
    })
    setAllItems(response.data)
  }

  useEffect(() => {
    getMatchItems()
    getAllItems()
  }, [])

  useEffect(() => {
    if (matchItems && allItems) setShow(true)
  }, [matchItems, allItems])

  if (!show) return null
  return (
    <>
      <Navbar />
      <Container maxW='container.xl' marginY={40}>
        <Heading fontSize='1.8rem'>
          สวัสดี {user?.firstname} {user?.lastname}
        </Heading>
        <Box my='30px' className='fly-in-bottom-1'>
          <Text fontSize='lg'>ตรงกับคุณ</Text>
          <Flex flexWrap='wrap'>
            {matchItems?.map((item: MatchInstance, id: number) => (
              <Card data={item} key={id} />
            ))}
          </Flex>
        </Box>
        <Box my='30px' className='fly-in-bottom-4'>
          <Text fontSize='lg'>ยอดนิยม</Text>
          <Flex flexWrap='wrap'>
            {allItems?.map((item: Item, id: number) => (
              <SimpleCard data={item} key={id} />
            ))}
          </Flex>
        </Box>
      </Container>
    </>
  )
}
