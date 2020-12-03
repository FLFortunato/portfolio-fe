import { GET_USERS, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './types';
import { Userservice } from '../../services/user.service';


export const getUsers = () =>{
    return{
        type: FETCH_USERS_REQUEST,
        data: [],
        payload: true
    }
}

export const getUsersSuccess = (data: any)=>{
    return{
        type: FETCH_USERS_SUCCESS,
        payload: data
    }
}

export const failFecth = (error: string)=>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}