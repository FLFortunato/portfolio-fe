import { INCREMENT, DECREMENT, MULTIPLY } from './types';

const initialState = {
	data: 1,
};

export const MathActions = (state = initialState, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case INCREMENT:
			return { ...state, data: state.data + payload };
		case DECREMENT:
			return { ...state, data: state.data - payload };
		case MULTIPLY:
			return { ...state, data: state.data - payload };
		default:
			return state;
	}
};
