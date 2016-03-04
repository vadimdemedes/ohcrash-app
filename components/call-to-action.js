'use strict';

/**
 * Dependencies
 */

import React from 'react';

import SignUpButton from './sign-up-button';


/**
 * Call to Action component
 */

const CallToAction = React.createClass({
	render: function () {
		return <div className="center">
			<h1>Ready for dead-simple error reporting?</h1>
			<p className="max-width-2 mx-auto">
				Sign up for free via GitHub now. No credit cards, no emails, no passwords.
			</p>

			<SignUpButton onClick={ this.props.onSignUp } />
		</div>;
	}
});


/**
 * Expose component
 */

export default CallToAction;
