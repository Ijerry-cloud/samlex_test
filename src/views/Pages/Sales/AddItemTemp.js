// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    Link,
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


function AddItem() {

    const itemOptions = [
        { value: "blue", label: "1HP SPW THERMOCOOL[0.00 in stock]", colorScheme: "blue" },
        { value: "purple", label: "BRUHM GAS COOKER BGC-9642SN 90*60 4 GAS +2E WOODEN FINISH", colorScheme: "purple" },
        { value: "red", label: "SCANFROST STAINLESS GASCOOKER 2HOB[6.00 in stock]", colorScheme: "red" },
        { value: "orange", label: "1000 WATTS PR -SOCKET TEC[0.00 in stock]", colorScheme: "orange" },
        { value: "yellow", label: "32'-60' T.V HANGER[14.00 in stock", colorScheme: "yellow" },
        { value: "green", label: "BFV-409SD 409LTS[3.00 in stock]", colorScheme: "green" }
    ];

    const bgColor = useColorModeValue("white", "gray.700");

    const [selectedOptions, setSelectedOptions] = useState([]);

    var handleChange = (selectedOption) => {
        console.log(selectedOption);
        setSelectedOptions(selectedOption);
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
                    <FormControl>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            Name of Item
                        </FormLabel>
                        <Input
                            fontSize="sm"
                            ms="4px"
                            borderRadius="15px"
                            type="text"
                            placeholder="Your full name"
                            mb="24px"
                            size="lg"
                        />
                        <AsyncSelect
                            isMulti
                            name="colors"
                            onChange={handleChange}
                            placeholder="Select some colors..."
                            loadOptions={(inputValue, callback) => {
                                setTimeout(() => {
                                    const values = itemOptions.filter((option) =>
                                        option.label.toLowerCase().includes(inputValue.toLowerCase())
                                    );
                                    callback(values);
                                }, 3000);
                            }}
                            cacheOptions
                        />
                    </FormControl>

                    {selectedOptions && (
                        <TableContainer>
                            <Table variant="striped" colorScheme="teal">
                                <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                                                                fontSize="md"
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
                                        /></Th>
                                        <Th></Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}

export default AddItem;
