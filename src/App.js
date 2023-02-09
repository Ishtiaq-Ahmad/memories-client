import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
// import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import ProtectedRoute from './routers/ProtectedRoute';
import { gapi } from 'gapi-script'

const clientId = "586727742636 - abe2ns604cmo9v9vod9ibivpsm2psm85.apps.googleusercontent.com";
const App = () => {
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        };
        gapi.load("client:auth2", start);
    }, []);
    // var accessToken = gapi.auth.getToken().access_token;

    return (
        <Container maxWidth="lg">
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                </Route>
            </Routes>
        </Container>
    )
}

export default App;