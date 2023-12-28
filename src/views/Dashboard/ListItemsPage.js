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
    Icon,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    SimpleGrid,
    Spacer,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Table,
    Td,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    Tfoot,
    useDisclosure,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons

import { DashboardTableRow2 } from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import MyPaginate from "components/Pagination";
import React, { useState } from "react";
// react icons
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { MdError, MdFilterList } from 'react-icons/md';
import { AiOutlineNumber, AiOutlineMacCommand } from 'react-icons/ai';
import { dashboardTableData5 } from "variables/general";
import { SalesOverviewData } from "variables/general2";
import { useToast } from '@chakra-ui/react';
import avatar4 from "assets/img/samlex2.png";
import { GET_CREATE_SALES, DELETE_SALE } from "config/serverUrls";
import { useQuery, useMutation } from 'react-query';
import { fetchData, postData } from 'modules/utilities/util_query';
import { handleApiError } from "modules/utilities/responseHandlers";
import { useSelector } from 'react-redux';
import { getAuthToken } from 'modules/auth/redux/authSelector';


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
                <Button size="sm" colorScheme='red' isLoading={props.mutation.isLoading} onClick={props.handleDeleteSubmit}>Yes</Button>
            </ModalFooter>
        </ModalContent>

    )

}


export default function Dashboard() {
    const [modalType, setModalType] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();

    const token = useSelector(getAuthToken);
    const [values, setValues] = React.useState({});
    const [sales, setSales] = React.useState([]);
    const [sale, setSale] = React.useState({});

    const [count, setCount] = React.useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const textColor = "white";

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onModalClose = () => {
        setSale({});
        setModalType(null);
        onClose();
    }

    const payload_data = {};

    const result = useQuery(['my sales',
        {
            url: GET_CREATE_SALES + `?page=${page}`,
            payload_data,
            authenticate: true,
            token
        }],
        fetchData,
        {
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
    );

    const { isLoading, refetch } = result;

    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            const id = response?.data?.id;
            toast({
                title: 'Success',
                description: 'sales deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setSales((sales) => {
                const updated = sales.filter(sale => sale.id !== id);
                //console.log(new_items);
                //console.log(id);
                return updated
            })
            setCount((count) => count - 1)

            //setLoading(false);
            onModalClose();
            //refetch();

            return;
        },
        onError: (error) => {
            handleApiError(error);
            //setLoading(false);
            onModalClose();
        }
    });

    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }

    const handleDeleteSubmit = () => {
        const data = { ...sale }
        //setLoading(true);

        mutation.mutate({
            url: DELETE_SALE,
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
            <Modal isOpen={isOpen} onClose={onModalClose} size="4xl">
                <ModalOverlay />
                {modalType === "view" ? <ViewModal sale={sale} onClose={onModalClose} /> :
                    <DeleteModal sale={sale} onClose={onModalClose} handleDeleteSubmit={handleDeleteSubmit}
                        mutation={mutation} />}
            </Modal>
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
                                >
                                    <Text as="span" bgColor="#8E44AD" p={2}>
                                        MY SALES RECORD
                                    </Text>
                                    <Text as="span" bgColor="#27AE60" p={2}>
                                        {`(Page ${page} of ${pageCount})`}
                                    </Text>
                                    <Text as="span" bgColor="#F39C12" p={2}>
                                        {`(${count} item(s) found)`}
                                    </Text>
                                </Text>
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

    );
}
