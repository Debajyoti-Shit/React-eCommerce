import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import products from './Reducers/index'
import "@mui/material"
import { createStore } from 'redux';
import { Provider } from 'react-redux'
// Create a new Redux store using the products reducer
const store = createStore(products)

// Create a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    // Render the App component wrapped in a Provider component that connects it to the Redux store
    <Provider store={store}>
        <App />
    </Provider>
);


