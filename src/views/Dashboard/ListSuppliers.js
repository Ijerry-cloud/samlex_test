// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    Grid,
    HStack,
    Icon,
    SimpleGrid,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Spacer,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Container,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    Textarea,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons

import { DashboardTableRow3 } from "components/Tables/DashboardTableRow";
import MyPaginate from "components/Pagination";
import React, { useState } from "react";
// react icons
import { AiOutlineNumber } from 'react-icons/ai';
import { TbPhone } from 'react-icons/tb';
import {
    MdLocationCity,
    MdLocationOn,
    MdEmail
} from 'react-icons/md';
import { BsPerson, BsPersonAdd, BsFillTelephoneFill, BsFillFlagFill } from 'react-icons/bs';
import { FaRegAddressCard, FaCity, FaBuilding, FaCreditCard, FaPhone } from 'react-icons/fa';
import { fetchData, postData } from 'modules/utilities/util_query';
import { useQuery, useMutation } from 'react-query';
import { checkObject, isError } from 'modules/utilities';
import { handleApiError } from "modules/utilities/responseHandlers";
import validator from 'validator';
import { GET_CREATE_SUPPLIERS, UPDATE_SUPPLIERS, DELETE_SUPPLIER } from 'config/serverUrls';
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { useSelector } from 'react-redux';
import { logout } from "modules/auth/redux/authSlice";
import { useDispatch } from "react-redux";
//import { getAuthUser } from "modules/auth/redux/authSelector";



const EditModal = ({ handleEditSubmit, onClose, values, handleChange, errors, loading, mutation,
    editCompanyNameRef,
    editFirstNameRef, editLastNameRef, editEmailRef, editPhoneRef, editAddress1Ref, editAccountRef,
    editAddress2Ref, editCityRef, editStateRef, editZipRef, editCountryRef, editCommentsRef }) => (
    <>
        <ModalHeader>Edit Supplier Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl id="company_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>Company Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaBuilding color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.company_name)}
                            errorBorderColor='red.300'
                            ref={editCompanyNameRef}
                            name={'company_name'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.company_name || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>


                <FormControl id="first_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>First Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.first_name)}
                            errorBorderColor='red.300'
                            ref={editFirstNameRef}
                            name={'first_name'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.first_name || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>







                <FormControl id="last_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>Last Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.last_name)}
                            errorBorderColor='red.300'
                            ref={editLastNameRef}
                            name={'last_name'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.last_name || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>



                <FormControl id="email">
                    <FormLabel fontSize="sm" fontWeight='bold'>E-Mail:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdEmail color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.email)}
                            errorBorderColor='red.300'
                            ref={editEmailRef}
                            name={'email'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.email || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="phone_number">
                    <FormLabel fontSize="sm" fontWeight='bold'>Phone Number:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsFillTelephoneFill color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.phone_no)}
                            errorBorderColor='red.300'
                            ref={editPhoneRef}
                            name={'phone_no'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.phone_no || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="address_1">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 1:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaRegAddressCard color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.address_1)}
                            errorBorderColor='red.300'
                            ref={editAddress1Ref}
                            name={'address_1'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.address_1 || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="address_2">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 2:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaRegAddressCard color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.address_2)}
                            errorBorderColor='red.300'
                            ref={editAddress2Ref}
                            name={'address_2'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.address_2 || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="city">
                    <FormLabel fontSize="sm" fontWeight='bold'>City:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaCity color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.city)}
                            errorBorderColor='red.300'
                            ref={editCityRef}
                            name={'city'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.city || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="state">
                    <FormLabel fontSize="sm" fontWeight='bold'>State:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdLocationOn color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.state)}
                            errorBorderColor='red.300'
                            ref={editStateRef}
                            name={'state'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.state || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="zip">
                    <FormLabel fontSize="sm" fontWeight='bold'>Zip:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<AiOutlineNumber color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.zip)}
                            errorBorderColor='red.300'
                            ref={editZipRef}
                            name={'zip'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.zip || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="country">
                    <FormLabel fontSize="sm" fontWeight='bold'>Country:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsFillFlagFill color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.country)}
                            errorBorderColor='red.300'
                            ref={editCountryRef}
                            name={'country'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.country || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="account">
                    <FormLabel fontSize="sm" fontWeight='bold'>Account No:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaCreditCard color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.account)}
                            errorBorderColor='red.300'
                            ref={editAccountRef}
                            name={'account'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            defaultValue={values?.account || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                        />
                    </InputGroup>
                </FormControl>

            </Grid>
            <FormControl id="comments" mt={4}>
                <FormLabel fontSize="sm" fontWeight='bold'>Comments:</FormLabel>
                <Textarea
                    isInvalid={isError(errors?.comments)}
                    errorBorderColor='red.300'
                    ref={editCommentsRef}
                    name={'comments'}
                    //onChange={handleChange}
                    defaultValue={values?.comments || ''}
                    placeholder="message"
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}

                />
            </FormControl>

        </ModalBody>

        <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose} size="sm">
                Close
            </Button>
            <Button isLoading={mutation.isLoading} onClick={handleEditSubmit} colorScheme="blue" size="sm">Save</Button>
        </ModalFooter>

    </>


);

const AddModal = ({ handleSubmit, onClose, values, handleChange, errors, addMutation,
    companyNameRef, firstNameRef, lastNameRef, emailRef, phoneRef, address1Ref, address2Ref,
    cityRef, stateRef, zipRef, countryRef, commentsRef, accountRef }) => (
    <>
        <ModalHeader>Supplier Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>

                <FormControl id="company_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>Company Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaBuilding color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.company_name)}
                            errorBorderColor='red.300'
                            ref={companyNameRef}
                            name={'company_name'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.company_name || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Front Shop"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl id="first_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>First Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.first_name)}
                            errorBorderColor='red.300'
                            ref={firstNameRef}
                            name={'first_name'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.first_name || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Okechukwu"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="last_name">
                    <FormLabel fontSize="sm" fontWeight='bold'>Last Name: *</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.last_name)}
                            errorBorderColor='red.300'
                            ref={lastNameRef}
                            name={'last_name'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.last_name || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Ekene"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="email">
                    <FormLabel fontSize="sm" fontWeight='bold'>E-Mail:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdEmail color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.email)}
                            errorBorderColor='red.300'
                            ref={emailRef}
                            name={'email'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.email || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Okeyson@gmail.com"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="phone_number">
                    <FormLabel fontSize="sm" fontWeight='bold'>Phone Number:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsFillTelephoneFill color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.phone_no)}
                            errorBorderColor='red.300'
                            ref={phoneRef}
                            name={'phone_no'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.phone_no || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. 09034556553"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="address_1">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 1:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaRegAddressCard color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.address_1)}
                            errorBorderColor='red.300'
                            ref={address1Ref}
                            name={'address_1'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.address_1 || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Nkwo Market"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="address_2">
                    <FormLabel fontSize="sm" fontWeight='bold'>Address 2:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaRegAddressCard color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.address_2)}
                            errorBorderColor='red.300'
                            ref={address2Ref}
                            name={'address_2'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.address_2 || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Specialist Plaze"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="city">
                    <FormLabel fontSize="sm" fontWeight='bold'>City:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaCity color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.city)}
                            errorBorderColor='red.300'
                            ref={cityRef}
                            name={'city'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.city || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Onitsha"

                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="state">
                    <FormLabel fontSize="sm" fontWeight='bold'>State:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<MdLocationOn color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.state)}
                            errorBorderColor='red.300'
                            ref={stateRef}
                            name={'state'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.state || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Anambra"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="zip">
                    <FormLabel fontSize="sm" fontWeight='bold'>Zip:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<AiOutlineNumber color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.zip)}
                            errorBorderColor='red.300'
                            ref={zipRef}
                            name={'zip'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.zip || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. 44320"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="country">
                    <FormLabel fontSize="sm" fontWeight='bold'>Country:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<BsFillFlagFill color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.country)}
                            errorBorderColor='red.300'
                            ref={countryRef}
                            name={'country'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.country || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. Nigeria"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl id="account">
                    <FormLabel fontSize="sm" fontWeight='bold'>Account No:</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaCreditCard color="gray.800" />}
                        />
                        <Input
                            isInvalid={isError(errors?.account)}
                            errorBorderColor='red.300'
                            ref={accountRef}
                            name={'account'}
                            //onChange={handleChange}
                            type="text"
                            size="sm"
                            //value={values?.account || ''}
                            borderRadius='15px'
                            borderColor="rgba(255, 255, 255, 0.2)"
                            _placeholder={{ opacity: 0.2, color: 'white' }}
                            placeholder="eg. 3043432353"
                        />
                    </InputGroup>
                </FormControl>
            </Grid>
            <FormControl id="comments">
                <FormLabel fontSize="sm" fontWeight='bold'>Comments:</FormLabel>
                <Textarea
                    isInvalid={isError(errors?.comments)}
                    errorBorderColor='red.300'
                    ref={commentsRef}
                    name={'comments'}
                    //onChange={handleChange}
                    //value={values?.comments || ''}
                    borderRadius='15px'
                    borderColor="rgba(255, 255, 255, 0.2)"
                    _placeholder={{ opacity: 0.2, color: 'white' }}
                    placeholder="eg. message"
                />
            </FormControl>


        </ModalBody>

        <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose} size="sm">
                Close
            </Button>
            <Button isLoading={addMutation.isLoading} onClick={handleSubmit} colorScheme="blue" size="sm">Save</Button>
        </ModalFooter>
    </>


);

const DeleteModal = ({ onClose, values, handleDeleteSubmit, deleteMutation }) => (
    <>
        <ModalHeader>Delete Supplier Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Container maxW="full">
                <Text> Are you sure you want to delete {values?.first_name + " " + values?.last_name} ?
                </Text>
            </Container>
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose} size="sm">
                Close
            </Button>
            <Button isLoading={deleteMutation.isLoading} colorScheme='red' onClick={handleDeleteSubmit} size="sm">Yes</Button>
        </ModalFooter>
    </>


);

export default function Dashboard() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    //const authUser = useSelector(getAuthUser);
    const dispatch = useDispatch();
    const [suppliers, setSuppliers] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const token = useSelector(getAuthToken);

    const companyNameRef = React.useRef(null);
    const firstNameRef = React.useRef(null);
    const lastNameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const phoneRef = React.useRef(null);
    const address1Ref = React.useRef(null);
    const address2Ref = React.useRef(null);
    const cityRef = React.useRef(null);
    const stateRef = React.useRef(null);
    const zipRef = React.useRef(null);
    const countryRef = React.useRef(null);
    const accountRef = React.useRef(null);
    const commentsRef = React.useRef(null);

    const editCompanyNameRef = React.useRef(null);
    const editFirstNameRef = React.useRef(null);
    const editLastNameRef = React.useRef(null);
    const editEmailRef = React.useRef(null);
    const editPhoneRef = React.useRef(null);
    const editAddress1Ref = React.useRef(null);
    const editAddress2Ref = React.useRef(null);
    const editCityRef = React.useRef(null);
    const editStateRef = React.useRef(null);
    const editZipRef = React.useRef(null);
    const editCountryRef = React.useRef(null);
    const editAccountRef = React.useRef(null);
    const editCommentsRef = React.useRef(null);


    // Chakra Color Mode

    const textColor = "white";
    const toast = useToast();

    //for the modal
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onModalClose = () => {
        setValues({});
        setErrors({});
        onClose();
    }

    const [modalType, setModalType] = useState('add');

    const payload_data = {};

    const result = useQuery(['suppliers',
        {
            url: GET_CREATE_SUPPLIERS + `?page=${page}`,
            payload_data,
            authenticate: true,
            token
        }],
        fetchData,
        {
            retry: false,
            onSuccess: (response) => {
                const data = response?.data;
                setCount(data?.count || 0);
                setSuppliers(data?.results || []);
                setPageCount(data?.last_page || 1);
                //console.log(data?.results);
            },
            onError: (error) => {
                handleApiError(error);
            }
        }
    );

    const { isLoading, refetch } = result;



    const mutation = useMutation(postData, {
        onSuccess: (response) => {
            const data = response?.data?.detail;
            toast({
                title: 'Success',
                description: "Action succesful",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            //setValues({});
            //setErrors({});
            //setLoading(false);
            setSuppliers((suppliers) => {
                const updated = suppliers.map((supplier) => {
                    if (supplier.id === data.id) {
                        return data;
                    }
                    else {
                        return supplier
                    }
                })
                //console.log(updated_items);
                return updated
            });
            onModalClose();
            //refetch();

            return;
        },
        onError: (error) => {
            //console.log("error soon")
            
            //dispatch(logout());
            handleApiError(error);
            //return;
            //setLoading(false);
        }
    });

    const addMutation = useMutation(postData, {
        onSuccess: (response) => {
            const data = response?.data?.detail;
            toast({
                title: 'Success',
                description: "Action succesful",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            //setValues({});
            //setErrors({});
            //setLoading(false);
            setSuppliers((suppliers) => {
                const updated = [...suppliers, data];
                //console.log(updated_items);
                return updated
            });
            onModalClose();
            //refetch();

            return;
        },
        onError: (error) => {
            handleApiError(error);
            //setLoading(false);
        }
    });

    const deleteMutation = useMutation(postData, {
        onSuccess: (response) => {
            const id = response?.data?.id;
            toast({
                title: 'Success',
                description: 'Supplier deleted successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setSuppliers((suppliers) => {
                const updated = suppliers.filter(supplier => supplier.id !== id);
                //console.log(new_items);
                //console.log(id);
                return updated
            })
            setCount((count) => count -1 )
            onModalClose();

            return;
        },
        onError: (error) => {
            handleApiError(error);
            //onModalClose();
        }
    });

    const validate = (updatedItem) => {
        let uerrors = {}
        uerrors.company_name = updatedItem?.company_name ? "" : FIELD_REQUIRED;
        uerrors.first_name = updatedItem?.first_name ? "" : FIELD_REQUIRED;
        uerrors.last_name = updatedItem?.last_name ? "" : FIELD_REQUIRED;

        if (!updatedItem?.first_name || !updatedItem?.last_name || !updatedItem?.company_name) {
            toast({
                title: 'Missing Information.',
                description: "Please fill all required fields.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return uerrors;

        }

        if (updatedItem?.email) {
            const email_is_valid = validator.isEmail(updatedItem.email);

            if (!email_is_valid) {
                uerrors.email = "enter a valid email address";
                toast({
                    title: 'Invalid Field.',
                    description: "Please enter a valid email address",
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                });
                return uerrors;
            }
        }

        return uerrors;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {

        const updatedItem = {
            company_name: companyNameRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            phone_no: phoneRef.current.value,
            address_1: address1Ref.current.value,
            address_2: address2Ref.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zip: zipRef.current.value,
            country: countryRef.current.value,
            comments: commentsRef.current.value
        }

        let checkErrors = validate(updatedItem);
        let areAllFieldsFalse = checkObject(checkErrors);


        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }

        //const data = values;
        //setLoading(true);
        addMutation.mutate(
            {
                url: GET_CREATE_SUPPLIERS,
                payload_data: updatedItem,
                token: token,
                authenticate: true
            }
        );

        return;

    }


    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }

    const handleEditSubmit = () => {
        const updatedItem = {
            uuid: values?.uuid,
            company_name: editCompanyNameRef.current.value,
            first_name: editFirstNameRef.current.value,
            last_name: editLastNameRef.current.value,
            email: editEmailRef.current.value,
            phone_no: editPhoneRef.current.value,
            address_1: editAddress1Ref.current.value,
            address_2: editAddress2Ref.current.value,
            city: editCityRef.current.value,
            state: editStateRef.current.value,
            zip: editZipRef.current.value,
            country: editCountryRef.current.value,
            account: editAccountRef.current.value,
            comments: editCommentsRef.current.value
        }

        let checkErrors = validate(updatedItem);
        let areAllFieldsFalse = checkObject(checkErrors);


        if (!areAllFieldsFalse) {
            // if there are errors
            // set to state and terminate
            setErrors(checkErrors);
            return;
        }

        //const data = values;
        //setLoading(true);
        mutation.mutate(
            {
                url: UPDATE_SUPPLIERS,
                payload_data: updatedItem,
                token: token,
                authenticate: true
            }
        );

        return;

    }

    const handleDeleteSubmit = () => {
        const data = values;
        //setLoading(true);
        deleteMutation.mutate({
            url: DELETE_SUPPLIER,
            payload_data: data,
            token: token,
            authenticate: true
        });
        return;


    }

    if (isLoading) {
        return (
            <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
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
        )
    }


    return (
        <>
            <Modal isOpen={isOpen} onClose={onModalClose} size="xl">
                <ModalOverlay />
                <ModalContent
                    bgColor="#232333"
                    borderColor="gray.900"
                    color="white"
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px"
                >

                    {modalType === "add" ?
                        <AddModal onClose={onModalClose} handleSubmit={handleSubmit} values={values}
                            handleChange={handleChange} errors={errors} loading={loading} companyNameRef={companyNameRef}
                            firstNameRef={firstNameRef} lastNameRef={lastNameRef} emailRef={emailRef} phoneRef={phoneRef}
                            address1Ref={address1Ref} address2Ref={address2Ref} cityRef={cityRef} stateRef={stateRef}
                            zipRef={zipRef} countryRef={countryRef} commentsRef={commentsRef} addMutation={addMutation}
                            accountRef={accountRef} /> :
                        modalType === "edit" ?
                            <EditModal onClose={onModalClose} handleEditSubmit={handleEditSubmit} values={values} errors={errors}
                                handleChange={handleChange} loading={loading} mutation={mutation} editCompanyNameRef={editCompanyNameRef}
                                editFirstNameRef={editFirstNameRef} editLastNameRef={editLastNameRef} editEmailRef={editEmailRef} editPhoneRef={editPhoneRef}
                                editAddress1Ref={editAddress1Ref} editAddress2Ref={editAddress2Ref} editCityRef={editCityRef} editAccountRef={editAccountRef}
                                editStateRef={editStateRef} editZipRef={editZipRef} editCountryRef={editCountryRef} editCommentsRef={editCommentsRef} /> :
                            <DeleteModal onClose={onModalClose} values={values} handleDeleteSubmit={handleDeleteSubmit} mutation={mutation}
                                loading={loading} deleteMutation={deleteMutation}/>}


                </ModalContent>

            </Modal>
            <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
                <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
                <Card color="white" bgColor="#171923" >
                        <Box>
                            <Stack spacing='0'>
                                <Box>
                                    <IconBox as="box" h={"45px"} w={"45px"}>

                                        <Icon h={"30px"} w={"30px"} as={FaBuilding} color='#fff' />
                                    </IconBox>

                                    <Text fontSize='sm' fontWeight="bold" mt={2}>
                                    Name of Company
                                    </Text>
                                </Box>
                                <Box>
                                    <Text pt='2' fontSize='md' as='i'>
                                    {suppliers[0]?.company_name || ""}
                                    </Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>
                    <Card color="white" bgColor="#171923" >
                        <Box>
                            <Stack spacing='0'>
                                <Box>
                                    <IconBox as="box" h={"45px"} w={"45px"}>

                                        <Icon h={"30px"} w={"30px"} as={PersonIcon} color='#fff' />
                                    </IconBox>

                                    <Text fontSize='sm' fontWeight="bold" mt={2}>
                                    Full Name
                                    </Text>
                                </Box>
                                <Box>
                                    <Text pt='2' fontSize='md' as='i'>
                                    {(suppliers[0]?.first_name + " " + suppliers[0]?.last_name) || ""}
                                    </Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>
                    <Card color="white" bgColor="#171923" >
                        <Box>
                            <Stack spacing='0'>
                                <Box>
                                    <IconBox as="box" h={"45px"} w={"45px"}>

                                        <Icon h={"30px"} w={"30px"} as={FaPhone} color='#fff' />
                                    </IconBox>

                                    <Text fontSize='sm' fontWeight="bold" mt={2}>
                                    Phone Number
                                    </Text>
                                </Box>
                                <Box>
                                    <Text pt='2' fontSize='md' as='i'>
                                    {suppliers[0]?.phone_no || "Supplier Mobile"}
                                    </Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>
                    <Card color="white" bgColor="#171923" >
                        <Box>
                            <Stack spacing='0'>
                                <Box>
                                    <IconBox as="box" h={"45px"} w={"45px"}>

                                        <Icon h={"30px"} w={"30px"} as={MdEmail} color='#fff' />
                                    </IconBox>

                                    <Text fontSize='sm' fontWeight="bold" mt={2}>
                                    Email
                                    </Text>
                                </Box>
                                <Box>
                                    <Text pt='2' fontSize='md' as='i'>
                                    {suppliers[0]?.email || "Supplier Email"}
                                    </Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Card>

                </SimpleGrid>
                <Grid
                    my="26px"
                    mb={{ lg: "16px" }}
                >
                    <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }} bgColor="gray.900">
                        <CardHeader p="12px 0px 28px 0px">
                            <Flex w='100%' alignItems='center' gap='2' >
                                <Text
                                    fontSize="lg"
                                    color={textColor}
                                    fontWeight="bold"
                                >
                                    <Text as="span" bgColor="#8E44AD" p={2}>
                                        SUPPLIERS LISTINGS
                                    </Text>
                                    <Text as="span" bgColor="#27AE60" p={2}>
                                        {`(Page${page} of ${pageCount})`}
                                    </Text>
                                    <Text as="span" bgColor="#F39C12" p={2}>
                                        {`(${count} suppllier(s) found)`}
                                    </Text>
                                </Text>
                                <Spacer />
                                <Button
                                    leftIcon={<BsPersonAdd />}
                                    variant='solid'
                                    backgroundColor='#4285f4'
                                    color='white'
                                    size="sm"
                                    onClick={() => {
                                        setModalType('add');
                                        onOpen();
                                    }}
                                >
                                    New
                                </Button>

                            </Flex>
                        </CardHeader>
                        <Table color={textColor} size='sm'>
                            <Thead>
                                <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
                                    <Th color="white">COMPANY NAME</Th>
                                    <Th color="white">FIRST NAME</Th>
                                    <Th color="white">LAST NAME</Th>
                                    <Th color="white"> PHONE NUMBER </Th>
                                    <Th color="white">EMAIL ADDRESS</Th>
                                    
                                    <Th textAlign="center" color="white">ACTIONS</Th>
                                    

                                    
                                </Tr>
                            </Thead>
                            <Tbody>
                                {suppliers.map((row, index) => {
                                    return (
                                        <DashboardTableRow3
                                            key={index}
                                            company_name={row.company_name}
                                            first_name={row.first_name}
                                            phone_no={row.phone_no}
                                            email={row.email}
                                            last_name={row.last_name}
                                            onEditClick={() => {
                                                setValues(row);
                                                setModalType('edit');
                                                onOpen();
                                            }}
                                            onDeleteClick={() => {
                                                setValues(row);
                                                setModalType('delete');
                                                onOpen();
                                            }}
                                        />
                                    );
                                })}
                            </Tbody>
                        </Table>
                        <Box my="1.2rem">
                            <MyPaginate
                                breakLabel="..."
                                nextLabel=">"

                                pageRangeDisplayed={5}

                                previousLabel="<"

                                pageCount={pageCount}
                                onPageChange={(e) => { handlePageChange(e) }}
                                forcePage={pageCount > 1 ? page - 1 : 1}
                                renderOnZeroPageCount={null}
                                activeClassName={'active'}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Flex>
        </>

    );
}
