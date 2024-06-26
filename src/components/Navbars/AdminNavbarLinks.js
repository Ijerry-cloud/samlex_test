// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { MdOutlineLogout, MdPeopleAlt } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GrConfigure } from "react-icons/gr";
import { FcDataConfiguration } from "react-icons/fc";
// Custom Components
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "modules/auth/redux/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import routes from "routes.js";
import { ItemContent } from "components/Menu/ItemContent";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar7 from "assets/img/avatars/male1.jpg";
import avatar8 from "assets/img/avatars/female1.jpg";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, authUser, ...rest } = props;
  const history = useHistory();


  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");
  const dispatch = useDispatch();

  const moveToSettings = () => {
    history.push('/admin/settings');
  }

  const moveToUserMgt = () => {
    history.push('/admin/userMgt');
  }

  const moveToEmployeeMgt = () => {
    history.push('/admin/EmployeeMgt');
  }

  const moveToStoreConfig = () => {
    history.push('/admin/StoreConfig');
  }

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {/* <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup> */}
      <NavLink to="/admin/profile">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          //leftIcon={<ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />}
        >
          <Avatar
          src={authUser?.user?.gender == "female" ? avatar8 : avatar7}
          w="40px"
          h="40px"
          me="10px"
        />
          <Text display={{ sm: "none", md: "flex" }}>{`Hi, ${authUser?.user?.email}`}</Text>
        </Button>
      </NavLink>
      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <Menu >
        <MenuButton>
          <SettingsIcon
            cursor="pointer"
            ms={{ base: "16px", xl: "0px" }}
            me="16px"
            ref={settingsRef}
            onClick={props.onOpen}
            color={navbarIcon}
            w="18px"
            h="18px"
          />
        </MenuButton>
        <MenuList p="16px 8px" bgColor="#2a2c40" borderColor="gray.900" boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px" color={navbarIcon}>
          <Flex flexDirection="column">
            {authUser?.user?.employees_perm &&
              <MenuItem borderRadius="8px" mb="10px" onClick={moveToEmployeeMgt} _hover={{ bg: 'gray.700' }} _focus={{ bg: 'gray.700' }}>
                <RiCustomerService2Fill me="2px" /> <Text>Employee Management</Text>
              </MenuItem>}

            {authUser?.user?.dept === "admin" &&
              <MenuItem borderRadius="8px" mb="10px" onClick={moveToStoreConfig} _hover={{ bg: 'gray.700' }} _focus={{ bg: 'gray.700' }}>
                <FcDataConfiguration me="2px" /> <Text>Store Config</Text>
              </MenuItem>
            }

            <MenuItem borderRadius="8px" mb="10px" onClick={() => { dispatch(logout()) }} _hover={{ bg: 'gray.700' }} _focus={{ bg: 'gray.700' }}>
              <MdOutlineLogout me="2px" /> <Text>Logout</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
