// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    HStack,
    Icon,
    Input,
    Link,
    Select,
    Stack,
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

import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
} from '@chakra-ui/react';

function FilterItems() {
    //price range min and max values for the slider
    const [minValue, setMinValue] = React.useState(10);
    const [maxValue, setMaxValue] = React.useState(100);
    const [minSliderValue, setMinSliderValue] = React.useState(10);
    const [maxSliderValue, setMaxSliderValue] = React.useState(100);
    const titleColor = useColorModeValue("#5A8100", "#8abb18");
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("white", "gray.700");
    const bgIcons = useColorModeValue("#8abb18", "rgba(255, 255, 255, 0.5)");

    const handleMinPriceKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setMinSliderValue(event.target.value);
        }
    };

    const handleMaxPriceKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setMaxSliderValue(event.target.value);
        }
    };

    const handleSliderChange = (value) => {
        setMinValue(value[0]);
        setMaxValue(value[1]);
        setMinSliderValue(value[0]);
        setMaxSliderValue(value[1]);
    }

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
                    <FormControl>
                        <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                            Name of Item
                        </FormLabel>
                        <Input
                            fontSize="sm"
                            ms="4px"
                            borderRadius="15px"
                            type="text"
                            placeholder="Name of Item"
                            mb="35px"
                            size="lg"
                        />

                        <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                            Categories
                        </FormLabel>

                        <Grid templateColumns='repeat(5, 1fr)' gap={6} mb="35px">
                            <Checkbox colorScheme='orange'>
                                Microwave
                            </Checkbox>
                            <Checkbox colorScheme='orange' >
                                Refrigerator
                            </Checkbox>
                            <Checkbox colorScheme='orange' >
                                Pressing Iron
                            </Checkbox>
                            <Checkbox colorScheme='orange'>
                                Blenders
                            </Checkbox>
                            <Checkbox colorScheme='orange' >
                                Standing fans
                            </Checkbox>
                            <Checkbox colorScheme='orange' >
                                Cooker
                            </Checkbox>
                            <Checkbox colorScheme='orange'>
                                Gas Cooker
                            </Checkbox>
                            <Checkbox colorScheme='orange'>
                                Televison
                            </Checkbox>
                            <Checkbox colorScheme='orange'>
                                Thermocool
                            </Checkbox>

                        </Grid>
                        <RangeSlider aria-label={['min', 'max']} min={0} max={300} value={[minSliderValue, maxSliderValue]} onChange={handleSliderChange}>
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                        </RangeSlider>
                        <HStack spacing="15px" mb="35px" justify="center">
                            <Box width="100%">
                                <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                                    Min. Price (per unit)
                                </FormLabel>
                                <Input
                                    fontSize="sm"
                                    ms="4px"
                                    borderRadius="15px"
                                    type="number"
                                    placeholder="Your full name"
                                    size="lg"
                                    value={minValue}
                                    onChange={(evt) => setMinValue(evt.target.value)}
                                    onKeyDown={handleMinPriceKeyDown}
                                />
                            </Box>
                            <Box width="100%">
                                <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                                    Max Price (per unit)
                                </FormLabel>
                                <Input
                                    fontSize="sm"
                                    ms="4px"
                                    borderRadius="15px"
                                    type="number"
                                    placeholder="Your full name"
                                    size="lg"
                                    value={maxValue}
                                    onChange={(evt) => setMaxValue(evt.target.value)}
                                    onKeyDown={handleMaxPriceKeyDown}
                                />
                            </Box>
                        </HStack>
                        <HStack spacing="15px" mb="35px" justify="center">
                            <Box width="100%">
                                <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                                    Start Date
                                </FormLabel>
                                <Input
                                    fontSize="sm"
                                    ms="4px"
                                    borderRadius="15px"
                                    type="date"
                                    size="lg"
                                />
                            </Box>
                            <Box width="100%">
                                <FormLabel ms="4px" fontSize="md" fontWeight="bold">
                                    End Date
                                </FormLabel>
                                <Input
                                    fontSize="sm"
                                    ms="4px"
                                    borderRadius="15px"
                                    type="date"
                                    size="lg"
                                />
                            </Box>
                        </HStack>
                        <Button
                            type="submit"
                            bg="#5A8100"
                            fontSize="14px"
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
                            FILTER
                        </Button>
                    </FormControl>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default FilterItems;
