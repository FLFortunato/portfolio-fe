import {
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
} from './types';
import { Userservice } from '../../services/user.service';
import { getUsersSuccess, getUsers, failFecth } from './actions';

const initialState = {
	loading: false,
	data: [],
	error: '',
};

export const UserReducer = (state: any = initialState, action: any) => {
	const { type, payload } = action;

	switch (type) {
		case FETCH_USERS_REQUEST:
			return { ...state, loading: true };
		case FETCH_USERS_SUCCESS:
			return { ...state, data: payload, loading: false };
		case FETCH_USERS_FAILURE:
			return { ...state, data: [], error: payload };
		default:
			return state;
	}
};

export const fetchUsers = (entry: string, id?: any) => {
	if (entry === 'GET') {
		return (dispatch: any) => {
			dispatch(getUsers());
			Userservice()
				.get()
				.then((res) => {
					const users = res.data;
					dispatch(getUsersSuccess(users));
				})
				.catch((e) => {
					dispatch(failFecth(e));
				});
		};
	} else if (entry === 'DEL') {
		return (dispatch: any) => {
			dispatch(getUsers());
			Userservice()
				.remove(id)
				.then((res) => {
					const users = res.data;
					dispatch(getUsersSuccess(users));
				})
				.catch((e) => {
					dispatch(failFecth(e));
				});
		};
	}
};
