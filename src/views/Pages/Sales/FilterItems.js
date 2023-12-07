// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Image,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Link,
    Select,
    SimpleGrid,
    Switch,
    Stat,
    StatLabel,
    StatNumber,
    Spacer,
    Spinner,
    Table,
    Tbody,
    Thead,
    Text,
    Tr,
    Th,
    Td,
    Tfoot,
    VStack,
    useColorModeValue,
    useDisclosure,
    color,
} from "@chakra-ui/react";
// Assets
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import BgSignUp from "assets/img/BgSignUp.png";

import { useParams, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { AsyncSelect } from "chakra-react-select";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { MdFilterList, MdViewList } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { dashboardTableData5 } from "variables/general";
import { DashboardTableRow2 } from "components/Tables/DashboardTableRow";
import { DashboardTableRow6 } from "components/Tables/DashboardTableRow";
import avatar4 from "assets/img/samlex2.png";
import MyPaginate from "components/Pagination";
import { useToast } from '@chakra-ui/react';

import { getAuthToken } from 'modules/auth/redux/authSelector';
import { useSelector } from 'react-redux';
import { postData, fetchData } from 'modules/utilities/util_query';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { getCurrentDateInput } from 'modules/utilities';
import { handleApiError } from "modules/utilities/responseHandlers";
import { FIELD_REQUIRED, START_GREATER_THAN_END } from 'constants/formErrorMessages';
import { checkObject, isError } from 'modules/utilities';
import { GET_CREATE_SALES, GET_CREATE_ITEM, GET_CREATE_CUSTOMERS, GET_CREATE_USERS, GET_SALES_REPORT, DELETE_SALE_REPORT } from 'config/serverUrls';
import "theme/asyncSelect.css";


const today = getCurrentDateInput();

const ViewModal = (props) => {
    return (
        <ModalContent>
            <ModalHeader>Transaction Receipt</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box px={8} color="black" bgColor="white">
                    <Box spacing={4} p={4} mt={4} rounded="md" color="black">
                        <Flex color='white' w='100%' h='200px' bgColor='black' mb={12}>
                            <Container alignSelf='center' ml='10px' >
                                <Image
                                    me={{ md: "22px" }}
                                    src={avatar4}
                                    w="125px"
                                    h="78px"
                                    verticalAlign='center'
                                // borderRadius="15px"
                                />
                            </Container>
                            <Container alignSelf='center' >
                                <Text fontSize="lg" fontWeight="bold">
                                    SAMLEX ELECTRONICS
                                </Text>
                                <Text fontSize="lg" fontWeight="bold">
                                    COMPANY LTD
                                </Text>
                                <Text>{props.sale.company_address}</Text>
                            </Container>
                            <Spacer />
                            <Container alignSelf='center' textAlign='right'>
                                <Text>{props.sale.company_phone1}</Text>
                                {props.sale.company_phone2 && (<Text>{props.sale.company_phone2}</Text>)}
                                <Text>{props.sale.company_email}</Text>
                            </Container>
                        </Flex>
                        <Grid templateColumns='repeat(2, 1fr)' gap={2} px='10px' mb={12}>
                            <GridItem>
                                <Text textTransform="uppercase" fontSize='sm'>Billed to:</Text>
                                <Text fontSize="lg" fontWeight="bold">
                                    {props.sale.customer_name}
                                </Text>
                                <Text textTransform="uppercase" fontSize='sm'>{props.sale.email}</Text>
                                <Text textTransform="uppercase" fontSize='sm'>{props.sale.customer_address}</Text>
                            </GridItem>
                            <GridItem textAlign='right'>
                                <Text textTransform="uppercase" fontSize='sm'>Invoice Number:</Text>
                                <Text fontSize="lg" fontWeight="bold">
                                    {props.sale.sales_id}
                                </Text>
                                <Text textTransform="uppercase" fontSize='sm'>{`Sales Mode: ${props.sale.register_mode} Payment Type: ${props.sale.payment_type}`}</Text>
                                <Text textTransform="uppercase" fontSize='sm'>Date: {props.sale.date}</Text>
                            </GridItem>

                            <GridItem >
                                <Text textTransform="uppercase" fontSize='sm'>Employee ID</Text>
                                <Text fontSize='sm'>
                                    {props.sale.employee_name}
                                </Text>
                                <Text textTransform="uppercase" fontSize='sm'>{`Designation: ${props.sale.employee_dept || ""}`}</Text>
                            </GridItem>
                        </Grid>
                        <Box width='100%' px='10px'>
                            <Table variant="unstyled" size='sm'>
                                <Thead>
                                    <Tr backgroundColor="#ffebae" borderBottomWidth="1px" borderColor="black">
                                        <Th textAlign='center'>Item</Th>
                                        <Th isNumeric textAlign='right'>Unit Price </Th>
                                        <Th isNumeric textAlign='right'>NUMBER</Th>
                                        <Th isNumeric textAlign='right'>Amount</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {props.sale.items?.map((option, index) => {
                                        return (
                                            <Tr key={index} borderBottomWidth="1px" borderColor="black">
                                                <Td textAlign='left'>{option.name}</Td>
                                                <Td isNumeric textAlign='right' >{option.unit_price}</Td>
                                                <Td isNumeric textAlign='right' backgroundColor="#ffebae">{option.number}</Td>
                                                <Td isNumeric textAlign='right' backgroundColor="#ffebae">{(option.number * option.unit_price).toFixed(2)}</Td>
                                            </Tr>
                                        );
                                    })}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th backgroundColor="#ffebae" fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>Sub Total:</Th>
                                        <Th isNumeric backgroundColor="#ffebae" fontSize='sm' textTransform='none' textAlign='right'>NGN {Number(props.sale.sub_total).toFixed(2)}</Th>
                                    </Tr>
                                    <Tr>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th backgroundColor="#ffebae" fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>Discount:</Th>
                                        <Th isNumeric backgroundColor="#ffebae" fontSize='sm' textTransform='none' textAlign='right'>NGN {props.sale.discount >= 0 && (Number(props.sale.discount).toFixed(2))}</Th>
                                    </Tr>
                                    <Tr>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th backgroundColor="black" color='white' fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>TOTAL:</Th>
                                        <Th backgroundColor="black" color='white' fontSize='sm' textTransform='none' textAlign='right'>NGN {props.sale.discount >= 0 && (Number(props.sale.sub_total) - Number(props.sale.discount)).toFixed(2)}</Th>
                                    </Tr>
                                    <Tr>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>CASH:</Th>
                                        <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>{props.sale.paid_cash >= 0 && (Number(props.sale.paid_cash).toFixed(2))}</Th>
                                    </Tr>
                                    <Tr>
                                        <Th></Th>
                                        <Th></Th>
                                        <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>CHANGE DUE:</Th>
                                        <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>NGN {(props.sale.discount >= 0 && props.sale.paid_cash >= 0) && Number(+props.sale.paid_cash + +props.sale.discount - props.sale.sub_total).toFixed(2)}</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </Box>

                        <Box alignItems='center' justifyContent='center' width='100%'>
                            <Text fontSize="lg" fontWeight="bold" textAlign='center'>
                                {props.sale.comments}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='red' onClick={props.onClose} mr={3}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>

    )

}

const DeleteModal = (props) => {
    return (
        <ModalContent
            bgColor="#232333"
            borderColor="gray.900"
            color="white"
            boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
        >
            <ModalHeader>Delete Sale</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Container maxW="full">
                    <Text> Are you sure you want to delete Sale Id:{props.sale.sales_id} ?
                    </Text>
                </Container>
            </ModalBody>

            <ModalFooter>
                <Button variant='ghost' mr={3} onClick={props.onClose}>
                    Close
                </Button>
                <Button colorScheme='red' isLoading={props.loading} onClick={props.handleDeleteSubmit}>Yes</Button>
            </ModalFooter>
        </ModalContent>

    )

}

function FilterSales() {
    const isInitialMount = useRef(true);
    const queryClient = useQueryClient();
    const [modalType, setModalType] = React.useState(null);
    const textColor = "white";
    const bgColor = "#2a2c40";
    const [date, setDate] = useState({
        startDate: today,
        endDate: today
    });
    const [errors, setErrors] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [endpoint, setEndpoint] = useState('');
    const [sale, setSale] = React.useState({});
    const [sales, setSales] = useState(null);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [enabled, setEnabled] = useState(false);
    const token = useSelector(getAuthToken);
    const toast = useToast();
    const history = useHistory();

    const payload_data = {};
    const url = `${GET_SALES_REPORT}?startDate=${date?.startDate}&endDate=${date?.endDate}&itemNames=${selectedOptions.map(obj => obj.name).join(',')}&employeeIds=${employees.map(obj => obj.value).join(',')}&customerIds=${customers.map(obj => obj.value).join(',')}&page=${page}`;

    const { isLoading, refetch, isSuccess, isFetching, remove } = useQuery(['anySales',
        {
            url: url,
            payload_data,
            authenticate: true,
            token

        }],
        fetchData,
        {
            enabled: enabled,
            retry: false,
            onSuccess: (response) => {
                //console.log(response?.data);
                const data = response?.data;
                setCount(data?.count || 0);
                setSales(data?.results || []);
                setPageCount(data?.last_page || 1);

            },
            onError: (error) => {
                handleApiError(error);
            }
        }
    )

    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            toast({
                title: 'Success',
                description: 'sales deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            onModalClose();
            refetch();

            return;
        },
        onError: (error) => {
            handleApiError(error);
            onModalClose();
        }
    });

    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        setEnabled(true);

        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }

    const loadCustomers = async (inputValue) => {
        let response = await fetchData({
            queryKey: ['all customers', {
                url: GET_CREATE_CUSTOMERS + `?name=${inputValue}`,
                payload_data: {},
                authenticate: true,
                token
            }]
        });

        const options = response.data.map((option) => ({
            ...option,
            value: option?.id,
            label: option?.first_name + " " + option?.last_name,
            colorScheme: 'none'

        }));


        return options;
    }

    const loadItems = async (inputValue) => {
        console.log('waiting');
        let response = await fetchData({
            queryKey: ['all items', {
                url: GET_CREATE_ITEM + `?name=${inputValue}`,
                payload_data: {},
                authenticate: true,
                token
            }]
        });

        const options = response.data;


        return options;
    }

    const loadEmployees = async (inputValue) => {
        let response = await fetchData({
            queryKey: ['all employees', {
                url: GET_CREATE_USERS + `?username=${inputValue}`,
                payload_data: {},
                authenticate: true,
                token
            }]
        });

        const options = response.data;


        return options;
    }

    const handleItemChange = (selectedOption) => {
        const allSelected = selectedOption.map(obj => {
            return {
                label: obj.label,
                value: obj.value,
                colorScheme: obj.colorScheme,
                name: obj.name,
            }
        });
        setSelectedOptions(allSelected);
    };

    const handleCustomerChange = (customer, { action }) => {

        if (action === 'clear') {
            setCustomers(null);
        }
        else {
            setCustomers(customer);
        }
    };

    const handleEmployeeChange = (employee, { action }) => {

        if (action === 'clear') {
            setEmployees(null);
        }
        else {
            setEmployees(employee);
        }
    };

    const handleDateChange = (evt) => {
        const { name, value } = evt.target;
        if (name) {
            setDate({ ...date, [name]: value });
            return;
        }
    }

    const [resultsPage, setResultsPage] = useState(false);

    const [item, setItem] = useState({});


    //for receipt details page
    const [selectedItem, setSelectedItem] = useState({});

    // for search results and pagination 

    const { isOpen, onOpen, onClose } = useDisclosure()

    const onModalClose = () => {
        setSale({});
        setModalType(null);
        onClose();
    }

    const sumTotal = (arr) => {
        return arr?.reduce((total, obj) => {
            var itemTotal = obj.price * obj.quantity;
            return (total + itemTotal);
        }, 0)

    };

    const onChange = (e) => {

        const { name, value } = e.target;
        setItem({ ...item, [name]: value });

    };

    const validate = () => {
        let uerrors = {}
        uerrors.startDate = date.startDate ? "" : FIELD_REQUIRED
        uerrors.endDate = date.endDate ? "" : FIELD_REQUIRED

        if (!date.startDate || !date.endDate) {
            toast({
                title: 'Missing Information.',
                description: "Please set a start and end date",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;
        }

        if (date.startDate && date.endDate && date.startDate > date.endDate) {
            uerrors.startDate = START_GREATER_THAN_END
            uerrors.endDate = START_GREATER_THAN_END
            toast({
                title: 'Missing Information.',
                description: "Start date must come before end date",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;
        }
        return uerrors
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

        // remove this ??
        const data = {
            selectedOptions,
            customers,
            employees,
            date
        }
        console.log(data);

        refetch();
    }



    const goBack = () => {
        setResultsPage(false);
    }

    const handleDeleteSubmit = () => {
        const data = { ...sale }

        mutation.mutate({
            url: DELETE_SALE_REPORT,
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

    if (isSuccess && sales) {
        return (
            <>
                <Modal isOpen={isOpen} onClose={onModalClose} size="4xl">
                    <ModalOverlay />
                    {modalType === "view" ? <ViewModal sale={sale} onClose={onModalClose} /> :
                        <DeleteModal sale={sale} onClose={onModalClose} handleDeleteSubmit={handleDeleteSubmit}
                            loading={mutation.isLoading} />}
                </Modal>
                <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
                    <Grid
                        my="26px"
                        mb={{ lg: "16px" }}
                    >
                        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
                            <CardHeader p="12px 0px 28px 0px">
                                <Flex w='100%' alignItems='center' gap='2' >
                                    <Text
                                        fontSize="lg"
                                        color={textColor}
                                        fontWeight="bold"
                                    >

                                        {`SALES RECORD (${date.startDate} to ${date.endDate}) (${count} records found)`}
                                    </Text>
                                    <Spacer />
                                    <Button
                                        bgColor="#FFD700"
                                        size="sm"
                                        onClick={() => {
                                            setEnabled(false);
                                            setSales(null);
                                        }}
                                    >
                                        Back to Search
                                    </Button>

                                </Flex>
                            </CardHeader>
                            <Table variant="unstyled" color={textColor} size='sm'>
                                <Thead>
                                    <Tr my=".8rem">
                                        <Th color="white" fontSize="sm" px={2} mx={0}>
                                            DATE
                                        </Th>
                                        <Th color="white" fontSize="sm" px={2} mx={0}>EMPLOYEE</Th>
                                        <Th color="white" fontSize="sm" px={2} mx={0}>SOLD TO</Th>
                                        <Th maxWidth={{ sm: "70px" }} px={2} mx={0} textAlign="right" color="white" fontSize="sm"> QTY</Th>
                                        <Th textAlign="right" color="white" px={2} mx={0} fontSize="sm">SUBTOTAL</Th>
                                        <Th textAlign="right" color="white" px={2} mx={0} fontSize="sm">DISC</Th>
                                        <Th textAlign="right" color="white" px={2} mx={0} fontSize="sm">TOTAL</Th>
                                        <Th textAlign="right" color="white" px={2} mx={0} fontSize="sm">PAYMENT</Th>
                                        <Th textAlign="center" color="white" px={2} mx={0} fontSize="sm">ACTIONS</Th>



                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {sales.map((row, index) => {
                                        const jsDate = new Date(row.date);
                                        const options = { year: 'numeric', month: 'short', day: '2-digit' };
                                        const formattedDate = jsDate.toLocaleDateString('en-US', options);

                                        return (
                                            <DashboardTableRow2
                                                key={index}
                                                Date={formattedDate}
                                                employee_name={row.employee_name}
                                                customer_name={row.customer_name}
                                                sum_items={row.sum_items}
                                                sub_total={row.sub_total}
                                                discount={row.discount}
                                                payment_type={row.payment_type}
                                                paid_cash={row.paid_cash}
                                                onViewClick={() => {
                                                    setSale(row);
                                                    setModalType("view");
                                                    onOpen();
                                                }}
                                                onDeleteClick={() => {
                                                    setSale(row);
                                                    setModalType("delete");
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

        )
    }


    return (
        <>

            <Flex
                direction="column"
                alignSelf="center"
                justifySelf="center"
            >

                <Flex alignItems="center" justifyContent="center" mb="60px" mt="80px">

                    <Flex
                        direction="column"
                        w="100%"
                        background="transparent"
                        borderRadius="15px"
                        p="40px"
                        mx={{ base: "10px" }}
                        bg={bgColor}
                        color={textColor}
                        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                    >
                        <Text
                            fontSize="2xl"
                            color="#FFD700"
                            fontWeight="bold"
                            textAlign="center"
                            mb="22px"
                            fontFamily="heading"

                        >
                            SALES REPORT
                        </Text>
                        <FormControl>
                            <FormLabel fontSize="sm" fontWeight="bold">
                                Name of Items:
                            </FormLabel>
                            <AsyncSelect
                                isMulti
                                name="item_name"
                                onChange={handleItemChange}
                                placeholder="Start typing name..."
                                loadOptions={loadItems}
                                value={selectedOptions}
                                cacheOptions
                                className="chakra-react-select"
                                classNamePrefix="chakra-react-select"
                            />
                        </FormControl>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6} mt={4}>
                            <FormControl >
                                <FormLabel fontSize="sm" fontWeight="bold">
                                    Customer Names:
                                </FormLabel>
                                <AsyncSelect
                                    isMulti
                                    name="customer_name"
                                    size="sm"
                                    onChange={(customer) => {
                                        setCustomers(customer);
                                    }}
                                    placeholder="Start typing name..."
                                    loadOptions={loadCustomers}
                                    cacheOptions
                                    value={customers}
                                    className="chakra-react-select"
                                    classNamePrefix="chakra-react-select"
                                />

                            </FormControl>
                            <FormControl >
                                <FormLabel fontSize="sm" fontWeight="bold">
                                    Employee Names:
                                </FormLabel>
                                <AsyncSelect
                                    isMulti
                                    name="employee_name"
                                    size="sm"
                                    onChange={(employee) => {
                                        setEmployees(employee);
                                    }}
                                    placeholder="Start typing name..."
                                    loadOptions={loadEmployees}
                                    cacheOptions
                                    value={employees}
                                    className="chakra-react-select"
                                    classNamePrefix="chakra-react-select"
                                />
                            </FormControl>
                        </Grid>
                        <Grid templateColumns='repeat(3, 1fr)' gap={2} mt={4}>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="bold">
                                    Start Date: *
                                </FormLabel>
                                <Input
                                    isInvalid={isError(errors?.startDate)}
                                    errorBorderColor='red.300'
                                    name="startDate"
                                    onChange={handleDateChange}
                                    type="date"
                                    size="sm"
                                    value={date?.startDate}
                                    borderRadius="15px"
                                    borderColor="rgba(255, 255, 255, 0.2)"
                                    _placeholder={{ opacity: 0.2, color: 'white' }}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize="sm" fontWeight="bold">
                                    End Date: *
                                </FormLabel>
                                <Input
                                    isInvalid={isError(errors?.endDate)}
                                    errorBorderColor='red.300'
                                    name="endDate"
                                    onChange={handleDateChange}
                                    type="date"
                                    size="sm"
                                    value={date?.endDate}
                                    borderRadius="15px"
                                    borderColor="rgba(255, 255, 255, 0.2)"
                                    _placeholder={{ opacity: 0.2, color: 'white' }}
                                />
                            </FormControl>
                            <FormControl id="">
                                <FormLabel fontSize="sm" fontWeight='bold'>Export to PDF</FormLabel>
                                <Switch
                                    size="md"
                                    colorScheme="blue"
                                />
                            </FormControl>
                        </Grid>
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                colorScheme="blue"
                                onClick={handleSubmit}
                            >
                                Search
                            </Button>

                        </Box>

                    </Flex>
                </Flex>

            </Flex>
        </>

    );
}

export default FilterSales;
