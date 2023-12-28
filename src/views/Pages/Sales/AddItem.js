// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Progress,
    Select,
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
    Spacer,
} from "@chakra-ui/react";
// Assets
import React, { useState, useRef } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { AsyncSelect } from "chakra-react-select";
import { useToast } from '@chakra-ui/react';
import avatar4 from "assets/img/samlex2.png";
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { postData, fetchData } from 'modules/utilities/util_query';
import { handleApiError } from "modules/utilities/responseHandlers";
import { GET_CREATE_SALES, GET_CREATE_ITEM, GET_CREATE_CUSTOMERS } from 'config/serverUrls';
import { checkObject, isError } from 'modules/utilities';
import { getAuthUser } from "modules/auth/redux/authSelector";
import { useHistory } from "react-router-dom";
import "theme/asyncSelect.css";

const Step1 = ({ customer, selectedOptions, history,
    handleChange, handleCustomerChange, handleItemValueChange,
    paidCash, setPaidCash, discount, setDiscount, loadItems, loadCustomers,
    mode, setMode, paymentType, setPaymentType, sumTotal, errors, comments, setComments }) => {

    return (
        <Box>
            <FormControl >
                <FormLabel fontSize="sm" fontWeight="bold">
                    Name of Items: *
                </FormLabel>
                <div>
                    <AsyncSelect
                        isMulti
                        name="item_name"
                        size="md"
                        onChange={handleChange}
                        placeholder="Start typing name..."
                        loadOptions={loadItems}
                        value={selectedOptions}
                        cacheOptions
                        className="chakra-react-select"
                        classNamePrefix="chakra-react-select"
                    />
                    {isError(errors?.selectedOptions) && <Text color='white' bgColor='red' fontSize='sm' as='i'>{errors?.selectedOptions}</Text>}
                </div>


            </FormControl>
            <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={4}>
                <FormControl >
                    <FormLabel fontSize="sm" fontWeight="bold">
                       {" Customer's name: *  "}
                        <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => { history.push('/admin/customers'); }}>
                        Add New
                    </Button>
                    </FormLabel>

                    <div>
                        <AsyncSelect
                            name="customer_name"
                            size="sm"
                            onChange={handleCustomerChange}
                            placeholder="Start typing name..."
                            loadOptions={loadCustomers}
                            isClearable={true}
                            cacheOptions
                            value={customer}
                            className="chakra-react-select"
                            classNamePrefix="chakra-react-select"
                        />
                        {isError(errors?.customer) && <Text color='white' bgColor='red' fontSize='sm' as='i'>{errors?.customer}</Text>}
                    </div>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm" fontWeight="bold">
                        Paid: *
                    </FormLabel>
                    <div>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<TbCurrencyNaira color="gray.800" />}
                            />
                            <Input
                                type="number"
                                size="sm"
                                value={paidCash}
                                onChange={(e) => setPaidCash(e.target.value)}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                                placeholder="eg. Enter Amount"
                            />
                        </InputGroup>
                        {isError(errors?.paidCash) && <Text color='white' bgColor='red' fontSize='sm' as='i'>{errors?.paidCash}</Text>}
                    </div>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm" fontWeight="bold">
                        Total Discount: *
                    </FormLabel>
                    <div>
                        <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<TbCurrencyNaira color="gray.800" />}
                            />
                            <Input
                                type="number"
                                size="sm"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                borderRadius='15px'
                                borderColor="rgba(255, 255, 255, 0.2)"
                                _placeholder={{ opacity: 0.2, color: 'white' }}
                                placeholder="eg. Enter Discount"
                            />
                        </InputGroup>
                        {isError(errors?.discount) && <Text color='white' bgColor='red' fontSize='sm' as='i'>{errors?.discount}</Text>}
                    </div>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm" fontWeight="bold">
                        Register Mode:
                    </FormLabel>
                    <Select placeholder='Select option'
                        borderRadius='15px'
                        size="sm"
                        onChange={(e) => setMode(e.target.value)}
                        value={mode || ''}>
                        <option style={{ backgroundColor: '#232333' }} value='sale'>Sale</option>
                        <option style={{ backgroundColor: '#232333' }} value='return'> Return</option>
                    </Select>

                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm" fontWeight="bold">
                        Payment Type:
                    </FormLabel>
                    <Select placeholder='Select option'
                        borderRadius='15px'
                        size="sm"
                        onChange={(e) => setPaymentType(e.target.value)}
                        value={paymentType || ''} >
                        <option style={{ backgroundColor: '#232333' }} value='cash'>Cash</option>
                        <option style={{ backgroundColor: '#232333' }} value='cheque'>Cheque</option>
                        <option style={{ backgroundColor: '#232333' }} value='gift'>Gift Card</option>
                        <option style={{ backgroundColor: '#232333' }} value='debit'>Debit Card</option>
                        <option style={{ backgroundColor: '#232333' }} value='credit'>Credit Card</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize="sm" fontWeight="bold">
                        Comments:
                    </FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaRegCommentDots color="gray.800" />}
                        />
                        <Input
                            type="text"
                            size="sm"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Enter Amount"
                        />
                    </InputGroup>
                </FormControl>
            </Grid>


            {selectedOptions && (selectedOptions.length > 0) && (<>
                <TableContainer>
                    <Table colorScheme="blackAlpha" size='md'>
                        <TableCaption color="white" placement='top' fontSize='md'>Order Summary for {customer?.label}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th fontSize="md" bgcolor="white" pl={2}>NAME</Th>

                                <Th fontSize="md" bgcolor="#CC7C00" color="white" isNumeric>PRICE (PER UNIT)</Th>
                                <Th fontSize="md" bgcolor="#EA3C43" color="white" isNumeric>NUMBER</Th>
                                <Th fontSize="md" bgcolor="#07B8C7" color="white" isNumeric>AMOUNT</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {selectedOptions.map((option, index) => {
                                return (
                                    <Tr key={index} bgcolor="#232333">
                                        <Td pl={2}>
                                            <Flex align="center" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'left' }}>
                                                <Flex direction="column">
                                                    <Text>
                                                        {option?.label}{" "}
                                                        <Text fontWeight="bold" color="#CC7C00">
                                                            {`[${option?.quantity} in stock]`}
                                                        </Text>
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Td>
                                        <Td isNumeric>{option.unit_price}</Td>
                                        <Td>
                                            <Input
                                                width='50px'
                                                fontSize="sm"
                                                name={option.label}
                                                onChange={handleItemValueChange}
                                                type="number"
                                                size="sm"
                                                borderColor="rgba(255, 255, 255, 0.2)"
                                                value={option.number}
                                            />
                                        </Td>
                                        <Th isNumeric fontSize='sm' fontWeight="normal" textAlign='right' color="white">{(option.number * option.unit_price).toFixed(2)}</Th>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th backgroundColor="#232333" fontSize='sm' color='white' textTransform='none' fontWeight='normal' textAlign='right'>Sub Total:</Th>
                                <Th isNumeric backgroundColor="#232333" fontSize='sm' color='white' textTransform='none' textAlign='right'>NGN {sumTotal(selectedOptions).toFixed(2)}</Th>
                            </Tr>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th backgroundColor="#232333" fontSize='sm' color='white' textTransform='none' fontWeight='normal' textAlign='right'>Discount:</Th>
                                <Th isNumeric backgroundColor="#232333" fontSize='sm' color='white' textTransform='none' textAlign='right'>NGN {discount >= 0 && (Number(discount).toFixed(2))}</Th>
                            </Tr>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th backgroundColor="black" fontSize='sm' color='white' textTransform='none' fontWeight='normal' textAlign='right'>TOTAL:</Th>
                                <Th backgroundColor="black" fontSize='sm' color='white' textTransform='none' textAlign='right'>NGN {discount >= 0 && (sumTotal(selectedOptions) - Number(discount)).toFixed(2)}</Th>
                            </Tr>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th backgroundColor="black" fontSize='sm' color='white' textAlign='right' fontWeight='normal'>CASH: </Th>
                                <Th backgroundColor="black" fontSize='sm' color='white' textAlign='right'>NGN {paidCash >= 0 && (Number(paidCash).toFixed(2))}</Th>
                            </Tr>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                                <Th backgroundColor="black" fontSize='sm' color='white' textAlign='right' fontWeight='normal'>CHANGE DUE:</Th>
                                <Th backgroundColor="black" fontSize='sm' color='white' textAlign='right'>NGN {(discount >= 0 && paidCash >= 0) && Number(+paidCash + +discount - sumTotal(selectedOptions)).toFixed(2)}</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </>
            )}


        </Box>
    );
};

const Step2 = React.forwardRef((props, ref) => {
    const { customer, paidCash, discount, sumParameter, selectedOptions, sumTotal, receipt,
        mode, paymentType, authUser, comments } = props;

    return (
        <>
            {
                selectedOptions && (selectedOptions.length > 0) && (
                    <Box px={8} color="black" bgColor="white">
                        <Box ref={ref} spacing={4} p={4} mt={4} rounded="md" color="black">
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
                                    <Text>{receipt?.company_address || "TBG"}</Text>
                                </Container>
                                <Spacer />
                                <Container alignSelf='center' textAlign='right'>
                                    <Text>{receipt?.company_phone1 || "TBG"}</Text>
                                    {receipt?.company_phone2 && (<Text>{receipt?.company_phone2}</Text>)}
                                    <Text>{receipt?.company_email || "TBG"}</Text>
                                </Container>
                            </Flex>
                            <Grid templateColumns='repeat(2, 1fr)' gap={2} px='10px' mb={12}>
                                <GridItem>
                                    <Text textTransform="uppercase" fontSize='sm'>Billed to:</Text>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {customer.label}
                                    </Text>
                                    <Text fontSize='sm'>{customer?.email}</Text>
                                    <Text textTransform="uppercase" fontSize='sm'>{customer?.address_1}</Text>
                                </GridItem>
                                <GridItem textAlign='right'>
                                    <Text textTransform="uppercase" fontSize='sm'>Invoice Number:</Text>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {receipt?.sales_id || "TBG"}
                                    </Text>
                                    <Text textTransform="uppercase" fontSize='sm'>{`Sales Mode: ${mode} Payment Type: ${paymentType}`}</Text>
                                    <Text textTransform="uppercase" fontSize='sm'>Date: {receipt?.date || "TBG"}</Text>
                                </GridItem>

                                <GridItem >
                                    <Text textTransform="uppercase" fontSize='sm'>Employee ID</Text>
                                    <Text fontSize='sm'>
                                        {authUser?.user?.username}
                                    </Text>
                                    <Text textTransform="uppercase" fontSize='sm'>{`Designation: ${authUser?.user?.dept || ""}`}</Text>
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
                                        {selectedOptions.map((option, index) => {
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
                                            <Th isNumeric backgroundColor="#ffebae" fontSize='sm' textTransform='none' textAlign='right'>NGN {sumTotal(selectedOptions).toFixed(2)}</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="#ffebae" fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>Discount:</Th>
                                            <Th isNumeric backgroundColor="#ffebae" fontSize='sm' textTransform='none' textAlign='right'>NGN {discount >= 0 && (Number(discount).toFixed(2))}</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="black" color='white' fontSize='sm' textTransform='none' fontWeight='normal' textAlign='right'>TOTAL:</Th>
                                            <Th backgroundColor="black" color='white' fontSize='sm' textTransform='none' textAlign='right'>NGN {discount >= 0 && (sumTotal(selectedOptions) - Number(discount)).toFixed(2)}</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>CASH:</Th>
                                            <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>NGN {paidCash >= 0 && (Number(paidCash).toFixed(2))}</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>CHANGE DUE:</Th>
                                            <Th backgroundColor="#6b6b6b" color='white' fontSize='sm' textAlign='right'>NGN {(discount >= 0 && paidCash >= 0) && Number(+paidCash + +discount - sumTotal(selectedOptions)).toFixed(2)}</Th>
                                        </Tr>

                                    </Tfoot>
                                </Table>
                            </Box>

                            <Box alignItems='center' justifyContent='center' width='100%'>

                                {receipt?.comments &&
                                    (<Text fontSize="lg" fontWeight="bold" textAlign='center'>
                                        {receipt?.comments}
                                    </Text>)
                                }
                            </Box>
                        </Box>
                    </Box>
                )
            }
        </>
    );



});

function AddItem() {

    const textColor = "white";
    const bgColor = "#2a2c40";
    const [errors, setErrors] = React.useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [customer, setCustomer] = useState();
    const [paidCash, setPaidCash] = useState(0);
    const [mode, setMode] = useState(null);
    const [paymentType, setPaymentType] = useState(null);
    const [comments, setComments] = useState('');
    const [discount, setDiscount] = useState("0");
    const history = useHistory();

    //these should be set on succesful sales submission
    const [receipt, setReceipt] = useState({});

    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);
    const printableRef = useRef();
    const token = useSelector(getAuthToken);
    const authUser = useSelector(getAuthUser);

    //console.log(authUser);

    const sumParameter = (arr, parameter) => {
        return arr.reduce((total, obj) => total + Number(obj[parameter]), 0);
    };

    const sumTotal = (arr) => {
        return arr.reduce((total, obj) => {
            var itemTotal = obj.unit_price * obj.number;
            return (total + itemTotal);
        }, 0)

    };

    const loadCustomers = async (inputValue) => {
        let response = await fetchData({
            queryKey: ['all customers', {
                url: GET_CREATE_CUSTOMERS + `?name=${inputValue}`,
                payload_data: {},
                authenticate: true,
                token
            }]
        });

        const options = response.data.map((option) => ({
            ...option,
            value: option?.first_name + " " + option?.last_name,
            label: option?.first_name + " " + option?.last_name

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
                description: "Sales added successfully",
                status: 'success',
                duration: 1000,
                isClosable: true,
            });

            var dateTime = new Date(response.data.data.date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            dateTime = dateTime.toLocaleString('en-US', options);
            setReceipt({ ...response.data.data, date: dateTime });

            if (response.data.print) {
                setTimeout(() => {
                    const content = printableRef.current;
                    const originalContents = document.body.innerHTML;
                    document.body.style.backgroundColor = 'white';

                    document.body.innerHTML = content.innerHTML;
                    window.print();
                    document.body.innerHTML = originalContents;
                    location.reload();
                }, 2000);

            }
            else {
                location.reload();
            }

            return;
        },
        onError: (error) => {
            handleApiError(error);
        }
    })

    const handleChange = (selectedOption) => {
        const allSelected = selectedOption.map(obj => {
            return {
                label: obj.label,
                name: obj.name,
                number: obj.number,
                unit_price: obj.unit_price,
                value: obj.value,
                colorScheme: obj.colorScheme,
                cost_price: obj.cost_price,
                quantity: obj.quantity,
                id: obj.id
            }
        });
        setSelectedOptions(allSelected);
    };

    const handleCustomerChange = (customer, { action }) => {

        if (action === 'clear') {
            setCustomer(null);
        }
        else {
            setCustomer(customer);
        }
    };

    const handleItemValueChange = (e) => {
        const { name, value } = e.target;
        setSelectedOptions((selectedOptions) => {
            const newSelectedOptions = selectedOptions.map(obj => {
                if (obj.label == name) {
                    return { ...obj, number: value };
                }
                return obj;
            });
            return newSelectedOptions;
        });
    }

    const validate = () => {
        let uerrors = {}

        if (!customer) {
            uerrors.customer = "Select a customer";
        }

        if (!selectedOptions || selectedOptions.length <= 0) {
            uerrors.selectedOptions = "Select at least one sales item."
        }

        if (!paidCash || paidCash <= 0 || paidCash > 99999999.99) {
            uerrors.paidCash = "Enter amount between 0 and 99999999.99";
        }

        if (!discount || discount < 0) {
            uerrors.discount = "Enter a valid discount(0 for none)";
        }

        if (selectedOptions.length > 0) {
            const isAllGreaterThanZero = selectedOptions.every(item => item.number > 0)
            uerrors.selectedOptions = isAllGreaterThanZero ? null : "Enter a quantity greater than zero in numbers column for every selected item"
        }

        return uerrors;
    }

    const handleNext = () => {
        let checkErrors = validate();
        let areAllFieldsFalse = checkObject(checkErrors);

        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            toast({
                title: 'Information error',
                description: "Check for errors",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setErrors({});

        setStep(step + 1);
        if (step === 2) {
            setProgress(100);
        } else {
            setProgress(progress + 50);
        }
    }

    const handleSubmit = () => {
        const data = {
            customerName: customer.label,
            customerAddress: customer.address_1,
            customerEmail: customer.email,
            customerID: customer.id,
            paidCash,
            selectedOptions,
            comments,
            discount,
            paymentType,
            mode,
            sum_items: sumParameter(selectedOptions, 'number'),
            sub_total: sumTotal(selectedOptions)
        }

        mutation.mutate(
            {
                url: GET_CREATE_SALES,
                payload_data: data,
                token: token,
                authenticate: true
            }
        );

        return;
    }

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
                    color={textColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                >
                    <Progress
                        hasStripe
                        style={{ backgroundColor: '#232333' }}
                        value={progress}
                        mb="5%"
                        mx="5%"
                        isAnimated></Progress>

                    {step === 1 ?
                        <Step1 customer={customer} loadCustomers={loadCustomers} setDiscount={setDiscount}
                            selectedOptions={selectedOptions} bgColor={bgColor} errors={errors} comments={comments}
                            handleChange={handleChange} handleCustomerChange={handleCustomerChange}
                            handleItemValueChange={handleItemValueChange} history={history}
                            paidCash={paidCash} setPaidCash={setPaidCash} discount={discount}
                            sumTotal={sumTotal} mode={mode} setMode={setMode} paymentType={paymentType}
                            setPaymentType={setPaymentType} loadItems={loadItems} setComments={setComments}
                        /> :
                        <Step2 paidCash={paidCash} discount={discount} sumParameter={sumParameter}
                            receipt={receipt} mode={mode} paymentType={paymentType} customer={customer}
                            selectedOptions={selectedOptions} authUser={authUser} sumTotal={sumTotal}
                            ref={printableRef} comments={comments} />
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
                                    colorScheme="red"
                                    variant="solid"
                                    w="7rem"
                                    mr="5%">
                                    Back
                                </Button>
                                <Button
                                    w="7rem"
                                    isDisabled={step === 2}
                                    onClick={handleNext}
                                    colorScheme="blue">
                                    Preview
                                </Button>
                            </Flex>
                            {step === 2 ? (
                                <Button
                                    w="7rem"
                                    colorScheme="blue"
                                    variant="solid"
                                    isLoading={mutation?.isLoading}
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
