import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persister, store} from "./app/store";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persister}>
            <BrowserRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

