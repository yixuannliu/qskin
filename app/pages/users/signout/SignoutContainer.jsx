import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignoutPage from './SignoutPage'
import { signout } from "../../../actions/userActions"

class SignoutContainer extends Component {
	render() {
		return (
			<div>
				<SignoutPage
					userSigninState={this.props.userSigninState}
					signoutHandler={this.signoutHandler.bind(this)}
				/>
			</div>
		)
	}

	signoutHandler() {
		this.props.dispatch(signout())
	}
}

function select(state) {
	return {
		userSigninState: state.userSigninState,
	}
}

export default connect(select)(SignoutContainer)