// Chakra imports
import {
    Flex,
    Icon,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import React from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const SalesDashboardTable = ({ title, amount, captions, data }) => {
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p='12px 0px 28px 0px'>
                <Flex direction='column'>
                    <Text fontSize='lg' color="white" fontWeight='bold' pb='.5rem'>
                        {title}
                    </Text>
                    <Flex align='center'>
                        <Icon
                            as={IoCheckmarkDoneCircleSharp}
                            color='#4285F4'
                            w={4}
                            h={4}
                            pe='3px'
                        />
                        <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                            <Text fontWeight='bold' as='span'>
                                Most recent
                            </Text>{" "}
                            sales.
                        </Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <Table variant='unstyled' color={textColor}>
                <Thead>
                    <Tr my='.8rem' ps='0px'>
                        <Th color='gray.400' ps="0px">
                            {captions[0]}
                        </Th>
                        <Th color='gray.400'>
                            {captions[1]}
                        </Th>
                        <Th color='gray.400'>
                            {captions[2]}
                        </Th>
                        <Th color='gray.400' textAlign="right">
                            {captions[3]}
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row) => {
                        return (
                            <DashboardTableRow
                                key={row.name}
                                name={row.name}
                                logo={row.logo}
                                members={row.members}
                                budget={row.budget}
                                progression={row.progression}
                            />
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
};

export default SalesDashboardTable;
