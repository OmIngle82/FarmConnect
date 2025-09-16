import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Handle GitHub Pages redirect
const pathname = sessionStorage.redirect;
delete sessionStorage.redirect;
if (pathname && pathname !== "/") {
  window.history.replaceState(null, null, pathname);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);