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
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
// Custom components
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
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { MdError, MdFilterList } from 'react-icons/md';
import { AiOutlineNumber, AiOutlineMacCommand } from 'react-icons/ai';
import { dashboardTableData3 } from "variables/general";
import { SalesOverviewData } from "variables/general2";
import {dashboardTableData2} from "variables/general2";
import {DashboardTableRow5} from "components/Tables/DashboardTableRow";


const EditModal = ({ onEditChange, handleEditSubmit, onClose, item }) => (
    <ModalContent>
        <ModalHeader>Update Item</ModalHeader>
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
                                        <FormControl id="">
                                            <FormLabel>UPC/EAN/ISBN:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<TbCurrencyNaira color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="">
                                            <FormLabel>First Name</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<TbCurrencyNaira color="gray.800" />}
                                                />
                                                <Input name="name" type="text" size="sm" onChange={onEditChange} value={item?.name || ''} />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="">
                                            <FormLabel>UPC/EAN/ISBN:</FormLabel>
                                            <InputGroup borderColor="#E0E1E7">
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<TbCurrencyNaira color="gray.800" />}
                                                />
                                                <Input name="" type="text" size="sm" />
                                            </InputGroup>
                                        </FormControl>
                                        <FormControl id="">
                                            <FormLabel>Category</FormLabel>
                                            <Select variant='filled' placeholder='Select option' size="sm">
                                                <option value='option1'>Stabilizer</option>
                                                <option value='option2'>Microwave</option>
                                                <option value='option3'>Blender</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl id="">
                                            <FormLabel>Supplier</FormLabel>
                                            <Select variant='filled' placeholder='Select option' size="sm">
                                                <option value='option1'>Front Shop</option>
                                                <option value='option2'>Somotex</option>
                                                <option value='option3'>Fouani</option>
                                            </Select>
                                        </FormControl>
                                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                            <FormControl id="">
                                                <FormLabel>WHOLESALE:</FormLabel>
                                                <InputGroup borderColor="#E0E1E7">
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={<TbCurrencyNaira color="gray.800" />}
                                                    />
                                                    <Input name="" type="text" size="sm" />
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl id="">
                                                <FormLabel>RETAIL:</FormLabel>
                                                <InputGroup borderColor="#E0E1E7">
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={<TbCurrencyNaira color="gray.800" />}
                                                    />
                                                    <Input name="" type="text" size="sm" />
                                                </InputGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                            <FormControl id="">
                                                <FormLabel>TAX 1:</FormLabel>
                                                <InputGroup borderColor="#E0E1E7">
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={<TbCurrencyNaira color="gray.800" />}
                                                    />
                                                    <Input name="" type="text" size="sm" />
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl id="">
                                                <FormLabel>TAX 2:</FormLabel>
                                                <InputGroup borderColor="#E0E1E7">
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={<TbCurrencyNaira color="gray.800" />}
                                                    />
                                                    <Input name="" type="text" size="sm" />
                                                </InputGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                            <FormControl id="">
                                                <FormLabel>ALLOW ALT DESC.</FormLabel>
                                                <Switch colorScheme="#5A8100" me="10px" />
                                            </FormControl>
                                            <FormControl id="">
                                                <FormLabel>ITEM HAS SERIAL/NO.</FormLabel>
                                                <Switch colorScheme="#5A8100" me="10px" />
                                            </FormControl>
                                        </Grid>
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
            <Button onClick={handleEditSubmit} variant='ghost'>Submit</Button>
        </ModalFooter>
    </ModalContent>
);

const DeleteModal = ({ onClose, item }) => (
    <ModalContent>
        <ModalHeader>Delete Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text> Are you sure you want to delete {item?.name} ?
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

const TrackingModal = ({ onClose, item }) => (
    <ModalContent>
        <ModalHeader>Inventory Count Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text fontSize="md" fontWeight="bold"> UPC/EAN/ISBN:</Text>
                <Text fontSize="md" fontWeight="bold"> Item Name:{item?.name}</Text> 
                <Text fontSize="md" fontWeight="bold"> Category: {item?.category}</Text> 
                <Text fontSize="md" fontWeight="bold"> Current Quantity:{item?.quantity}</Text>
            <Table variant="simple" size="sm" mt="2rem">
            <Thead>
              <Tr my=".8rem">
                <Th ps="0px" color="gray.400">
                Inventory Data Tracking
                </Th>
                <Th color="gray.400" textAlign='right'>Qty/Remarks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dashboardTableData2.map((row) => {
                return (
                  <DashboardTableRow5
                    name={row.name}
                    logo={row.logo}
                    quantity={row.quantity}
                    date={row.date}
                  />
                );
              })}
            </Tbody>
          </Table>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
                Close
            </Button>
        </ModalFooter>
    </ModalContent>

);

export default function Dashboard() {
    const value = "$100.000";
    // paginate state 
    const [itemOffset, setItemOffset] = useState(0);
    // 3 items per page 
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dashboardTableData3.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dashboardTableData3.length / itemsPerPage);
    // Chakra Color Mode
    const iconTeal = useColorModeValue("#ffb400", "#ffb400");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const [item, setItem] = useState({});
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState('edit');
    const toast = useToast();

    const onEditChange = (e) => {

        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    }

    const handleEditSubmit = () => {
        if (!item?.name || !item?.category) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setItem({});
        history.push('/admin/list-Purchases');
        return;

    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dashboardTableData5.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                {modalType === "edit" ?
                    <EditModal onEditChange={onEditChange} onClose={onClose}
                        handleEditSubmit={handleEditSubmit} item={item}
                        setItem={setItem} /> : modalType === "delete" ?
                        <DeleteModal onClose={onClose} item={item} /> :
                        <TrackingModal onClose={onClose} item={item} />}

            </Modal>
            <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
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
                                        <StatNumber fontSize="lg" color={textColor}>
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
                                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                                    <Icon h={"35px"} w={"35px"} as={TbCurrencyNaira} color='#fff' />
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
                                        <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
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
                                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                                    <Icon h={"35px"} w={"35px"} as={AiOutlineMacCommand} color='#fff' />
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
                                    ITEM PURCHASE INVETORY (FEB 2023)
                                </Text>
                            </Flex>
                        </CardHeader>
                        <Table variant="striped" color={textColor} size='sm'>
                            <Thead>
                                <Tr my=".8rem" ps="0px">
                                    <Th ps="0px" color="gray.400">
                                        NAME
                                    </Th>
                                    <Th color="gray.400">CATEGORY</Th>
                                    <Th color="gray.400">WHOLESALE PRICE</Th>
                                    <Th color="gray.400">RETAIL PRICE</Th>
                                    <Th color="gray.400">TAX (PERCENTAGE)</Th>
                                    <Th color="gray.400">TAX (QUANTITY)</Th>
                                    <Center>
                                        <Th color="gray.400">INVENTORY</Th>
                                    </Center>


                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentItems.map((row) => {
                                    return (
                                        <DashboardTableRow4
                                            name={row.name}
                                            category={row.category}
                                            wholesale={row.wholesale}
                                            retail={row.retail}
                                            tax_pct={row.tax_pct}
                                            quantity={row.quantity}
                                            onEditClick={() => {
                                                setItem(row);
                                                setModalType('edit');
                                                onOpen();
                                            }}
                                            onDeleteClick={() => {
                                                setItem(row);
                                                setModalType('delete');
                                                onOpen();
                                            }}
                                            onTrackClick={() => {
                                                setItem(row);
                                                setModalType('track');
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
                <Grid
                    my="26px"
                    mb={{ lg: "16px" }}
                >
                    <Card maxH="100%">
                        <CardHeader p="22px 0px 35px 14px">
                            <Flex direction="column">
                                <Text
                                    fontSize="lg"
                                    color={textColor}
                                    fontWeight="bold"
                                    pb=".5rem"
                                >
                                    Sales Overview
                                </Text>
                                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                    <Text fontWeight="bold" as="span" color="#5A8100">
                                        +30%
                                    </Text>{" "}
                                    net profit than last month.
                                </Text>
                            </Flex>
                        </CardHeader>
                        <CardBody ps="20px" pe="0px" mb="31px" position="relative">
                            <Flex direction="column">
                                {SalesOverviewData.map((row, index, arr) => {
                                    return (
                                        <TimelineRow
                                            logo={row.logo}
                                            title={row.title}
                                            date={row.date}
                                            color={row.color}
                                            index={index}
                                            arrLength={arr.length}
                                        />
                                    );
                                })}
                            </Flex>
                        </CardBody>
                    </Card>
                </Grid>
            </Flex>
        </>

    );
}
