import React, { useEffect, useState } from 'react';
import { AppBar, Container, Grow, Grid, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import memoriesImages from './../../assets/images/memories.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';



const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logoutHandler = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        setUser(null)
    }
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logoutHandler();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return (
        <AppBar className={classes.appBar} position='static' color="inherit" >
            <div className={classes.brandContainer}>

                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>
                    Memories
                </Typography>
                <img className={classes.image} src={memoriesImages} alt="memories" height="70" />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageURL}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logoutHandler}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In </Button>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar