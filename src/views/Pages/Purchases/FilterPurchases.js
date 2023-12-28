// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Container,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    IconButton,
    Stack,
    Switch,
    Spacer,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle, FaShoppingBag, FaCubes, FaMoneyBillAlt } from "react-icons/fa";
import { MdFilterList, MdViewList } from "react-icons/md";
import { IoMdAddCircle, IoMdBarcode } from "react-icons/io";
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { MdArrowUpward } from 'react-icons/md';
import { EmailIcon, DeleteIcon, EditIcon, DownloadIcon, InfoIcon, CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { DashboardTableRow4, DashboardTableRow5, DashboardTableRow13 } from "components/Tables/DashboardTableRow";
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { checkObject, isError } from 'modules/utilities';
import { handleApiError } from "modules/utilities/responseHandlers";
import { FIELD_REQUIRED, AMOUNT_GREATER_THAN_ZERO, AMOUNT_GREATER_THAN_OR_EQUALS_ZERO } from 'constants/formErrorMessages';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { postData, fetchData } from 'modules/utilities/util_query';
import { GET_CREATE_ITEM, UPDATE_ITEM, GROUP_UPDATE_ITEM, DELETE_ITEM, GROUP_DELETE, GET_CREATE_CATEGORIES, GET_CREATE_SUPPLIERS } from 'config/serverUrls';
import { getAuthUser } from "modules/auth/redux/authSelector";
import { AsyncSelect } from "chakra-react-select";
import "theme/asyncSelect.css";

const EditModal = ({ handleChange, handleSwitchChange, handleEditSubmit, onClose, item, setItem,
    loadCategories, loadSuppliers, errors, nameRef, barcodeRef, categoryInput, setCategoryInput,
    supplierInput, setSupplierInput, costPriceRef, unitPriceRef, quantityRef, amountToAddRef, reorderLevelRef, tax1Ref,
    tax2Ref, allowAltRef, hasSerialNoRef, mutation }) => {

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
                        <FormLabel fontSize="sm" fontWeight='bold'>Name of Item:*</FormLabel>
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
                                    setCategoryInput({ label: null, value: null });
                                }
                                else {
                                    setCategoryInput({ label: selectedOption.label, value: selectedOption.value });
                                }
                            }}
                            placeholder="Start typing name..."
                            loadOptions={loadCategories}
                            isClearable={true}
                            cacheOptions
                            value={categoryInput}
                            className="chakra-react-select"
                            classNamePrefix="chakra-react-select"
                        />
                    </FormControl>
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
                                defaultValue={item?.barcode || ''}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
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
                                    setSupplierInput({ label: null, value: null });
                                }
                                else {
                                    setSupplierInput({ label: selectedOption.label, value: selectedOption.value });
                                }
                            }}
                            placeholder="Start typing name..."
                            loadOptions={loadSuppliers}
                            isClearable={true}
                            cacheOptions
                            value={supplierInput}
                            //getOptionLabel={(option) => option.supplier_ID} // Use the same property name
                            //getOptionValue={(option) => option.supplier_ID} // Use the same property name
                            className="chakra-react-select"
                            classNamePrefix="chakra-react-select"
                        />
                    </FormControl>

                </Grid>
                <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={4}>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Cost Price:*</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<TbCurrencyNaira color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.cost_price)}
                                errorBorderColor='red.300'
                                ref={costPriceRef}
                                name={'cost_price'}
                                type="text"
                                size="sm"
                                defaultValue={item?.cost_price}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Unit Price:*</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<TbCurrencyNaira color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.unit_price)}
                                errorBorderColor='red.300'
                                ref={unitPriceRef}
                                name={'unit_price'}

                                type="number"
                                size="sm"
                                defaultValue={item?.unit_price}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Add:*</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaCubes color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.amount_to_add)}
                                errorBorderColor='red.300'
                                ref={amountToAddRef}
                                name={'amount_to_add'}
                                type="number"
                                size="sm"
                                defaultValue={0}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Reorder Level:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdArrowUpward color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.reorder_level)}
                                errorBorderColor='red.300'
                                ref={reorderLevelRef}
                                name={'reorder_level'}
                                type="number"
                                size="sm"
                                defaultValue={item?.reorder_level}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Tax1:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaMoneyBillAlt color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.tax1_percent)}
                                errorBorderColor='red.300'
                                ref={tax1Ref}
                                name={'tax1_percent'}
                                type="number"
                                size="sm"
                                defaultValue={item?.tax1_percent}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Tax2:</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<FaMoneyBillAlt color="gray.800" />}
                            />
                            <Input
                                isInvalid={isError(errors?.tax2_percent)}
                                errorBorderColor='red.300'
                                ref={tax2Ref}
                                name={'tax2_percent'}
                                type="number"
                                size="sm"
                                defaultValue={item?.tax2_percent}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Allow Alt:</FormLabel>
                        <Switch
                            ref={allowAltRef}
                            defaultChecked={item?.allow_alt}
                            name={"allow_alt"}
                            size="md"
                            colorScheme="blue"
                        />
                    </FormControl>
                    <FormControl id="">
                        <FormLabel fontSize="sm" fontWeight='bold'>Item S/N:</FormLabel>
                        <Switch
                            ref={hasSerialNoRef}
                            defaultChecked={item?.has_serial_no}
                            name={"has_serial_no"}
                            size="md"
                            colorScheme="blue"
                        />
                    </FormControl>
                </Grid>
            </ModalBody>

            <ModalFooter>
                <Button size="sm" colorScheme='red' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button size="sm" isLoading={mutation.isLoading} onClick={handleEditSubmit} colorScheme='blue'>Save</Button>
            </ModalFooter>
        </ModalContent>
    )
}

const EditGroupModal = ({ onClose, groupAddRef, groupReorderRef, groupTax1Ref, groupTax2Ref, groupErrors, mutation, handleGroupEditSubmit }) => (
    <ModalContent
        bgColor="#232333"
        borderColor="gray.900"
        color="white"
        boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
    >
        <ModalHeader>Group Update</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

            <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={4}>

                <FormControl id="">
                    <FormLabel fontSize="sm" fontWeight='bold'>Add:*</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaCubes color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(groupErrors?.groupAdd)}
                            errorBorderColor='red.300'
                            ref={groupAddRef}
                            name={'groupAdd'}
                            type="number"
                            size="sm"

                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="">
                    <FormLabel fontSize="sm" fontWeight='bold'>Reorder Level:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdArrowUpward color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(groupErrors?.group_reorder)}
                            errorBorderColor='red.300'
                            ref={groupReorderRef}
                            name={'group_reorder'}
                            type="number"
                            size="sm"

                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="">
                    <FormLabel fontSize="sm" fontWeight='bold'>Tax1:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaMoneyBillAlt color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(groupErrors?.groupTax1)}
                            errorBorderColor='red.300'
                            ref={groupTax1Ref}
                            name={'groupTax1'}
                            type="number"
                            size="sm"

                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="">
                    <FormLabel fontSize="sm" fontWeight='bold'>Tax2:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaMoneyBillAlt color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(groupErrors?.groupTax2)}
                            errorBorderColor='red.300'
                            ref={groupTax2Ref}
                            name={'groupTax2'}
                            type="number"
                            size="sm"
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
            </Grid>
        </ModalBody>

        <ModalFooter>
            <Button colorScheme='red'
                size="sm"
                mr={3}
                onClick={onClose}
            >
                Close
            </Button>
            <Button
                isLoading={mutation.isLoading}
                size="sm"
                onClick={handleGroupEditSubmit}
                colorScheme='blue'>
                Save
            </Button>
        </ModalFooter>
    </ModalContent>
)

const DeleteModal = ({ onClose, item, loading, mutation, handleDeleteSubmit }) => (
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
            <Button size="sm" variant='ghost' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button size="sm" colorScheme='red' isLoading={mutation.isLoading} onClick={handleDeleteSubmit}>Yes</Button>
        </ModalFooter>
    </ModalContent>

);

const DeleteGroupModal = ({ mutation, onClose, handleGroupDeleteSubmit }) => (
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
                <Text> Are you sure you want to delete these items ?
                </Text>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose} size="sm">
                Close
            </Button>
            <Button
                colorScheme='red'
                size="sm"
                isLoading={mutation.isLoading}
                onClick={handleGroupDeleteSubmit}
            >Yes</Button>
        </ModalFooter>
    </ModalContent>
)

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
                            <Th color="gray.400" textAlign='right'>Amount added</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {item?.edit_history?.map((row) => {
                            return (
                                <DashboardTableRow5
                                    name={row.employee}
                                    amount_added={row.amount_added}
                                    date={row.date}
                                />
                            );
                        })}
                    </Tbody>
                </Table>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button size="sm" colorScheme="red" mr={3} onClick={onClose}>
                Close
            </Button>
        </ModalFooter>
    </ModalContent>

);


function FilterItems() {

    const nameRef = React.useRef(null);
    const barcodeRef = React.useRef(null);
    const [categoryInput, setCategoryInput] = React.useState(null);
    const [supplierInput, setSupplierInput] = React.useState(null);
    const categoryRef = React.useRef(null);
    const supplierRef = React.useRef(null);
    const costPriceRef = React.useRef(null);
    const unitPriceRef = React.useRef(null);
    const amountToAddRef = React.useRef(null);
    const quantityRef = React.useRef(null);
    const reorderLevelRef = React.useRef(null);
    const tax1Ref = React.useRef(null);
    const tax2Ref = React.useRef(null);
    const allowAltRef = React.useRef(null);
    const hasSerialNoRef = React.useRef(null);

    const [loading, setLoading] = React.useState(false);

    const [errors, setErrors] = React.useState({});
    const [groupErrors, setGroupErrors] = React.useState({});

    const groupAddRef = React.useRef(null);
    const groupReorderRef = React.useRef(null);
    const groupTax1Ref = React.useRef(null);
    const groupTax2Ref = React.useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState('');

    const [item, setItem] = useState({});

    const textColor = "white";
    const bgColor = "#2a2c40";
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toast = useToast();
    const token = useSelector(getAuthToken);
    const authUser = useSelector(getAuthUser);

    const onModalClose = () => {
        setItem({});
        setErrors({});
        setGroupErrors({});
        setModalType('');
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
        //console.log(response.data);
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

    const loadItems = async (inputValue) => {
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

    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            toast({
                title: 'Success',
                description: 'Action successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setSelectedOptions([]);
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

    const handleChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
    };

    const validate = (updatedItem) => {
        let uerrors = {}
        uerrors.name = updatedItem?.name ? "" : FIELD_REQUIRED;
        uerrors.cost_price = updatedItem?.cost_price ? "" : FIELD_REQUIRED;
        uerrors.unit_price = updatedItem?.unit_price ? "" : FIELD_REQUIRED;
        uerrors.amount_to_add = updatedItem?.amount_to_add >= 0 ? "" : AMOUNT_GREATER_THAN_OR_EQUALS_ZERO;
        //uerrors.quantity = updatedItem?.quantity ? "" : FIELD_REQUIRED;

        if (!updatedItem?.name || !updatedItem?.cost_price || !updatedItem?.unit_price) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        if (!updatedItem?.amount_to_add || updatedItem?.amount_to_add < 0) {
            toast({
                title: 'Error.',
                description: "Enter an amount greater than or equals to 0.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        return uerrors;
    }

    const validateGroup = (updatedItems) => {
        let uerrors = {}
        uerrors.groupAdd = updatedItems?.groupAdd > 0 ? "" : AMOUNT_GREATER_THAN_ZERO;
        //console.log(uerrors);

        if (!updatedItems?.groupAdd || updatedItems?.groupAdd <= 0) {

            toast({
                title: 'Missing Information.',
                description: "Enter an amount greater than 0.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }
        return uerrors;

    }

    const handleEditSubmit = () => {

        const updatedItem = {
            id: item?.id,
            barcode: barcodeRef.current.value,
            name: nameRef.current.value,
            category: categoryInput?.value,
            supplier: supplierInput?.value,
            cost_price: costPriceRef.current.value,
            unit_price: unitPriceRef.current.value,
            amount_to_add: amountToAddRef.current.value,
            //quantity: quantityRef.current.value,
            reorder_level: reorderLevelRef.current.value,
            tax1_percent: tax1Ref.current.value,
            tax2_percent: tax2Ref.current.value,
            allow_alt: allowAltRef.current.checked,
            has_serial_no: hasSerialNoRef.current.checked
        };

        let checkErrors = validate(updatedItem);
        let areAllFieldsFalse = checkObject(checkErrors);


        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }

        mutation.mutate(
            {
                url: UPDATE_ITEM,
                payload_data: updatedItem,
                token: token,
                authenticate: true
            }
        );

        return;


    }

    const handleGroupEditSubmit = () => {
        const updatedItems = {
            items: selectedOptions.map(obj => obj.id).join(','),
            groupAdd: groupAddRef.current.value,
            groupReorder: groupReorderRef.current.value,
            groupTax1: groupTax1Ref.current.value,
            groupTax2: groupTax2Ref.current.value,

        };

        //console.log(updatedItems);

        let checkErrors = validateGroup(updatedItems);
        let areAllFieldsFalse = checkObject(checkErrors);


        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setGroupErrors(checkErrors);
            return;
        }

        mutation.mutate(
            {
                url: GROUP_UPDATE_ITEM,
                payload_data: updatedItems,
                token: token,
                authenticate: true
            }
        );

        return;
    }

    const handleDeleteSubmit = () => {
        const data = { ...item };

        mutation.mutate({
            url: DELETE_ITEM,
            payload_data: data,
            token: token,
            authenticate: true
        });
        return;
    }

    const handleGroupDeleteSubmit = () => {
        const data = { items: selectedOptions.map(obj => obj.id).join(',') };

        mutation.mutate({
            url: GROUP_DELETE,
            payload_data: data,
            token: token,
            authenticate: true
        });
        return;
    }

    const editActionClick = () => {
        if (selectedOptions.length === 1) {
            setItem(selectedOptions[0]);
            setCategoryInput(selectedOptions[0].category_data);
            setSupplierInput(selectedOptions[0].supplier_data);
            setModalType('editSingle');
            onOpen();

        }
        else if (selectedOptions.length > 1) {
            setModalType('editGroup');
            onOpen();

        }

    }

    const deletetActionClick = () => {
        if (selectedOptions.length === 1) {
            setItem(selectedOptions[0]);
            setModalType('deleteSingle');
            onOpen();

        }
        else if (selectedOptions.length > 1) {
            setModalType('deleteGroup');
            onOpen();

        }

    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onModalClose} size="xl">
                <ModalOverlay />
                {modalType === "editSingle" ?
                    <EditModal handleChange={handleChange} onClose={onModalClose}
                        handleEditSubmit={handleEditSubmit} item={item} setItem={setItem} errors={errors}
                        loadSuppliers={loadSuppliers} loadCategories={loadCategories} nameRef={nameRef}
                        barcodeRef={barcodeRef} costPriceRef={costPriceRef} unitPriceRef={unitPriceRef}
                        categoryInput={categoryInput} setCategoryInput={setCategoryInput}
                        supplierInput={supplierInput} setSupplierInput={setSupplierInput}
                        quantityRef={quantityRef} amountToAddRef={amountToAddRef} reorderLevelRef={reorderLevelRef} tax1Ref={tax1Ref}
                        tax2Ref={tax2Ref} allowAltRef={allowAltRef} hasSerialNoRef={hasSerialNoRef}
                        categoryRef={categoryRef} supplierRef={supplierRef} mutation={mutation} /> : modalType === "editGroup" ?
                        <EditGroupModal onClose={onModalClose} groupAddRef={groupAddRef} groupReorderRef={groupReorderRef}
                            groupTax1Ref={groupTax1Ref} groupTax2Ref={groupTax2Ref} handleGroupEditSubmit={handleGroupEditSubmit}
                            groupErrors={groupErrors} mutation={mutation} /> : modalType === "deleteSingle" ?
                            <DeleteModal onClose={onModalClose} item={item} mutation={mutation} handleDeleteSubmit={handleDeleteSubmit} loading={loading} /> : modalType === "deleteGroup" ?
                                <DeleteGroupModal onClose={onModalClose} mutation={mutation} handleGroupDeleteSubmit={handleGroupDeleteSubmit} /> :
                                <TrackingModal onClose={onModalClose} item={item} />}

            </Modal>
            <Flex direction="column" alignSelf="center" justifySelf="center">
                <Flex alignItems="center" justifyContent="center" mb="30px" mt="80px">
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
                        <FormControl >
                            <FormLabel fontSize="sm" fontWeight="bold">
                                Item Name
                            </FormLabel>
                            <AsyncSelect
                                isMulti
                                name="item_name"
                                size="md"
                                onChange={handleChange}
                                placeholder="Start typing name to search..."
                                loadOptions={loadItems}
                                value={selectedOptions}
                                //cacheOptions
                                className="chakra-react-select"
                                classNamePrefix="chakra-react-select"
                            />


                        </FormControl>

                    </Flex>



                </Flex>

                <Flex alignItems="center" justifyContent="center" mb="60px">
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

                        <Flex alignItems='center' gap='2' my={4}>
                            <Text
                                fontSize="lg"
                                color={textColor}
                                fontWeight="bold"
                            >
                                <Text as="span" bgColor="#8E44AD" p={2}>
                                    ITEM INVENTORY LIST
                                </Text>
                            </Text>
                            <Spacer />
                            <Text fontWeight="bold" bgColor="#8E44AD" color="white"> GROUP ACTIONS
                            </Text>

                            <Center>
                                <IconButton
                                    //backgroundColor='blue'
                                    colorScheme='blue'
                                    aria-label='edit sale'
                                    icon={<EditIcon />}
                                    //variant="outline"
                                    mx='2px'
                                    disabled={!selectedOptions.length}
                                    onClick={editActionClick}
                                />
                                <IconButton
                                    //backgroundColor='red'
                                    colorScheme='red'
                                    aria-label='delete sale'
                                    icon={<DeleteIcon />}
                                    //variant="outline"
                                    mx='2px'
                                    disabled={!selectedOptions.length}
                                    onClick={deletetActionClick}
                                />
                            </Center>

                        </Flex>
                        <Table variant="unstyled" size='sm'>
                            <Thead>
                                <Tr my=".8rem" ps="0px">
                                    <Th fontSize="md" ps="0px" color="white">
                                        NAME
                                    </Th>
                                    <Th fontSize="md" color="white">CATEGORY</Th>
                                    <Th fontSize="md" textAlign="right" color="white">COST</Th>
                                    <Th fontSize="md" textAlign="right" color="white">UNIT PRICE</Th>
                                    <Th fontSize="md" textAlign="right" color="white">QUANTITY</Th>

                                    <Th fontSize="md" textAlign="center" color="white">ACTIONS</Th>



                                </Tr>
                            </Thead>
                            {selectedOptions && (selectedOptions.length > 0) && (
                                <Tbody>
                                    {selectedOptions.map((row, index) => {
                                        return (
                                            <DashboardTableRow13
                                                key={index}
                                                name={row.name}
                                                category={row?.category_data?.label}
                                                cost_price={row.cost_price}
                                                unit_price={row.unit_price}
                                                quantity={row.quantity}
                                                onTrackClick={() => {
                                                    setItem(row);
                                                    setModalType('track');
                                                    onOpen();

                                                }}
                                            />
                                        );
                                    })}
                                </Tbody>

                            )}

                        </Table>

                    </Flex>



                </Flex>


            </Flex>
        </>

    )

}

export default FilterItems;
