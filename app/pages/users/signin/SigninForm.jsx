require('../../../stylesheets/pages.users.scss')
import React, { Component } from 'react'
import { Link } from 'react-router'
import { validateEmail } from '../../../utils/validationHelpers'

export default class SigninForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			errorMessage: '',
			validEmail: false,
			validPassword: false,
		}
	}

	render() {
		if (!this.props.userSigninState.signedIn) {
			return (<div className="text-center" style={{color:'green'}}>
				<form className="user-form" id="signinForm" name="signupForm">
					<div className="long-message">{this.state.errorMessage}</div>
					<div>
						<input className="form-control form-field-first"
							aria-label="email"
							placeholder="Provide your email" 
							type="email"
							value={this.state.email}
							onChange = {this.handleChangeEmail.bind(this)}
							/>
					</div>
					<div>
						<input className="form-control form-field-last"
							aria-label="password"
							placeholder="Create a new password" 
							type="password"
							value = {this.state.password}
							onChange = {this.handleChangePassword.bind(this)}
							/>
					</div>
					<div>
						<button className="btn btn-primary btn-block" type="submit" 
								disabled={!(this.state.validEmail && this.state.validPassword)} 
								onClick={this.handleClickSignIn.bind(this)}
								>
							<div>
								<span style={{color:'red'}}>Sign in</span>
							</div>
						</button>
					</div>
					<div id="redirectSignup" className="redirect-message">
						Don't have an account yet? <Link to="/users/signup">Click to sign up.</Link>
					</div>
				</form>
			</div>)}
		return (<div><p>sign in successful</p></div>)
	}

	handleChangeEmail(event) {
		this.setState({
			email: event.target.value,
		})
		if (!validateEmail(event.target.value)) {
			this.setState({
				errorMessage: 'Email format error.',
				validEmail: false,
			})
		} else {
			this.setState({
				errorMessage: '',
				validEmail: true,
			})
		}
	}

	handleChangePassword(event) {
		this.setState({
			password: event.target.value,
		})
		if (event.target.value.length === 0) {
			this.setState({
				errorMessage: 'Password is required',
				validPassword: false,
			})
		} else {
			this.setState({
				errorMessage: '',
				validPassword: true,
			})
		}
	}

	handleClickSignIn(event) {
		event.preventDefault()
		let email = this.state.email
		let password = this.state.password
		if (this.state.validEmail && this.state.validPassword) {
			this.props.signinHandler(email, password)
		} else {
			this.setState({
				errorMessage: 'Invalid input. Check email and password.',
			})
		}
	}
}