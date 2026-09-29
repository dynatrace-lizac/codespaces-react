import React from 'react';
import ReactDOM from 'react-dom/client';
import { OpenFeature } from '@openfeature/react-sdk';
import DevCycleReactProvider from '@devcycle/openfeature-react-provider';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const devCycleSdkKey = import.meta.env.VITE_DEVCYCLE_CLIENT_SDK_KEY;
if (devCycleSdkKey) {
  OpenFeature.setProvider(new DevCycleReactProvider(devCycleSdkKey));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
