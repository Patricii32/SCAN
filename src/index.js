import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HashRouter } from "react-router-dom";
import Store from './store/store';

const store = new Store();

export const Context = createContext({
  store,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      store
    }}>
      <HashRouter>
        <App />
      </HashRouter>
    </Context.Provider>
  </React.StrictMode>
); 


