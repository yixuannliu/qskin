import { combineReducers } from 'redux'
import userSigninState from './userSigninState'
import userSignupState from './userSignupState'

export default combineReducers({
	userSigninState,
	userSignupState,
})