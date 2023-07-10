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
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons.js";
import {AiTwotoneAccountBook} from "react-icons/ai";
import {RiAdminLine, RiStackLine} from "react-icons/ri";
import {MdPointOfSale} from "react-icons/md";
import {FaCalendarAlt,   
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,} from 'react-icons/fa';
import {GiCookingPot, GiManualMeatGrinder} from 'react-icons/gi';
import { TbCurrencyNaira, TbCloudComputing } from "react-icons/tb";

export const SalesOverviewData = [
    {
        logo: FaCalendarAlt,
        title: 'Highest Sales (Amount) was recorded on the 11th (Total of NGN 345,000)',
        date: '',
        color: 'blue'
      },
      {
        logo: GiCookingPot,
        title: '55 Units of Scanfrost Gascooker were sold on the 9th',
        date: '',
        color: 'red'
      },
      {
        logo: FaCalendarAlt,
        title: 'Lowest Sales (Amount) was recorded on the 25th',
        date: '',
        color: 'teal'
      },
      {
        logo: GiManualMeatGrinder,
        title: 'LG blenders are the most sold items this month (43 units)',
        date: '',
        color: 'orange'
      },
      {
        logo: TbCurrencyNaira,
        title: 'Current net profit realised is NGN 3,000,000',
        date: '',
        color: 'yellow'
      },      
];

export const dashboardTableData = [
  {
    logo: MdPointOfSale,
    name: "Sales Department",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "54",
    progression: 60,
  },
  {
    logo: AiTwotoneAccountBook,
    name: "Accounts and records",
    members: [avatar3, avatar2],
    budget: "5",
    progression: 3,
  },
  {
    logo: RiAdminLine,
    name: "Administration",
    members: [avatar10, avatar4],
    budget: "1",
    progression: 2,
  },
  {
    logo: TbCloudComputing,
    name: "ICT and Hardware",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "4",
    progression: 34,
  },
];

export const dashboardTableData2 = [
  {
    logo: RiStackLine,
    name: "Ebuka Pilolo",
    quantity: "54",
    date: "29th March 2023"
  },
  {
    logo: RiStackLine,
    name: "Jerry Ihediwa",
    quantity: "5",
    date: "29th June 2023"
  },
  {
    logo: RiStackLine,
    name: "Aloysius Emeka",
    quantity: "1",
    date: "2nd April 2022"
  },
  {
    logo: RiStackLine,
    name: "Kamzy Otito",
    quantity: "4",
    date: "20th February 2023"
  },
];

export const timelineData = [
  {
    logo: FaBell,
    title: "40 new notifications",
    date: "22 DEC 7:20 PM",
    color: "#5A8100",
  },
  {
    logo: FaShoppingCart,
    title: "444 sales in total",
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
    logo: AdobexdLogo,
    title: "1 additional admin",
    date: "18 DEC 4:41 PM",
  },
];
