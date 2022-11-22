import user from './user'
import edit from './edit';
import currency from './currency';

import { combineReducers } from 'redux'

export default combineReducers({
    user,
    edit,
    currency
})