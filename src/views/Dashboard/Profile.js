import React from "react";
// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import image from "assets/img/image.jpg";
import consultancyImage from "assets/img/consultancyImage.jpg";
import black_owned_tech from "assets/img/black_owned_tech.jpg";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

function Profile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");

  return (
    <Flex direction="column">
      <Box
        mb={{ sm: "205px", md: "75px", xl: "70px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          bgImage={ProfileBgImage}
          w="100%"
          h="300px"
          borderRadius="25px"
          bgPosition="50%"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{ sm: "column", md: "row" }}
            mx="1.5rem"
            maxH="330px"
            w={{ sm: "90%", xl: "95%" }}
            justifyContent={{ sm: "center", md: "space-between" }}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(45%)",
              md: "translateY(110%)",
              lg: "translateY(160%)",
            }}
          >
            <Flex
              align="center"
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Avatar
                me={{ md: "22px" }}
                src={avatar4}
                w="80px"
                h="80px"
                borderRadius="15px"
              />
              <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color={textColor}
                  fontWeight="bold"
                  ms={{ sm: "8px", md: "0px" }}
                >
                  Pilolo pilolo
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={emailColor}
                  fontWeight="semibold"
                >
                  pilolo@samlex.com
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={{ sm: "column", lg: "row" }}
              w={{ sm: "100%", md: "50%", lg: "auto" }}
            >
              <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                <Flex
                  align="center"
                  w={{ sm: "100%", lg: "135px" }}
                  bg="hsla(0,0%,100%,.3)"
                  borderRadius="15px"
                  justifyContent="center"
                  py="10px"
                  boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                  border="1px solid gray.200"
                  cursor="pointer"
                >
                  <Icon as={FaCube} me="6px" />
                  <Text fontSize="xs" color={textColor} fontWeight="bold">
                    OVERVIEW
                  </Text>
                </Flex>
              </Button>
              <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                <Flex
                  align="center"
                  w={{ lg: "135px" }}
                  borderRadius="15px"
                  justifyContent="center"
                  py="10px"
                  mx={{ lg: "1rem" }}
                  cursor="pointer"
                >
                  <Icon as={IoDocumentsSharp} me="6px" />
                  <Text fontSize="xs" color={textColor} fontWeight="bold">
                    TEAMS
                  </Text>
                </Flex>
              </Button>
              <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                <Flex
                  align="center"
                  w={{ lg: "135px" }}
                  borderRadius="15px"
                  justifyContent="center"
                  py="10px"
                  cursor="pointer"
                >
                  <Icon as={FaPenFancy} me="6px" />
                  <Text fontSize="xs" color={textColor} fontWeight="bold">
                    PROJECTS
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap="22px">
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Platform Settings
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.500" fontWeight="600" mb="20px">
                ACCOUNT
              </Text>
              <Flex align="center" mb="20px">
                <Switch colorScheme="#5A8100" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Email me when someone follows me
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="#5A8100" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Email me when someone answers on my post
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="#5A8100" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Email me when someone mentions me
                </Text>
              </Flex>
              <Text
                fontSize="sm"
                color="gray.500"
                fontWeight="600"
                m="6px 0px 20px 0px"
              >
                APPLICATION
              </Text>
              <Flex align="center" mb="20px">
                <Switch colorScheme="#5A8100" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  New launches and projects
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="#5A8100" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Monthly product changes
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="#5A8100" me="10px" />
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Subscribe to newsletter
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
                Hi, I’m Pilolus Piolo, Decisions: I'm part of the samlex organization employed in 2020 
                and under the sales and lead department. 
              </Text>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Full Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                Pilolus Piolo
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Mobile:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  (+234) 123 1234 12
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Email:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  pilolo@samlex.com
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Department:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  Sales
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Social Media:{" "}
                </Text>
                <Flex>
                  <Link
                    href="#"
                    color="#5A8100"
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "#5A8100" }}
                  >
                    <Icon as={FaFacebook} />
                  </Link>
                  <Link
                    href="#"
                    color="#5A8100"
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "#5A8100" }}
                  >
                    <Icon as={FaInstagram} />
                  </Link>
                  <Link
                    href="#"
                    color="#5A8100"
                    fontSize="lg"
                    me="10px"
                    _hover={{ color: "#5A8100" }}
                  >
                    <Icon as={FaTwitter} />
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Also under Sales
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column" w="100%">
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar2}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                      Sales Director (Atali branch)
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="#5A8100"
                    alignSelf="center"
                  >
                    MORE
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar3}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                      Sales Director (Awka branch)
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="#5A8100"
                    alignSelf="center"
                  >
                    MORE
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src={avatar4}
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                    Sales personnel (Atali branch)
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="#5A8100"
                    alignSelf="center"
                  >
                    MORE
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Card p="16px" my="24px">
        <CardHeader p="12px 5px" mb="12px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Departments
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              Awka Branch
            </Text>
          </Flex>
        </CardHeader>
        <CardBody px="5px">
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap="24px"
          >
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={consultancyImage} borderRadius="15px" />
                <Box
                  w="100%"
                  h="100%"
                  position="absolute"
                  top="0"
                  borderRadius="15px"
                  bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                ></Box>
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
                  Department #1
                </Text>
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  mb="10px"
                >
                  Consultants
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                  Tasked with offereing advice and insights to the organization
                </Text>
                <Flex justifyContent="space-between">
                  <Button
                    variant="outline"
                    colorScheme="#5A8100"
                    minW="110px"
                    h="36px"
                    fontSize="xs"
                    px="1.5rem"
                  >
                    VIEW MEMBERS
                  </Button>
                  <AvatarGroup size="xs">
                    <Avatar name="Ryan Florence" src={avatar6} />
                    <Avatar name="Segun Adebayo" src={avatar2} />
                    <Avatar name="Kent Dodds" src={avatar3} />
                    <Avatar name="Prosper Otemuyiwa" src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={black_owned_tech} borderRadius="15px" />
                <Box
                  w="100%"
                  h="100%"
                  position="absolute"
                  top="0"
                  borderRadius="15px"
                  bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                ></Box>
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
                Department #2
                </Text>
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  mb="10px"
                >
                  Marketers
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                  They advertise the company's premium products and seek to make sales
                </Text>
                <Flex justifyContent="space-between">
                  <Button
                    variant="outline"
                    colorScheme="#5A8100"
                    minW="110px"
                    h="36px"
                    fontSize="xs"
                    px="1.5rem"
                  >
                    VIEW MEMBERS
                  </Button>
                  <AvatarGroup size="xs">
                    <Avatar name="Ryan Florence" src={avatar6} />
                    <Avatar name="Segun Adebayo" src={avatar2} />
                    <Avatar name="Kent Dodds" src={avatar3} />
                    <Avatar name="Prosper Otemuyiwa" src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={image} borderRadius="15px" />
                <Box
                  w="100%"
                  h="100%"
                  position="absolute"
                  top="0"
                  borderRadius="15px"
                  bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                ></Box>
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.500" fontWeight="600" mb="10px">
                  Department #3
                </Text>
                <Text
                  fontSize="xl"
                  color={textColor}
                  fontWeight="bold"
                  mb="10px"
                >
                  Customer Care 
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                  Concerned with customer satisfaction and ensuring that products work as advertised
                </Text>
                <Flex justifyContent="space-between">
                  <Button
                    variant="outline"
                    colorScheme="#5A8100"
                    minW="110px"
                    h="36px"
                    fontSize="xs"
                    px="1.5rem"
                  >
                    VIEW MEMBERS
                  </Button>
                  <AvatarGroup size="xs">
                    <Avatar name="Ryan Florence" src={avatar6} />
                    <Avatar name="Segun Adebayo" src={avatar2} />
                    <Avatar name="Kent Dodds" src={avatar3} />
                    <Avatar name="Prosper Otemuyiwa" src={avatar4} />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Button
              p="0px"
              bg="transparent"
              color="gray.500"
              border="1px solid lightgray"
              borderRadius="15px"
              minHeight={{ sm: "200px", md: "100%" }}
            >
              <Flex
                direction="column"
                justifyContent="center"
                align="center"
              >
                <Icon as={FaPlus} fontSize="lg" mb="12px" />
                <Text fontSize="lg" fontWeight="bold">
                  Create a New Department
                </Text>
              </Flex>
            </Button>
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Profile;
