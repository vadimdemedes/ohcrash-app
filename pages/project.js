'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { projectPath } from '../helpers/urls';
import Actions from '../actions';
import Link from '../components/link';

import content from './text/new-project.md';


/**
 * Project page
 */

const ProjectPage = React.createClass({
	componentDidUpdate: function () {
		let project = this.getProject();

		if (project) {
			document.title = project.fullName + ' - OhCrash';
		}
	},

	render: function () {
		let project = this.getProject();

		if (!project) {
			return null;
		}

		let tutorial = content.replace('your api key', project.apiKey);

		return <div className="mt4">
			<h1 className="center">{ project.fullName }</h1>

			<div className="mt4 max-width-4 mx-auto" dangerouslySetInnerHTML={{ __html: tutorial }} />
		</div>;
	},

	getProject: function () {
		let projects = this.props.projects.filter(project => {
			return project.name === this.props.params.project;
		});

		if (projects.length === 0) {
			return null;
		}

		return projects[0];
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
