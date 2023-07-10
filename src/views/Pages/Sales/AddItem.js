// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Container,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Icon,
    Image,
    VStack,
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
    Spacer,
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
import avatar4 from "assets/img/samlex2.png";
import { useRef } from "react";


const Step1 = ({ customer, itemOptions, customerOptions, selectedOptions,
    handleChange, handleCustomerChange, handleItemValueChange, sumParameter,
    paidCash, setPaidCash, discount, setDiscount, sumTotal }) => {

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
                        value={customer}
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

            {selectedOptions && (selectedOptions.length > 0) && (<>
                <TableContainer>
                    <Table variant="striped" colorScheme="teal" size='sm'>
                        <TableCaption placement='top' fontSize='md'>Order Summary for {customer?.label}</TableCaption>
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
                                        <Td pl="0px">
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
                                        <Td isNumeric>{option.price}</Td>
                                        <Td isNumeric>
                                            <Input
                                                width='50px'
                                                fontSize="sm"
                                                name={option.label}
                                                onChange={handleItemValueChange}
                                                ms="4px"
                                                borderRadius="5px"
                                                type="number"
                                                size="sm"
                                                borderColor='black'
                                                value={option.quantity}
                                            /></Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Grid templateColumns='repeat(3, 1fr)' gap={6} mt='20px'>
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            AMOUNT TENDERED
                        </FormLabel>
                        <Input
                            width='auto'
                            fontSize="sm"
                            ms="4px"
                            borderRadius="5px"
                            type="number"
                            size="sm"
                            borderColor='black'
                            value={paidCash}
                            onChange={(e) => setPaidCash(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            TOTAL DISCOUNT TO APPLY
                        </FormLabel>
                        <Input
                            width='auto'
                            fontSize="sm"
                            ms="4px"
                            borderRadius="5px"
                            type="number"
                            size="sm"
                            borderColor='black'
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </FormControl>
                    <Container>
                        <Text textAlign='right'>Sub-Total: NGN{sumTotal(selectedOptions)}
                        </Text>
                    </Container>


                </Grid>
            </>
            )}


        </Box>
    );
};

const Step2 = ({ paidCash, discount, sumParameter, selectedOptions, sumTotal }) => {

    return (
        <>
            {
                selectedOptions && (selectedOptions.length > 0) && (
                    <Box px={8} color="black">
                        <VStack spacing={4} align="start" p={4} rounded="md" color="black">
                            <Flex color='white' w='100%' h='200px' bgColor='black'>
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
                                    <Text>9 AKWA RD BY ABS JUNCTION,ONITSHA, ANAMBRA STATE
                                    </Text>
                                </Container>
                                <Spacer />
                                <Container alignSelf='center' textAlign='right'>
                                    <Text>08030964878</Text>
                                    <Text>07053808284</Text>
                                </Container>
                            </Flex>
                            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                                <Container alignSelf='center' >
                                    <Container my='20px' >
                                        <Text>Billed to:</Text>
                                        <Text fontSize="lg" fontWeight="bold">
                                            Company Name
                                        </Text>
                                        <Text>Address</Text>
                                        <Text>City, State, ZIP</Text>
                                    </Container>
                                    <Container my='20px'>
                                        <Text>Invoice Number:</Text>
                                        <Text fontSize="lg" fontWeight="bold">
                                            ########
                                        </Text>
                                        <Text>Sales Receipt</Text>
                                        <Text>Date: June 11, 2023</Text>
                                    </Container>
                                </Container>

                                <Container textAlign='right' alignSelf='center'>
                                    <Text>Employee ID</Text>
                                    <Text fontSize="lg" fontWeight="bold">
                                        Ebuka Pilolo
                                    </Text>
                                    <Text>City, State, ZIP</Text>
                                </Container>
                            </Grid>
                            <Box width='100%' px='10px'>
                                <Table variant="unstyled" size='sm'>
                                    <Thead>
                                        <Tr backgroundColor="#ffebae" borderBottomWidth="1px" borderColor="black">
                                            <Th textAlign='center'>Item</Th>
                                            <Th isNumeric textAlign='right'>Unit Price </Th>
                                            <Th isNumeric textAlign='right'>Quantity</Th>
                                            <Th isNumeric textAlign='right'>Amount</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {selectedOptions.map((option, index) => {
                                            return (
                                                <Tr key={index} borderBottomWidth="1px" borderColor="black">
                                                    <Td textAlign='left'>{option.label}</Td>
                                                    <Td isNumeric textAlign='right' >{option.price}</Td>
                                                    <Td isNumeric textAlign='right' backgroundColor="#ffebae">{option.quantity}</Td>
                                                    <Td isNumeric textAlign='right' backgroundColor="#ffebae">{option.quantity * option.price}</Td>
                                                </Tr>
                                            );
                                        })}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="#ffebae" fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>Sub Total</Th>
                                            <Th isNumeric backgroundColor="#ffebae" fontSize='sm' textTransform='none' textAlign='right'>{sumTotal(selectedOptions)}</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="#ffebae" fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>Discount</Th>
                                            <Th isNumeric backgroundColor="#ffebae" fontSize='sm' textTransform='none' textAlign='right'>{discount}</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="black" color='white' fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>TOTAL</Th>
                                            <Th backgroundColor="black" color='white' fontSize='sm' textTransform='none' textAlign='right'>{sumTotal(selectedOptions) - discount}</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th>CASH {paidCash}</Th>
                                            <Th>CHANGE DUE {+paidCash + +discount - sumTotal(selectedOptions)}</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </Box>

                            <Box alignItems='center' justifyContent='center' width='100%'>
                                <Text fontSize="lg" textAlign='center'>
                                    Any other commengts goes here
                                </Text>
                                <Text fontSize="lg" fontWeight="bold" textAlign='center'>
                                    Thanks for your Patronage !!
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                )
            }
        </>
    );
};

function AddItem() {

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

    const bgColor = useColorModeValue("white", "gray.700");
    const [selectedOptions, setSelectedOptions] = useState();
    const [customer, setCustomer] = useState();
    const [paidCash, setPaidCash] = useState();
    const [discount, setDiscount] = useState();
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);
    const [values, setValues] = useState({});
    const history = useHistory();
    const printableRef = useRef();

    const sumParameter = (arr, parameter) => {
        return arr.reduce((total, obj) => total + obj[parameter], 0);
    };

    const sumTotal = (arr) => {
        return arr.reduce((total, obj) => {
            var itemTotal = obj.price * obj.quantity;
            return (total + itemTotal);
        }, 0)

    };

    const onChange = (e) => {

        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

    };

    var handleChange = (selectedOption) => {
        setSelectedOptions(selectedOption);
    };

    var handleCustomerChange = (customer) => {
        setCustomer(customer);
    };

    var handleItemValueChange = (e) => {
        const { name, value } = e.target;
        setSelectedOptions((selectedOptions) => {
            const newSelectedOptions = selectedOptions.map(obj => {
                if (obj.label == name) {
                    return { ...obj, quantity: parseInt(value) };
                }
                return obj;
            });
            return newSelectedOptions;
        });
    }



    const handleSubmit = () => {
        if (!customer) {
            toast({
                title: 'Missing Information.',
                description: "Please fill in the customer name.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!selectedOptions || selectedOptions.length <= 0) {
            toast({
                title: 'Missing Information.',
                description: "select at least one sales item",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!paidCash || paidCash <= 0) {
            toast({
                title: 'Missing Information.',
                description: "Enter an amount tendered (greater than 0)",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!discount) {
            toast({
                title: 'Missing Information.',
                description: "Enter a discount(0 for none)",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Success',
            description: "Sales added",
            status: 'success',
            duration: 1000,
            isClosable: true,
        });

        setTimeout(() => {
            const content = printableRef.current;
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = content.innerHTML;
            window.print();
            document.body.innerHTML = originalContents;
            location.reload();
        }, 2000);
        return;
    };

    const getComponentStyles = () => {
        // Retrieve the styles for the printable component
        const styles = window.getComttputedStyle(printableRef.current);
        return styles.cssText;
    };



    return (
        <Flex direction="column" alignSelf="center" justifySelf="center" overflow="hidden">
            <Flex alignItems="center" justifyContent="center" mb="60px" mt="80px">
                <Flex
                    ref={printableRef}
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
                        <Step1 customerOptions={customerOptions} itemOptions={itemOptions} customer={customer}
                            selectedOptions={selectedOptions} bgColor={bgColor}
                            handleChange={handleChange} handleCustomerChange={handleCustomerChange}
                            handleItemValueChange={handleItemValueChange} sumParameter={sumParameter}
                            paidCash={paidCash} setPaidCash={setPaidCash} discount={discount} setDiscount={setDiscount}
                            sumTotal={sumTotal} /> :
                        <Step2 paidCash={paidCash} discount={discount} sumParameter={sumParameter}
                            selectedOptions={selectedOptions} sumTotal={sumTotal} />
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
                                    onClick={handleSubmit}
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
