'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Link from '../../components/link';


/**
 * Navigation for Docs
 */

const Nav = React.createClass({
	render: function () {
		let classes = [];

		if (this.props.sticky) {
			classes.push('fixed', 'top-0', 'py2');
		}

		return <nav className="md-col md-col-3" ref="nav" style={{ minHeight: '1px' }}>
			<div className={ classes.join(' ') }>
				<h4 className="m0">Getting Started</h4>
				{ this.renderList(this.content.gettingStarted) }

				<h4 className="m0">Advanced Zone</h4>
				{ this.renderList(this.content.advancedZone) }
			</div>
		</nav>;
	},

	content: {
		gettingStarted: {
			'Introduction': '#getting-started',
			'Installation': '#installation',
			'Usage': '#usage'
		},

		advancedZone: {
			'Configuration': '#configuration',
			'Uncaught exceptions': '#uncaught-exceptions',
			'Unhandled rejections': '#unhandled-rejections',
			'Errors in browser': '#errors-in-browser',
			'Reporting errors': '#reporting-errors'
		}
	},

	renderList: function (links) {
		let items = Object.keys(links).map(label => {
			let path = links[label];
			let activeByDefault = path === '#getting-started';

			return <li key={ label } className="mb04">
				<Link to={ path } activeByDefault={ activeByDefault } className="grey">{ label }</Link>
			</li>;
		});

		return <ul className="list-reset mt1 mb3">
			{ items }
		</ul>;
	},

	offsetTop: function () {
		return this.refs.nav.offsetTop;
	}
});


/**
 * Expose component
 */

export default Nav;
