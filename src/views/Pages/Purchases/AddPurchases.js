// Chakra imports
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Link,
    Select,
    Switch,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import { useToast } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import React, { useState } from "react";

import { BsPerson, BsPersonAdd, BsFillTelephoneFill } from 'react-icons/bs';
import { FaShoppingBag, FaCubes, FaMoneyBillAlt } from "react-icons/fa";
import { GrDocumentCsv } from "react-icons/gr";
import { MdFilterList, MdArrowUpward } from "react-icons/md";
import { IoMdAddCircle, IoMdBarcode } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";

import validator from 'validator';
import { checkObject, isError } from 'modules/utilities';
import { fetchData, postData, uploadCsvFile } from 'modules/utilities/util_query';
import { useMutation } from 'react-query';
import { handleApiError } from "modules/utilities/responseHandlers";
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { useSelector } from 'react-redux';
import { UPLOAD_ITEM_CSV, GET_CREATE_ITEM, GET_CREATE_SUPPLIERS, GET_CREATE_CATEGORIES } from 'config/serverUrls';
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { AsyncSelect } from "chakra-react-select";
import "theme/asyncSelect.css";


function AddItem() {










    const titleColor = useColorModeValue("#5A8100", "#8abb18");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const textColor = "white";
    const bgColor = "#2a2c40";
    const bgIcons = useColorModeValue("#8abb18", "rgba(255, 255, 255, 0.5)");
    const [selectedFile, setSelectedFile] = useState(null);
    const history = useHistory();
    const toast = useToast();


    const [item, setItem] = useState({});
    const [errors, setErrors] = useState({});
    const token = useSelector(getAuthToken);

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

    const mutation_item = useMutation(postData, {
        onSuccess: (response) => {
            setItem({
                allow_alt: false,
                has_serial_no: false,
                category_data: null,
                supplier_data: null
            });
            setErrors({});
            setLoading(false);
            toast({
                title: 'Success',
                description: "Action succesful",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            return;
        },
        onError: (error) => {
            handleApiError(error);
            setLoading(false);
        }
    });

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

    const handleChange = (event) => {
        setItem({ ...item, [event.target.name]: event.target.value });
    }

    const handleSwitchChange = (event) => {
        setItem({ ...item, [event.target.name]: !item[event.target.name] });
    }

    const handleSubmit = () => {

        //console.log('item', item);

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

        //data.unit_price = parseFloat(data?.unit_price);
        //data.quantity = parseInt(data?.quantity);
        //data?.tax_1 && (data.tax_1 = parseInt(data?.tax_1));
        //data?.tax_2 && (data.tax_2 = parseInt(data?.tax_2));

        setLoading(true);
        mutation_item.mutate(
            {
                url: GET_CREATE_ITEM,
                payload_data: data,
                token: token,
                authenticate: true
            }
        );

        return;

    }

    const mutation = useMutation(uploadCsvFile, {
        onSuccess: (response) => {
            toast({
                title: 'Success',
                description: "Action succesful",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            return;
        },
        onError: (error) => {
            handleApiError(error);
        }
    });

    const onChange = (e) => {

        const { name, value } = e.target;
        setItem({ ...item, [name]: value });

    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = () => {

        const file = selectedFile;

        if (file) {
            mutation.mutate(
                {
                    url: UPLOAD_ITEM_CSV,
                    payload_data: file,
                    token: token,
                    authenticate: true

                }




            );

        }
        return;
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={() => {
                setSelectedFile(null);
                onClose();
            }}>
                <ModalOverlay />
                <ModalContent
                    bgColor="#232333"
                    borderColor="gray.900"
                    color="white"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
                >
                    <ModalHeader>IMPORT CSV SHEET</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container maxW="full">
                            <FormControl id="first_name">
                                <FormLabel>First Name</FormLabel>
                                <Input type="file" onChange={handleFileChange} borderColor="transparent" _hover={{ borderColor: 'transparent' }} _focus={{ borderColor: 'transparent' }} />
                                {selectedFile && (
                                    <Text mt={2} color="gray.500">
                                        Selected file: {selectedFile.name}
                                    </Text>
                                )}
                            </FormControl>
                        </Container>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => {
                            setSelectedFile(null);
                            onClose();
                        }}>
                            cancel
                        </Button>
                        <Button colorScheme="blue" onClick={handleFileUpload}>Submit</Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>


            <Flex
                direction="column"
                alignSelf="center"
                justifySelf="center"
                overflow="hidden"

            >
                <Flex alignItems="center" justifyContent="center" mb="60px" mt="80px">
                    <Flex
                        direction="column"
                        w="745px"

                        borderRadius="15px"
                        p="40px"
                        mx={{ base: "100px" }}
                        bg={bgColor}
                        color={textColor}
                        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                    >
                        <Text
                            fontSize="xl"
                            color={textColor}
                            fontWeight="bold"
                            textAlign="center"
                            mb="22px"
                        >
                            Excel Import
                        </Text>
                        <HStack spacing="15px" justify="center" mb="22px">
                            <IconButton
                                colorScheme='pink'
                                icon={<GrDocumentCsv />}
                                w="70px"
                                h="70px"
                                _hover={{ filter: "brightness(120%)" }}
                                fontSize='30px'
                                onClick={onOpen}
                            />
                        </HStack>

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
                                        name={'barcode'}
                                        onChange={handleChange}
                                        type="text"
                                        size="sm"
                                        value={item?.barcode || ''}
                                        borderRadius='15px'
                                        borderColor="rgba(255, 255, 255, 0.2)"
                                        _placeholder={{ opacity: 0.2, color: 'white' }}
                                        placeholder="eg. 4345-545-545"
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
                                        name={'name'}
                                        onChange={handleChange}
                                        type="text"
                                        size="sm"
                                        value={item?.name || ''}
                                        borderRadius='15px'
                                        borderColor="rgba(255, 255, 255, 0.2)"
                                        _placeholder={{ opacity: 0.2, color: 'white' }}
                                        placeholder="eg. VIVATECK BLENDER 650WATTSSSER"
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
                                            setItem({ ...item, category: null, category_data: null });
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
                                        type="number"
                                        size="sm"
                                        value={item?.cost_price || ''}
                                        borderRadius='15px'
                                        borderColor="rgba(255, 255, 255, 0.2)"
                                        _placeholder={{ opacity: 0.2, color: 'white' }}
                                        placeholder="eg. 400000"
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
                                        placeholder="eg. 500000"
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
                                        placeholder="eg. 5"
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
                                        placeholder="eg. 5"
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
                                        placeholder="eg. 5%"
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
                                        placeholder="eg. 5%"
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
                        <Box display="flex" justifyContent="flex-end">

                            <Button isLoading={loading} colorScheme='blue' onClick={handleSubmit}>Add Item</Button>

                        </Box>


                    </Flex>
                </Flex>
            </Flex>
        </>

    );
}

export default AddItem;
