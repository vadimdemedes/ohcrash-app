'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Sign up button component
 */

const SignUpButton = React.createClass({
	render: function () {
		return <a href="#" onClick={ this.onClick } className="primary-btn">
			<img src="/images/github-icon.svg" className="btn-icon" /> Sign up with GitHub
		</a>;
	},

	onClick: function (e) {
		e.preventDefault();
		this.props.onClick();
	}
});


/**
 * Expose component
 */

export default SignUpButton;
