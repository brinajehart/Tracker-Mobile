import { AsyncStorage } from '@react-native-community/async-storage';

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
    console.log('change currency', currency);
    dispatch({ type: SET_CURRENCY, payload: { currency } });
    await AsyncStorage.setItem(CURRENCY_KEY, currency);
}

const loadCurrencyFromStorage = () => async dispatch => {
    const currencyFromStorage = await AsyncStorage.getItem(CURRENCY_KEY);
    if (currencyFromStorage !== null) {
        console.log({ currencyFromStorage });
        dispatch(setCurrency(currencyFromStorage));
    }
}

export const actions = {
    setCurrency,
    loadCurrencyFromStorage
}

export default currencyReducer;