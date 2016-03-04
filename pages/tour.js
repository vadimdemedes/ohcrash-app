'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import CallToAction from '../components/call-to-action';
import HowItWorks from './tour/how-it-works';
import Actions from '../actions';
import Footer from '../components/footer';
import Header from './tour/header';
import Link from '../components/link';


/**
 * Tour page
 */

const TourPage = React.createClass({
	componentWillMount: function () {
		document.title = 'Tour - OhCrash';
	},

	render: function () {
		return <div>
			<Header />
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

export default connect(mapStateToProps, mapDispatchToProps)(TourPage);
