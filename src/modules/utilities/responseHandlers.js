import toast from 'react-hot-toast';
import { getAuthUser } from "modules/auth/redux/authSelector";
import { useSelector } from 'react-redux';
import { logout } from "modules/auth/redux/authSlice";
import { useDispatch } from "react-redux";



/**
 * 
 * function to handle api errors
 * 
 * this function has side effects
 * 
 * @args error - the error response from the api
 * @return null
 * 
 */
export function handleApiError(error){ 



    let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
    toast.error(message)

}

/**
 * 
 * function to handle api success
 * 
 * this function has side effects
 * 
 * @args response - success response from the api
 * @return null
 * 
 */
 export function handleApiSuccess(response){
    
    let message = response?.message || "Success";
    toast.error(message)
    return
}