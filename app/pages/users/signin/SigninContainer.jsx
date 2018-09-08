import React, { Component } from 'react'
import { connect } from 'react-redux'
import SigninForm from './SigninForm'
import { signin } from '../../../actions/userActions'

class SigninContainer extends Component {
	render() {
		return (
			<div>
				<SigninForm
					signinHandler = {this.signinHandler.bind(this)}
					userSigninState = {this.props.userSigninState}
				/>
			</div>
		)
	}

	signinHandler(email, password) {
		this.props.dispatch(signin(email, password))
	}
}

function select(state) {
	return {
		userSigninState: state.userSigninState,
	}
}

export default connect(select)(SigninContainer)