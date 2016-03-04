'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import HowItWorks from './home/how-it-works';
import Actions from '../actions';
import Header from './home/header';
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
			<Header onLogIn={ this.props.actions.logIn } />
			<HowItWorks />
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
