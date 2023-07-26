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
import ListPurchases from "views/Dashboard/ListPurchases.js";
import FilterPurchases from "views/Pages/Purchases/FilterPurchases.js";


import {
  HomeIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

import { MdOutlineSummarize, MdAddCircle, MdViewList, MdFilterList, MdPersonAdd} from "react-icons/md";
import UserMgt from "views/Management/UserMgt";
import Settings from "views/Management/Settings";
import { List } from "@chakra-ui/react";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/customers",
    name: "Customers",
    icon: <HomeIcon color="inherit" />,
    component: ListCustomers,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    icon: <HomeIcon color="inherit" />,
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
        component: AddItem,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/list-items",
        name: "View Transactions",
        icon: <MdViewList color="inherit" />,
        component: ListItems,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/filter-items",
        name: "Filter Transactions",
        icon: <MdFilterList color="inherit" />,
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
        component: AddPurchases,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/list-Purchases",
        name: "List Purchases",
        icon: <MdViewList color="inherit" />,
        component: ListPurchases,
        layout: "/admin",
        isProtected: true,
        isVisible: true,
      },
      {
        path: "/filter-Purchases",
        name: "Filter Purchases",
        icon: <MdFilterList color="inherit" />,
        component: FilterPurchases,
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
