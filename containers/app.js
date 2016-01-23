'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import TopNavigation from '../components/top-navigation';
import Actions from '../actions';


/**
 * App container
 */

const App = React.createClass({
	render: function () {
		let actions = this.props.actions;

		let navProps = {
			user: this.props.user,
			onLogIn: actions.logIn,
			onLogOut: actions.logOut
		};

		// url path classes
		let pathClasses = location.pathname.slice(1).split('/');

		let classes = [
			'container'
		].concat(pathClasses);

		return <div className={ classes.join(' ') }>
			<TopNavigation { ...navProps } />

			{ this.props.children }
		</div>;
	}
});


/**
 * Connect to store
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
 * Expose container
 */

export default connect(mapStateToProps, mapDispatchToProps)(App);
