'use strict';

/**
 * Dependencies
 */

import React from 'react';

import router from '../shared/router';
import Link from './link';


/**
 * Top navigation component
 */

const TopNavigation = React.createClass({
	getInitialState: function () {
		return {
			currentRoute: null
		};
	},

	componentWillMount: function () {
		this.setCurrentRoute();
		router.on('route', this.setCurrentRoute);
	},

	componentWillUnmount: function () {
		router.off('route', this.setCurrentRoute);
	},

	render: function () {
		let leftMenu = this.renderLeftMenu();
		let rightMenu = this.renderRightMenu();

		return <nav className="mt4 clearfix">
			{ leftMenu }
			{ rightMenu }
		</nav>;
	},

	menu: {
		loggedOut: {
			'/tour': 'Tour',
			'https://github.com/vdemedes/ohcrash-app/issues/new': 'Support'
		},

		loggedIn: {
			'/projects': 'Projects',
			'https://github.com/vdemedes/ohcrash-app/issues/new': 'Support'
		}
	},

	setCurrentRoute: function () {
		this.setState({
			currentRoute: router.currentRoute
		});
	},

	isLoggedIn: function () {
		return !!this.props.user;
	},

	isInDashboard: function () {
		let dashboardRoutes = [
			'newProject',
			'projects',
			'project'
		];

		return dashboardRoutes.indexOf(this.state.currentRoute) >= 0;
	},

	renderLeftMenu: function () {
		let links = this.isLoggedIn() ? this.menu.loggedIn : this.menu.loggedOut;

		let items = Object.keys(links).map(to => {
			let label = links[to];
			let link;

			if (to[0] === '/') {
				link = this.renderInternalLink(label, to);
			} else {
				link = this.renderRemoteLink(label, to);
			}

			return link;
		});

		let logoItem = this.renderLogo();
		items.unshift(logoItem);

		return <ul className="left list-reset mt0">
			{ items }
		</ul>;
	},

	renderRightMenu: function () {
		let items = [];

		let dashboardLink = this.renderInternalLink('Dashboard', '/projects');
		let docsLink = this.renderInternalLink('Docs', '/docs');
		let logInButton = this.renderLogInButton();
		let logOutLink = this.renderLogOutLink();

		items.push(docsLink);

		if (this.isLoggedIn()) {
			if (this.isInDashboard()) {
				items.push(logOutLink);
			} else {
				items.push(dashboardLink);
			}
		} else {
			items.push(logInButton);
		}

		return <ul className="right list-reset mt0">
			{ items }
		</ul>;
	},

	renderLogo: function () {
		return <li key="logo" className="inline-block mr2">
			<Link to="/" className="black logo-link">
				OhCrash
			</Link>
		</li>;
	},

	renderInternalLink: function (label, path) {
		return <li key={ path } className="inline-block mr2">
			<Link to={ path } className="grey">
				{ label }
			</Link>
		</li>;
	},

	renderRemoteLink: function (label, url) {
		return <li key={ url } className="inline-block mr2">
			<a href={ url } target="_blank" className="grey">
				{ label }
			</a>
		</li>;
	},

	renderLogInButton: function () {
		return <li key="login" className="inline-block">
			<a href="#" onClick={ this.logIn } className="btn btn--outline red">
				Sign In
			</a>
		</li>;
	},

	renderLogOutLink: function () {
		return <li key="logout" className="inline-block">
			<a href="#" onClick={ this.logOut } className="grey">
				Log Out
			</a>
		</li>;
	},

	logIn: function (e) {
		e.preventDefault();
		this.props.onLogIn();
	},

	logOut: function (e) {
		e.preventDefault();
		this.props.onLogOut();
	}
});


/**
 * Expose component
 */

module.exports = TopNavigation;
