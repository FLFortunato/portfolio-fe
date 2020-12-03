import { combineReducers, createStore, applyMiddleware } from 'redux';
import { MathActions } from '../redux/Math/reducer';
import thunk from 'redux-thunk';
import { UserReducer, fetchUsers } from './Users/reducer';

export const allReducers = combineReducers({
	MathActions,
	UserReducer,
});

export const store = createStore(allReducers, applyMiddleware(thunk));
