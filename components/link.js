'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { transitionTo } from '../actions/transition';
import store from '../shared/store';


/**
 * Link component
 */

const Link = React.createClass({
	render: function () {
		let props = {
			className: this.props.className,
			href: this.props.to,
			onClick: this.navigate
		};

		return <a { ...props }>{ this.props.children }</a>;
	},

	navigate: function (e) {
		e.preventDefault();

		if (!this.props.to) {
			throw new Error('Expected a target in Link');
		}

		store.dispatch(transitionTo(this.props.to));
	}
});


/**
 * Expose component
 */

export default Link;
