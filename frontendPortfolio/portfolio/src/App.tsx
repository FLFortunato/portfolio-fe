import React, { useEffect } from 'react';
import { Routes } from './Routes/routes';
import { Provider } from 'react-redux';
import { store } from './redux/index';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<Routes />
			</div>
		</Provider>
	);
};

export default App;
