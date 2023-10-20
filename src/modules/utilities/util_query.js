import toast from 'react-hot-toast';
import axios from 'axios';
import { GET_CREATE_SUPPLIERS } from 'config/serverUrls';

export const fetchData = async ({ queryKey }) => {
  // a hook that fetches data
  const [_key, { payload_data, url, authenticate, token }] = queryKey;
  // console.log("p: ", payload_data, "u: ", url, "t: ", token, "a: ", authenticate);

  // // check network connection strength
  // let is_connected = await netInfoNetworkCheck();
  // if (!is_connected){
  //   return toast.error("Could not detect an active network connection");
  // }

  // add authorization token from state
  // get access token for this user
  const config = {};

  // add authorization token to headers for api call
  if (authenticate) {
    // if theres is no registered access token
    if (!(token)) {
      toast.error("you are not authenticated, please try logging in again");
      return;
    }

    // console.log("my token is : ", token);
    const authorization = { Authorization: `Bearer ${token}` }
    config.headers = authorization;
  }
  // console.log("config: ", config);
  let response_data = await axios.get(url, config);

  return response_data;
}


export const postData = async (data) => {
  // a hook that fetches data
  // console.log("data: ", data);
  const { payload_data, url, authenticate, token } = data;
  // console.log("pstea: ", payload_data, "u: ", url);
  // console.log("token: ", token);

  // check network connection strength
  //   let is_connected = await netInfoNetworkCheck();
  //   if (!is_connected){
  //     return toast.error("Could not detect an active network connection");
  //   }

  const config = {};

  // add authorization token to headers for api call
  if (authenticate) {
    // if theres is no registered access token
    if (!(token)) {
      toast.error("you are not authenticated, please try logging in again");
      return;
    }


    const authorization = { Authorization: `Bearer ${token}` }
    config.headers = authorization;
  }

  let response_data = await axios.post(url, payload_data, config);

  return response_data;
}

export const uploadCsvFile = async (data) => {

  const { payload_data, url, authenticate, token } = data;

  const formData = new FormData();
  formData.append('file', payload_data);

  const config = {};
  config.headers = {'Content-Type': 'multipart/form-data',}

  // add authorization token to headers for api call
  if (authenticate) {
    // if theres is no registered access token
    if (!(token)) {
      toast.error("you are not authenticated, please try logging in again");
      return;
    }

    config.headers.authorization = `Bearer ${token}`;
  }

  try {
    const response_data = await axios.post(url, formData, config);

    return response_data; // You can return any data you want from the server response
  } catch (error) {
    throw new Error('File upload failed');
  }
};

export const loadSuppliers = async (inputValue) => {
  try {
    // Replace this with your API endpoint for fetching options
    const response = await axios.get(GET_CREATE_SUPPLIERS + `?company_name=${inputValue}`);
    
    // Map the API response data to the format expected by react-select
    //console.log(response.data);
    const options = response.data.map((option) => ({
      ...option,
      value: option.id,
      label: option.company_name,
  
    }));

    
    return options;

  } catch (error) {
    console.error('Error fetching options:', error);
    return [];
  }
};