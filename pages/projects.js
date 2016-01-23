'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import DashboardWrapper from '../components/dashboard-wrapper';
import { projectPath } from '../helpers/urls';
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
		return <DashboardWrapper>
			{ this.renderNav() }
			{ this.renderContent() }
		</DashboardWrapper>;
	},

	renderNav: function () {
		if (this.props.projects.length === 0) {
			return;
		}

		return <div className="clearfix">
			<h3 className="mt0 left">Your projects</h3>

			<div className="right">
				<Link to="/projects/new" className="btn btn-primary bg-red white">New project</Link>
			</div>
		</div>;
	},

	renderContent: function () {
		if (this.props.projects.length === 0) {
			return this.renderTutorial();
		}

		let projects = this.props.projects.map(project => {
			return <li key={ project.githubId } className="mb2">
				<Link to={ projectPath(project.name) }>{ project.fullName }</Link>
				<span className="block grey">Last error reported 4 days ago</span>
			</li>;
		});

		return <ul className="list-reset mt3">{ projects }</ul>;
	},

	renderTutorial: function () {
		return <div className="center">
			<h3>Your projects will be shown here</h3>

			<p>
				Create your first project by clicking on "New project" button below.
			</p>

			<Link to="/projects/new" className="btn btn-primary bg-red white">New project</Link>
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
