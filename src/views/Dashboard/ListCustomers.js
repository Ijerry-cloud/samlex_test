// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
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
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons

import { DashboardTableRow3 } from "components/Tables/DashboardTableRow";
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
import { BsGithub, BsDiscord, BsPerson, BsPersonAdd } from 'react-icons/bs';
import { dashboardTableData4 } from "variables/general";
import { SalesOverviewData } from "variables/general2";

const EditModal = ({onEditChange, handleEditSubmit, onClose, currentCustomer}) => (
    <ModalContent>
        <ModalHeader>Edit Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container bg="#9DC4FB" maxW="full" mt={0} overflow="hidden">
                <Box bg="white" maxW="full">
                    <Box
                        color="white"
                        borderRadius="lg">
                        <Box p={1}>

                            <Box borderRadius="lg">
                                <Box m={8} color="#0B0E3F">
                                    <VStack spacing={2} maxW="full">

                                        <FormControl id="first_name">
                                            <FormLabel>First Name</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="first_name" type="text" size="sm" onChange={onEditChange} value={currentCustomer?.first_name || ''} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="last_name">
                                            <FormLabel>Last Name</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="last_name" type="text" size="sm" onChange={onEditChange} value={currentCustomer?.last_name || ''} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="email">
                                            <FormLabel>E-Mail:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="phone_number">
                                            <FormLabel>Phone Number:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="address_1">
                                            <FormLabel>Address 1</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="address_2">
                                            <FormLabel>Address 2</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="city">
                                            <FormLabel>City:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="state">
                                            <FormLabel>State</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="zip">
                                            <FormLabel>Zip</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="country">
                                            <FormLabel>Country</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onEditChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="comments">
                                            <FormLabel>Comments:</FormLabel>
                                            <Textarea
                                                borderColor="gray.300"
                                                _hover={{
                                                    borderRadius: 'gray.300',
                                                }}
                                                placeholder="message"
                                            />
                                        </FormControl>
                                    </VStack>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button onClick={handleEditSubmit} variant='ghost'>Add customer</Button>
        </ModalFooter>
    </ModalContent>
);

const AddModal = ({ onChange, handleSubmit, onClose, customerDetails, setCustomerDetails }) => (
    <ModalContent>
        <ModalHeader>Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container bg="#9DC4FB" maxW="full" mt={0} overflow="hidden">
                <Box bg="white" maxW="full">
                    <Box
                        color="white"
                        borderRadius="lg">
                        <Box p={1}>

                            <Box borderRadius="lg">
                                <Box m={8} color="#0B0E3F">
                                    <VStack spacing={2} maxW="full">

                                        <FormControl id="first_name">
                                            <FormLabel>First Name</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="first_name" type="text" size="sm" onChange={onChange} value={customerDetails?.first_name || ''} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="last_name">
                                            <FormLabel>Last Name</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="last_name" type="text" size="sm" onChange={onChange} value={customerDetails?.last_name || ''} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="email">
                                            <FormLabel>E-Mail:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="phone_number">
                                            <FormLabel>Phone Number:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="address_1">
                                            <FormLabel>Address 1</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="address_2">
                                            <FormLabel>Address 2</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="city">
                                            <FormLabel>City:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="state">
                                            <FormLabel>State</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="zip">
                                            <FormLabel>Zip</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="country">
                                            <FormLabel>Country</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<BsPerson color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" onChange={onChange} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="comments">
                                            <FormLabel>Comments:</FormLabel>
                                            <Textarea
                                                borderColor="gray.300"
                                                _hover={{
                                                    borderRadius: 'gray.300',
                                                }}
                                                placeholder="message"
                                            />
                                        </FormControl>
                                    </VStack>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button onClick={handleSubmit} variant='ghost'>Add customer</Button>
        </ModalFooter>
    </ModalContent>

);

const DeleteModal = ({onClose, currentCustomer}) => (
    <ModalContent>
        <ModalHeader>Delete Customer Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text> Are you sure you want to delete {currentCustomer?.first_name + " " + currentCustomer?.last_name } ?
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

export default function Dashboard() {
    const value = "$100.000";

    const [customerDetails, setCustomerDetails] = useState({});
    const [currentCustomer, setCurrentCustomer] = useState({});
    const history = useHistory();
    // paginate state 
    const [itemOffset, setItemOffset] = useState(0);
    // 3 items per page 
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dashboardTableData4.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dashboardTableData4.length / itemsPerPage);
    // Chakra Color Mode
    const iconTeal = useColorModeValue("#ffb400", "#ffb400");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const toast = useToast();

    //for the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalType, setModalType] = useState('add');

    const onChange = (e) => {

        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });

    };

    const onEditChange = (e) => {

        const { name, value } = e.target;
        setCurrentCustomer({ ...currentCustomer, [name]: value });
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dashboardTableData5.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const handleSubmit = () => {
        if (!customerDetails?.first_name || !customerDetails?.last_name) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setCustomerDetails({});
        history.push('/admin/customers');
        return;
    }

    const handleEditSubmit = () => {
        if (!currentCustomer?.first_name || !currentCustomer?.last_name) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setCurrentCustomer({});
        history.push('/admin/customers');
        return;
        
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                {modalType === "add"? <AddModal onChange={onChange} onClose={onClose}
                    handleSubmit={handleSubmit} customerDetails={customerDetails}
                    setCustomerDetails={setCustomerDetails} /> : modalType === "edit" ?
                    <EditModal onEditChange={onEditChange} onClose={onClose}
                    handleEditSubmit={handleEditSubmit} currentCustomer={currentCustomer}
                    setCurrentCustomer={setCurrentCustomer} /> : <DeleteModal onClose={onClose} currentCustomer={currentCustomer}/>}

            </Modal>
            <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
                <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
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
                                        Total Number of Customers (Feb 2023)
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor}>
                                            125
                                        </StatNumber>
                                        {/* <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    +55%
                  </StatHelpText> */}
                                    </Flex>
                                </Stat>
                                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                                    <Icon h={"35px"} w={"35px"} as={TbCurrencyNaira} color='#fff' />
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
                                        Number of new customers (This Month)
                                    </StatLabel>
                                    <Flex>
                                        <StatNumber fontSize="lg" color={textColor}>
                                            45
                                        </StatNumber>
                                        {/* <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    +5%
                  </StatHelpText> */}
                                    </Flex>
                                </Stat>
                                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                                    <PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                                </IconBox>
                            </Flex>
                        </CardBody>
                    </Card>
                </SimpleGrid>
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
                                    CUSTOMERS LISTINGS (FEB 2023)
                                </Text>
                                <Flex align="center">
                                    <ButtonGroup spacing='2' padding='2'>
                                        <Button leftIcon={<BsPersonAdd />} variant='solid' backgroundColor='#5a8100' color='white'
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
                        <Table variant="striped" color={textColor} size='sm'>
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
                                {currentItems.map((row) => {
                                    return (
                                        <DashboardTableRow3
                                            first_name={row.first_name}
                                            last_name={row.last_name}
                                            phone_no={row.phone_no}
                                            email_address={row.email_address}
                                            total_purchased={row.total_purchased}
                                            onEditClick={() => {
                                                setCurrentCustomer(row);
                                                setModalType('edit');
                                                onOpen();                                                
                                            }}
                                            onDeleteClick = {() => {
                                                setCurrentCustomer(row);
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
