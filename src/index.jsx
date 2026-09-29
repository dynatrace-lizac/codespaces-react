import React from 'react';
import ReactDOM from 'react-dom/client';
import { OpenFeature, ProviderEvents } from '@openfeature/react-sdk';
import DevCycleReactProvider from '@devcycle/openfeature-react-provider';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const devCycleSdkKey = import.meta.env.VITE_DEVCYCLE_CLIENT_SDK_KEY;
const openFeatureClient = OpenFeature.getClient();

console.info('[DevCycle] Client SDK key configured:', Boolean(devCycleSdkKey));

if (devCycleSdkKey) {
  openFeatureClient.addHandler(ProviderEvents.Ready, () => {
    console.info('[DevCycle] Provider is ready.');
  });
  openFeatureClient.addHandler(ProviderEvents.Error, () => {
    console.error('[DevCycle] Provider reported an error.');
  });
  openFeatureClient.addHandler(ProviderEvents.Stale, () => {
    console.warn('[DevCycle] Provider is stale.');
  });

  console.info('[DevCycle] Initializing provider.');
  OpenFeature.setProvider(new DevCycleReactProvider(devCycleSdkKey));
} else {
  console.warn('[DevCycle] Provider was not initialized because the SDK key is missing.');
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
