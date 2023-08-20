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
    const titleColor = useColorModeValue("#5A8100", "#8abb18");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const textColor = useColorModeValue("gray.700", "white");
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
