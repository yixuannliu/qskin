import { SIGNUP_SUCCESS, SIGNUP_ERROR } from '../actions/userActions'

export default (state = {
	signedUp: false,
	signupMsg: '',
}, action) => {
	switch (action.type) {
		case SIGNUP_SUCCESS: {
			return Object.assign({}, state, {
				signupMsg:'You have signed up successfully.',
				signedUp: true,
			})
		}
		case SIGNUP_ERROR: {
			return Object.assign({}, state, {
				signupMsg: '',
				signedUp: false,
			})
		}
		default:
			return state
	}
}