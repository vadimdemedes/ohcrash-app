'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Header for homepage
 */

const Header = React.createClass({
	render: function () {
		return <header className="mt4 center">
			<img src="/images/speed.svg" className="w128 mb2" />

			<h1 className="m0">From 0 to 60 with OhCrash</h1>
			<p className="mt0">
				Everything you need to understand what OhCrash is and get started.
			</p>
		</header>;
	}
});


/**
 * Expose component
 */

export default Header;
