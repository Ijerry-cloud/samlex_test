// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    Grid,
    HStack,
    Icon,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Container,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Textarea,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons

import { DashboardTableRow3 } from "components/Tables/DashboardTableRow";
import MyPaginate from "components/Pagination";
import React, { useState } from "react";
// react icons
import { AiOutlineNumber } from 'react-icons/ai';
import { TbPhone } from 'react-icons/tb';
import {
    MdLocationCity,
    MdLocationOn,
    MdEmail
} from 'react-icons/md';
import { BsPerson, BsPersonAdd, BsFillTelephoneFill, BsFillFlagFill } from 'react-icons/bs';
import { FaRegAddressCard, FaCity } from 'react-icons/fa';
import { fetchData, postData } from 'modules/utilities/util_query';
import { useQuery, useMutation } from 'react-query';
import { checkObject, isError } from 'modules/utilities';
import { handleApiError } from "modules/utilities/responseHandlers";
import validator from 'validator';
import { GET_CREATE_CUSTOMERS, UPDATE_CUSTOMERS, DELETE_CUSTOMERS } from 'config/serverUrls';
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { useSelector } from 'react-redux';

const EditModal = ({ handleEditSubmit, onClose, values, handleChange, errors, loading}) => (
    <>
        <ModalHeader>Edit Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>


                <FormControl id="first_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>First Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
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
                        />
                    </InputGroup>
                </FormControl>







                <FormControl id="last_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>Last Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
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
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="email">
                    <FormLabel fontSize="sm" fontWeight='bold'>E-Mail:</FormLabel>
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
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="phone_number">
                    <FormLabel fontSize="sm" fontWeight='bold'>Phone Number:</FormLabel>
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
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="address_1">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 1:</FormLabel>
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
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="address_2">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 2:</FormLabel>
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
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="city">
                    <FormLabel fontSize="sm" fontWeight='bold'>City:</FormLabel>
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
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="state">
                    <FormLabel fontSize="sm" fontWeight='bold'>State:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdLocationOn color="gray.800" />}
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
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="zip">
                    <FormLabel fontSize="sm" fontWeight='bold'>Zip:</FormLabel>
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
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="country">
                    <FormLabel fontSize="sm" fontWeight='bold'>Country:</FormLabel>
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
                        />
                    </InputGroup>
                </FormControl>

            </Grid>
            <FormControl id="comments" mt={4}>
                <FormLabel fontSize="sm" fontWeight='bold'>Comments:</FormLabel>
                <Textarea
                    isInvalid={isError(errors?.comments)}
                    errorBorderColor='red.300'
                    name={'comments'}
                    onChange={handleChange}
                    value={values?.comments || ''}
                    placeholder="message"
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}

                />
            </FormControl>

        </ModalBody>

        <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button isLoading={loading} onClick={handleEditSubmit} colorScheme="blue">Edit Supplier</Button>
        </ModalFooter>

    </>


);

const AddModal = ({ handleSubmit, onClose, values, handleChange, errors, loading }) => (
    <>
        <ModalHeader>Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl id="first_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>First Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
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
                            placeholder="eg. Okechukwu"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="last_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>Last Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
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
                            placeholder="eg. Ekene"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="email">
                    <FormLabel fontSize="sm" fontWeight='bold'>E-Mail:</FormLabel>
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
                            placeholder="eg. Okeyson@gmail.com"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="phone_number">
                    <FormLabel fontSize="sm" fontWeight='bold'>Phone Number:</FormLabel>
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
                            placeholder="eg. 09034556553"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="address_1">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 1:</FormLabel>
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
                            placeholder="eg. Nkwo Market"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="address_2">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 2:</FormLabel>
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
                            placeholder="eg. Specialist Plaze"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="city">
                    <FormLabel fontSize="sm" fontWeight='bold'>City:</FormLabel>
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
                            placeholder="eg. Onitsha"
                            
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="state">
                    <FormLabel fontSize="sm" fontWeight='bold'>State:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdLocationOn color="gray.800" />}
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
                            placeholder="eg. Anambra"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="zip">
                    <FormLabel fontSize="sm" fontWeight='bold'>Zip:</FormLabel>
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
                            placeholder="eg. 44320"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="country">
                    <FormLabel fontSize="sm" fontWeight='bold'>Country:</FormLabel>
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
                            placeholder="eg. Nigeria"
                        />
                    </InputGroup>
                </FormControl>
            </Grid>
            <FormControl id="comments">
                <FormLabel fontSize="sm" fontWeight='bold'>Comments:</FormLabel>
                <Textarea
                    isInvalid={isError(errors?.comments)}
                    errorBorderColor='red.300'
                    name={'comments'}
                    onChange={handleChange}
                    value={values?.comments || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="eg. message"
                />
            </FormControl>


        </ModalBody>

        <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button isLoading={loading} onClick={handleSubmit} colorScheme="blue">Add Customer</Button>
        </ModalFooter>
    </>


);

const DeleteModal = ({ onClose, values, handleDeleteSubmit, loading }) => (
    <>
        <ModalHeader>Delete Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text> Are you sure you want to delete {values?.first_name + " " + values?.last_name} ?
                </Text>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button isLoading={loading} colorScheme='red' onClick={handleDeleteSubmit}>Yes</Button>
        </ModalFooter>
    </>


);

export default function Dashboard() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = useState(false);

    const [customers, setCustomers] = React.useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);

    const token = useSelector(getAuthToken);
    const textColor = "white";
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onModalClose = () => {
        setValues({});
        setErrors({});
        onClose();
    }

    const [modalType, setModalType] = useState('add');

    const payload_data = {};

    const result = useQuery(['customers',
        {
            url: GET_CREATE_CUSTOMERS + `?page=${page}`,
            payload_data,
            authenticate: true,
            token
        }],
        fetchData,
        {
            retry: false,
            onSuccess: (response) => {
                const data = response?.data;
                setCustomers(data?.results || []);
                setPageCount(data?.last_page || 1);
                console.log(data?.results);
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
                description: "Action succesful",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setValues({});
            setErrors({});
            setLoading(false);
            onModalClose();
            refetch();

            return;
        },
        onError: (error) => {
            handleApiError(error);
            setLoading(false);
        }
    });

    const validate = () => {
        let uerrors = {}
        uerrors.first_name = values?.first_name ? "" : FIELD_REQUIRED;
        uerrors.last_name = values?.last_name ? "" : FIELD_REQUIRED;

        if (!values?.first_name || !values?.last_name) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        if (values?.email) {
            const email_is_valid = validator.isEmail(values.email);

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
        }

        return uerrors;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {

        let checkErrors = validate();
        let areAllFieldsFalse = checkObject(checkErrors);

        console.log(checkErrors);
        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }

        const data = values;
        setLoading(true);
        mutation.mutate(
            {
                url: GET_CREATE_CUSTOMERS,
                payload_data: data,
                token: token,
                authenticate: true
            }
        );

        return;

    }

    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }

    const handleEditSubmit = () => {

        let checkErrors = validate();
        let areAllFieldsFalse = checkObject(checkErrors);

        console.log(checkErrors);
        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }

        const data = values;
        setLoading(true);
        mutation.mutate(
            {
                url: UPDATE_CUSTOMERS,
                payload_data: data,
                token: token,
                authenticate: true
            }
        );

        return;

    }

    const handleDeleteSubmit = () => {
        const data = values;
        setLoading(true);
        mutation.mutate({
            url: DELETE_CUSTOMERS,
            payload_data: data,
            token: token,
            authenticate: true
        });
        return;


    }

    if (isLoading) {
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

    return (
        <>
            <Modal isOpen={isOpen} onClose={onModalClose} size="xl">
                <ModalOverlay />
                <ModalContent
                    bgColor="#232333"
                    borderColor="gray.900"
                    color="white"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
                >

                    {modalType === "add" ? 
                        <AddModal onClose={onModalClose} handleSubmit={handleSubmit} values={values} 
                        handleChange={handleChange} errors={errors}loading={loading}/> : 
                        modalType === "edit" ?
                        <EditModal onClose={onModalClose} handleEditSubmit={handleEditSubmit} values={values}
                         errors={errors} handleChange={handleChange} loading={loading}/> :
                        <DeleteModal onClose={onModalClose} values={values} handleDeleteSubmit={handleDeleteSubmit} 
                        loading={loading}/>}


                </ModalContent>

            </Modal>
            <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
                <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
                    <Card minH="83px" w="100%">
                        <CardBody>
                            <Flex flexDirection="row" align="center" justify="center" w="100%">
                                <Stat me="auto">
                                    <StatLabel
                                        fontSize="sm"
                                        color="gray.400"
                                        fontWeight="bold"
                                        pb=".1rem"
                                    >
                                        Full Name
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor}>
                                            {(customers[0]?.first_name + " " + customers[0]?.last_name) || ""}
                                        </StatNumber>
                                    </Flex>
                                </Stat>
                                <IconBox as="box" h={"45px"} w={"45px"}>
                                    <PersonIcon h={"24px"} w={"24px"} color="#fff" />
                                </IconBox>
                            </Flex>
                        </CardBody>
                    </Card>
                    <Card minH="83px" w="100%">
                        <CardBody>
                            <Flex flexDirection="row" align="center" justify="center" w="100%">
                                <Stat me="auto">
                                    <StatLabel
                                        fontSize="sm"
                                        color="gray.400"
                                        fontWeight="bold"
                                        pb=".1rem"
                                    >
                                        Phone Number
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor}>
                                            {customers[0]?.phone_no || ""}
                                        </StatNumber>
                                    </Flex>
                                </Stat>
                                <IconBox as="box" h={"45px"} w={"45px"}>

                                    <Icon h={"35px"} w={"35px"} as={TbPhone} color='#fff' />
                                </IconBox>
                            </Flex>
                        </CardBody>
                    </Card>
                    <Card minH="83px" w="100%">
                        <CardBody>
                            <Flex flexDirection="row" align="center" justify="center" w="100%">
                                <Stat me="auto">
                                    <StatLabel
                                        fontSize="sm"
                                        color="gray.400"
                                        fontWeight="bold"
                                        pb=".1rem"
                                    >
                                        Email
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor}>
                                            {customers[0]?.email || ""}
                                        </StatNumber>
                                    </Flex>
                                </Stat>
                                <IconBox as="box" h={"45px"} w={"45px"}>
                                    <Icon h={"35px"} w={"35px"} as={MdEmail} color='#fff' />

                                </IconBox>
                            </Flex>
                        </CardBody>
                    </Card>
                    <Card minH="83px" w="100%">
                        <CardBody>
                            <Flex flexDirection="row" align="center" justify="center" w="100%">
                                <Stat me="auto">
                                    <StatLabel
                                        fontSize="sm"
                                        color="gray.400"
                                        fontWeight="bold"
                                        pb=".1rem"
                                    >
                                        State
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor}>
                                            {customers[0]?.state || ""}
                                        </StatNumber>
                                    </Flex>
                                </Stat>
                                <IconBox as="box" h={"45px"} w={"45px"}>
                                    <Icon h={"35px"} w={"35px"} as={MdLocationOn} color='#fff' />

                                </IconBox>
                            </Flex>
                        </CardBody>
                    </Card>

                </SimpleGrid>
                <Grid
                    my="26px"
                    mb={{ lg: "16px" }}
                >
                    <Card p="16px" overflowX="auto">
                        <CardHeader p="12px 0px 28px 0px">
                            <Flex direction="column">
                                <Text
                                    fontSize="lg"
                                    color={textColor}
                                    fontWeight="bold"
                                    pb=".5rem"
                                >
                                    CUSTOMERS LISTINGS (2023)
                                </Text>
                                <Flex align="center">
                                    <ButtonGroup spacing='2' padding='2'>
                                        <Button leftIcon={<BsPersonAdd />} variant='solid' backgroundColor='#4285f4' color='white'
                                            onClick={() => {
                                                setModalType('add');
                                                onOpen();
                                            }}>
                                            New Customer
                                        </Button>
                                    </ButtonGroup>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <Table variant="unstyled" size='sm'>
                            <Thead>
                                <Tr my=".8rem" ps="0px">
                                    <Th color="gray.400">FIRST NAME</Th>
                                    <Th color="gray.400">LAST NAME</Th>
                                    <Th color="gray.400"> PHONE NUMBER </Th>
                                    <Th color="gray.400">EMAIL ADDRESS</Th>
                                    <Th color="gray.400">PRICE PURCHASED (TOTAL)</Th>
                                    <Center>
                                        <Th color="gray.400">ACTIONS</Th>
                                    </Center>


                                </Tr>
                            </Thead>
                            <Tbody>
                                {customers.map((row, index) => {
                                    return (
                                        <DashboardTableRow3
                                            key={index}
                                            first_name={row.first_name}
                                            last_name={row.last_name}
                                            phone_no={row.phone_no}
                                            email={row.email}
                                            total_purchased={row.total_purchased}
                                            onEditClick={() => {
                                                setValues(row);
                                                setModalType('edit');
                                                onOpen();
                                            }}
                                            onDeleteClick={() => {
                                                setValues(row);
                                                setModalType('delete');
                                                onOpen();
                                            }}
                                        />
                                    );
                                })}
                            </Tbody>
                        </Table>

                        <Box my="1.2rem">
                            <MyPaginate
                                breakLabel="..."
                                nextLabel=">"

                                pageRangeDisplayed={5}

                                previousLabel="<"

                                pageCount={pageCount}
                                onPageChange={(e) => { handlePageChange(e) }}
                                forcePage={pageCount > 1 ? page - 1 : 1}
                                renderOnZeroPageCount={null}
                                activeClassName={'active'}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Flex>
        </>

    );
} 