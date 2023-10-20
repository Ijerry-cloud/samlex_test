
//---customers table
//change table used by the customer table


//---add purchase
//adjust the list purchase form for suppliers and categories fields


//---additems page
//listing of sales in order starting from latest sales
// Should amount be more than 100m?
//reduce number of items in item count


//remove all console.log statements 
//make tabs and dropdowns where user dont have permissions to be invisible to them
//include loading state in necessary buttons 
// required star indicator on required fields
//ability to filter and edit items in bulk
// side menu bar components icon colouring on mobile version


//===checks 
//upload the csv files twice, each new upload should replace the onw already in the database(when done through csvupload)
// in the add purchase/ menu, you are importing asynselect.css file, it might not be useful because the async select in add items/sales page doesnt import it and still seems to have the same styling
// inquire from maxiskills(for each of the 3 branches) and chuks ekesons price of software
//ask ebuka for team departments, include them in selection(when creating new user) and profile?
//change email to username login
//add new customer button to add items page?
// all list pages should have defined ordering(alphabetical, date etc.)












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
    Spinner,
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
import { FaShoppingBag, FaCubes, FaMoneyBillAlt } from "react-icons/fa";
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { MdArrowUpward } from 'react-icons/md';
import { IoMdAddCircle, IoMdBarcode } from "react-icons/io";
import { AiOutlineNumber, AiOutlineMacCommand } from 'react-icons/ai';
import { dashboardTableData3 } from "variables/general";
import { SalesOverviewData } from "variables/general2";
import { dashboardTableData2 } from "variables/general2";
import { DashboardTableRow5 } from "components/Tables/DashboardTableRow";





import { useSelector } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { checkObject, isError } from 'modules/utilities';
import { handleApiError } from "modules/utilities/responseHandlers";
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { GET_CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM, GET_CREATE_CATEGORIES, GET_CREATE_SUPPLIERS } from 'config/serverUrls';
import { fetchData, postData } from 'modules/utilities/util_query';
import { AsyncSelect } from "chakra-react-select";
import "theme/asyncSelect.css";

const EditModal = ({ handleChange, handleSwitchChange, handleEditSubmit, onClose, item, setItem,
    loadCategories, loadSuppliers, errors, loading, nameRef, barcodeRef, categoryInput, setCategoryInput,
    supplierInput, setSupplierInput, costPriceRef, unitPriceRef, quantityRef, reorderLevelRef, tax1Ref,
    tax2Ref, allowAltRef, hasSerialNoRef }) => {

    return (
        <ModalContent
            bgColor="#232333"
            borderColor="gray.900"
            color="white"
            boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
        >
            <ModalHeader>Update Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>UPC/EAN/ISBN:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<IoMdBarcode color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.barcode)}
                                errorBorderColor='red.300'
                                ref={barcodeRef}
                                name={'barcode'}
                                type="text"
                                size="sm"
                                defaultvalue={item?.barcode || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Name of Item</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaShoppingBag color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.name)}
                                errorBorderColor='red.300'
                                ref={nameRef}
                                name={'name'}
                                type="text"
                                size="sm"
                                defaultValue={item?.name || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Category:</FormLabel>
                        <AsyncSelect
                            name="category"
                            size="sm"
                            onChange={(selectedOption, { action }) => {
                                // 'selectedOption' contains the selected value

                                if (action === 'clear') {
                                    // When the user clears the input, reset both the state and the displayed value
                                    setCategoryInput
                                }
                                else {
                                    const temp = { label: selectedOption.label, value: selectedOption.value }
                                    setItem({ ...item, category: selectedOption.value, category_data: temp });
                                }
                            }}
                            placeholder="Start typing name..."
                            loadOptions={loadCategories}
                            isClearable={true}
                            cacheOptions
                            value={item?.category_data}
                            className="chakra-react-select"
                            classNamePrefix="chakra-react-select"
                        />
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Supplier:</FormLabel>

                        <AsyncSelect
                            name="supplier"
                            size="sm"
                            onChange={(selectedOption, { action }) => {
                                // 'selectedOption' contains the selected value

                                if (action === 'clear') {
                                    // When the user clears the input, reset both the state and the displayed value
                                    setItem({ ...item, supplier: null, supplier_data: null });
                                }
                                else {
                                    const temp = { label: selectedOption.label, value: selectedOption.value }
                                    setItem({ ...item, supplier: selectedOption.value, supplier_data: temp });
                                }
                            }}
                            placeholder="Start typing name..."
                            loadOptions={loadSuppliers}
                            isClearable={true}
                            cacheOptions
                            value={item?.supplier_data}
                            //getOptionLabel={(option) => option.supplier_ID} // Use the same property name
                            //getOptionValue={(option) => option.supplier_ID} // Use the same property name
                            className="chakra-react-select"
                            classNamePrefix="chakra-react-select"
                        />
                    </FormControl>

                </Grid>
                <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={4}>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Cost Price</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<TbCurrencyNaira color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.cost_price)}
                                errorBorderColor='red.300'
                                name={'cost_price'}
                                onChange={handleChange}
                                type="text"
                                size="sm"
                                value={item?.cost_price || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Unit Price</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<TbCurrencyNaira color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.unit_price)}
                                errorBorderColor='red.300'
                                name={'unit_price'}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                value={item?.unit_price || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Qty</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaCubes color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.quantity)}
                                errorBorderColor='red.300'
                                name={'quantity'}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                value={item?.quantity || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Reorder Level</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdArrowUpward color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.reorder_level)}
                                errorBorderColor='red.300'
                                name={'reorder_level'}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                value={item?.reorder_level || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Tax1</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaMoneyBillAlt color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.tax1_percent)}
                                errorBorderColor='red.300'
                                name={'tax1_percent'}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                value={item?.tax1_percent || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Tax2</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaMoneyBillAlt color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.tax2_percent)}
                                errorBorderColor='red.300'
                                name={'tax2_percent'}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                value={item?.tax2_percent || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Allow Alt.</FormLabel>
                        <Switch
                            isChecked={item?.allow_alt}
                            onChange={handleSwitchChange}
                            name={"allow_alt"}
                            size="md"
                            colorScheme="blue"
                        />
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Item S/N?</FormLabel>
                        <Switch
                            isChecked={item?.has_serial_no}
                            onChange={handleSwitchChange}
                            name={"has_serial_no"}
                            size="md"
                            colorScheme="blue"
                        />
                    </FormControl>
                </Grid>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button isLoading={loading} onClick={handleEditSubmit} colorScheme='blue'>Submit</Button>
            </ModalFooter>
        </ModalContent>
    )
}

const DeleteModal = ({ onClose, item, loading, handleDeleteSubmit }) => (
    <ModalContent
        bgColor="#232333"
        borderColor="gray.900"
        color="white"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
    >
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
            <Button colorScheme='red' isLoading={loading} onClick={handleDeleteSubmit}>Yes</Button>
        </ModalFooter>
    </ModalContent>

);

const TrackingModal = ({ onClose, item }) => (
    <ModalContent
        bgColor="#232333"
        borderColor="gray.900"
        color="white"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
    >
        <ModalHeader>Inventory Count Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text fontSize="md" fontWeight="bold" color="gray.400"> UPC/EAN/ISBN: <span style={{ color: "white" }}>{item?.barcode}</span></Text>
                <Text fontSize="md" fontWeight="bold" color="gray.400"> Item Name: <span style={{ color: "white" }}>{item?.name}</span></Text>
                <Text fontSize="md" fontWeight="bold" color="gray.400"> Category: <span style={{ color: "white" }}>{item?.category}</span></Text>
                <Text fontSize="md" fontWeight="bold" color="gray.400"> Current Quantity: <span style={{ color: "white" }}>{item?.quantity}</span></Text>
                <Table variant="unstyled" size="sm" mt="2rem">
                    <Thead>
                        <Tr my=".8rem">
                            <Th ps="0px" color="gray.400">
                                Inventory Data Tracking
                            </Th>
                            <Th color="gray.400" textAlign='right'>Qty/Remarks</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {item.edit_history.map((row) => {
                            return (
                                <DashboardTableRow5
                                    name={row.employee}
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
            <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
            </Button>
        </ModalFooter>
    </ModalContent>

);

export default function Dashboard() {
    const nameRef = React.useRef(null);
    const barcodeRef = React.useRef(null);
    const [categoryInput, setCategoryInput] = React.useState(null);
    const [supplierInput, setSupplierInput] = React.useState(null);
    const costPriceRef = useRef(null);
    const unitPriceRef = useRef(null);
    const quantityRef = useRef(null);
    const reorderLevelRef = useRef(null);
    const tax1Ref = useRef(null);
    const tax2Ref = useRef(null);
    const allowAltRef = useRef(null);
    const hasSerialNoRef = useRef(null);

    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [items, setItems] = React.useState([]);

    const [count, setCount] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(1);
    const [page, setPage] = React.useState(1);

    const token = useSelector(getAuthToken);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalType, setModalType] = useState('edit');

    const textColor = "white";
    const [item, setItem] = useState({});

    const [loading, setLoading] = useState(false);

    const history = useHistory();



    const onModalClose = () => {
        setItem({});
        setErrors({});
        onClose();
    }

    const loadCategories = async (inputValue) => {
        let response = await fetchData({
            queryKey: ['all categories', {
                url: GET_CREATE_CATEGORIES + `?name=${inputValue}`,
                payload_data: {},
                authenticate: true,
                token
            }]
        });
        console.log(response.data);
        return response.data;
    }

    const loadSuppliers = async (inputValue) => {
        let response = await fetchData({
            queryKey: ['all suppliers', {
                url: GET_CREATE_SUPPLIERS + `?company_name=${inputValue}`,
                payload_data: {},
                authenticate: true,
                token
            }]
        });

        const options = response.data.map((option) => ({
            ...option,
            value: option.id,
            label: option.company_name,

        }));


        return options;
    }

    const payload_data = {};



    const result = useQuery([`items`,
        {
            url: GET_CREATE_ITEM + `?page=${page}`,
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
                setPageCount(data?.last_page || 1);
                const item_list = data?.results.map((item) => ({
                    ...item,
                    value: item.supplier_ID,
                    label: item.supplier_ID,

                }));
                setItems(item_list || []);
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
                description: 'Action successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setLoading(false);
            onModalClose();
            refetch();

            return;
        },
        onError: (error) => {
            handleApiError(error);
            setLoading(false);
            onModalClose();
        }
    });

    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }





    const handleChange = (event) => {
        setItem({ ...item, [event.target.name]: event.target.value });
    }

    const handleSwitchChange = (event) => {
        setItem({ ...item, [event.target.name]: !item[event.target.name] });
    }

    const validate = () => {
        let uerrors = {}
        uerrors.name = item?.name ? "" : FIELD_REQUIRED;
        uerrors.cost_price = item?.cost_price ? "" : FIELD_REQUIRED;
        uerrors.unit_price = item?.unit_price ? "" : FIELD_REQUIRED;
        uerrors.quantity = item?.quantity ? "" : FIELD_REQUIRED;

        if (!item?.name || !item?.cost_price || !item?.unit_price || !item?.quantity) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        return uerrors;
    }

    const handleEditSubmit = () => {

        let checkErrors = validate();
        let areAllFieldsFalse = checkObject(checkErrors);


        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }

        console.log(item);
        const data = { ...item };

        setLoading(true);
        mutation.mutate(
            {
                url: UPDATE_ITEM,
                payload_data: data,
                token: token,
                authenticate: true
            }
        );

        return;


    }

    const handleDeleteSubmit = () => {
        const data = { ...item };

        setLoading(true);

        mutation.mutate({
            url: DELETE_ITEM,
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
                {modalType === "edit" ?
                    <EditModal handleChange={handleChange} onClose={onModalClose}
                        handleEditSubmit={handleEditSubmit} item={item} setItem={setItem} errors={errors}
                        handleSwitchChange={handleSwitchChange} loading={loading} 
                        loadSuppliers={loadSuppliers} loadCategories={loadCategories} nameRef={nameRef}
                        barcodeRef={barcodeRef} costPriceRef={costPriceRef} unitPriceRef={unitPriceRef}
                        categoryInput={categoryInput} setCategoryInput={setCategoryInput}
                        supplierInput={supplierInput} setSupplierInput={setSupplierInput}
                        quantityRef={quantityRef} reorderLevelRef={reorderLevelRef} tax1Ref={tax1Ref}
                        tax2Ref={tax2Ref} allowAltRef={allowAltRef} hasSerialNoRef={hasSerialNoRef} /> : modalType === "delete" ?
                        <DeleteModal onClose={onModalClose} item={item} handleDeleteSubmit={handleDeleteSubmit} loading={loading} /> :
                        <TrackingModal onClose={onModalClose} item={item} />}

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
                                    pb=".5rem"
                                >
                                    ITEM PURCHASE INVETORY
                                </Text>
                            </Flex>
                        </CardHeader>
                        <Table variant="unstyled" size='sm'>
                            <Thead>
                                <Tr my=".8rem" ps="0px">
                                    <Th ps="0px" color="gray.400">
                                        NAME
                                    </Th>
                                    <Th color="gray.400">CATEGORY</Th>
                                    <Th color="gray.400">COST</Th>
                                    <Th color="gray.400">UNIT PRICE</Th>
                                    <Th color="gray.400">QUANTITY</Th>
                                    <Center>
                                        <Th color="gray.400">ACTIONS</Th>
                                    </Center>


                                </Tr>
                            </Thead>
                            <Tbody>
                                {items.map((row, index) => {
                                    return (
                                        <DashboardTableRow4
                                            key={index}
                                            name={row.name}
                                            category={row?.category_data?.label}
                                            cost_price={row.cost_price}
                                            unit_price={row.unit_price}
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
