import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import HeaderContainer from './common/HeaderContainer'

export default class AppContainer extends Component {

	componentWillMount() {
		//todo: checks user signin status
	}

	render() {
		const pathname = this.props.location.pathname
		return (
			<div>
				<HeaderContainer/>
				<ReactCSSTransitionGroup
					transitionName="overall"
					transitionEnterTimeout={1000}
					transitionLeaveTimeout={1000}
				>
					{React.cloneElement(this.props.children, {
						key: pathname,
					})}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}