import {
    login as fetchLogin,
    register as fetchRegister,
    profileUpdate as fetchProfileUpdate
} from '../api';

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
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    userId: null,
    isAdmin: false,
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
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.jwt,
                isAdmin: action.payload.isAdmin,
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
        const response = await fetchLogin(user);
        if (response) {
            dispatch(setUser({
                email: user.email,
                jwt: response.data.token,
                isAdmin: response.data.isAdmin,
                userId: response.data.userId
            }));
        } else {
            dispatch(setLoginError("Failed to login"));
        }
    } catch (err) {
        dispatch(setLoginError("Failed to login"));
    }
}

const register = user => async dispatch => {
    dispatch({ type: REGISTER });

    try {
        const response = await fetchRegister(user);
        if (response) {
            dispatch({ type: REGISTER_COMPLETE })
            dispatch(login(user))
        } else {
            dispatch(setRegisterError("Failed to register"));
        }
    } catch (err) {
        dispatch(setRegisterError("Failed to register"));
    }
}

const updatePorfile = (user, jwt) => async dispatch => {
    dispatch({ type: PROFILE_UPDATE });

    try {
        const reponse = await fetchProfileUpdate(user, jwt);
        if (reponse) {
            dispatch({ type: PROFILE_UPDATE_COMPLETE, payload: { email: user.email } });
        } else {
            dispatch({ type: PROFILE_UPDATE_ERROR })
        }
    } catch (err) {
        dispatch(setRegisterError("Failed to register"));
    }

}

const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const actions = {}