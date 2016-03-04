'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import React from 'react';

import { projectPath } from '../helpers/urls';
import ProjectList from '../components/project-list';
import Actions from '../actions';
import Link from '../components/link';


/**
 * Projects page
 */

const ProjectsPage = React.createClass({
	componentDidMount: function () {
		document.title = 'Projects - OhCrash';
	},

	render: function () {
		return this.renderContent();
	},

	renderContent: function () {
		if (this.props.projects.length === 0) {
			return this.renderTutorial();
		}

		return <div className="mt4">
			<h1 className="center">Your Projects</h1>

			<div className="mt4">
				<ProjectList projects={ this.props.projects } />
			</div>
		</div>;
	},

	renderTutorial: function () {
		return <div className="center mt4">
			<img src="/images/no-apps.png" className="w200 weather-demo" />

			<p className="mt3">
				You haven't created any projects yet.<br/>But no worries, you can try creating one now!
			</p>

			<Link to="/projects/new" className="primary-btn">New project</Link>
		</div>;
	}
});


/**
 * Build props
 */

function mapStateToProps (state) {
	return {
		projects: state.projects,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
