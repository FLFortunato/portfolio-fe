import { INCREMENT, DECREMENT, MULTIPLY } from './types';

export const Increment = (value: number) => {
	return {
		type: INCREMENT,
		payload: value,
	};
};

export const Decrement = (value: number) => {
	return {
		type: DECREMENT,
		payload: value,
	};
};

export const Multiply = (value: number) => {
	return {
		type: MULTIPLY,
		payload: value,
	};
};
