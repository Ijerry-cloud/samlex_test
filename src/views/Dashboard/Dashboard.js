import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Icon,
  Image,
  Portal,
  Progress,
  SimpleGrid,
  Spacer,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Stack,
  StackDivider,
  Heading,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/black_owned_tech.jpg";
import logosamlex from "assets/img/samlex2.png";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import BarChart from "components/Charts/BarChart";
import DoughnutChart from "components/Charts/DoughnutChart";
import { donutOptions } from "variables/charts";
import ReactApexChart from 'react-apexcharts';
import LineChart, { LineChart1 } from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
import { FaUserTag } from "react-icons/fa";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useState } from "react";
// react icons
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiWashingMachine } from "react-icons/gi";
import { FaShoppingCart, FaBell, FaUsers } from "react-icons/fa";
import { timelineData } from "variables/general2";
import { dashboardTableData as dashboardTableData2 } from "variables/general2";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import { dashboardTableData } from "variables/general";
import Projects from "./components/Projects";
import SalesDashboardTable from "./components/SalesDashboardTable";

import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import { handleApiError } from "modules/utilities/responseHandlers";
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { fetchData, postData } from 'modules/utilities/util_query';
import { useToast } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { GET_DASHBOARD_COUNTS, GET_CATEGORIES_CHART, GET_DAILY_REPORT, GET_SALES_REPORT } from 'config/serverUrls';
import customer from "assets/img/avatars/customer.png";
import employees from "assets/img/avatars/employees.png";
import items from "assets/img/avatars/items.png";
import sale from "assets/img/avatars/sale.png";
import { getCurrentDateInput, getXdaysAgoDate } from 'modules/utilities';
import { lineChartData, lineChartOptions, areaoptions } from "variables/charts";

const today = getCurrentDateInput();
const fourteenDaysAgo = getXdaysAgoDate(14);


export default function Dashboard() {
  const [counts, setCounts] = useState();
  const [categories, setCategories] = useState([]);
  const [donutChartOptions, setDonutChartOptions] = useState(donutOptions);
  const [totals, setTotals] = useState([]);
  const [lineOptions, setLinetOptions] = useState(lineChartOptions);
  const [sales, setSales] = useState([]);
  const history = useHistory();

  const token = useSelector(getAuthToken);
  const toast = useToast();

  const areaseries = [{
    name: 'Series 1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }];


  const daily_reports_url = `${GET_DAILY_REPORT}?startDate=${fourteenDaysAgo}&endDate=${today}&page=1&recent=10`;
  const counts_reports_url = `${GET_DASHBOARD_COUNTS}?startDate=${fourteenDaysAgo}&endDate=${today}`;
  const sales_report_url = `${GET_SALES_REPORT}?startDate=${today}&endDate=${today}&page=1`;




  const payload_data = {};

  const NosQuery = useQuery([`counts`,
    {
      url: counts_reports_url,
      payload_data,
      authenticate: true,
      token
    }],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data;
        setCounts(data)
      },
      onError: (error) => {
        handleApiError(error);
      }
    }
  );

  const categoryNosQuery = useQuery([`category-count`,
    {
      url: GET_CATEGORIES_CHART,
      payload_data: {},
      authenticate: true,
      token
    }],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const five_and_rest_names = response?.data?.first_five.map((category) => category.name);
        const five_and_rest_number = response?.data?.first_five.map((category) => category.total_quantity);
        const others = response?.data?.others;
        console.log(five_and_rest_names);
        console.log(five_and_rest_number);
        five_and_rest_names.push(others.name);
        five_and_rest_number.push(others.total_quantity)
        setCategories(five_and_rest_number);
        setDonutChartOptions(donutOptions => ({ ...donutOptions, labels: five_and_rest_names }))

      },
      onError: (error) => {
        handleApiError(error);
      }
    }
  );

  const dailyReportQuery = useQuery(['daily-report-dashboard',
    {
      url: daily_reports_url,
      payload_data: {},
      authenticate: true,
      token

    }],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        console.log(response?.data);
        const daily_totals = response?.data?.results.map((day) => day.total_amount);
        const lineData = [{ name: "Total Amount Sold", data: daily_totals }];
        const days = response?.data?.results.map((day) => {
          const jsDate = new Date(day.day);
          const options = { month: 'short', day: 'numeric' };
          const formattedDate = jsDate.toLocaleDateString('en-US', options);
          return formattedDate;
        });

        setLinetOptions(lineOptions => ({ ...lineOptions, xaxis: { categories: days, labels: { style: { colors: "#c8cfca", fontSize: "12px" } } } }));
        setTotals(lineData);

      },
      onError: (error) => {
        handleApiError(error);
      }
    }
  );

  const salesReportQuery = useQuery(['sales-report-dashboard',
    {
      url: sales_report_url,
      payload_data: {},
      authenticate: true,
      token

    }],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data;
        setSales(data?.results || []);

      },
      onError: (error) => {
        handleApiError(error);
      }
    }
  );



  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <Card minH="150px">
          <CardBody>
            {NosQuery.isLoading && (
              <Flex direction="column" mx="auto" my="auto">
                <Center>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              </Flex>

            )}
            {NosQuery.isSuccess && (
              <>
                <Flex flexDirection="row" align="center" justify="center" w="100%">
                  <Stat me="auto">
                    <StatLabel
                      fontSize="md"
                      color="gray.400"
                      fontWeight="bold"
                      mb="1rem"
                    >
                      Customers
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize="2xl" fontWeight="normal" color="white">
                        {counts?.customers}
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="2px"
                        color="#F5AB00"
                        fontWeight="bold"
                        ps="3px"
                        fontSize="md"
                      >
                        in total
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <Avatar
                    src={customer}
                    w="50px"
                    h="50px"
                  />
                </Flex>
              </>


            )}

          </CardBody>
        </Card>
        <Card minH="150px">
          <CardBody>
            {NosQuery.isLoading && (
              <Flex direction="column" mx="auto" my="auto">
                <Center>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              </Flex>

            )}
            {NosQuery.isSuccess && (
              <>
                <Flex flexDirection="row" align="center" justify="center" w="100%">
                  <Stat me="auto">
                    <StatLabel
                      fontSize="md"
                      color="gray.400"
                      fontWeight="bold"
                      mb="1rem"
                    >
                      Employees
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize="2xl" fontWeight="normal" color="white">
                        {counts?.employees}
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="2px"
                        color="#4285F4"
                        fontWeight="bold"
                        ps="3px"
                        fontSize="md"
                      >
                        in total
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <Avatar
                    src={employees}
                    w="50px"
                    h="50px"
                  />
                </Flex>
              </>


            )}

          </CardBody>
        </Card>
        <Card minH="150px">
          <CardBody>
            {NosQuery.isLoading && (
              <Flex direction="column" mx="auto" my="auto">
                <Center>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              </Flex>

            )}
            {NosQuery.isSuccess && (
              <>
                <Flex flexDirection="row" align="center" justify="center" w="100%">
                  <Stat me="auto">
                    <StatLabel
                      fontSize="md"
                      color="gray.400"
                      fontWeight="bold"
                      mb="1rem"
                    >
                      Items(by Name)
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize="2xl" fontWeight="normal" color="white">
                        {counts?.items}
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="2px"
                        color="#FEB019"
                        fontWeight="bold"
                        ps="3px"
                        fontSize="md"
                      >
                        in total
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <Avatar
                    src={items}
                    w="50px"
                    h="50px"
                  />
                </Flex>
              </>


            )}

          </CardBody>
        </Card>
        <Card minH="150px">
          <CardBody>
            {NosQuery.isLoading && (
              <Flex direction="column" mx="auto" my="auto">
                <Center>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              </Flex>

            )}
            {NosQuery.isSuccess && (
              <>
                <Flex flexDirection="row" align="center" justify="center" w="100%">
                  <Stat me="auto">
                    <StatLabel
                      fontSize="md"
                      color="gray.400"
                      fontWeight="bold"
                      mb="1rem"
                    >
                      Sales
                    </StatLabel>
                    <Flex>
                      <StatNumber fontSize="2xl" fontWeight="normal" color="white">
                        {counts?.sales}
                      </StatNumber>
                      <StatHelpText
                        alignSelf="flex-end"
                        justifySelf="flex-end"
                        m="2px"
                        color="#FF6464"
                        fontWeight="bold"
                        ps="3px"
                        fontSize="md"
                      >
                        in total
                      </StatHelpText>
                    </Flex>
                  </Stat>
                  <Avatar
                    src={sale}
                    w="50px"
                    h="50px"
                  />
                </Flex>
              </>


            )}

          </CardBody>
        </Card>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        my="26px"
        mb={{ lg: "26px" }}
      >
        <Card p="16px">
          <CardBody>
            {categoryNosQuery.isLoading && (
              <>
                <Flex flexDirection="row" align="center" justify="center" w="100%">
                  <Center my="auto">
                    <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='xl'
                    />
                  </Center >
                </Flex>
              </>


            )}
            {categoryNosQuery.isSuccess && (
              <>
                <Flex direction="column" w="100%">
                  <div id="chart">
                    <ReactApexChart options={donutChartOptions} series={categories} type="donut" />
                  </div>
                  <Flex
                    direction="column"
                    mt="24px"
                    mb="24px"
                    alignSelf="flex-start"
                  >
                    <Text
                      fontSize="lg"
                      color={'white'}
                      fontWeight="bold"
                      mb="6px"
                    >
                      Category Distribution
                    </Text>
                    <Text fontSize="md" fontWeight="medium" color="gray.400">
                      <Text as="span" color="#4181EC" fontWeight="bold">
                        (Top 5)
                      </Text>{" "}
                      and others
                    </Text>
                  </Flex>
                  <Flex flexDirection="row" align="center" justify="center" w="100%">
                    <Flex>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        mr="5%"

                        onClick={() => {
                          window.scrollTo(0, 0);
                          history.push('/admin/add-Purchases');
                        }}
                      >
                        Add Items
                      </Button>
                      <Button
                        bgColor="#1E8449"
                        color="white"
                        size="sm"
                        onClick={() => { history.push('/admin/list-Purchases'); }}
                      >
                        List Items
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
          </CardBody>
        </Card>
        <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
          {dailyReportQuery.isLoading && (
            <>
              <Flex flexDirection="row" align="center" justify="center" w="100%">
                <Center my="auto">
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center >
              </Flex>
            </>


          )}

          {dailyReportQuery.isSuccess && (
            <>
              <CardHeader mb="20px" pl="22px">
                <Flex w="100%" direction="column" alignSelf="flex-start">
                  <Text fontSize="lg" color="white" fontWeight="bold" mb="6px">
                    Sales in the Last 14 Days
                  </Text>

                  <Flex alignItems='center'>
                    <Text color="#4181EC" fontWeight="bold">
                      Most recent 10
                    </Text>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      ml="2%"

                      onClick={() => {
                        window.scrollTo(0, 0);
                        history.push('/admin/daily-reports');
                      }}
                    >
                      Daily Report
                    </Button>

                  </Flex>

                </Flex>
              </CardHeader>
              <Box w="100%" h={{ sm: "300px" }} ps="8px">
                <ReactApexChart options={lineOptions} series={totals} type="area" height={350} />

              </Box>

            </>
          )}
        </Card>
      </Grid>
      <SimpleGrid columns={{ sm: 1, xl: 3 }} spacing="24px" mb="26px">
        <Card color="white" height="200px" bgColor={NosQuery.isSuccess ? "#FF6464" : ""}>
          <CardBody>
            {NosQuery.isLoading && (
              <Flex direction="column" mx="auto" my="auto">
                <Center>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              </Flex>

            )}
            {NosQuery.isSuccess && (
              <Stack spacing='2'>
                <Box>
                  <FaShoppingCart size={40} color="#fff" />

                  <Text pt='2' fontSize='md'>
                    Highest Sale(last 14 days)
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='lg' fontWeight='bold'>
                    <Text
                      as='span'
                      fontSize='lg'
                      fontWeight='medium'>
                      Total Amount{" "}
                    </Text>
                    (NGN{counts?.highest_sale?.sub_total})
                  </Text>
                </Box>
                <Box>
                  <Text pt='2' fontSize='md' as='i'>
                    - {counts?.highest_sale?.sales_id}
                  </Text>
                </Box>
              </Stack>
            )}
          </CardBody>
        </Card>
        <Card color="white" height="200px" bgColor={NosQuery.isSuccess ? "#4285F4" : ""}>
          <CardBody>
            {NosQuery.isLoading && (
              <Flex direction="column" mx="auto" my="auto">
                <Center>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              </Flex>

            )}
            {NosQuery.isSuccess && (
              <Stack spacing='2'>
                <Box>
                  <RiCustomerService2Fill size={40} color="#fff" />

                  <Text pt='2' fontSize='md'>
                    Top Employee (last 14 days)
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='lg' fontWeight='bold'>
                    <Text
                      as='span'
                      fontSize='lg'
                      fontWeight='medium'>
                      Total Sales{" "}
                    </Text>
                    (NGN{counts?.highest_employee?.total_amount})
                  </Text>
                </Box>
                <Box>
                  <Text pt='2' fontSize='md' as='i'>
                    - {counts?.highest_employee?.employees_name}
                  </Text>
                </Box>
              </Stack>
            )}
          </CardBody>
        </Card>
        <Card color="white" height="200px" bgColor={NosQuery.isSuccess ? "#F5AB00" : ""}>
          <CardBody>
            {NosQuery.isLoading && (
              <Flex direction="column" mx="auto" my="auto">
                <Center>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center>
              </Flex>

            )}
            {NosQuery.isSuccess && (
              <Stack spacing='2'>
                <Box>
                  <FaUserTag size={40} color="#fff" />

                  <Text pt='2' fontSize='md'>
                    Top Customer (last 14 days)
                  </Text>
                </Box>
                <Box>
                  <Text fontSize='lg' fontWeight='bold'>
                    <Text
                      as='span'
                      fontSize='lg'
                      fontWeight='medium'>
                      Total Purchase{" "}
                    </Text>
                    (NGN{counts?.highest_customer?.total_amount})
                  </Text>
                </Box>
                <Box>
                  <Text pt='2' fontSize='md' as='i'>
                    - {counts?.highest_customer?.customers_name}
                  </Text>
                </Box>
              </Stack>
            )}
          </CardBody>
        </Card>


      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap='24px'>
        <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
          {salesReportQuery.isLoading && (
            <>
              <Flex flexDirection="row" align="center" justify="center" w="100%">
                <Center my="auto">
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Center >
              </Flex>
            </>


          )}

          {salesReportQuery.isSuccess && (
            <>
              <CardHeader p='12px 0px 28px 0px'>
                <Flex direction='column' w="100%">
                  <Text fontSize='lg' color="white" fontWeight='bold' pb='.5rem'>
                    Sales Record
                  </Text>
                  <Flex align='center'>
                    <Icon
                      as={IoCheckmarkDoneCircleSharp}
                      color='#4285F4'
                      w={4}
                      h={4}
                      pe='3px'
                    />
                    <Text fontSize='sm' color='gray.400' fontWeight='bold'>
                      All Sales (Today).
                    </Text>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      ml="2%"

                      onClick={() => {
                        window.scrollTo(0, 0);
                        history.push('/admin/filter-items');
                      }}
                    >
                      Sales Report
                    </Button>
                  </Flex>
                </Flex>
              </CardHeader>
              <Table variant='unstyled'>
                <Thead>
                  <Tr my='.8rem' ps='0px'>
                    <Th color='gray.400' ps="0px">
                      Date
                    </Th>
                    <Th color='gray.400'>
                      Employee
                    </Th>
                    <Th color='gray.400'>
                      Sold To
                    </Th>
                    <Th color='gray.400' textAlign="right">
                      Total
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sales.map((row, index) => {
                    const jsDate = new Date(row.date);
                    const options = { year: 'numeric', month: 'short', day: '2-digit' };
                    const formattedDate = jsDate.toLocaleDateString('en-US', options);

                    return (
                      <DashboardTableRow
                        key={index}
                        Date={formattedDate}
                        employee_name={row.employee_name}
                        customer_name={row.customer_name}
                        sub_total={row.sub_total}
                      />
                    );
                  })}
                </Tbody>
              </Table>

            </>
          )}

        </Card>
        <Card maxH='100%'>
          {NosQuery.isLoading && (
            <Flex direction="column" mx="auto" my="auto">
              <Center>
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                />
              </Center>
            </Flex>

          )}
          {NosQuery.isSuccess && (
            <>
              <CardHeader p='22px 0px 35px 14px'>
                <Flex direction='column'>
                  <Text fontSize='lg' color='white' fontWeight='bold' pb='.5rem'>
                    Notifications
                  </Text>
                  <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                    <Text fontWeight='bold' as='span' color='blue.500'>
                      Info
                    </Text>{" "}
                    this month.
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody ps='20px' pe='0px' mb='31px' position='relative'>
                <Flex direction='column'>
                  <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
                    <Flex direction="column" h="100%">
                      <Icon
                        as={GiWashingMachine}
                        bg="none"
                        color="#FF6464"
                        h={"30px"}
                        w={"26px"}
                        pe="6px"
                        zIndex="1"
                        position="relative"
                        //right={document.documentElement.dir === "rtl" ? "-8px" : ""}
                        left="-8px"
                      />
                      <Box
                        w="2px"
                        bg="gray.200"
                        h="100%"
                      ></Box>
                    </Flex>
                    <Flex direction="column" justifyContent="flex-start" h="100%">
                      <Text fontSize="sm" color="white" fontWeight="bold">
                        {counts?.items_less_than_one } inventories (less than 1 entry)
                      </Text>
                      <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        consider updating inventory
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
                    <Flex direction="column" h="100%">
                      <Icon
                        as={GiWashingMachine}
                        bg="none"
                        color="#1E8449"
                        h={"30px"}
                        w={"26px"}
                        pe="6px"
                        zIndex="1"
                        position="relative"
                        //right={document.documentElement.dir === "rtl" ? "-8px" : ""}
                        left="-8px"
                      />
                      <Box
                        w="2px"
                        bg="gray.200"
                        h="100%"
                      ></Box>
                    </Flex>
                    <Flex direction="column" justifyContent="flex-start" h="100%">
                      <Text fontSize="sm" color="white" fontWeight="bold">
                      {counts?.items_greater_than_ten } inventories (10 or more entries)
                      </Text>
                      <Text fontSize="sm" color="gray.400" fontWeight="normal">
                      no action 
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
                    <Flex direction="column" h="100%">
                      <Icon
                        as={FaUsers}
                        bg="none"
                        color="#F5AB00"
                        h={"30px"}
                        w={"26px"}
                        pe="6px"
                        zIndex="1"
                        position="relative"
                        //right={document.documentElement.dir === "rtl" ? "-8px" : ""}
                        left="-8px"
                      />
                      <Box
                        w="2px"
                        bg="gray.200"
                        h="100%"
                      ></Box>
                    </Flex>
                    <Flex direction="column" justifyContent="flex-start" h="100%">
                      <Text fontSize="sm" color="white" fontWeight="bold">
                        {counts?.customers_without_purchase} customer(s) have 0 purchases
                      </Text>
                      <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        consider deletion of records
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" minH="78px" justifyContent="start" mb="5px">
                    <Flex direction="column" h="100%">
                      <Icon
                        as={RiCustomerService2Fill}
                        bg="none"
                        color="#3498DB"
                        h={"30px"}
                        w={"26px"}
                        pe="6px"
                        zIndex="1"
                        position="relative"
                        //right={document.documentElement.dir === "rtl" ? "-8px" : ""}
                        left="-8px"
                      />
                      <Box
                        w="2px"
                        bg="gray.200"
                        h="15px"
                      ></Box>
                    </Flex>
                    <Flex direction="column" justifyContent="flex-start" h="100%">
                      <Text fontSize="sm" color="white" fontWeight="bold">
                        {counts?.employees_without_sale} employee(s) (have 0 sales)
                      </Text>
                      <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        consider reassigning roles
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </CardBody>
            </>
          )}
        </Card>
      </Grid>
    </Flex>
  );

}