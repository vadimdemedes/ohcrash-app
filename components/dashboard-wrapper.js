'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Link from './link';


/**
 * Wrapper for authorized area pages
 */

const DashboardWrapper = React.createClass({
	render: function () {
		return <div className="sm-container px2 sm-px0">
			<Link to="/">
				<img src="/images/logo.svg" className="w100 mt2 block block-center" />
			</Link>

			<div className="mt4 py3">
				{ this.props.children }
			</div>
		</div>;
	}
});


/**
 * Expose component
 */

export default DashboardWrapper;
