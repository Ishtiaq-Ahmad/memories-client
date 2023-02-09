import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { createRoot } from 'react-dom/client';

const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <BrowserRouter>
            {/* <GoogleOAuthProvider clientId="586727742636-abe2ns604cmo9v9vod9ibivpsm2psm85.apps.googleusercontent.com"> */}
            <App />
            {/* </GoogleOAuthProvider>; */}
        </BrowserRouter>
    </Provider>
);