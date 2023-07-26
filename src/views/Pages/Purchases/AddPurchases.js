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


function AddItem() {
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
            <Modal isOpen={isOpen} onClose={()=> {
                            setSelectedFile(null);
                            onClose();
                        }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>IMPORT CSV SHEET</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container bg="#9DC4FB" maxW="full" mt={0} overflow="hidden">
                            <Box bg="white" maxW="full">
                                <Box
                                    color="white"
                                    borderRadius="lg">
                                    <Box p={1}>

                                        <Box borderRadius="lg">
                                            <FormControl id="first_name">
                                                <FormLabel>First Name</FormLabel>
                                                <Input type="file" onChange={handleFileChange} />
                                                {selectedFile && (
                                                    <Text mt={2} color="gray.500">
                                                        Selected file: {selectedFile.name}
                                                    </Text>
                                                )}
                                            </FormControl>

                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={()=> {
                            setSelectedFile(null);
                            onClose();
                        }}>
                            cancel
                        </Button>
                        <Button variant='ghost'>Submit</Button>
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
                        background="transparent"
                        borderRadius="15px"
                        p="40px"
                        mx={{ base: "100px" }}
                        bg={bgColor}
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
                                backgroundColor='green'
                                color='white'
                                icon={<MdFilterList />}
                                w="70px"
                                h="70px"
                                _hover={{ filter: "brightness(120%)" }}
                                onClick={onOpen}
                            />
                        </HStack>
                        <FormControl>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                UPC/EAN/ISBN:
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
                                name="name"
                                onChange={onChange}
                                value={item?.name || ""}
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Category
                            </FormLabel>
                            <Select variant='filled' placeholder='Select option' mb="24px" name="category" onChange={onChange} value={item?.category || ""}>
                                <option value='option1'>Stabilizer</option>
                                <option value='option2'>Microwave</option>
                                <option value='option3'>Blender</option>
                            </Select>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Supplier
                            </FormLabel>
                            <Select variant='filled' placeholder='Select option' mb="24px">
                                <option value='option1'>Front Shop</option>
                                <option value='option2'>Somotex</option>
                                <option value='option3'>Fouani</option>
                            </Select>
                            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Wholesale Price
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
                                        Retail Price
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
                            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Tax 1
                                    </FormLabel>
                                    <Input
                                        fontSize="sm"
                                        ms="4px"
                                        borderRadius="15px"
                                        type="text"
                                        placeholder="Your full name"
                                        mb="24px"
                                        size="sm"
                                    />

                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Tax 2
                                    </FormLabel>
                                    <Input
                                        fontSize="sm"
                                        ms="4px"
                                        borderRadius="15px"
                                        type="text"
                                        placeholder="Your full name"
                                        mb="24px"
                                        size="sm"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Allow Alt Description
                                    </FormLabel>
                                    <Switch colorScheme="#5A8100" me="10px" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                        Item has Serial No.
                                    </FormLabel>
                                    <Switch colorScheme="#5A8100" me="10px" />
                                </FormControl>
                            </Grid>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Quantity
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="number"
                                placeholder="Number of Units Sold"
                                mb="24px"
                                size="lg"
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Reorder Level
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="number"
                                placeholder="Price (per Unit)"
                                mb="24px"
                                size="lg"
                            />
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

export default AddItem;
