'use strict';

/**
 * Dependencies
 */

import moment from 'moment';
import React from 'react';

import { projectPath } from '../helpers/urls';
import Link from './link';


/**
 * Project list component
 */

const ProjectList = React.createClass({
	render: function () {
		if (this.props.projects.length === 0) {
			return <ul />;
		}

		let projects = this.props.projects.map(project => {
			let lastError = 'No errors reported yet';

			if (project.lastErrorAt) {
				lastError = 'Last error reported ' + moment(new Date(project.lastErrorAt)).fromNow();
			}

			return <li key={ project.githubId } className="mb2">
				<Link to={ projectPath(project.name) }>
					{ project.fullName }
				</Link>

				<span className="block grey">
					{ lastError }
				</span>
			</li>;
		});

		return <ul className="list-reset mt3">
			{ projects }
		</ul>;
	}
});


/**
 * Expose component
 */

export default ProjectList;
