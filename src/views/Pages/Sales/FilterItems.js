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
    Table,
    Tbody,
    Thead,
    Text,
    Tr,
    Th,
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
import { dashboardTableData5 } from "variables/general";
import { DashboardTableRow2 } from "components/Tables/DashboardTableRow";
import MyPaginate from "components/Pagination";


function FilterSales() {

    const itemOptions = [
        { value: '1HP SPW THERMOCOOL', label: "1HP SPW THERMOCOOL[0.00 in stock]", colorScheme: "blue", quantity: 1, price: '39500.00' },
        { value: 'BRUHM GAS COOKER BGC-9642SN 90*60 4 GAS +2E WOODEN FINISH', label: "BRUHM GAS COOKER BGC-9642SN 90*60 4 GAS +2E WOODEN FINISH", colorScheme: "purple", quantity: 1, price: '3900.00' },
        { value: 'SCANFROST STAINLESS GASCOOKER 2HOB', label: "SCANFROST STAINLESS GASCOOKER 2HOB[6.00 in stock]", colorScheme: "red", quantity: 1, price: '679500.00' },
        { value: '1000 WATTS PR -SOCKET TEC', label: "1000 WATTS PR -SOCKET TEC[0.00 in stock]", colorScheme: "orange", quantity: 1, price: '39500.00' },
        { value: '32 T.V HANGER', label: "32'-60' T.V HANGER[14.00 in stock", colorScheme: "yellow", quantity: 1, price: '9500.00' },
        { value: 'BFV-409SD 409LTS', label: "BFV-409SD 409LTS[3.00 in stock]", colorScheme: "green", quantity: 1, price: '35500.00' }
    ];

    const titleColor = useColorModeValue("#5A8100", "#8abb18");
    const textColor = useColorModeValue("gray.700", "white");
    const [selectedOptions, setSelectedOptions] = useState();
    const [resultsPage, setResultsPage] = useState(false);
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("#8abb18", "rgba(255, 255, 255, 0.5)");
    const [item, setItem] = useState({});
    const history = useHistory();
    const toast = useToast();

    // for search results and pagination 
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dashboardTableData5.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dashboardTableData5.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dashboardTableData5.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
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
                                        ITEM SALES INVETORY (FEB 2023)
                                    </Text>
                                </Flex>
                            </CardHeader>
                            <Table variant="striped" color={textColor} size='sm'>
                                <Thead>
                                    <Tr my=".8rem" ps="0px">
                                        <Th ps="0px" color="gray.400">
                                            DATE
                                        </Th>
                                        <Th color="gray.400">NAME</Th>
                                        <Th color="gray.400">UNITS SOLD</Th>
                                        <Th color="gray.400">PRICE per UNIT</Th>
                                        <Th color="gray.400">PRICE (TOTAL)</Th>
                                        <Center>
                                            <Th color="gray.400">ACTIONS</Th>
                                        </Center>


                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {currentItems.map((row) => {
                                        return (
                                            <DashboardTableRow2
                                                Date={row.Date}
                                                name={row.name}
                                                units_sold={row.units_sold}
                                                unit_price={row.unit_price}
                                                total_price={row.total_price}
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
                                    Name of Item
                                </FormLabel>
                                <AsyncSelect
                                    isMulti
                                    name="item_name"
                                    onChange={handleChange}
                                    placeholder="Start typing name..."
                                    loadOptions={(inputValue, callback) => {
                                        setTimeout(() => {
                                            const values = itemOptions.filter((option) =>
                                                option.label.toLowerCase().includes(inputValue.toLowerCase())
                                            );
                                            callback(values);
                                        }, 3000);
                                    }}
                                    value={selectedOptions}
                                    cacheOptions
                                />
                                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                    Category
                                </FormLabel>
                                <Select variant='filled' placeholder='Select option' mb="24px" name="category" onChange={onChange} value={item?.category || ""}>
                                    <option value='option1'>Stabilizer</option>
                                    <option value='option2'>Microwave</option>
                                    <option value='option3'>Blender</option>
                                </Select>
                                <HStack spacing="15px" mb="35px" justify="center">
                                    <Box width="100%">
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

export default FilterSales;
