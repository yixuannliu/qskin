require('./stylesheets/vendor/bootstrap/css/bootstrap.min.v.3.3.5.css')
require('./stylesheets/app.scss')

import React from 'react'
import { render } from 'react-dom'
import { Route, Router } from 'react-router'
import { Provider } from 'react-redux'
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import root from './reducers'
import { createStore } from 'redux'
import HomePageContainer from './pages/homepage/HomePageContainer'
import SignupContainer from './pages/users/signup/SignupContainer'
import SigninContainer from './pages/users/signin/SigninContainer'
import SignoutContainer from './pages/users/signout/SignoutContainer'
import AppContainer from './pages/AppContainer'

let store = createStore(root,
	compose(
		applyMiddleware(thunk),
	)
)

let routes = (<div className="app">
			<Provider store={store}>
				<Router>
					<Route name="main" component={AppContainer}>
						<Route name="home" path="/" component={HomePageContainer}/>
						<Route name="home" path="users/signup" component={SignupContainer}/>
						<Route name="home" path="users/signin" component={SigninContainer}/>
						<Route name="home" path="users/signout" component={SignoutContainer}/>
					</Route>
				</Router>
			</Provider>
		</div>
)

render(routes, document.getElementById('root'))
