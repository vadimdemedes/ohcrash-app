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
 * Project page
 */

const ProjectPage = React.createClass({
	componentDidMount: function () {
		let project = this.getProject();

		if (project) {
			document.title = project.fullName + ' - OhCrash';
		}
	},

	render: function () {
		let project = this.getProject();

		if (!project) {
			return <div />;
		}

		let [ user, name ] = project.fullName.split('/');

		return <DashboardWrapper>
			<div className="clearfix">
				<h3 className="mt0 left">
					<span className="grey">{ user } / </span>
					{ name }
				</h3>

				<div className="right">
					<Link to="/projects" className="btn red">All projects</Link>
				</div>
			</div>

			<p className="mt3">
				Follow these steps to configure your JavaScript application to use OhCrash:
			</p>

			<ul className="list-reset">
				<li>
					<h3>1. Install OhCrash client library</h3>
					<p>
						OhCrash library works in both Node.js and browser environments.
					</p>

					{ this.renderInstallExample() }
				</li>

				<li className="mt4">
					<h3>2. Initialize it with your API key</h3>
					<p>
						Use this code to initialize OhCrash client library (API key is pre-filled):
					</p>

					{ this.renderCodeExample() }
				</li>

				<li className="mt4">
					<h3>3. Watch <a href={ 'https://github.com/' + project.fullName }>{ project.fullName }</a> for new issues</h3>
					<p>
						As soon as new errors are reported from your application,
						OhCrash opens new issue for each unique error.
					</p>
				</li>
			</ul>
		</DashboardWrapper>;
	},

	renderInstallExample: function () {
		return <pre className="bg-black white p2 rounded">
			<code>
				<span className="grey">$ </span>
				<span className="blue">npm install </span>
				<span className="green">ohcrash </span>
				<span className="grey">--save</span>
			</code>
		</pre>;
	},

	renderCodeExample: function () {
		let project = this.getProject();

		return <pre className="bg-black white p2 rounded">
			<code>
				<span className="blue">require</span>
				<span className="grey">(</span>
				<span className="green">'ohcrash'</span>
				<span className="grey">)(</span>
				<span className="green">'{ project.apiKey }'</span>
				<span className="grey">);</span>
			</code>
		</pre>;
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
