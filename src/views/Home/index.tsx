import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { MdCheckCircle } from "react-icons/md";

export function Home() {
  const inputBorderColor = useColorModeValue("gray.200", "gray.700");
  const signUpCardBg = useColorModeValue("gray.50", "gray.900");
  const loginDivider = useColorModeValue("gray.300", "gray.700");
  const quoteColor = useColorModeValue("green.400", "green.200");
  return (
    <>
      <Navbar />
      <Center minHeight="100vh">
        <Container maxW="container.lg" marginY="60px">
          <Box className="row m-0">
            {/* <Image
              src="https://github.com/katrade/katrade-website/blob/master/src/pics/main5.png?raw=true"
              position="absolute"
              bottom="100px"
              right="20%"
              w="100%"
              maxW="900px"
              zIndex={-1}
              opacity={0.5}
            /> */}
            <Box className="col-lg my-5 p-4">
              <Heading
                fontSize="3rem"
                fontWeight={600}
                marginY="30px"
                className="fly-in-top-1"
              >
                <Heading
                  display="inline"
                  fontSize="3rem"
                  fontWeight={600}
                  color={quoteColor}
                >
                  แลกเปลี่ยน
                </Heading>
                สิ่งของที่ชอบ กับของที่ใช่
              </Heading>
              <Text fontSize="lg" className="fly-in-top-2">
                เริ่มต้นใช้ katrade เพื่อหาสิ่งที่คุณต้องการกับชุมชน KU ดูสิ
                ได้สร้างความสัมพันธ์กับเพื่อนๆ พี่ๆ น้องๆ รวมถึงบุคคลากรต่างคณะ
                รวมถึงยังช่วยให้มหาวิทยาลัยน่าอยู่ขึ้นด้วย
              </Text>
              <List spacing={3} marginY="40px">
                <ListItem fontSize="2.4rem" display="flex" alignItems="center">
                  <ListIcon as={MdCheckCircle} color="green.300" />
                  ได้ของ
                </ListItem>
                <ListItem fontSize="2.4rem" display="flex" alignItems="center">
                  <ListIcon as={MdCheckCircle} color="green.400" />
                  ได้เพื่อน
                </ListItem>
                <ListItem fontSize="2.4rem" display="flex" alignItems="center">
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  ลดขยะ
                </ListItem>
              </List>
            </Box>
            <Box className="col-lg my-5">
              <Box bg={signUpCardBg} padding="20px" rounded={20}>
                <VStack marginY="30px">
                  <Input
                    type="email"
                    size="lg"
                    variant="filled"
                    placeholder="Email address"
                    fontWeight={300}
                  />
                  <Input
                    type="password"
                    size="lg"
                    variant="filled"
                    placeholder="Password"
                    fontWeight={300}
                  />
                  <Button
                    size="lg"
                    w="100%"
                    colorScheme="green"
                    marginTop="30px !important"
                  >
                    เข้าสู่ระบบ
                  </Button>
                  <Divider color={loginDivider} marginY="20px !important" />
                  <Button
                    size="lg"
                    w="100%"
                    colorScheme="messenger"
                    marginTop="30px !important"
                  >
                    สมัครสมาชิก
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Box>
        </Container>
      </Center>
    </>
  );
}
