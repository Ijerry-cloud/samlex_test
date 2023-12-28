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
import { DashboardTableRow12 } from "components/Tables/DashboardTableRow";
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
import { GET_DAILY_REPORT } from 'config/serverUrls';
import "theme/asyncSelect.css";


const today = getCurrentDateInput();



function DailyReport() {
    const textColor = "white";
    const bgColor = "#2a2c40";
    const [date, setDate] = useState({
        startDate: today,
        endDate: today
    });
    const [errors, setErrors] = useState({});

    const [csv, setCsv] = useState(false);
    const [days, setDays] = useState(null);
    const [count, setCount] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [enabled, setEnabled] = useState(false);
    const token = useSelector(getAuthToken);
    const toast = useToast();

    const payload_data = {};
    const url = `${GET_DAILY_REPORT}?startDate=${date?.startDate}&endDate=${date?.endDate}&page=${page}&csv=${csv}`;

    const { isLoading, refetch, isSuccess, isFetching, remove } = useQuery(['daily-report',
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
                if (csv) {


                    const blob = new Blob([response.data], { type: 'text/csv' });

                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "DailySummary.csv";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
                //console.log(response?.data);
                else {
                    const data = response?.data;
                    setCount(data?.count || 0);
                    setDays(data?.results || []);
                    setPageCount(data?.last_page || 1);
                }

            },
            onError: (error) => {
                handleApiError(error);
            }
        }
    )


    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        setEnabled(true);

        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }


    const handleDateChange = (evt) => {
        const { name, value } = evt.target;
        if (name) {
            setDate({ ...date, [name]: value });
            return;
        }
    }

    const handleSwitchChange = () => {
        setCsv((csv) => !csv)
        return;
    }



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

        refetch();
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

    if (isSuccess && days) {
        return (
            <>
                <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
                    <Grid
                        my="26px"
                        mb={{ lg: "16px" }}
                    >
                        <Card p="16px" bgColor="gray.900">
                            <CardHeader p="12px 0px 28px 0px">
                                <Flex w='100%' alignItems='center' gap='2' >
                                    <Text
                                        fontSize="lg"
                                        color={textColor}
                                        fontWeight="bold"
                                    >
                                        <Text as="span" bgColor="#8E44AD" p={2}>
                                            DAILY REPORT
                                        </Text>
                                        <Text as="span" bgColor="#27AE60" p={2}>
                                            {`(${date.startDate} to ${date.endDate})`}
                                        </Text>
                                        <Text as="span" bgColor="#F39C12" p={2}>
                                            {`(${count} record(s) found)`}
                                        </Text>
                                    </Text>
                                    <Spacer />
                                    <Button
                                        bgColor="#FFD700"
                                        size="sm"
                                        onClick={() => {
                                            setEnabled(false);
                                            setDays(null);
                                        }}
                                    >
                                        Back to Search
                                    </Button>

                                </Flex>
                            </CardHeader>
                            <Table color={textColor} size='sm'>
                                <Thead >
                                    <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
                                        <Th color="gray.500" fontSize="sm" px={2} mx={0}  >
                                            DATE
                                        </Th>
                                        <Th textAlign="right" color="gray.500" fontSize="sm" px={2} mx={0} >NO. OF SALES</Th>
                                        <Th textAlign="right" color="gray.500" fontSize="sm" px={2} mx={0} >TOTAL QTY. SOLD</Th>
                                        <Th textAlign="right" color="gray.500" fontSize="sm" px={2} mx={0} >TOTAL AMOUNT</Th>
                                    </Tr>
                                </Thead>
                                <Tbody borderColor="red">
                                    {days.map((row, index) => {
                                        const jsDate = new Date(row.day);
                                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                        const formattedDate = jsDate.toLocaleDateString('en-US', options);


                                        return (
                                            <DashboardTableRow12
                                                key={index}
                                                Date={formattedDate}
                                                no_of_sales={row.no_of_sales}
                                                total_amount={row.total_amount}
                                                total_qty={row.total_items}
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
                        w="745px"
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
                            DAILY REPORT
                        </Text>
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
                                <FormLabel fontSize="sm" fontWeight='bold'>Export to CSV:</FormLabel>
                                <Switch
                                    isChecked={csv}
                                    onChange={handleSwitchChange}
                                    name={"exportCsv"}
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

export default DailyReport;
