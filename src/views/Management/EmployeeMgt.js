// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Flex,
    Grid,
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
    Switch,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    Container,
    Heading,
    IconButton,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Select,
    Spinner
} from "@chakra-ui/react";

import { useToast } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { Separator } from "components/Separator/Separator";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons

import { DashboardTableRow11 } from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import MyPaginate from "components/Pagination";
import React, { useState } from "react";
// react icons
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import {
    MdError,
    MdFilterList,
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
} from 'react-icons/md';
import { AiOutlineNumber, AiOutlineMacCommand } from 'react-icons/ai';
import {
    BsPersonFill,
    BsPersonFillAdd,
    BsFillTelephoneFill,
    BsFillFlagFill

} from 'react-icons/bs';
import {
    FaRegAddressCard,
    FaCity,


} from 'react-icons/fa';
import { GiPadlock } from 'react-icons/gi';
import { dashboardTableData8 } from "variables/general";
import { SalesOverviewData } from "variables/general2";
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { checkObject, isError } from 'modules/utilities';
import { useQuery, useMutation } from "react-query";
import validator from 'validator';
import { GET_USERS, EDIT_USERS, DELETE_USER } from '../../config/serverUrls';
import { fetchData, postData } from '../../modules/utilities/util_query';
import { useSelector } from 'react-redux';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";


const DeleteModal = ({ onClose, values, handleDeleteSubmit, deleteMutation }) => (
    <ModalContent bgColor="#232333" color="white" boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px">
        <ModalHeader>Delete Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text> Are you sure you want to delete {values?.first_name + " " + values?.last_name} ?
                </Text>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose} size="sm">
                Close
            </Button>
            <Button isLoading={deleteMutation.isLoading} size="sm" colorScheme='red' onClick={handleDeleteSubmit} >Yes</Button>
        </ModalFooter>
    </ModalContent>

);

const EditDrawer = ({ handleChange, handleSubmit, isOpen, btnRef, onClose, handleSwitchChange, values, errors,
    editFirstNameRef, editLastNameRef, editGenderRef, editDeptRef, editEmailRef, editPhoneRef,
    editAddress1Ref, editAddress2Ref, editCityRef, editStateRef, editZipRef, editCountryRef,
    editUsernameRef, editPasswordRef, editConfirmPasswordRef, mutation }) => (
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
            boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px">
            <DrawerCloseButton />
            <DrawerHeader>Update Employee</DrawerHeader>

            <DrawerBody>
                <VStack spacing={2} maxW="full">
                    <Text fontSize="md" fontWeight="600">
                        Basic Information
                    </Text>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>First Name:*</FormLabel>
                        <InputGroup borderColor="#E0E1E7">

                            <InputLeftElement
                                pointerEvents="none"
                                children={<BsPersonFill color="rgba(255, 255, 255, 0.2)" />}
                            />

                            <Input
                                isInvalid={isError(errors?.first_name)}
                                errorBorderColor='red.300'
                                ref={editFirstNameRef}
                                name={'first_name'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.first_name || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                                placeholder="first name" />


                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Last Name:*</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BsPersonFill color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.last_name)}
                                errorBorderColor='red.300'
                                ref={editLastNameRef}
                                name={'last_name'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.last_name || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                                placeholder="last name" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Gender:</FormLabel>
                        <Select
                            ref={editGenderRef}
                            name={"gender"}
                            //onChange={handleChange}
                            defaultValue={values?.gender || ''}
                            borderRadius='15px'
                            placeholder='Select option'
                            size="sm">
                            <option style={{ backgroundColor: '#232333' }} value='male'>Male</option>
                            <option style={{ backgroundColor: '#232333' }} value='female'> Female</option>
                        </Select>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Department:</FormLabel>
                        <Select
                            ref={editDeptRef}
                            name={"dept"}
                            //onChange={handleChange}
                            defaultValue={values?.dept || ''}
                            placeholder='Select option'
                            borderRadius='15px'
                            size="sm">
                            <option style={{ backgroundColor: '#232333' }} value='tech'>Tech</option>
                            <option style={{ backgroundColor: '#232333' }} value='ICT'> ICT</option>
                            <option style={{ backgroundColor: '#232333' }} value='sales'> Sales</option>
                            <option style={{ backgroundColor: '#232333' }} value='admin'> Admin</option>
                        </Select>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>E-mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdEmail color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.email)}
                                errorBorderColor='red.300'
                                ref={editEmailRef}
                                name={'email'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.email || ''}
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
                                children={<BsFillTelephoneFill color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.phone_no)}
                                errorBorderColor='red.300'
                                ref={editPhoneRef}
                                name={'phone_no'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.phone_no || ''}
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
                                children={<FaRegAddressCard color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.address_1)}
                                errorBorderColor='red.300'
                                ref={editAddress1Ref}
                                name={'address_1'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.address_1 || ''}
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
                                children={<FaRegAddressCard color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.address_2)}
                                errorBorderColor='red.300'
                                ref={editAddress2Ref}
                                name={'address_2'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.address_2 || ''}
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
                                children={<FaCity color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.city)}
                                errorBorderColor='red.300'
                                ref={editCityRef}
                                name={'city'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.city || ''}
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
                                children={<MdLocationOn color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.state)}
                                errorBorderColor='red.300'
                                ref={editStateRef}
                                name={'state'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.state || ''}
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
                                children={<AiOutlineNumber color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.zip)}
                                errorBorderColor='red.300'
                                ref={editZipRef}
                                name={'zip'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.zip || ''}
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
                                children={<BsFillFlagFill color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.country)}
                                errorBorderColor='red.300'
                                ref={editCountryRef}
                                name={'country'}
                                //onChange={handleChange}
                                type="text"
                                size="sm"
                                defaultValue={values?.country || ''}
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
                        <FormLabel fontSize='sm'>Password:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<GiPadlock color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.password)}
                                errorBorderColor='red.300'
                                ref={editPasswordRef}
                                name={'password'}
                                //onChange={handleChange}
                                type="password"
                                size="sm"
                                defaultValue={values?.password || ''}
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
                                children={<GiPadlock color="rgba(255, 255, 255, 0.2)" />}
                            />
                            <Input
                                isInvalid={isError(errors?.confirmPassword)}
                                errorBorderColor='red.300'
                                ref={editConfirmPasswordRef}
                                name={'confirmPassword'}
                                //onChange={handleChange}
                                type='password'
                                size="sm"
                                defaultValue={values?.confirmPassword || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                                placeholder={'confirm password'}
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
                            <FormLabel fontSize='xs'>Customers(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.customer_perm}
                                onChange={handleSwitchChange}
                                name={"customer_perm"}
                                size="md"
                                colorScheme="blue"
                            />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Items(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.items_perm}
                                onChange={handleSwitchChange}
                                name={"items_perm"}
                                size="md"
                                colorScheme="blue"
                            />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Item Kits(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.item_kits_perm}
                                onChange={handleSwitchChange}
                                name={"item_kits_perm"}
                                size="md"
                                colorScheme="blue"
                            />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Suppliers(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.suppliers_perm}
                                onChange={handleSwitchChange}
                                name={"suppliers_perm"}
                                size="md"
                                colorScheme="blue"
                            />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Reports(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.reports_perm}
                                onChange={handleSwitchChange}
                                name={"reports_perm"}
                                size="md"
                                colorScheme="blue"
                            />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Receivings(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.receivings_perm}
                                onChange={handleSwitchChange}
                                name={"receivings_perm"}
                                size="md"
                                colorScheme="blue"
                            />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Sales(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.sales_perm}
                                onChange={handleSwitchChange}
                                name={"sales_perm"}
                                size="md"
                                colorScheme="blue"
                            />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Employees(add, update, delete, search):</FormLabel>
                            <Switch
                                isChecked={values?.employees_perm}
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
                <Button variant='ghost' mr={3} onClick={onClose} size="sm">
                    Cancel
                </Button>
                <Button isLoading={mutation.isLoading} colorScheme='blue' onClick={handleSubmit} size="sm">Save</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);

export default function EmployeeMgt() {
    const token = useSelector(getAuthToken);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(1);


    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const [customerDetails, setCustomerDetails] = useState({});
    const [currentCustomer, setCurrentCustomer] = useState({});
    const history = useHistory();


    // Chakra Color Mode
    const iconTeal = useColorModeValue("#ffb400", "#ffb400");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const toast = useToast();

    //for the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalType, setModalType] = useState('');
    const btnRef = React.useRef()

    const editFirstNameRef = React.useRef(null);
    const editLastNameRef = React.useRef(null);
    const editGenderRef = React.useRef(null);
    const editDeptRef = React.useRef(null);
    const editEmailRef = React.useRef(null);
    const editPhoneRef = React.useRef(null);
    const editAddress1Ref = React.useRef(null);
    const editAddress2Ref = React.useRef(null);
    const editCityRef = React.useRef(null);
    const editStateRef = React.useRef(null);
    const editZipRef = React.useRef(null);
    const editCountryRef = React.useRef(null);
    const editUsernameRef = React.useRef(null);
    const editPasswordRef = React.useRef(null);
    const editConfirmPasswordRef = React.useRef(null);



    // call the api that loads this data only once
    let payload_data = {
    };

    const result = useQuery(['users',
        {
            url: GET_USERS + `?page=${page}`,
            payload_data,
            authenticate: true,
            token
        }],
        fetchData,
        {
            retry: false,
            onSuccess: (response) => {
                const data = response?.data;
                setCount(data?.count || 0);
                setUsers(data?.results || []);
                setPageCount(data?.last_page || 1);
                //console.log(data?.results);
            },
            onError: (error) => {
                handleApiError(error);
            }
        }
    );

    const { isLoading, refetch } = result;

    const onModalClose = () => {
        setValues({});
        setErrors({});
        onClose();
    }

    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            const data = response?.data?.detail;
            toast({
                title: 'Success',
                description: "User edited succesfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setUsers((users) => {
                const updated = users.map((user) => {
                    if (user.id === data.id) {
                        return data;
                    }
                    else {
                        return user
                    }
                })
                //console.log(updated_items);
                return updated
            });
            onModalClose();
            //refetch();

            return;
        },
        onError: (error) => {
            handleApiError(error);
        }
    });

    const deleteMutation = useMutation(postData, {
        onSuccess: (response) => {
            const id = response?.data?.id;
            toast({
                title: 'Success',
                description: 'User deleted successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setUsers((users) => {
                const updated = users.filter(user => user.id !== id);
                //console.log(new_items);
                //console.log(id);
                return updated
            })
            setCount((count) => count - 1)
            onModalClose();

            return;
        },

        onError: (error) => {
            handleApiError(error);
            //onModalClose();
        }
    });

    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSwitchChange = (event) => {
        setValues({ ...values, [event.target.name]: !values[event.target.name] });
        //console.log(values);
    }

    const validate = (updatedItem) => {
        let uerrors = {}
        uerrors.first_name = updatedItem?.first_name ? "" : FIELD_REQUIRED;
        uerrors.last_name = updatedItem?.last_name ? "" : FIELD_REQUIRED;
        uerrors.username = updatedItem?.username ? "" : FIELD_REQUIRED;
        uerrors.email = updatedItem?.email ? "" : FIELD_REQUIRED;


        if (!updatedItem?.first_name || !updatedItem?.last_name || !updatedItem?.username || !updatedItem?.email) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        const email_is_valid = validator.isEmail(updatedItem?.email);

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
        console.log(updatedItem)
        // if either new or confirmed passwprd field is filled, then both should be filled
        if (editPasswordRef.current.value || editConfirmPasswordRef.current.value) {
            if (!editPasswordRef.current.value || !editConfirmPasswordRef.current.value) {
                //console.log("there was an error2")
                uerrors.password = editPasswordRef.current.value ? "" : FIELD_REQUIRED;
                uerrors.confirmPassword = editConfirmPasswordRef.current.value ? "" : FIELD_REQUIRED;
                toast({
                    title: 'Missing Information.',
                    description: "Please fill both password fields.",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
                return uerrors;


            }
        }
        // consequently, both fields should either be blank or should be the same value
        if (editPasswordRef.current.value != editConfirmPasswordRef.current.value) {
            //console.log("there was an error3")
            uerrors.password = "Password do not match";
            uerrors.confirmPassword = "Password do not match";
            alert('Passwords do not match');
        }

        return uerrors;
    }

    const handleSubmit = () => {

        const updatedItem = {
            first_name: editFirstNameRef.current.value,
            last_name: editLastNameRef.current.value,
            gender: editGenderRef.current.value,
            dept: editDeptRef.current.value,
            email: editEmailRef.current.value,
            phone_no: editPhoneRef.current.value,
            address_1: editAddress1Ref.current.value,
            address_2: editAddress2Ref.current.value,
            city: editCityRef.current.value,
            state: editStateRef.current.value,
            zip: editZipRef.current.value,
            country: editCountryRef.current.value,
            username: values?.username,
            //password: editPasswordRef.current.value,
            //confirmPassword: editConfirmPasswordRef.current.value,

            customer_perm: values?.customer_perm,
            items_perm: values?.items_perm,
            item_kits_perm: values?.item_kits_perm,
            suppliers_perm: values?.suppliers_perm,
            reports_perm: values?.reports_perm,
            receivings_perm: values?.receivings_perm,
            sales_perm: values?.sales_perm,
            employees_perm: values?.employees_perm
        }

        const user_password = {
            password: editPasswordRef.current.value
        };

        let checkErrors = validate(updatedItem);
        let areAllFieldsFalse = checkObject(checkErrors);

        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);

            return;
        }


        const data = {};
        data.user_data = updatedItem;
        data.user_password = user_password;
        //console.log(data);


        mutation.mutate({
            url: EDIT_USERS,
            payload_data: data,
            token: token,
            authenticate: true
        });





        return;
    }

    const handleDeleteSubmit = () => {
        const data = values;
        //console.log(data);

        deleteMutation.mutate({
            url: DELETE_USER,
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
            {modalType === "edit" ?
                <EditDrawer handleChange={handleChange} isOpen={isOpen} btnRef={btnRef}
                    handleSubmit={handleSubmit} values={values} errors={errors} handleSwitchChange={handleSwitchChange}
                    editFirstNameRef={editFirstNameRef} editLastNameRef={editLastNameRef} editGenderRef={editGenderRef}
                    editDeptRef={editDeptRef} editEmailRef={editEmailRef} editPhoneRef={editPhoneRef} editAddress1Ref={editAddress1Ref}
                    editAddress2Ref={editAddress2Ref} editCityRef={editCityRef} editStateRef={editStateRef} editZipRef={editZipRef}
                    editCountryRef={editCountryRef} editUsernameRef={editUsernameRef} editPasswordRef={editPasswordRef}
                    editConfirmPasswordRef={editConfirmPasswordRef} mutation={mutation}
                    onClose={onModalClose}
                /> :
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <DeleteModal onClose={onClose} values={values} handleDeleteSubmit={handleDeleteSubmit} deleteMutation={deleteMutation} />
                </Modal>
            }
            <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
                <Grid
                    my="26px"
                    mb={{ lg: "16px" }}
                >
                    <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
                        <CardHeader p="12px 0px 28px 0px">
                            <Flex direction="column">
                                <Text
                                    fontSize="lg"
                                    color="white"
                                    fontWeight="bold"
                                >
                                    <Text as="span" bgColor="#8E44AD" p={2}>
                                        LIST OF EMPLOYEES
                                    </Text>
                                    <Text as="span" bgColor="#27AE60" p={2}>
                                        {`(Page${page} of ${pageCount})`}
                                    </Text>
                                    <Text as="span" bgColor="#F39C12" p={2}>
                                        {`(${count} employee(s) found)`}
                                    </Text>
                                </Text>
                            </Flex>
                        </CardHeader>
                        <Table variant="unstyled" size='sm'>
                            <Thead>
                                <Tr fontSize="md" my=".8rem" ps="0px">
                                    <Th fontSize="md" color="white" >USERNAME</Th>
                                    <Th fontSize="md" color="white" >FIRST NAME</Th>
                                    <Th fontSize="md" color="white"> DEPARTMENT </Th>
                                    <Th fontSize="md" color="white">EMAIL ADDRESS</Th>

                                    <Th fontSize="md" textAlign="center" color="white">ACTIONS</Th>



                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((user, index) => {
                                    return (
                                        <DashboardTableRow11
                                            key={index}
                                            username={user.username}
                                            firstName={user.first_name}
                                            lastName={user.last_name}
                                            dept={user.dept}
                                            emailAddress={user.email}
                                            gender={user.gender}
                                            onEditClick={() => {
                                                setValues(user);
                                                setModalType('edit');
                                                onOpen();
                                            }}
                                            onDeleteClick={() => {
                                                setValues(user);
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
