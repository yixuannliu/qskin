import React, {Component} from 'react'
import { connect } from 'react-redux'
import SignupForm from './SignupForm'
import { signup } from "../../../actions/userActions"

class SignupContainer extends Component {
	render() {
		return (
			<div>
				<SignupForm
					signupHandler = {this.signupHandler.bind(this)}
					userSignupState = {this.props.userSignupState}
				/>
			</div>
		)
	}

	signupHandler(firstName, middleName, lastName, email, password, consented) {
		this.props.dispatch(signup(firstName, middleName, lastName, email, password, consented))
	}
}

function select(state) {
	return {
		userSignupState: state.userSignupState,
	}
}

export default connect(select)(SignupContainer)