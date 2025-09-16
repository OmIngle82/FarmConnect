import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Handle GitHub Pages redirect
const pathname = sessionStorage.redirect;
delete sessionStorage.redirect;
if (pathname && pathname !== "/") {
  // Make sure the pathname includes the base path
  const basePath = '/farmconnect';
  const fullPath = pathname.startsWith(basePath) ? pathname : `${basePath}${pathname}`;
  window.history.replaceState(null, null, fullPath);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);