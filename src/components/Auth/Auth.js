import React, { useState } from 'react'
import { TextField, Button, Typography, Paper, Container, Avatar, Grid } from '@material-ui/core';
import useStyles from './Styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import GoogleLogin from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignIn, SignUp } from '../../actions/auth';
// import { GoogleLogin } from '@react-oauth/google';

// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const clientId = "586727742636-abe2ns604cmo9v9vod9ibivpsm2psm85.apps.googleusercontent.com";
const initialData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', }

const Auth = () => {
    // const state = null;
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isSignup = true;
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialData)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(SignUp(formData, navigate));
        } else {
            dispatch(SignIn(formData, navigate));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }
    const googleFailure = (error) => {
        console.error(error)
        console.log('google sign in unsuccessfully, try again')
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Sing In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2} >
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }


                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword} />
                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {
                            isSignup ? 'Sign Up' : 'Sign In'
                        }
                    </Button>
                    {/* <GoogleLogin
                        clientId={clientId}
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="secondary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    
                    /> */}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignup ? 'Already have an account? Sign In' : "Don't have an account! Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth