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

import { MdOutlineSummarize, MdAddCircle, MdViewList, MdFilterList, MdPersonAdd, MdDashboardCustomize} from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoIosCalendar } from 'react-icons/io';
import { FaTruck, FaCalendarCheck, FaUsers } from "react-icons/fa";
import { GiArchiveResearch } from 'react-icons/gi';
import UserMgt from "views/Management/UserMgt";
import EmployeeMgt from "views/Management/EmployeeMgt";
import StoreConfig from "views/Management/StoreConfig";
import Settings from "views/Management/Settings";
import { List } from "@chakra-ui/react";

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
    icon_color: "#FF6B6B",
    component: ListCustomers,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    icon: <FaTruck color="inherit" />,
    icon_color: "#FFA500",
    component: ListSuppliers,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    name: "Sales",
    category: "sales",
    collapse: true,
    state: "pageCollapse",
    isProtected: true,
    isVisible: true,
    views: [
      {
        path: "/add-item",
        name: "Add Sales",
        icon: <MdAddCircle color="inherit" />,
        icon_color: "#3498DB",
        component: AddItem,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/list-items",
        name: "View Transactions",
        icon: <MdViewList color="inherit" />,
        icon_color: "#1E8449",
        component: ListItems,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/filter-items",
        name: "Filter Transactions",
        icon: <MdFilterList color="inherit" />,
        icon_color: "#FFD700",
        component: FilterItems,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
    ],
  },
  {
    name: "Purchases",
    category: "purchases",
    collapse: true,
    state: "pageCollapse",
    isProtected: true,
    isVisible: true,
    views: [
      {
        path: "/add-Purchases",
        name: "Add Purchases",
        icon: <MdAddCircle color="inherit" />,
        icon_color: "#3498DB",
        component: AddPurchases,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/list-Purchases",
        name: "List Purchases",
        icon: <MdViewList color="inherit" />,
        icon_color: "#1E8449",
        component: ListPurchases,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/filter-Purchases",
        name: "Filter Purchases",
        icon: <MdFilterList color="inherit" />,
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
    views: [
      {
        path: "/daily-reports",
        name: "Daily Report",
        icon: <FaCalendarCheck color="inherit" />,
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
        name: "Items Summary",
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
        icon: <AiOutlineUsergroupAdd color="inherit" />,
        icon_color: "#3498DB",
        component: EmployeeSummary,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <MdOutlineSummarize color="inherit" />,
    component: Settings,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    path: "/userMgt",
    name: "User Management",
    icon: <MdOutlineSummarize color="inherit" />,
    component: UserMgt,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    path: "/EmployeeMgt",
    name: "Employee Management",
    icon: <MdOutlineSummarize color="inherit" />,
    component: EmployeeMgt,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    path: "/StoreConfig",
    name: "Store Config",
    icon: <MdOutlineSummarize color="inherit" />,
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
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
        isProtected: true,
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        secondaryNavbar: false,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: false,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];

export default dashRoutes;
