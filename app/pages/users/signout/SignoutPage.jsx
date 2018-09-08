import React, { Component } from 'react'
import loading from '../../../assets/loading.gif'
import { Link } from 'react-router'

export default class SignoutPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			seconds: 3,
			startCountDown: true,	
		};
		this.timer = 0
		this.startTimer = this.startTimer.bind(this)
		this.countDown = this.countDown.bind(this)
	}

	startTimer() {
		if (this.timer === 0) {
		  this.timer = window.setInterval(this.countDown, 1000)
		}
	}

	countDown() {
		// Remove one second, set state so a re-render happens.
		let seconds = this.state.seconds - 1
		this.setState({
			seconds: seconds,
		});
		// Check if we're at zero.
		if (seconds === 0) {
			this.props.signoutHandler()
		}

		if (seconds === -1) {
			window.clearInterval(this.timer)
		}
	}

	render() {
		if (this.state.startCountDown) {
			this.startTimer()
		}
		let signoutPage = (
			<div>
				<p>You have signed out successfully.</p>
				<img src={loading}
					hidden={!this.props.userSigninState.signedIn}/>
				<br/>
				<Link to='/'>Go back to homepage.</Link>
			</div>
		)
		if (this.state.seconds === -1) {
			//disable redirection for class 3.
			//window.location.href = '/'
		}
		return signoutPage
	}
}


SignoutPage.propTypes = {
	userSigninState: React.PropTypes.shape({
		signedIn: React.PropTypes.bool.isRequired,
	}).isRequired,
}