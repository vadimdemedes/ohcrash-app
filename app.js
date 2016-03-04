'use strict';

/**
 * Error reporting
 */

import OhCrash from 'ohcrash';

OhCrash(process.env.OHCRASH_API_KEY);


/**
 * Dependencies
 */

import { Provider } from 'react-redux';
import Firebase from 'firebase';
import ReactDOM from 'react-dom';
import React from 'react';

import Actions from './actions';
import router from './shared/router';
import store from './shared/store';
import App from './containers/app';

import NewProjectPage from './pages/new-project';
import ProjectsPage from './pages/projects';
import ProjectPage from './pages/project';
import HomePage from './pages/home';
import DocsPage from './pages/docs';
import TourPage from './pages/tour';

import Project from './models/project';
import User from './models/user';


/**
 * Set up models
 */

const ref = new Firebase('https://ohcrash.firebaseio.com');

Project.setup(ref);
User.setup(ref);


/**
 * Initialize & monitor auth state
 */

let currentUser = User.currentUser();

let unsubscribe;

// monitor auth changes
ref.onAuth(data => {
	if (!data) {
		if (unsubscribe) {
			unsubscribe();
		}

		store.dispatch(Actions.setUser(null));
		store.dispatch(Actions.setProjects([]));
		store.dispatch(Actions.transitionTo('/'));
		return;
	}

	store.dispatch(Actions.setUser(User.currentUser()));
	unsubscribe = store.dispatch(Actions.watchProjects());
});


/**
 * Dispatcher
 */

const Dispatcher = React.createClass({
	getInitialState: function () {
		return {
			component: null,
			params: {}
		};
	},

	componentWillMount: function () {
		router.on('route:home', () => this.transition(HomePage));
		router.on('route:projects', () => this.transition(ProjectsPage));
		router.on('route:newProject', () => this.transition(NewProjectPage));
		router.on('route:project', project => this.transition(ProjectPage, { project }));
		router.on('route:docs', () => this.transition(DocsPage));
		router.on('route:tour', () => this.transition(TourPage));
		router.run();
	},

	componentWillUnmount: function () {
		router.off();
	},

	render: function () {
		let component;

		if (this.state.component) {
			component = React.createElement(this.state.component, {
				params: this.state.params
			});
		}

		return <Provider store={ store }>
			<App>
				{ component }
			</App>
		</Provider>;
	},

	transition: function (component, params) {
		this.setState({ component, params });
	}
});


ReactDOM.render(<Dispatcher />, document.getElementById('app'));
