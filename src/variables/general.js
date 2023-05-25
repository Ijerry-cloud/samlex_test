// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar7 from "assets/img/avatars/avatar7.png";
import avatar8 from "assets/img/avatars/avatar8.png";
import avatar9 from "assets/img/avatars/avatar9.png";
import avatar10 from "assets/img/avatars/avatar10.png";
// Custom icons
import {
  AdobexdLogo,
  AtlassianLogo,
  InvisionLogo,
  JiraLogo,
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons.js";
import { BsClock, BsTelephoneInboundFill } from 'react-icons/bs';
import { MdOutlineMobiledataOff, MdAccountBox } from 'react-icons/md';
import { AiOutlineExclamation } from "react-icons/ai";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";
import { SiDropbox } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { TbCurrencyNaira } from "react-icons/tb";

export const dashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "Purity UI Version",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    members: [avatar10, avatar4],
    budget: "Not set",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "Redesign New Online Shop",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const dashboardTableData2 = [
  {
    name: "Ahmad",
    AirtelVTU: "12",
    GloVTU: "43",
    MtnVTU: "65",
    EtisalatVTU: "3",
    ToSameAccount: "99",
    Total: "100"
  },
  {
    name: "Veron",
    AirtelVTU: "11",
    GloVTU: "23",
    MtnVTU: "43",
    EtisalatVTU: "9",
    ToSameAccount: "5",
    Total: "98"
  },
  {
    name: "Mark",
    AirtelVTU: "13",
    GloVTU: "32",
    MtnVTU: "32",
    EtisalatVTU: "14",
    ToSameAccount: "97",
    Total: "97"
  },
  {
    name: "Allan",
    AirtelVTU: "12",
    GloVTU: "14",
    MtnVTU: "54",
    EtisalatVTU: "2",
    ToSameAccount: "3",
    Total: "82"
  },
  {
    name: "Festus",
    AirtelVTU: "22",
    GloVTU: "14",
    MtnVTU: "21",
    EtisalatVTU: "9",
    ToSameAccount: "5",
    Total: "83"
  },
  
];

export const dashboardTableData3 = [
  {
    Merchant_ID: "3464325",
    Daily_Limit: "12",
    Single_limit: "43",
    Duplicate_txn: "65",
    Above_bal: "3",
    Total: "100"
  },
  {
    Merchant_ID: "6532676",
    Daily_Limit: "11",
    Single_limit: "23",
    Duplicate_txn: "43",
    Above_bal: "9",
    Total: "98"
  },
  {
    Merchant_ID: "6326855",
    Daily_Limit: "13",
    Single_limit: "32",
    Duplicate_txn: "32",
    Above_bal: "14",
    Total: "97"
  },
  {
    Merchant_ID: "9753557",
    Daily_Limit: "12",
    Single_limit: "14",
    Duplicate_txn: "54",
    Above_bal: "2",
    Total: "82"
  },
  {
    Merchant_ID: "4327443",
    Daily_Limit: "22",
    Single_limit: "14",
    Duplicate_txn: "21",
    Above_bal: "9",
    Total: "83"
  },
  
];

export const dashboardTableData4 = [
  {
    Merchant_ID: "3464325",
    Max_Limit: "12",
    Charge_back: "43",
    Above_Limit: "65",
    Total: "10,000,780"
  },
  {
    Merchant_ID: "6532676",
    Max_Limit: "11",
    Charge_back: "23",
    Above_Limit: "43",
    Total: "980,000"
  },
  {
    Merchant_ID: "6326855",
    Max_Limit: "13",
    Charge_back: "32",
    Above_Limit: "32",
    Total: "970,450"
  },
  {
    Merchant_ID: "9753557",
    Max_Limit: "12",
    Charge_back: "14",
    Above_Limit: "54",
    Total: "820,980"
  },
  {
    Merchant_ID: "4327443",
    Max_Limit: "22",
    Charge_back: "14",
    Above_Limit: "21",
    Total: "810,000"
  },
  
];

export const suspectedAirtimeData = [
  {
    logo: MdOutlineMobiledataOff,
    title:'35 customers attempted one or more violating transfers today',
    date:'',
    color:'red'
  },
  {
    logo: BsClock,
    title:'Most transactions violations occured between 8:00am and 11:59am (102 total)',
    date:'',
    color:'red'
  },
  {
    logo: TbCurrencyNaira,
    title:'NGN300,000 was biggest single transaction violation attempt (Recorded on AirtelVTU) ',
    date:'',
    color:'red'
  },
  {
    logo: SlCalender,
    title:'Todays transaction violation recorded is the 5th most this month (1st was on 3rd Jan.)',
    date:'',
    color:'red'
  },
  {
    logo: BsTelephoneInboundFill,
    title:'+234 903 323 3211 recieved the most violation attempts from 4 different IDS (4 total attempts)',
    date:'',
    color:'red'
  },
];

export const suspectedTransfer = [
  {
    logo: MdOutlineMobiledataOff,
    title:'64 customers attempted one or more violating transfers today',
    date:'',
    color:'red'
  },
  {
    logo: BsClock,
    title:'Most transactions violations occured between 8:00am and 11:59am (102 total)',
    date:'',
    color:'red'
  },
  {
    logo: TbCurrencyNaira,
    title:'Merchant_ID had the single highest transfer violation(in Naira) at 3:47pm today (NGN 745,000) ',
    date:'',
    color:'red'
  },
  {
    logo: BsClock,
    title:'Failed transfers exceeded succesful transfers between 4:00am and 7:59am today',
    date:'',
    color:'red'
  },
  {
    logo: MdAccountBox,
    title:'3092093090(first bank) recieved the most violation attempts from 4 different IDS (0 total attempts)',
    date:'',
    color:'red'
  },
];

export const suspectedData = [
  {
    logo: BsClock,
    title: '35 Suspected transaction from 9 AM - 12 AM',
    date: ''
  },
  {
    logo: BsClock,
    title: '92 Suspected transaction from 12 PM - 3 PM',
    date: ''
  },
  {
    logo: BsClock,
    title: '435 Suspected transaction from 3 PM - 8 PM',
    date: ''
  },
  {
    logo: BsClock,
    title: '45 Suspected transaction from 8 PM - 12 PM',
    date: ''
  }
]

export const timelineData = [
  {
    logo: FaBell,
    title: "$2400, Design changes",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
  {
    logo: FaHtml5,
    title: "New order #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "Server Payments for April",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "New card added for order #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "Unlock packages for Development",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "New order #9851258",
    date: "18 DEC 4:41 PM",
  },
];
export const rtlDashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "نسخة Purity UI",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "إضافة مسار التقدم",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "إصلاح أخطاء النظام الأساسي",
    members: [avatar10, avatar4],
    budget: "غير مضبوط",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "إطلاق تطبيق الهاتف المحمول الخاص بنا",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "أضف صفحة التسعير الجديدة",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "إعادة تصميم متجر جديد على الإنترنت",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const rtlTimelineData = [
  {
    logo: FaBell,
    title: "$2400, تغييرات في التصميم",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
  {
    logo: FaHtml5,
    title: "طلب جديد #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "مدفوعات الخادم لشهر أبريل",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "تمت إضافة بطاقة جديدة للطلب #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "فتح الحزم من أجل التنمية",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "طلب جديد #9851258",
    date: "18 DEC 4:41 PM",
  },
];

export const tablesTableData = [
  {
    logo: avatar1,
    name: "Esthera Jackson",
    email: "alexa@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/06/21",
  },
  {
    logo: avatar2,
    name: "Alexa Liras",
    email: "laurent@simmmple.com",
    subdomain: "Programmer",
    domain: "Developer",
    status: "Offline",
    date: "12/05/21",
  },
  {
    logo: avatar3,
    name: "Laurent Michael",
    email: "laurent@simmmple.com",
    subdomain: "Executive",
    domain: "Projects",
    status: "Online",
    date: "07/06/21",
  },
  {
    logo: avatar4,
    name: "Freduardo Hill",
    email: "freduardo@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/11/21",
  },
  {
    logo: avatar5,
    name: "Daniel Thomas",
    email: "daniel@simmmple.com",
    subdomain: "Programmer",
    domain: "Developer",
    status: "Offline",
    date: "21/01/21",
  },
  {
    logo: avatar7,
    name: "Mark Wilson",
    email: "mark@simmmple.com",
    subdomain: "Designer",
    domain: "UI/UX Design",
    status: "Offline",
    date: "04/09/20",
  },
];

export const tablesProjectData = [
  {
    logo: AdobexdLogo,
    name: "Purity UI Version",
    budget: "$14,000",
    status: "Working",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    budget: "$3,000",
    status: "Canceled",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    budget: "Not set",
    status: "Done",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    budget: "$32,000",
    status: "Done",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    budget: "$400",
    status: "Working",
    progression: 25,
  },
];

export const invoicesData = [
  {
    date: "March, 01, 2020",
    code: "#MS-415646",
    price: "$180",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "February, 10, 2020",
    code: "#RV-126749",
    price: "$250",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "April, 05, 2020",
    code: "#FB-212562",
    price: "$560",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "June, 25, 2019",
    code: "#QW-103578",
    price: "$120",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "March, 01, 2019",
    code: "#AR-803481",
    price: "$300",
    logo: FaFilePdf,
    format: "PDF",
  },
];

export const billingData = [
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    number: "FRB1235476",
  },
  {
    name: "Lucas Harper",
    company: "Stone Tech Zone",
    email: "lucas@stone-tech.com",
    number: "FRB1235476",
  },
  {
    name: "Ethan James",
    company: "Fiber Notion",
    email: "ethan@fiber.com",
    number: "FRB1235476",
  },
];

export const newestTransactions = [
  {
    name: "Netflix",
    date: "27 March 2021, at 12:30 PM",
    price: "- $2,500",
    logo: FaArrowDown,
  },
  {
    name: "Apple",
    date: "27 March 2021, at 12:30 PM",
    price: "+ $2,500",
    logo: FaArrowUp,
  },
];

export const olderTransactions = [
  {
    name: "Stripe",
    date: "26 March 2021, at 13:45 PM",
    price: "+ $800",
    logo: FaArrowUp,
  },
  {
    name: "HubSpot",
    date: "26 March 2021, at 12:30 PM",
    price: "+ $1,700",
    logo: FaArrowUp,
  },
  {
    name: "Webflow",
    date: "26 March 2021, at 05:00 PM",
    price: "Pending",
    logo: AiOutlineExclamation,
  },
  {
    name: "Microsoft",
    date: "25 March 2021, at 16:30 PM",
    price: "- $987",
    logo: FaArrowDown,
  },
];
