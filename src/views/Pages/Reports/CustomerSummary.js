// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Container,
    Flex,
    Grid,
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
} from "@chakra-ui/react";
// Assets
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import BgSignUp from "assets/img/BgSignUp.png";
import { useToast } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import React, { useState } from "react";
import { AsyncSelect } from "chakra-react-select";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { MdFilterList, MdViewList } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { dashboardTableData } from "variables/general";
import { DashboardTableRow8 } from "components/Tables/DashboardTableRow";
import avatar4 from "assets/img/samlex2.png";
import MyPaginate from "components/Pagination";


function CustomerSummary() {

    const itemOptions = [
        { value: '1HP SPW THERMOCOOL', label: "1HP SPW THERMOCOOL[0.00 in stock]", colorScheme: "blue", quantity: 1, price: '39500.00' },
        { value: 'BRUHM GAS COOKER BGC-9642SN 90*60 4 GAS +2E WOODEN FINISH', label: "BRUHM GAS COOKER BGC-9642SN 90*60 4 GAS +2E WOODEN FINISH", colorScheme: "purple", quantity: 1, price: '3900.00' },
        { value: 'SCANFROST STAINLESS GASCOOKER 2HOB', label: "SCANFROST STAINLESS GASCOOKER 2HOB[6.00 in stock]", colorScheme: "red", quantity: 1, price: '679500.00' },
        { value: '1000 WATTS PR -SOCKET TEC', label: "1000 WATTS PR -SOCKET TEC[0.00 in stock]", colorScheme: "orange", quantity: 1, price: '39500.00' },
        { value: '32 T.V HANGER', label: "32'-60' T.V HANGER[14.00 in stock", colorScheme: "yellow", quantity: 1, price: '9500.00' },
        { value: 'BFV-409SD 409LTS', label: "BFV-409SD 409LTS[3.00 in stock]", colorScheme: "green", quantity: 1, price: '35500.00' }
    ];

    const customerOptions = [
        { value: "blue", label: "Okeke Vincent", colorScheme: "blue" },
        { value: "purple", label: "Enyemaka Ngwa", colorScheme: "purple" },
        { value: "red", label: "Jerry Ihediwa", colorScheme: "red" },
        { value: "green", label: "Maximillian Ezeude", colorScheme: "green" },

    ];

    const employeeOptions = [
        { value: "blue", label: "Ebuka Pilolo", colorScheme: "blue" },
        { value: "purple", label: "Ezinne Ekpe", colorScheme: "purple" },
        { value: "red", label: "Ogo Ilika", colorScheme: "red" },
        { value: "green", label: "Claret Chinaza", colorScheme: "green" },
    ];

    const titleColor = useColorModeValue("#5A8100", "#8abb18");
    const textColor = useColorModeValue("gray.700", "white");
    const [selectedOptions, setSelectedOptions] = useState();
    const [customer, setCustomer] = useState();
    const [employee, setEmployee] = useState();
    const [resultsPage, setResultsPage] = useState(false);
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("#8abb18", "rgba(255, 255, 255, 0.5)");
    const [item, setItem] = useState({});
    const history = useHistory();
    const toast = useToast();

    //for receipt details page
    const [selectedItem, setSelectedItem] = useState({});

    // for search results and pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dashboardTableData.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dashboardTableData.length / itemsPerPage);
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dashboardTableData.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

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

    var handleChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
    };

    const handleSubmit = () => {
        setResultsPage(true);
    }

    const goBack = () => {
        setResultsPage(false);
    }


    return (
        <>
            <Flex
                direction="column"
                alignSelf="center"
                justifySelf="center"
                overflow="hidden"
            >
                {resultsPage ? <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
                    <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
                        <Card minH="83px">
                            <CardBody>
                                <Flex flexDirection="row" align="center" justify="center" w="100%">
                                    <Stat me="auto">
                                        <StatLabel
                                            fontSize="sm"
                                            color="gray.400"
                                            fontWeight="bold"
                                            pb=".1rem"
                                        >
                                            Total Units Sold (Feb 2023)
                                        </StatLabel>
                                        <Flex>
                                            <StatNumber fontSize="lg" color="blue">
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
                                    <IconBox as="box" h={"45px"} w={"45px"} bg="blue">
                                        <Icon h={"35px"} w={"35px"} as={MdFilterList} color='#fff' />
                                    </IconBox>
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card minH="83px">
                            <CardBody>
                                <Flex flexDirection="row" align="center" justify="center" w="100%">
                                    <Stat me="auto">
                                        <StatLabel
                                            fontSize="sm"
                                            color="gray.400"
                                            fontWeight="bold"
                                            pb=".1rem"
                                        >
                                            Net Income (Amount)(Feb 2023)
                                        </StatLabel>
                                        <Flex>
                                            <StatNumber fontSize="lg" color="black">
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
                                    <IconBox as="box" h={"45px"} w={"45px"} bg="blue">
                                        <Icon h={"35px"} w={"35px"} as={MdFilterList} color='#fff' />
                                    </IconBox>
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card minH="83px">
                            <CardBody>
                                <Flex flexDirection="row" align="center" justify="center" w="100%">
                                    <Stat me="auto">
                                        <StatLabel
                                            fontSize="sm"
                                            color="gray.400"
                                            fontWeight="bold"
                                            pb=".1rem"
                                        >
                                            Total Sales (Amount)(Feb 2023)
                                        </StatLabel>
                                        <Flex>
                                            <StatNumber fontSize="lg" color="blue">
                                                3,020,009
                                            </StatNumber>
                                            {/* <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="red.500"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    -14%
                  </StatHelpText> */}
                                        </Flex>
                                    </Stat>
                                    <IconBox as="box" h={"45px"} w={"45px"} bg="blue">
                                        <Icon h={"35px"} w={"35px"} as={MdFilterList} color='#fff' />
                                    </IconBox>
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card minH="83px">
                            <CardBody>
                                <Flex flexDirection="row" align="center" justify="center" w="100%">
                                    <Stat me="auto">
                                        <StatLabel
                                            fontSize="sm"
                                            color="gray.400"
                                            fontWeight="bold"
                                            pb=".1rem"
                                        >
                                            Total Violations (Rules)
                                        </StatLabel>
                                        <Flex>
                                            <StatNumber fontSize="lg" color="blue" fontWeight="bold">
                                                9
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
                    +8%
                  </StatHelpText> */}
                                        </Flex>
                                    </Stat>
                                    <IconBox as="box" h={"45px"} w={"45px"} bg="blue">
                                        <Icon h={"35px"} w={"35px"} as={MdFilterList} color='#fff' />
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
                                        color="blue"
                                        fontWeight="bold"
                                        pb=".5rem"
                                    >
                                        CUSTOMERS SUMMARY TABLE
                                    </Text>
                                </Flex>
                            </CardHeader>
                            <Table variant="striped" color={textColor} size='sm'>
                                <Thead>
                                    <Tr my=".8rem" ps="0px">
                                        <Th ps="0px" color="gray.400">
                                            CUSTOMERS
                                        </Th>
                                        <Th color="gray.400">Subtotal</Th>
                                        <Th color="gray.400">Total</Th>
                                        <Th color="gray.400">TAX </Th>
                                        <Th color="gray.400">PROFIT </Th>


                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {currentItems.map((row, key) => {
                                        return (
                                            <DashboardTableRow8
                                                customer={row.customer}
                                                subtotal={row.subtotal}
                                                total={row.total}
                                                tax={row.tax}
                                                profit={row.profit}
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
                </Flex> :
                    <Flex alignItems="center" justifyContent="center" mb="60px" mt="80px">
                        <Flex
                            direction="column"
                            w="745px"
                            background="transparent"
                            borderRadius="15px"
                            p="40px"
                            mx={{ base: "100px" }}
                            bg={bgColor}
                            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                        >
                            <FormControl>
                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                    Customer's name
                                </FormLabel>
                                <AsyncSelect
                                    isMulti
                                    name="customer_name"
                                    onChange={(customer) => {
                                        setCustomer(customer);
                                    }}
                                    placeholder="Start typing name..."
                                    loadOptions={(inputValue, callback) => {
                                        setTimeout(() => {
                                            const values = customerOptions.filter((option) =>
                                                option.label.toLowerCase().includes(inputValue.toLowerCase())
                                            );
                                            callback(values);
                                        }, 3000);
                                    }}
                                    cacheOptions
                                    value={customer}
                                />
                                <HStack spacing="15px" mb="35px" mt="8px" justify="center">
                                    <Box width="100%" mt="4px">
                                        <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                                            Start Date
                                        </FormLabel>
                                        <Input
                                            fontSize="sm"
                                            ms="4px"
                                            borderRadius="15px"
                                            type="date"
                                            size="lg"
                                        />
                                    </Box>
                                    <Box width="100%">
                                        <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                                            End Date
                                        </FormLabel>
                                        <Input
                                            fontSize="sm"
                                            ms="4px"
                                            borderRadius="15px"
                                            type="date"
                                            size="lg"
                                        />
                                    </Box>
                                    <FormControl>
                                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                            Export to PDF/Excel
                                        </FormLabel>
                                        <Switch colorScheme="#5A8100" me="10px" />
                                    </FormControl>
                                </HStack>
                                <Button
                                    type="submit"
                                    bg="#5A8100"
                                    fontSize="15px"
                                    color="white"
                                    fontWeight="bold"
                                    onClick={handleSubmit}
                                    w="100%"
                                    h="45"
                                    mb="24px"
                                    _hover={{
                                        bg: "#8abb18",
                                    }}
                                    _active={{
                                        bg: "#354c00",
                                    }}
                                >
                                    SUBMIT
                                </Button>
                            </FormControl>
                        </Flex>
                    </Flex>
                }

            </Flex>
        </>

    );
}

export default CustomerSummary;
