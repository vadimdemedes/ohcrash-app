'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { transitionTo } from '../actions/transition';
import router from '../shared/router';
import store from '../shared/store';


/**
 * Link component
 */

const Link = React.createClass({
	getInitialState: function () {
		return {
			isActive: false
		};
	},

	componentWillMount: function () {
		this.checkIfActive();

		router.on('route', this.checkIfActive);
		window.addEventListener('hashchange', this.checkIfActive, false);
	},

	componentWillUnmount: function () {
		router.off('route', this.checkIfActive);
		window.removeEventListener('hashchange', this.checkIfActive);
	},

	checkIfActive: function () {
		let isActive = router.test(this.props.to);

		if (!isActive && location.hash === this.props.to) {
			isActive = true;
		}

		if (!isActive && this.props.activeByDefault && (location.hash === '#' || location.hash === '')) {
			isActive = true;
		}

		this.setState({ isActive });
	},

	render: function () {
		let props = {
			className: this.props.className,
			href: this.props.to,
			onClick: this.navigate
		};

		if (this.state.isActive) {
			props.className += ' is-active';
		}

		return <a { ...props }>{ this.props.children }</a>;
	},

	navigate: function (e) {
		let path = this.props.to;

		if (!path) {
			throw new Error('Expected a target in Link');
		}

		if (path[0] === '#') {
			return;
		}

		e.preventDefault();

		store.dispatch(transitionTo(path));
	}
});


/**
 * Expose component
 */

export default Link;
