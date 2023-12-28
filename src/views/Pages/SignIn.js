import React from "react";
// Chakra imports
import {
  Box,
  Container,
  Center,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Link,
  Switch,
  HStack,
  Text,
  useColorModeValue,
  Icon,
  Select,
} from "@chakra-ui/react";
import { LockIcon, EmailIcon } from '@chakra-ui/icons'
import avatar4 from "assets/img/samlex.png";
// Assets
import signInImage from "assets/img/monitoring.png";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useMutation } from 'react-query';
import { postData } from 'modules/utilities/util_query';
import { checkObject, isError } from 'modules/utilities';
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { LOGIN_URL } from 'config/serverUrls';
import toast from 'react-hot-toast';
import { handleApiError, handleApiSuccess } from 'modules/utilities/responseHandlers';
import { login } from 'modules/auth/redux/authSlice';
import LogoImg from "assets/img/samlex2.png";
import validator from 'validator';

import BgSignUp from "assets/img/BgSignUp.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { MdFilterList, MdViewList } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function SignIn() {
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("#8abb18", "rgba(255, 255, 255, 0.5)");
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  function validate() {
    let uerrors = {}
    uerrors.email = values?.email ? "" : FIELD_REQUIRED;
    uerrors.password = values?.password ? "" : FIELD_REQUIRED;

    if (values?.email) {
      const email_is_valid = validator.isEmail(values.email);

      if (!email_is_valid) {
          uerrors.email = "enter a valid email address";
      }
  }

    return uerrors;
  }

  const handleChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      const userObj = response?.data;
      toast.success("You Signed in Successfully");
      dispatch(login(userObj));

      // // navigate to the dashboard
      // history.push(APP_HOME_PAGE);
    },
    onError: (error) => {
      handleApiError(error);
      setErrors({});
    }
  });

  function handleSubmit() {

    let checkErrors = validate();
    let areAllFieldsFalse = checkObject(checkErrors);

    if (!areAllFieldsFalse) {
      // if there are errors
      // set to state and terminate
      setErrors(checkErrors);
      return;
    }


    const data = {
      email: values?.email,
      password: values?.password
    };

    mutation.mutate({
      url: LOGIN_URL,
      payload_data: data
    })

    return

  }




  /**
   * 
   *     mutation.mutate({
        url: LOGIN_URL,
        payload_data: data
      })
   */



  return (
    <>

      <Box>
        <Box
          w='100%' h='100vh' p={4} color='white' backgroundImage="url('/samlex_office.jpg')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          filter="blur(3px)">
        </Box>
        <Center
          position="absolute"
          left="0px"
          top="0px"
          w="100vw"
          h="100vh"
          zIndex="1"
          direction="column"
          alignSelf="center"
          justifySelf="center"
          overflow="hidden">
          <Flex alignItems="center" justifyContent="center">
            <Flex
              direction="column"
              w="80vw"
              maxW="505px"
              MinH="65vh"
              background="#00000033"
              borderRadius="15px"
              p="35px"
              mx={{ base: "100px" }}
              boxShadow="0 20px 27px 0 rgb(0 0 0)"
            >
              <Container maxW='md' centerContent>
                <Image
                  src={LogoImg}
                  w="125px"
                  h="78px"
                // borderRadius="15px"
                />
              </Container>
              <FormControl>
                <FormLabel ms="4px" fontSize="md" fontWeight="normal" color="white">
                  Email:*
                </FormLabel>
                <Box mb="24px" ms="4px">
                <InputGroup >
                  <InputLeftElement alignItems="center" mt='3px' pointerEvents='none'>
                    <EmailIcon color='black' />
                  </InputLeftElement>
                  <Input
                    //variant='filled'
                    bg="white"
                    focusBackgroundColor="white"
                    focusBorderColor="none"
                    fontSize="md"
                    borderRadius="40px"
                    type="text"
                    placeholder="Enter your email address"
                    _placeholder={{ opacity: 0.7, color: 'inherit' }}
                    name="email"
                    onChange={handleChange}
                    //isInvalid={isError(errors?.email)}
                    //errorBorderColor='red.500'
                    borderWidth="1px"

                    size="lg"
                  />
                </InputGroup>
                {isError(errors?.email) && <Text color='white' bgColor='red' fontSize='sm' as='i'>{errors?.email}</Text>}
                </Box>

                <FormLabel ms="4px" fontSize="md" fontWeight="normal" color="white">
                  Password:*
                </FormLabel>
                <Box mb="24px" ms="4px">
                <InputGroup>
                  <InputLeftElement alignItems="center" mt='3px' pointerEvents='none'>
                    <LockIcon color='black' />
                  </InputLeftElement>
                  <Input
                    //variant='filled'
                    fontSize="md"
                    //colorScheme="blackAlpha"
                    bg="white"
                    focusBackgroundColor="white"
                    focusBorderColor="none"

                    borderRadius="40px"
                    type="password"
                    placeholder="Enter your password"
                    _placeholder={{ opacity: 0.7, color: 'inherit' }}
                    size="lg"
                    onChange={handleChange}
                    //isInvalid={isError(errors?.password)}
                    //errorBorderColor='red.500'
                    borderWidth="1px"
                    name="password"
                  />
                </InputGroup>
                {isError(errors?.password) && <Text color='white' bgColor='red' fontSize='sm' as='i'>{errors?.password}</Text>}
                </Box>


                <Button
                  type="submit"
                  borderRadius="40px"
                  onClick={handleSubmit}
                  bgGradient='linear(to-l, #F7D305, #F75216)'
                  mt="14px"
                  fontSize="md"
                  color="white"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  _hover={{
                    bgGradient:'linear(to-l, #FF0080, #7928CA)',
                  }}
                  isLoading={mutation.isLoading}
                >
                  Login
                </Button>
              </FormControl>
            </Flex>
          </Flex>
        </Center>
      </Box>

    </>



  );
}

export default SignIn;
