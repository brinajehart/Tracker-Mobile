import Requests from '../api';
import Toast from 'react-native-simple-toast';

const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'
const SIGN_IN = 'SIGN_IN'
const REGISTER = 'REGISTER'
const PROFILE_UPDATE = 'PROFILE_UPDATE'
const PROFILE_UPDATE_COMPLETE = 'PROFILE_UPDATE_COMPLETE'
const PROFILE_UPDATE_ERROR = 'PROFILE_UPDATE_ERROR'
const REGISTER_COMPLETE = 'REGISTER_COMPLETE'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'
const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR'

const initialState = {
    email: null,
    fullname: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    userId: null,
    loginError: null,
    registerError: null,
    profileUpdateError: null,
}

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                email: action.payload.email,
                fullname: action.payload.fullname,
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.jwt,
                userId: action.payload.userId,
                loginError: null
            }
        case LOG_OUT:
            return initialState
        case SIGN_IN:
            return {
                ...state,
                isFetching: true,
                loginError: null
            }
        case REGISTER:
            return {
                ...state,
                isFetching: true,
                registerError: null
            }
        case REGISTER_COMPLETE:
            return {
                ...state,
                isFetching: false,
                registerError: null
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                isFetching: false,
                loginError: action.payload.error
            }
        case SET_REGISTER_ERROR:
            return {
                ...state,
                isFetching: false,
                registerError: action.payload.error
            }
        case PROFILE_UPDATE:
            return {
                ...state,
                isFetching: true,
                profileUpdateError: null
            }
        case PROFILE_UPDATE_COMPLETE:
            return {
                ...state,
                isFetching: false,
                email: action.payload.email,
                fullname: action.payload.fullname,
                profileUpdateError: null
            }
        case PROFILE_UPDATE_ERROR:
            return {
                ...state,
                isFetching: false,
                profileUpdateError: true
            }
        default:
            return state
    }
}

export default currentUser

const setUser = userObj => {
    return {
        type: SET_USER,
        payload: userObj
    }
}

const setLoginError = error => {
    return {
        type: SET_LOGIN_ERROR,
        payload: { error }
    }
}

const setRegisterError = error => {
    return {
        type: SET_REGISTER_ERROR,
        payload: { error }
    }
}

const login = user => async dispatch => {
    dispatch({ type: SIGN_IN });

    try {
        const [status, response] = await Requests.login(user);
        if (status === 200) {
            dispatch(setUser({
                email: user.email,
                jwt: response.token,
                userId: response.user.id,
                fullname: response.user.fullname
            }));
        } else {
            dispatch(setLoginError("Failed to login"));
            Toast.show('Failed to login!');
        }
    } catch (err) {
        dispatch(setLoginError("Network error!"));
        Toast.show('Network error!');
    }
}

const register = user => async dispatch => {
    dispatch({ type: REGISTER });

    try {
        const [status, _] = await Requests.register(user);
        if (status === 200) {
            dispatch({ type: REGISTER_COMPLETE })
            dispatch(login(user))
        } else {
            dispatch(setRegisterError("Failed to register"));
            Toast.show('Failed to register!');
        }
    } catch (err) {
        dispatch(setRegisterError("Network error!"));
        Toast.show('Network error!');
    }
}

const updateProfile = (user) => async dispatch => {
    dispatch({ type: PROFILE_UPDATE });

    const [status, _] = await Requests.updateProfile(user.jwt, user);
    if (status === 200) {
        dispatch({ type: PROFILE_UPDATE_COMPLETE, payload: { email: user.email, fullname: user.fullname } });
        Toast.show('Successfuly updated profile!');
    } else {
        Toast.show('Failed to update profile!');
        dispatch({ type: PROFILE_UPDATE_ERROR });
    }
}

const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const actions = {
    login,
    register,
    logOut,
    updateProfile
}