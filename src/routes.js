// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import AddItem from "views/Pages/Sales/AddItem.js";
import FilterItems from "views/Pages/Sales/FilterItems.js";
import ListItems from "views/Dashboard/ListItemsPage";
import ListCustomers from "views/Dashboard/ListCustomers";
import ListSuppliers from "views/Dashboard/ListSuppliers";
import AddPurchases from "views/Pages/Purchases/AddPurchases.js";
import ListPurchases from "views/Pages/Purchases/ListPurchases.js";
import FilterPurchases from "views/Pages/Purchases/FilterPurchases.js";
import DailyReports from "views/Pages/Reports/DailyReports.js";
import CustomerSummary from "views/Pages/Reports/CustomerSummary.js";
import ItemSummary from "views/Pages/Reports/ItemSummary.js";
import EmployeeSummary from "views/Pages/Reports/EmployeeSummary.js";



import {
  HomeIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

import { MdOutlineSummarize, MdAddCircle, MdViewList, MdFilterList, MdPersonAdd, MdDashboardCustomize, MdAssignmentAdd} from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsFillHouseAddFill } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FcDataConfiguration } from "react-icons/fc";
import { IoIosCalendar } from 'react-icons/io';
import { FaTruck, FaCalendarCheck, FaCalendarAlt, FaUsers, FaFileInvoice, FaLayerGroup, FaEdit } from "react-icons/fa";
import { GiArchiveResearch } from 'react-icons/gi';
import UserMgt from "views/Management/UserMgt";
import EmployeeMgt from "views/Management/EmployeeMgt";
import StoreConfig from "views/Management/StoreConfig";
import Settings from "views/Management/Settings";
import { List } from "@chakra-ui/react";
import { getAuthUser } from "modules/auth/redux/authSelector";
import { useSelector } from 'react-redux';



var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdDashboardCustomize color="inherit" />,
    icon_color: "#0074E4",
    component: Dashboard,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/customers",
    name: "Customers",
    icon: <FaUsers color="inherit" />,
    icon_color: "#F5AB00",
    component: ListCustomers,
    layout: "/admin",
    isProtected: true,
    isVisible: true,
    permission: "customer_perm"
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    icon: <FaTruck color="inherit" />,
    icon_color: "green",
    component: ListSuppliers,
    layout: "/admin",
    isProtected: true,
    isVisible: true,
    permission: "suppliers_perm"
  },
  {
    name: "Sales",
    category: "sales",
    collapse: true,
    state: "pageCollapse",
    isProtected: true,
    isVisible: true,
    permission: "sales_perm",
    views: [
      {
        path: "/add-item",
        name: "Add Sales",
        icon: <MdAssignmentAdd color="inherit" />,
        icon_color: "#FF6464",
        component: AddItem,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/list-items",
        name: "My Sales",
        icon: <MdViewList color="inherit" />,
        icon_color: "#1E8449",
        component: ListItems,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
    ],
  },
  {
    name: "Items",
    category: "purchases",
    collapse: true,
    state: "pageCollapse",
    isProtected: true,
    isVisible: true,
    permission: "items_perm",
    views: [
      {
        path: "/add-Purchases",
        name: "Add Item",
        icon: <BsFillHouseAddFill color="inherit" />,
        icon_color: "#3498DB",
        component: AddPurchases,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/list-Purchases",
        name: "List Items",
        icon: <FaLayerGroup color="inherit" />,
        icon_color: "#1E8449",
        component: ListPurchases,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/filter-Purchases",
        name: "Edit Items",
        icon: <FaEdit color="inherit" />,
        icon_color: "#FFD700",
        component: FilterPurchases,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
    ],
  },
  {
    name: "Reports",
    category: "purchases",
    collapse: true,
    state: "pageCollapse",
    isProtected: true,
    isVisible: true,
    permission: "reports_perm",
    views: [
      {
        path: "/filter-items",
        name: "Sales Report",
        icon: <FaFileInvoice color="inherit" />,
        icon_color: "#FFD700",
        component: FilterItems,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/daily-reports",
        name: "Daily Report",
        icon: <FaCalendarAlt color="inherit" />,
        icon_color: "#8E44AD",
        component: DailyReports,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/customer-reports",
        name: "Customers Summary",
        icon: <FaUsers color="inherit" />,
        icon_color: "#27AE60",
        component: CustomerSummary,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/item-reports-summary",
        name: "Items Inventory",
        icon: <GiArchiveResearch color="inherit" />,
        icon_color: "#F39C12",
        component: ItemSummary,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/employee-reports-summary",
        name: "Employee Summary",
        icon: <RiCustomerService2Fill color="inherit" />,
        icon_color: "#3498DB",
        component: EmployeeSummary,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      
    ],
  },
  {
    path: "/EmployeeMgt",
    name: "Employee Management",
    icon: <RiCustomerService2Fill color="inherit" />,
    icon_color: "#F39C12",
    component: EmployeeMgt,
    layout: "/admin",
    isProtected: true,
    isVisible: false,
    permission: "employees_perm",
  },
  {
    path: "/StoreConfig",
    name: "Store Config",
    icon: <FcDataConfiguration color="inherit" />,
    icon_color: "#FFD700",
    component: StoreConfig,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        icon_color: "green",
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
        isProtected: true,
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color="inherit" />,
        icon_color: "#F5AB00",
        component: SignIn,
        secondaryNavbar: false,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color="inherit" />,
        icon_color: "#F39C12",
        secondaryNavbar: false,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];

export default dashRoutes;
