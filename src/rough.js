
//---customers table
//change table used by the customer table


//---add purchase
//adjust the list purchase form for suppliers and categories fields
// adjust edit purchase that you "add" quantity and not update it?. adjust json field as well


//---additems page
// Should amount be more than 100m?
// minus items from number in items before performing sales


//remove all console.log statements 
//make tabs and dropdowns where user dont have permissions to be invisible to them
//include loading state in necessary buttons 
// required star indicator on required fields
//ability to filter and edit items in bulk
// side menu bar components icon colouring on mobile version
// ability to generate csv or pdf for item inventory


//===checks 
//upload the csv files twice, each new upload should replace the onw already in the database(when done through csvupload)
// in the add purchase/ menu, you are importing asynselect.css file, it might not be useful because the async select in add items/sales page doesnt import it and still seems to have the same styling
// inquire from maxiskills(for each of the 3 branches) and chuks ekesons price of software
//ask ebuka for team departments, include them in selection(when creating new user) and profile?
//change email to username login
//add new customer button to add items page?
// all list pages should have defined ordering(alphabetical, date etc.)
// change some icons on the side menu bar to better reflect what they represent 




// storeconfig
//print affecs
// address email number affects
// return policy included
// validations on email and other required fields






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
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { MdFilterList, MdViewList } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";


function StoreConfig() {
    
    const textColor = "white";
    const bgColor = "#2a2c40";
    const [errors, setErrors] = useState({});

    const nameRef = React.useRef(null);

    const [values, setValues] = React.useState({});

    const token = useSelector(getAuthToken);
    const toast = useToast();






    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("#8abb18", "rgba(255, 255, 255, 0.5)");
    const [item, setItem] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const history = useHistory();
    const toast = useToast();

    const onChange = (e) => {

        const { name, value } = e.target;
        setItem({ ...item, [name]: value });

    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = () => {
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
        history.push('/admin/add-Purchases');
        return;
    }

    return (
        <>
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
                        background="transparent"
                        borderRadius="15px"
                        p="40px"
                        mx={{ base: "100px" }}
                        bg={bgColor}
                        boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                    >
                        <FormControl>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Company Name:
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
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Company Address
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="text"
                                placeholder="Your full name"
                                mb="24px"
                                size="lg"
                                name="name"
                                onChange={onChange}
                                value={item?.name || ""}
                            />
                                                        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Company Phone
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

                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Company Email
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

                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Company Website
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

                                </FormControl>

                            </Grid>
                            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Tax 1 (%)
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
                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Tax 2 (%)
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
                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Print Receipt
                                    </FormLabel>
                                    <Switch colorScheme="#5A8100" me="10px" />
                                </FormControl>
                            </Grid>

                            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Language
                                    </FormLabel>
                                    <Select variant='filled' placeholder='Select option' mb="24px">
                                        <option value='option1'>English</option>
                                        <option value='option2'>German</option>
                                        <option value='option3'>French</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Timezone
                                    </FormLabel>
                                    <Select variant='filled' placeholder='Select option' mb="24px">
                                        <option value='option1'>(GMT + 01.00)West African Time</option>
                                        <option value='option1'>(GMT + 02.00)Athens, Bucharest</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Button
                                type="submit"
                                bg="#5A8100"
                                fontSize="10px"
                                color="white"
                                fontWeight="bold"
                                w="100%"
                                h="45"
                                mb="24px"
                                onClick={handleSubmit}
                                _hover={{
                                    bg: "#8abb18",
                                }}
                                _active={{
                                    bg: "#354c00",
                                }}
                            >
                                ADD ITEM
                            </Button>
                        </FormControl>
                    </Flex>
                </Flex>
            </Flex>
        </>

    );
}

export default StoreConfig;

