'use strict';

/**
 * Dependencies
 */

import moment from 'moment';
import React from 'react';

import { projectPath } from '../helpers/urls';
import groupBy from '../helpers/group-by';
import Link from './link';


/**
 * Project list component
 */

const ProjectList = React.createClass({
	render: function () {
		if (this.props.projects.length === 0) {
			return null;
		}

		let groups = groupBy(this.props.projects, 3);

		let rows = groups.map(projects => {
			return projects.map(project => {
				return <div key={ project.githubId } className="p2 md-col md-col-4">
					<Link to={ projectPath(project.name) }>
						<div className="grid-list-item p2">
							{ project.name }
							<span className="block grey">{ getLastError(project) }</span>
						</div>
					</Link>
				</div>;
			});
		});

		let addItem = this.renderAddItem();

		if (rows.length > 0) {
			let lastIndex = rows.length - 1;

			if (rows[lastIndex].length === 3) {
				rows.push([addItem]);
			} else {
				rows[lastIndex].push(addItem);
			}
		}

		rows = rows.map((row, index) => {
			return <div key={ index } className="clearfix mxn2">{ row }</div>;
		});

		return <div>{ rows }</div>;
	},

	renderAddItem: function () {
		return <div key="new-project" className="p2 md-col md-col-4">
			<Link to="/projects/new">
				<div className="grid-list-item p2 is-action center">
					<img src="/images/plus.svg" className="w28 block mx-auto" />
					New project
				</div>
			</Link>
		</div>;
	}
});


/**
 * Helpers
 */

function getLastError (project) {
	let lastError = 'No errors reported yet';

	if (project.lastErrorAt) {
		lastError = 'Last error reported ' + moment(new Date(project.lastErrorAt)).fromNow();
	}

	return lastError;
}


/**
 * Expose component
 */

export default ProjectList;
