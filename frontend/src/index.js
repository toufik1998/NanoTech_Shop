import React from 'react';
import ReactDOM from 'react-dom/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux'; 
import store from './store';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} >
        <App />
      </PayPalScriptProvider>
      {/* <App /> */}
    </Provider>  
  </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
