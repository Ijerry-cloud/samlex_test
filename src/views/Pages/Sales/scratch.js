import React from 'react';
import {
    Box,
    Container,
    Flex,
    Text,
    Grid,
    Heading,
    Image,
    VStack,
    HStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tfoot,
    Spacer,
} from '@chakra-ui/react';
import avatar4 from "assets/img/samlex2.png";

const InvoiceTemplate = () => {
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
                    bg={'white'}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                >
                    <Box p={8} color="black">
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
                                <Table variant="unstyled">
                                    <Thead>
                                        <Tr backgroundColor="#ffebae" borderBottomWidth="1px" borderColor="black">
                                            <Th textAlign='center'>Item</Th>
                                            <Th isNumeric textAlign='right'>Unit Price </Th>
                                            <Th isNumeric textAlign='right'>Quantity</Th>
                                            <Th isNumeric textAlign='right'>Amount</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr borderBottomWidth="1px" borderColor="black">
                                            <Td textAlign='center'>Item 1</Td>
                                            <Td isNumeric textAlign='right' >$10</Td>
                                            <Td isNumeric textAlign='right'  backgroundColor="#ffebae">3</Td>
                                            <Td isNumeric  textAlign='right' backgroundColor="#ffebae">N30020</Td>
                                        </Tr>
                                        <Tr borderBottomWidth="1px" borderColor="black">
                                            <Td textAlign='center'>Item 2</Td>
                                            <Td isNumeric textAlign='right' >$10</Td>
                                            <Td isNumeric textAlign='right'  backgroundColor="#ffebae">5</Td>
                                            <Td isNumeric textAlign='right'  backgroundColor="#ffebae">N30015</Td>
                                        </Tr>
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="#ffebae" fontSize='md' textTransform='none' fontWeight='normal' textAlign='right'>Sub Total</Th>
                                            <Th isNumeric backgroundColor="#ffebae" fontSize='md' textTransform='none' textAlign='right'>N7800000</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="#ffebae" fontSize='md' textTransform='none' fontWeight='normal' textAlign='right'>Discount</Th>
                                            <Th isNumeric backgroundColor="#ffebae" fontSize='md' textTransform='none' textAlign='right'>N7000</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th backgroundColor="black" color='white' fontSize='md' textTransform='none' fontWeight='normal' textAlign='right'>TOTAL</Th>
                                            <Th backgroundColor="black" color='white' fontSize='md' textTransform='none' textAlign='right'>N3090900</Th>
                                        </Tr>
                                        <Tr>
                                            <Th></Th>
                                            <Th></Th>
                                            <Th>CASH</Th>
                                            <Th>CHANGE DUE</Th>
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

                </Flex>
            </Flex>
        </Flex>

    );
};

export default InvoiceTemplate;
