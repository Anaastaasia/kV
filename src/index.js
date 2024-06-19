import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}