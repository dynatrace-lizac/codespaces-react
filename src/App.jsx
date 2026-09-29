import './App.css';
// Import the OpenFeatureProvider and the hook to use boolean feature flags from the OpenFeature React SDK
import {
  OpenFeatureProvider,
  ProviderStatus,
  useBooleanFlagDetails,
  useOpenFeatureClientStatus,
} from '@openfeature/react-sdk';
import { useEffect } from 'react';

function FeatureFlagValue() {
  // Retrieve the value of the 'my-new-feature' feature flag, defaulting to true if not set
  const flagDetails = useBooleanFlagDetails('my-new-feature', true);

  useEffect(() => {
    console.info('[DevCycle] Flag evaluation:', {
      flagKey: 'my-new-feature',
      value: flagDetails.value,
      reason: flagDetails.reason,
      errorCode: flagDetails.errorCode,
      errorMessage: flagDetails.errorMessage,
    });
  }, [flagDetails]);

  return flagDetails.value ? 'React' : 'Dynatrace';
}

function AppContent() {
  const providerStatus = useOpenFeatureClientStatus();

  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span>
          {providerStatus === ProviderStatus.READY ? (
            <FeatureFlagValue />
          ) : (
            'Waiting for DevCycle...'
          )}
        </p>
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

function App() {
  return (
    // Wrap the application with the OpenFeatureProvider to enable feature flagging
    <OpenFeatureProvider>
      <AppContent />
    </OpenFeatureProvider>
  );
}

export default App;
