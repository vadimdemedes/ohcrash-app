'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import CallToAction from '../components/call-to-action';
import HowItWorks from './home/how-it-works';
import Actions from '../actions';
import Header from './home/header';
import Footer from '../components/footer';
import Link from '../components/link';


/**
 * Home page
 */

const HomePage = React.createClass({
	componentWillMount: function () {
		document.title = 'OhCrash - Error reporting for JS apps';
	},

	render: function () {
		return <div>
			<Header onSignUp={ this.props.actions.logIn } />
			<HowItWorks />

			<div className="mt8">
				<CallToAction onSignUp={ this.props.actions.logIn } />
			</div>

			<Footer />
		</div>;
	}
});


/**
 * Build props
 */

function mapStateToProps (state) {
	return {
		user: state.user
	};
}

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}


/**
 * Expose page
 */

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
