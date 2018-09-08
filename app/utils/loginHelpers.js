import { readCookie, eraseCookie, USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from './cookieHelpers'

export function verifyUserLoginState(loginCb, logoutCb) {
	const { userId, sessionId, email } = getSessionValues()

	if (!(userId && sessionId && email)) {
		logoutCb()
	} else {
		loginCb()
	}
}

export function signoutUser() {
	for (const c of ['fe_el', 'fe_el_id', 'fe_sk_el']) {
		eraseCookie(c)
	}
}

export function getSessionValues() {
	let email = readCookie(EMAIL_COOKIE)
	return {
		userId: readCookie(USER_ID_COOKIE) || '',
		sessionId: readCookie(SESSION_ID_COOKIE) || '',
		email: email === null ? '' : email.replace('%40', '@'),
	}
}

export function requireAuth(nextState, replace) {
	const { userId, sessionId, email } = getSessionValues()
	if (!(userId && sessionId && email)) {
		replace({pathname: '/users/signin'});
	}
}
