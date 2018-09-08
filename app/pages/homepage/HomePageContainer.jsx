import React, { Component } from 'react'
import Banner from './Banner'
import CreatePost from '../posts/CreatePost'
import PostsList from '../posts/PostsList'

export default class HomePageContainer extends Component {

	render() {
		return (
			<div>
				<Banner/>
				<CreatePost/>
				<PostsList/>
			</div>
		)
	}
}