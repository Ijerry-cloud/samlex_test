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
    Select,
    Switch,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { MdFilterList, MdViewList } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function AddItem() {
    const titleColor = useColorModeValue("#5A8100", "#8abb18");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("#8abb18", "rgba(255, 255, 255, 0.5)");
    return (
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
                        Add, List, Filter
                    </Text>
                    <HStack spacing="15px" justify="center" mb="22px">
                        <Flex
                            justify="center"
                            align="center"
                            w="75px"
                            h="75px"
                            borderRadius="15px"
                            border="1px solid lightgray"
                            cursor="pointer"
                            transition="all .25s ease"
                            _hover={{ filter: "brightness(120%)", bg: bgIcons }}
                        >
                            <Link href="#">
                                <Icon
                                    as={IoMdAddCircle}
                                    w="30px"
                                    h="30px"
                                    _hover={{ filter: "brightness(120%)" }}
                                />
                            </Link>
                        </Flex>
                        <Flex
                            justify="center"
                            align="center"
                            w="75px"
                            h="75px"
                            borderRadius="15px"
                            border="1px solid lightgray"
                            cursor="pointer"
                            transition="all .25s ease"
                            _hover={{ filter: "brightness(120%)", bg: bgIcons }}
                        >
                            <Link href="#">
                                <Icon
                                    as={MdViewList}
                                    w="30px"
                                    h="30px"
                                    _hover={{ filter: "brightness(120%)" }}
                                />
                            </Link>
                        </Flex>
                        <Flex
                            justify="center"
                            align="center"
                            w="75px"
                            h="75px"
                            borderRadius="15px"
                            border="1px solid lightgray"
                            cursor="pointer"
                            transition="all .25s ease"
                            _hover={{ filter: "brightness(120%)", bg: bgIcons }}
                        >
                            <Link href="#">
                                <Icon
                                    as={MdFilterList}
                                    w="30px"
                                    h="30px"
                                    _hover={{ filter: "brightness(120%)" }}
                                />
                            </Link>
                        </Flex>
                    </HStack>
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
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            Category
                        </FormLabel>
                        <Select variant='filled' placeholder='Select option' mb="24px">
                            <option value='option1'>Stabilizer</option>
                            <option value='option2'>Microwave</option>
                            <option value='option3'>Blender</option>
                        </Select>
                        <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                            Number of Units Purchased
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
                            Price (per Unit)
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
    );
}

export default AddItem;
