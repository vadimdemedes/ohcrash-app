'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Content from './docs/content';
import Footer from '../components/footer';
import Link from '../components/link';
import Nav from './docs/nav';


/**
 * Docs page
 */

const DocsPage = React.createClass({
	getInitialState: function () {
		return {
			isSticky: false
		};
	},

	componentWillMount: function () {
		document.title = 'Docs - OhCrash';

		window.addEventListener('scroll', this.onScroll, false);
	},

	componentDidMount: function () {
		this.onScroll();
	},

	componentWillUnmount: function () {
		window.removeEventListener('scroll', this.onScroll);
	},

	render: function () {
		return <div className="mt4 clearfix">
			<Nav ref="nav" sticky={ this.state.isSticky } />
			<Content />
			<Footer />
		</div>;
	},

	onScroll: function () {
		let doc = document.documentElement;
		let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		this.setState({
			isSticky: top >= (this.refs.nav.offsetTop() - 20)
		});
	}
});


/**
 * Expose page
 */

export default DocsPage;
