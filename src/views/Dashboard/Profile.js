import React from "react";
// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Icon,
  Select,
  SimpleGrid,
  VStack,
  Flex,
  Image,
  Link,
  Switch,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
  background
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
import avatar7 from "assets/img/avatars/male.jpg";
import avatar8 from "assets/img/avatars/female.png";
import image from "assets/img/image.jpg";
import consultancyImage from "assets/img/consultancyImage.jpg";
import black_owned_tech from "assets/img/black_owned_tech.jpg";
import ProfileBgImage from "assets/img/tech_background.jpg";
import { Separator } from "components/Separator/Separator";
import { AiOutlineNumber } from 'react-icons/ai';
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
  FaRegAddressCard,
  FaCity,
} from "react-icons/fa";

import { GiPadlock } from 'react-icons/gi';
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import {
  BsPersonFill,
  BsPersonFillAdd,
  BsFillTelephoneFill,
  BsFillFlagFill

} from 'react-icons/bs';
import {
  MdEmail,


} from 'react-icons/md';
import { IoDocumentsSharp } from "react-icons/io5";
import { checkObject, isError } from 'modules/utilities';
import { handleApiError } from "modules/utilities/responseHandlers";
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { useToast } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { useSelector } from 'react-redux';
import { GET_PROFILE, GET_CREATE_USERS } from 'config/serverUrls';
import { fetchData, postData } from 'modules/utilities/util_query';
import validator from 'validator';
// import toast from 'react-hot-toast';

function Profile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.300", "white");
  const bgProfile = "linear-gradient(112.83deg, rgba(42, 44, 62, 0.21) 0%, rgba(42, 44, 64, 0) 110.84%)";
  const borderProfileColor = "#2ac40";
  const emailColor = useColorModeValue("gray.400", "gray.300");

  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  //
  const [profile, setProfile] = React.useState({});
  const [members, setMembers] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [permissions, setPermissions] = React.useState({
    customer_perm: false,
    items_perm: false,
    item_kits_perm: false,
    suppliers_perm: false,
    reports_perm: false,
    receivings_perm: false,
    sales_perm: false,
    employees_perm: false
  });
  const [errors, setErrors] = React.useState({});
  const token = useSelector(getAuthToken);
  const toast = useToast();
  const history = useHistory();

  const payload_data = {}

  const result = useQuery(['users',
    {
      url: GET_PROFILE,
      payload_data,
      authenticate: true,
      token
    }],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data;
        setProfile(data?.detail || {});
        console.log(data?.others);
        setMembers(data?.others);


      },
      onError: (error) => {
        handleApiError(error);
      }
    }
  );

  const { isLoading, refetch } = result;

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      toast({
        title: 'Success',
        description: "User created succesfully",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return;
    },
    onError: (error) => {
      handleApiError(error);
    }
  });

  const validate = () => {
    let uerrors = {}
    uerrors.first_name = values?.first_name ? "" : FIELD_REQUIRED;
    uerrors.last_name = values?.last_name ? "" : FIELD_REQUIRED;
    uerrors.username = values?.username ? "" : FIELD_REQUIRED;
    uerrors.email = values?.email ? "" : FIELD_REQUIRED;
    uerrors.password = values?.password ? "" : FIELD_REQUIRED;
    uerrors.confirmPassword = values?.confirmPassword ? "" : FIELD_REQUIRED;

    if (!values?.first_name || !values?.last_name || !values?.username || !values?.password ||
      !values?.confirmPassword || !values?.email) {
      toast({
        title: 'Missing Information.',
        description: "Please fill all required fields.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return uerrors;

    }

    const email_is_valid = validator.isEmail(values?.email);

    if (!email_is_valid) {
        uerrors.email = "enter a valid email address";
        toast({
            title: 'Invalid Field.',
            description: "Please enter a valid email address",
            status: 'warning',
            duration: 3000,
            isClosable: true,
        });
        return uerrors;
    }

    if (values?.password != values?.confirmPassword) {
      uerrors.password = "Password do not match";
      uerrors.confirmPassword = "Password do not match";
      alert('Passwords do not match');
    }

    return uerrors;
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSwitchChange = (event) => {
    setPermissions({ ...permissions, [event.target.name]: !permissions[event.target.name] });
  }

  const handleSubmit = () => {

    let checkErrors = validate();
    let areAllFieldsFalse = checkObject(checkErrors);

    if (!areAllFieldsFalse) {
      // if there are errors
      // set to state and terminate
      setErrors(checkErrors);
      return;
    }



    const data = { ...values, ...permissions };

    mutation.mutate({
      url: GET_CREATE_USERS,
      payload_data: data,
      token: token,
      authenticate: true
    });
    setValues({});
    setPermissions({
        customer_perm: false,
        items_perm: false,
        item_kits_perm: false,
        suppliers_perm: false,
        reports_perm: false,
        receivings_perm: false,
        sales_perm: false,
        employees_perm: false      
    });
    setErrors({});


    return;
  }

  if (isLoading) {
    return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Center>
          <Spinner size='xl' />
        </Center>
      </Flex>
    )
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bgColor="#232333"
          borderColor="gray.900"
          color="white"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
        >
          <DrawerCloseButton />
          <DrawerHeader>Create New Employee</DrawerHeader>

          <DrawerBody>
            <VStack spacing={2} maxW="full">
              <Text fontSize="md" fontWeight="600">
                Basic Information
              </Text>
              <FormControl id="">
                <FormLabel fontSize='sm'>First Name:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsPersonFill color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.first_name)}
                    errorBorderColor='red.300'
                    name={'first_name'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.first_name || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="first name" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Last Name:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsPersonFill color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.last_name)}
                    errorBorderColor='red.300'
                    name={'last_name'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.last_name || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="last name" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Gender:</FormLabel>
                <Select name={"gender"}
                  onChange={handleChange}
                  value={values?.gender || ''}
                  placeholder='Select option'
                  borderRadius='15px'
                  borderColor="rgba(255, 255, 255, 0.2)"
                  size="sm">
                  <option style={{ backgroundColor:'#232333'}} value='male'>Male</option>
                  <option style={{ backgroundColor:'#232333'}} value='female'> Female</option>
                </Select>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Department:</FormLabel>
                <Select name={"dept"}
                  onChange={handleChange}
                  value={values?.dept || ''}
                  borderRadius='15px'
                  borderColor="rgba(255, 255, 255, 0.2)"
                  placeholder='Select option'
                  size="sm">
                  <option style={{ backgroundColor:'#232333'}} value='tech'>Tech</option>
                  <option style={{ backgroundColor:'#232333'}} value='ICT'> ICT</option>
                  <option style={{ backgroundColor:'#232333'}} value='sales'> Sales</option>
                  <option style={{ backgroundColor:'#232333'}} value='admin'> Admin</option>
                </Select>
              </FormControl>

              <FormControl id="">
                <FormLabel fontSize='sm'>E-mail</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.email)}
                    errorBorderColor='red.300'
                    name={'email'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.email || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Email" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Phone Number:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsFillTelephoneFill color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.phone_no)}
                    errorBorderColor='red.300'
                    name={'phone_no'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.phone_no || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Phone number" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Address 1:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaRegAddressCard color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.address_1)}
                    errorBorderColor='red.300'
                    name={'address_1'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.address_1 || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Address 1" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Address 2:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaRegAddressCard color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.address_2)}
                    errorBorderColor='red.300'
                    name={'address_2'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.address_2 || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Address 2" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>City:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaCity color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.city)}
                    errorBorderColor='red.300'
                    name={'city'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.city || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="City" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>State:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaCity color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.state)}
                    errorBorderColor='red.300'
                    name={'state'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.state || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="State" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Zip:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AiOutlineNumber color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.zip)}
                    errorBorderColor='red.300'
                    name={'zip'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.zip || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Zip" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Country:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsFillFlagFill color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.country)}
                    errorBorderColor='red.300'
                    name={'country'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.country || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Country" />
                </InputGroup>
              </FormControl>
              <Box my="2" />
              <Separator />
              <Text fontSize="md" fontWeight="600">
                Login Info
              </Text>
              <FormControl id="">
                <FormLabel fontSize='sm'>Username:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsPersonFill color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.username)}
                    errorBorderColor='red.300'
                    name={'username'}
                    onChange={handleChange}
                    type="text"
                    size="sm"
                    value={values?.username || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Username" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Password:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<GiPadlock color="gray.800" />}
                  />
                  <Input
                    isInvalid={isError(errors?.password)}
                    errorBorderColor='red.300'
                    name={'password'}
                    onChange={handleChange}
                    type="password"
                    size="sm"
                    value={values?.password || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="Password" />
                </InputGroup>
              </FormControl>
              <FormControl id="">
                <FormLabel fontSize='sm'>Password again:</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<GiPadlock color="gray.800" />}
                  />
                  <Input
                    type='password'
                    isInvalid={isError(errors?.confirmPassword)}
                    errorBorderColor='red.300'
                    placeholder={'confirm password'}
                    name={'confirmPassword'}
                    size="sm"
                    value={values?.confirmPassword || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <Box my="2" />
              <Separator />
              <Text fontSize="md" fontWeight="600">
                Permissions and Access
              </Text>
              <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Customers(add, update, delete, search)</FormLabel>

                  <Switch
                    isChecked={permissions?.customer_perm}
                    onChange={handleSwitchChange}
                    name={"customer_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Items(add, update, delete, search)</FormLabel>
                  <Switch
                    isChecked={permissions?.items_perm}
                    onChange={handleSwitchChange}
                    name={"items_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
              </Grid>
              <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Item Kits(add, update, delete, search).</FormLabel>
                  <Switch
                    isChecked={permissions?.item_kits_perm}
                    onChange={handleSwitchChange}
                    name={"item_kits_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Suppliers(add, update, delete, search)</FormLabel>
                  <Switch
                    isChecked={permissions?.suppliers_perm}
                    onChange={handleSwitchChange}
                    name={"suppliers_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
              </Grid>
              <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Reports(add, update, delete, search)</FormLabel>
                  <Switch
                    isChecked={permissions?.reports_perm}
                    onChange={handleSwitchChange}
                    name={"reports_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Receivings(add, update, delete, search)</FormLabel>
                  <Switch
                    isChecked={permissions?.receivings_perm}
                    onChange={handleSwitchChange}
                    name={"receivings_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
              </Grid>
              <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Sales(add, update, delete, search)</FormLabel>
                  <Switch
                    isChecked={permissions?.sales_perm}
                    onChange={handleSwitchChange}
                    name={"sales_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
                <FormControl id="">
                  <FormLabel fontSize='xs'>Employees(add, update, delete, search)</FormLabel>
                  <Switch
                    isChecked={permissions?.employees_perm}
                    onChange={handleSwitchChange}
                    name={"employees_perm"}
                    size="md"
                    colorScheme="blue"
                  />
                </FormControl>
              </Grid>
            </VStack>

          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={handleSubmit}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
            border="2px solid"
            borderColor="white"
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
              //border="2px solid"
              //borderColor={borderProfileColor}
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
                  src={profile?.gender == "female" ? avatar8 : avatar7}
                  w="80px"
                  h="80px"
                  borderRadius="15px"
                />
                <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                  <Text
                    fontSize={{ sm: "lg", lg: "xl" }}
                    color={"black"}
                    fontWeight="bold"
                    ms={{ sm: "8px", md: "0px" }}
                  >
                    {profile?.first_name + " " + profile?.last_name}
                  </Text>
                  <Text
                    fontSize={{ sm: "sm", md: "md" }}
                    color={emailColor}
                    fontWeight="semibold"
                  >
                    {profile?.email}
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
                    <Text fontSize="xs" color={"black"} fontWeight="bold">
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
                    <Text fontSize="xs" color={"black"} fontWeight="bold">
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
                    <Text fontSize="xs" color={"black"} fontWeight="bold">
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
                  <Switch colorScheme="blue" me="10px" />
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
                  <Switch colorScheme="blue" me="10px" />
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
                  <Switch colorScheme="blue" me="10px" />
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
                  <Switch colorScheme="blue" me="10px" />
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
                  <Switch colorScheme="blue" me="10px" />
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
                  <Switch colorScheme="blue" me="10px" />
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
                  Hi, I’m {profile?.first_name + " " + profile?.last_name}. I'm currently working at
                  Samlex Electronics Company and under the {profile?.dept} department.
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
                    {profile?.first_name + " " + profile?.last_name}
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
                    {profile?.phone_no}
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
                    {profile?.email}
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
                    {profile?.dept}
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
                      color="#4285f4"
                      fontSize="lg"
                      me="10px"
                      _hover={{ color: "#4285f4" }}
                    >
                      <Icon as={FaFacebook} />
                    </Link>
                    <Link
                      href="#"
                      color="#4285f4"
                      fontSize="lg"
                      me="10px"
                      _hover={{ color: "#4285f4" }}
                    >
                      <Icon as={FaInstagram} />
                    </Link>
                    <Link
                      href="#"
                      color="#4285f4"
                      fontSize="lg"
                      me="10px"
                      _hover={{ color: "#4285f4" }}
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
                {members.map((member, index) => {
                  return (
                    <Flex key={index} justifyContent="space-between" mb="21px">
                      <Flex align="center">
                        <Avatar
                          src={member?.gender == "female" ? avatar8 : avatar7}
                          w="50px"
                          h="50px"
                          borderRadius="15px"
                          me="10px"
                        />
                        <Flex direction="column">
                          <Text fontSize="sm" color={textColor} fontWeight="bold">
                            {member?.first_name + " " + member?.last_name}
                          </Text>
                          <Text fontSize="xs" color="gray.500" fontWeight="400">
                            {member?.dept + " personnel"}
                          </Text>
                        </Flex>
                      </Flex>
                      <Text
                        fontSize="sm"
                        fontWeight="600"
                        color="#4285f4"
                        alignSelf="center"
                      >
                        (Atali Branch)
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            </CardBody>
          </Card>
        </Grid>
        {profile?.customer_perm && (
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
                      Administrators
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                      Control, the overall working flow, should have all permissions granted
                    </Text>
                    <Flex justifyContent="space-between">
                      <Button
                        variant="outline"
                        colorScheme="blue"
                        minW="110px"
                        h="36px"
                        fontSize="xs"
                        px="1.5rem"
                        onClick={() => { history.push('/admin/EmployeeMgt'); }}
                      >
                        VIEW MEMBERS
                      </Button>
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
                      Sales and Records
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                      Sales and Inventory permissions should be set
                    </Text>
                    <Flex justifyContent="space-between">
                      <Button
                        variant="outline"
                        colorScheme="blue"
                        minW="110px"
                        h="36px"
                        fontSize="xs"
                        px="1.5rem"
                        onClick={() => { history.push('/admin/EmployeeMgt'); }}
                      >
                        VIEW MEMBERS
                      </Button>
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
                      ICT
                    </Text>
                    <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
                      Developer, Technology(ICT) and Engineering roles
                    </Text>
                    <Flex justifyContent="space-between">
                      <Button
                        variant="outline"
                        colorScheme="blue"
                        minW="110px"
                        h="36px"
                        fontSize="xs"
                        px="1.5rem"
                        onClick={() => { history.push('/admin/EmployeeMgt'); }}
                      >
                        VIEW MEMBERS
                      </Button>
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
                  onClick={onOpen}
                >
                  <Flex
                    direction="column"
                    justifyContent="center"
                    align="center"
                  >
                    <Icon as={BsPersonFillAdd} fontSize="50px" mb="12px" />
                    <Text fontSize="lg" fontWeight="bold">
                      Create a New Employee
                    </Text>
                  </Flex>
                </Button>
              </Grid>
            </CardBody>
          </Card>
        )}

      </Flex>
    </>

  );
}

export default Profile;
