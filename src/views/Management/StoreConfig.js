// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Grid,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    SimpleGrid,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Switch,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";

import { useToast } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons

import { DashboardTableRow4 } from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import MyPaginate from "components/Pagination";
import React, { useState } from "react";
// react icons
import { FaShoppingBag, FaRegCommentDots, FaRegAddressCard, FaMoneyBillAlt, FaFax } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BsFillHouseDoorFill, BsFillTelephoneFill } from "react-icons/bs";

import { useSelector } from 'react-redux';
import validator from 'validator';
import { useQuery, useMutation } from 'react-query';
import { checkObject, isError } from 'modules/utilities';
import { handleApiError } from "modules/utilities/responseHandlers";
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { GET_STORE_CONFIG, UPDATE_CONFIG } from 'config/serverUrls';
import { fetchData, postData } from 'modules/utilities/util_query';
import { AsyncSelect } from "chakra-react-select";
import "theme/asyncSelect.css";

export default function StoreConfig() {
    const nameRef = React.useRef(null);
    const addressRef = React.useRef(null);
    const phone1Ref = React.useRef(null);
    const emailRef = React.useRef(null);
    const phone2ref = React.useRef(null);
    const websiteRef = React.useRef(null);
    const salesCommmentsRef = React.useRef(null);
    const tax1Ref = React.useRef(null);
    const tax2Ref = React.useRef(null);
    const printRef = React.useRef(null);

    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const token = useSelector(getAuthToken);
    const toast = useToast();

    const textColor = "white";
    const bgColor = "#2a2c40";

    const payload_data = {};



    const result = useQuery([`store-config`,
        {
            url: GET_STORE_CONFIG,
            payload_data,
            authenticate: true,
            token
        }],
        fetchData,
        {
            retry: false,
            onSuccess: (response) => {
                const data = response?.data;
                setValues(data)
            },
            onError: (error) => {
                handleApiError(error);
            }
        }
    );

    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            toast({
                title: 'Success',
                description: 'Updated Succesfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setErrors({});

            return;
        },
        onError: (error) => {
            handleApiError(error);
        }
    });

    const validate = (updatedConfig) => {
        let uerrors = {}
        uerrors.address = updatedConfig?.address ? "" : FIELD_REQUIRED;
        uerrors.phone1 = updatedConfig?.phone1 ? "" : FIELD_REQUIRED;
        uerrors.email = updatedConfig?.email ? "" : FIELD_REQUIRED;

        if (!updatedConfig.address || !updatedConfig.phone1 || !updatedConfig.email) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        const email_is_valid = validator.isEmail(updatedConfig.email);

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

        return uerrors;
    }


    const handleEditSubmit = () => {

        const updatedConfig = {
            address: addressRef.current.value,
            phone1: phone1Ref.current.value,
            phone2: phone2ref.current.value,
            email: emailRef.current.value,
            website: websiteRef.current.value,
            sales_comments: salesCommmentsRef.current.value,
            tax1: tax1Ref.current.value,
            tax2: tax2Ref.current.value,
            print_receipt: printRef.current.checked,
        };

        let checkErrors = validate(updatedConfig);
        let areAllFieldsFalse = checkObject(checkErrors);


        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }

        console.log(updatedConfig);

        mutation.mutate(
            {
                url: UPDATE_CONFIG,
                payload_data: updatedConfig,
                token: token,
                authenticate: true
            }
        );

        return;


    }

    if (result.isLoading) {
        return (
            <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                <Center>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center>
            </Flex>
        )
    }

    {

        return (
            <>

                <Flex
                    direction="column"
                    alignSelf="center"
                    justifySelf="center"

                >
                    <Flex alignItems="center" justifyContent="center" mt="80px">
                        <Flex
                            direction="column"
                            w="745px"


                            p="40px"
                            mx={{ base: "100px" }}
                            border="1px solid" // Set border to 1px solid
                            borderColor="#8E44AD"
                            color={textColor}
                        >
                            <Text
                                fontSize="xl"
                                color={textColor}
                                bgColor="#8E44AD"
                                fontWeight="bold"
                                textAlign="center"
                                mb="22px"
                            >
                                GENERAL SETTINGS
                            </Text>


                            <FormControl id="">
                                <Stack direction="row" spacing={1} align="center">
                                    <FormLabel fontSize="sm" fontWeight='bold' width="25%" color="#8E44AD">Company Name:*</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<BsFillHouseDoorFill />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.name)}
                                            errorBorderColor='red.300'
                                            ref={nameRef}
                                            name={'name'}
                                            //onChange={handleChange}
                                            type="text"
                                            size="sm"
                                            defaultValue={values?.name || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="eg. SAMLEX ELECTRONICS COMPANY LTD"
                                            disabled
                                        />
                                    </InputGroup>
                                </Stack>
                            </FormControl>
                            <FormControl id="" mt={4}>
                                <Stack direction="row" spacing={1} align="center">
                                    <FormLabel fontSize="sm" fontWeight='bold' width="25%" color="#8E44AD">Company Address:*</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<FaRegAddressCard />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.address)}
                                            errorBorderColor='red.300'
                                            ref={addressRef}
                                            name={'address'}
                                            type="text"
                                            size="sm"
                                            defaultValue={values?.address || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="e.g Number 13 Mami market road off koker"
                                        />
                                    </InputGroup>
                                </Stack>
                            </FormControl>
                            <FormControl id="" mt={4}>
                                <Stack direction="row" spacing={1} align="center">
                                    <FormLabel fontSize="sm" fontWeight='bold' width="25%" color="#8E44AD">Company Website:</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<IoMdGlobe />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.website)}
                                            errorBorderColor='red.300'
                                            ref={websiteRef}
                                            name={'website'}
                                            //onChange={handleChange}
                                            type="text"
                                            size="sm"
                                            defaultValue={values?.website || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="eg. www.samlex.com"

                                        />
                                    </InputGroup>
                                </Stack>
                            </FormControl>
                            <Grid templateColumns='repeat(3, 1fr)' gap={2} mt={4}>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#8E44AD">Company Phone (1):*</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<BsFillTelephoneFill />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.phone1)}
                                            errorBorderColor='red.300'
                                            ref={phone1Ref}
                                            name={'phone1'}
                                            type="text"
                                            size="sm"
                                            defaultValue={values?.phone1 || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="e.g +234 8045222664"
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#8E44AD">Company Phone (2):</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<BsFillTelephoneFill />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.phone2)}
                                            errorBorderColor='red.300'
                                            ref={phone2ref}
                                            name={'phone2'}
                                            type="text"
                                            size="sm"
                                            defaultValue={values?.phone2 || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="e.g +234 8055222664"
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#8E44AD">Email Address:*</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<MdEmail />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.email)}
                                            errorBorderColor='red.300'
                                            ref={emailRef}
                                            name={'email'}
                                            type="text"
                                            size="sm"
                                            defaultValue={values?.email || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="e.g samlex@samlex.com"
                                        />
                                    </InputGroup>
                                </FormControl>
                            </Grid>
                        </Flex>

                    </Flex>
                    <Flex alignItems="center" justifyContent="center" mt="60px">
                        <Flex
                            direction="column"
                            w="745px"


                            p="40px"
                            mx={{ base: "100px" }}
                            border="1px solid" // Set border to 1px solid
                            borderColor="#27AE60"
                            color={textColor}
                        >
                            <Text
                                fontSize="xl"
                                color={textColor}
                                bgColor="#27AE60"
                                fontWeight="bold"
                                textAlign="center"
                                mb="22px"
                            >
                                SITE AND SALE SETTINGS
                            </Text>

                            <FormControl id="" mt={4}>
                                <Stack direction="row" spacing={1} align="center">
                                    <FormLabel fontSize="sm" fontWeight='bold' width="25%" color="#27AE60">Return Policy:*</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<FaRegCommentDots />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.salesComments)}
                                            errorBorderColor='red.300'
                                            ref={salesCommmentsRef}
                                            name={'salesComments'}
                                            type="text"
                                            size="sm"
                                            defaultValue={values?.sales_comments || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="e.g thanks for your patronage"
                                        />
                                    </InputGroup>
                                </Stack>
                            </FormControl>
                            <Grid templateColumns='repeat(3, 1fr)' gap={2} mt={4}>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#27AE60">Task 1 Rate:*</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<FaMoneyBillAlt />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.tax1)}
                                            errorBorderColor='red.300'
                                            ref={tax1Ref}
                                            name={'tax1'}
                                            type="number"
                                            size="sm"
                                            defaultValue={values?.tax1 || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="eg. 5%"
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#27AE60">Task 2 Rate:</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<FaMoneyBillAlt />}
                                        />
                                        <Input
                                            isInvalid={isError(errors?.tax2)}
                                            errorBorderColor='red.300'
                                            ref={tax2Ref}
                                            name={'tax2'}
                                            type="number"
                                            size="sm"
                                            defaultValue={values?.tax2 || ''}
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="eg. 5%"
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#27AE60"> Print Receipt after Sale:*</FormLabel>
                                    <Switch
                                        ref={printRef}
                                        defaultChecked={values?.print_receipt}
                                        name={"print_receipt"}
                                        size="md"
                                        colorScheme="green"
                                    />
                                </FormControl>
                            </Grid>
                        </Flex>

                    </Flex>
                    <Flex alignItems="center" justifyContent="center" mt="60px">
                        <Flex
                            direction="column"
                            w="745px"


                            p="40px"
                            mx={{ base: "100px" }}
                            border="1px solid" // Set border to 1px solid
                            borderColor="#F39C12"
                            color={textColor}
                        >
                            <Text
                                fontSize="xl"
                                color={textColor}
                                bgColor="#F39C12"
                                fontWeight="bold"
                                textAlign="center"
                                mb="22px"
                            >
                                OTHER SETTINGS
                            </Text>


                            <FormControl id="">
                                <Stack direction="row" spacing={1} align="center">
                                    <FormLabel fontSize="sm" fontWeight='bold' width="25%" color="#F39C12">Timezone:</FormLabel>
                                    <Select placeholder='(GMT +01:00) West Central Africa'
                                        borderRadius='15px'
                                        size="sm">
                                    </Select>
                                </Stack>
                            </FormControl>
                            <Grid templateColumns='repeat(3, 1fr)' gap={2} mt={4}>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#F39C12">Language:</FormLabel>
                                    <Select placeholder='English'
                                        borderRadius='15px'
                                        size="sm">
                                    </Select>
                                </FormControl>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#F39C12">Currency Symbol:</FormLabel>
                                    <Select placeholder='NGN'
                                        borderRadius='15px'
                                        size="sm">
                                    </Select>
                                </FormControl>
                                <FormControl id="">
                                    <FormLabel fontSize="sm" fontWeight='bold' color="#F39C12">Fax:</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="rgba(255, 255, 255, 0.2)"
                                            children={<FaFax />}
                                        />
                                        <Input
                                            errorBorderColor='red.300'
                                            type="text"
                                            size="sm"
                                            borderRadius='15px'
                                            borderColor="rgba(255, 255, 255, 0.2)"
                                            _placeholder={{ opacity: 0.2, color: 'white' }}
                                            placeholder="eg. (555) 123-4567"
                                        />
                                    </InputGroup>
                                </FormControl>
                            </Grid>
                        </Flex>

                    </Flex>
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Button colorScheme='blue' size="sm" isLoading={mutation?.isLoading} onClick={handleEditSubmit}>Save settings</Button>
                    </Box>
                </Flex>

            </>


        )

    }



}