'use strict';

/**
 * Dependencies
 */

import React from 'react';

import SignUpButton from '../../components/sign-up-button';
import Link from '../../components/link';


/**
 * Header for homepage
 */

const Header = React.createClass({
	render: function () {
		return <header className="clearfix mt10 mb4">
			<div className="md-col md-col-6">
				<h1>Fix errors before users even notice them.</h1>
				<p>
					OhCrash catches JavaScript errors and instantly opens nicely
					formed issues in the GitHub repository of your choice.
				</p>

				<SignUpButton onClick={ this.props.onSignUp } />
				<Link to="/tour" className="btn btn--outline blue ml1">Take a tour</Link>
			</div>

			<div className="md-col md-col-6">
				<img src="/images/sunny.png" className="w300 block mx-auto" />

				<span className="block center mt2 grey">Your app, when you <b className="underline">use</b> OhCrash.</span>
			</div>
		</header>;
	}
});


/**
 * Expose component
 */

export default Header;
