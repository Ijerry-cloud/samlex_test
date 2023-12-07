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

export const GET_STORE_CONFIG = BASE_URL + 'authentication/config/';
export const UPDATE_CONFIG = BASE_URL + 'authentication/update_config/';

export const GET_CREATE_SUPPLIERS = BASE_URL + 'people/suppliers/';
export const UPDATE_SUPPLIERS = BASE_URL + 'people/suppliers/update/';
export const DELETE_SUPPLIER = BASE_URL + 'people/suppliers/delete/';

export const GET_CREATE_CUSTOMERS = BASE_URL + 'people/customers/';
export const UPDATE_CUSTOMERS = BASE_URL + 'people/customers/update/';
export const DELETE_CUSTOMERS = BASE_URL + 'people/customers/delete/'

export const UPLOAD_ITEM_CSV = BASE_URL + 'items/csv/';
export const GET_CREATE_ITEM = BASE_URL + 'items/list-create/';
export const UPDATE_ITEM = BASE_URL + 'items/update/';
export const DELETE_ITEM = BASE_URL + 'items/delete/';

export const GET_CREATE_CATEGORIES = BASE_URL + 'items/categories/list-create/';

export const GET_CREATE_SALES = BASE_URL + 'sales/sales/';
export const DELETE_SALE = BASE_URL + 'sales/delete-my-sale/';
export const GET_SALES_REPORT = BASE_URL + 'sales/list-any-sales/';
export const DELETE_SALE_REPORT = BASE_URL + 'sales/delete-any-sales/';
export const GET_DAILY_REPORT = BASE_URL + 'sales/daily-report/';
export const GET_CUSTOMER_SUMMARY_REPORT = BASE_URL + 'sales/customer-summary-report/';
export const GET_EMPLOYEE_SUMMARY_REPORT = BASE_URL + 'sales/employee-summary-report/';
export const GET_ITEM_INVENTORY = BASE_URL + 'sales/item-inventory/';

export const GET_DASHBOARD_COUNTS = BASE_URL + 'sales/dashboard-counts/';
export const GET_CATEGORIES_CHART = BASE_URL + 'sales/dashboard-category-charts/';





