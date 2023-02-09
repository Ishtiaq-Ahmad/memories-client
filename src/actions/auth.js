import * as api from './../api/index.js';

export const SignIn = (formData, navigate) => async (dispatch) => {
    console.log('in')
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: 'AUTH', data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const SignUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: 'AUTH', data });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}