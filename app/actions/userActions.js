import axios from 'axios'
import { postsApp } from '../config/config'
import { postsAPI } from '../config/api'
import { getSessionValues } from '../utils/loginHelpers'
import { createCookie, eraseCookie, 
		USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from '../utils/cookieHelpers'

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'

export function signin(email, password) {
	return dispatch => {
		axios.post(postsApp.baseUrl + postsAPI.signin,
			{
				email: email,
				password: password,
			})
		.then(function(res){
			if (res && res.data && res.data.result) {
				dispatch(signinSuccess(email, res.data.user_id, res.data.session_id))
			}
		}).catch(function(err) {
			dispatch(signinError(err))
		})
	}
}

function signinSuccess(email, userId, sessionId) {
	createCookie(EMAIL_COOKIE, email)
	createCookie(USER_ID_COOKIE, userId)
	createCookie(SESSION_ID_COOKIE, sessionId)
	return {
		type: SIGNIN_SUCCESS,
	}
}

function signinError(error) {
	return {
		type: SIGNIN_ERROR,
	}
}

export function signup(firstName, middleName, lastName, email, password, consented) {
	return dispatch => {
		axios.post(postsApp.baseUrl + postsAPI.signup,
			{
				email,
				password,
				consented,
				first_name: firstName,
				last_name: lastName,
				middle_name: middleName,
			})
		.then(function(res){
			if (res && res.data && res.data.result) {
				dispatch(signupSuccess())
			}
		}).catch(function(err) {
			dispatch(signupError(err))
		})
	}
}

function signupSuccess() {
	return {
		type: SIGNUP_SUCCESS,
	}
}

function signupError(error) {
	return {
		type: SIGNUP_ERROR,
	}
}

export function signout() {
	return dispatch => {
		const { userId, sessionId, email } = getSessionValues()
		if (userId !== null && sessionId !== null && email !== null) {
			axios.post(postsApp.baseUrl + postsAPI.signout,
				{
					email: email,
					session_id: sessionId,
					user_id: userId,
				}, {
					headers: {
						pj_uid: userId,
						pj_e: email,
						pj_ssid: sessionId,
					},
			}).then(function(res){
				if (res && res.data && res.data.result) {
					dispatch(signoutSuccess(USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE))
				}
			})
		}
	}
}

function signoutSuccess(userIdCookie, emailCookie, sessionCookie) {
	eraseCookie(emailCookie)
	eraseCookie(sessionCookie)
	eraseCookie(userIdCookie)
	return {
		type: SIGNOUT_SUCCESS,
	}
}