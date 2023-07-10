// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightAddon,
    Link,
    Progress,
    Select,
    SimpleGrid,
    Spinner,
    Switch,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { MdFilterList, MdViewList } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { AsyncSelect } from "chakra-react-select";
import { useParams, useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Step1 = ({ customer, itemOptions, customerOptions, selectedOptions, handleChange, handleCustomerChange }) => {

    return (
        <Box>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                <FormControl >
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Customer's name
                    </FormLabel>
                    <AsyncSelect
                    name="customer_name"
                    onChange={handleCustomerChange}
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
                    value={ customer }
                />

                </FormControl>
                <FormControl>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Register Mode
                    </FormLabel>
                    <Select placeholder='Select option' borderColor='black' size="sm">
                        <option value='option1'>Sale</option>
                        <option value='option2'> Return</option>
                    </Select>

                </FormControl>
                <FormControl>
                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                        Payment Type
                    </FormLabel>
                    <Select placeholder='Select option' borderColor='black' size="sm">
                        <option value='option1'>Cash</option>
                        <option value='option2'>Cheque</option>
                        <option value='option3'>Gift Card</option>
                        <option value='option3'>Debit Card</option>
                        <option value='option3'>Credit Card</option>
                    </Select>

                </FormControl>
            </Grid>
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

            </FormControl>

            {selectedOptions && (
                <TableContainer>
                    <Table variant="striped" colorScheme="teal" size='sm'>
                        <TableCaption placement='top' fontSize='md'>Order Summary for {customer.label}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th pl="0px">NAME</Th>
                                <Th isNumeric>PRICE (PER UNIT)</Th>
                                <Th isNumeric>QUANTITY</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedOptions.map((option, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td maxWidth={{ sm: "250px" }} pl="0px">
                                            <Flex align="center" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'left' }}>
                                                <Flex direction="column">
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="normal"
                                                        minWidth="100%"
                                                    >
                                                        {option.label}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Td>
                                        <Td isNumeric>25</Td>
                                        <Td isNumeric>
                                            <Input
                                                width='50px'
                                                fontSize="sm"
                                                ms="4px"
                                                borderRadius="5px"
                                                type="number"
                                                size="sm"
                                                borderColor='black'
                                            /></Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th></Th>
                                <Th>TOTAL DISCOUNT TO APPLY (NAIRA)
                                    <Input
                                        width='auto'
                                        fontSize="sm"
                                        ms="4px"
                                        borderRadius="5px"
                                        type="number"
                                        size="sm"
                                        borderColor='black'
                                    /></Th>
                                <Th></Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            )}

        </Box>
    );
};

const Step2 = () => {
    return (
        <>
            <Box>im step two</Box>
        </>

    );
};

function AddItem() {

    const itemOptions = [
        { value: "blue", label: "1HP SPW THERMOCOOL[0.00 in stock]", colorScheme: "blue" },
        { value: "purple", label: "BRUHM GAS COOKER BGC-9642SN 90*60 4 GAS +2E WOODEN FINISH", colorScheme: "purple" },
        { value: "red", label: "SCANFROST STAINLESS GASCOOKER 2HOB[6.00 in stock]", colorScheme: "red" },
        { value: "orange", label: "1000 WATTS PR -SOCKET TEC[0.00 in stock]", colorScheme: "orange" },
        { value: "yellow", label: "32'-60' T.V HANGER[14.00 in stock", colorScheme: "yellow" },
        { value: "green", label: "BFV-409SD 409LTS[3.00 in stock]", colorScheme: "green" }
    ];

    const customerOptions = [
        { value: "blue", label: "Okeke Vincent", colorScheme: "blue" },
        { value: "purple", label: "Enyemaka Ngwa", colorScheme: "purple" },
        { value: "red", label: "Jerry Ihediwa", colorScheme: "red" },
        { value: "green", label: "Maximillian Ezeude", colorScheme: "green" },

    ];

    const bgColor = useColorModeValue("white", "gray.700");
    const [selectedOptions, setSelectedOptions] = useState();
    const [customer, setCustomer] = useState();
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);
    const [values, setValues] = useState({});
    const history = useHistory();

    const onChange = (e) => {

        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

    }

    var handleChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedOptions(selectedOption);
    };

    var handleCustomerChange = (customer) => {
        setCustomer(customer);
    };

    return (
        <Flex direction="column" alignSelf="center" justifySelf="center" overflow="hidden">
            <Flex alignItems="center" justifyContent="center" mb="60px" mt="80px">
                <Flex
                    direction="column"
                    w="100%"
                    background="transparent"
                    borderRadius="15px"
                    p="40px"
                    mx={{ base: "10px" }}
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                >
                    <Progress
                        hasStripe
                        colorScheme='teal'
                        value={progress}
                        mb="5%"
                        mx="5%"
                        isAnimated></Progress>

                    {step === 1 ?
                        <Step1  customerOptions={customerOptions} itemOptions={itemOptions} customer={customer}
                         selectedOptions={selectedOptions} bgColor={bgColor} 
                         handleChange={handleChange} handleCustomerChange={handleCustomerChange} /> :
                        <Step2 />
                    }
                    <ButtonGroup mt="5%" w="100%">
                        <Flex w="100%" justifyContent="space-between">
                            <Flex>
                                <Button
                                    onClick={() => {
                                        setStep(step - 1);
                                        setProgress(progress - 50);
                                    }}
                                    isDisabled={step === 1}
                                    colorScheme="teal"
                                    variant="solid"
                                    w="7rem"
                                    mr="5%">
                                    Back
                                </Button>
                                <Button
                                    w="7rem"
                                    isDisabled={step === 2}
                                    onClick={() => {
                                        setStep(step + 1);
                                        if (step === 2) {
                                            setProgress(100);
                                        } else {
                                            setProgress(progress + 50);
                                        }
                                    }}
                                    colorScheme="teal"
                                    variant="outline">
                                    Next
                                </Button>
                            </Flex>
                            {step === 2 ? (
                                <Button
                                    w="7rem"
                                    colorScheme="red"
                                    variant="solid"
                                // isLoading={mutation?.isLoading}
                                // onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            ) : null}
                        </Flex>
                    </ButtonGroup>

                </Flex>
            </Flex>
        </Flex>

    );
}

export default AddItem;
