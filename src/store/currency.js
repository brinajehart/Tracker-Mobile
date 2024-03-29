import AsyncStorage from '@react-native-community/async-storage';

const SET_CURRENCY = 'SET_CURRENCY';
const CURRENCY_KEY = 'TRACKER_CURRENCY';

const initialState = {
    currency: 'EUR'
};

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCY:
            return {
                ...state,
                currency: action.payload.currency
            }
        default:
            return state;
    }
}

const setCurrency = (currency) => async dispatch => {
    dispatch({ type: SET_CURRENCY, payload: { currency } });
    await AsyncStorage.setItem(CURRENCY_KEY, currency);
}

const loadCurrencyFromStorage = () => async dispatch => {
    try {
        const currencyFromStorage = await AsyncStorage.getItem(CURRENCY_KEY);
        if (currencyFromStorage !== null) {
            dispatch(setCurrency(currencyFromStorage));
        }
    } catch (err) {
        console.log(err)
    }
}

export const actions = {
    setCurrency,
    loadCurrencyFromStorage
}

export default currencyReducer;