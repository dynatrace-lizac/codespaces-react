import './App.css';
// Import the OpenFeatureProvider and the hook to use boolean feature flags from the OpenFeature React SDK
import { OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk';

function AppContent() {
  // Retrieve the value of the 'my-new-feature' feature flag, defaulting to true if not set
  const myNewFeatureValue = useBooleanFlagValue('my-new-feature', true);

  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span>
          {/* Conditionally render the feature flag value */}
          {myNewFeatureValue ? 'React' : 'Dynatrace'}
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
