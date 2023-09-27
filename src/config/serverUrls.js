const BASE_URL =  'http://127.0.0.1:8000/';

export const LOGIN_URL = BASE_URL + 'authentication/login/';

export const LOGGOUT_URL = BASE_URL + 'authentication/logout/';

// urls needs to be deleted, crosscheck from here -----

export const GET_BANKS = BASE_URL + 'api/banks/';

export const GET_MERCHANTS = BASE_URL + 'api/merchants/';

export const GET_BANK_SUMMARIES = BASE_URL + 'api/bank_summaries/';

export const GET_MERCHANT_SUMMARIES = BASE_URL + 'api/merchant_summaries/';



export const CHANGE_PASSWORD = BASE_URL + 'authentication/change_password/';

// ---to here

export const GET_CREATE_USERS = BASE_URL + 'authentication/users/';
export const EDIT_USERS = BASE_URL + 'authentication/users/update/';
export const GET_USERS = BASE_URL + 'authentication/users/';
export const DELETE_USER = BASE_URL + 'authentication/users/delete_one_user/';
export const GET_PROFILE = BASE_URL + 'authentication/profile/';

export const GET_CREATE_SUPPLIERS = BASE_URL + 'people/suppliers/';
export const UPDATE_SUPPLIERS = BASE_URL + 'people/suppliers/update/';
export const DELETE_SUPPLIER = BASE_URL + 'people/suppliers/delete/';

export const UPLOAD_ITEM_CSV = BASE_URL + 'items/csv/';






