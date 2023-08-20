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
import { checkObject, isError } from 'modules/utilities';


const DeleteModal = ({ onClose, currentCustomer }) => (
    <ModalContent>
        <ModalHeader>Delete Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text> Are you sure you want to delete {currentCustomer?.first_name + " " + currentCustomer?.last_name} ?
                </Text>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button colorScheme='red' >Yes</Button>
        </ModalFooter>
    </ModalContent>

);

const EditDrawer = ({ handleChange, handleSubmit, isOpen, btnRef, onClose, values, errors }) => {
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
    >
        <DrawerOverlay />
        <DrawerContent>
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
                                isInvalid={isError(errors?.firstName)}
                                errorBorderColor='red.300'
                                name={'firstName'}
                                onChange={handleChange}
                                type="text"
                                size="sm"
                                value={values?.firstName || ''}
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
                                isInvalid={isError(errors?.lastName)}
                                errorBorderColor='red.300'
                                name={'lastName'}
                                onChange={handleChange}
                                type="text"
                                size="sm"
                                value={values?.lastName || ''}
                                placeholder="last name" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>E-mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdEmail color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Phone Number:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BsFillTelephoneFill color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Address 1:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaRegAddressCard color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Address 2:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaRegAddressCard color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>City:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaCity color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>State:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaCity color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Zip:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<AiOutlineNumber color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize='sm'>Country:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<BsFillFlagFill color="gray.800" />}
                            />
                            <Input name="" type="text" size="sm" placeholder="" />
                        </InputGroup>
                    </FormControl>
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
                                isInvalid={isError(errors?.userName)}
                                errorBorderColor='red.300'
                                name={'userName'}
                                onChange={handleChange}
                                type="text"
                                size="sm"
                                value={values?.userName || ''}
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
                                isInvalid={isError(errors?.newPassword)}
                                errorBorderColor='red.300'
                                name={'newPassword'}
                                onChange={handleChange}
                                type="password"
                                size="sm"
                                value={values?.newPassword || ''}
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
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>
                    <Separator />
                    <Text fontSize="md" fontWeight="600">
                        Permissions and Access
                    </Text>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Customers(add, update, delete, search)</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Items(add, update, delete, search)</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Item Kits(add, update, delete, search).</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Suppliers(add, update, delete, search)</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Reports(add, update, delete, search)</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Receivings(add, update, delete, search)</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
                        </FormControl>
                    </Grid>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Sales(add, update, delete, search)</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
                        </FormControl>
                        <FormControl id="">
                            <FormLabel fontSize='xs'>Employees(add, update, delete, search)</FormLabel>
                            <Switch colorScheme="#5A8100" me="10px" />
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
}

export default function EmployeeMgt() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const [customerDetails, setCustomerDetails] = useState({});
    const [currentCustomer, setCurrentCustomer] = useState({});
    const history = useHistory();
    // paginate state 
    const [itemOffset, setItemOffset] = useState(0);
    // 3 items per page 
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dashboardTableData8.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dashboardTableData8.length / itemsPerPage);
    // Chakra Color Mode
    const iconTeal = useColorModeValue("#ffb400", "#ffb400");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const toast = useToast();

    //for the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalType, setModalType] = useState('edit');
    const btnRef = React.useRef()

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dashboardTableData8.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const validate = () => {
        let uerrors = {}
        uerrors.firstName = values?.firstName ? "" : FIELD_REQUIRED;
        uerrors.lastName = values?.lastName ? "" : FIELD_REQUIRED;
        uerrors.userName = values?.userName ? "" : FIELD_REQUIRED;
        uerrors.newPassword = values?.newPassword ? "" : FIELD_REQUIRED;
        uerrors.confirmPassword = values?.confirmPassword ? "" : FIELD_REQUIRED;

        if (!values?.firstName || !values?.lastName || !values?.userName || !values?.newPassword || !values?.confirmPassword) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        if (values?.newPassword != values?.confirmPassword) {
            uerrors.newPassword = "Password do not match";
            uerrors.confirmPassword = "Password do not match";
            alert('Passwords do not match');
        }

        return uerrors;
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



        const data = {
            old_password: values?.oldPassword,
            new_password: values?.newPassword
        };

        setValues({});
        setErrors({});
        history.push('/admin/EmployeeMgt');

        return;
    }



    return (
        <>
            {modalType === "edit" ?
                <EditDrawer handleChange={handleChange} isOpen={isOpen} btnRef={btnRef} onClose={onClose}
                    handleSubmit={handleSubmit} values={values} errors={errors} /> :
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <DeleteModal onClose={onClose} currentCustomer={currentCustomer} />
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
                                    color={textColor}
                                    fontWeight="bold"
                                    pb=".5rem"
                                >
                                    LIST OF EMPLOYEES (2023)
                                </Text>
                            </Flex>
                        </CardHeader>
                        <Table variant="striped" color={textColor} size='sm'>
                            <Thead>
                                <Tr my=".8rem" ps="0px">
                                    <Th color="gray.400">FIRST NAME</Th>
                                    <Th color="gray.400">LAST NAME</Th>
                                    <Th color="gray.400"> PHONE NUMBER </Th>
                                    <Th color="gray.400">EMAIL ADDRESS</Th>
                                    <Center>
                                        <Th color="gray.400">ACTIONS</Th>
                                    </Center>


                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentItems.map((row) => {
                                    return (
                                        <DashboardTableRow11
                                            firstName={row.firstName}
                                            lastName={row.lastName}
                                            phoneNo={row.phoneNo}
                                            emailAddress={row.emailAddress}
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
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="< previous"
                                renderOnZeroPageCount={null}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Flex>
        </>

    );
}
