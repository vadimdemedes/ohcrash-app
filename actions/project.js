'use strict';

/**
 * Dependencies
 */

import * as ActionTypes from '../constants/action-types';
import { transitionTo } from './transition';
import { projectPath } from '../helpers/urls';
import serialize from '../helpers/serialize';
import Project from '../models/project';


/**
 * Project actions
 */


/**
 * Watch for project updates
 */

export function watchProjects () {
	return (dispatch, getState) => {
		let user = getState().user;

		if (!user) {
			return;
		}

		let projectsRef = Project.rootRef.child('projects').child(user.id);

		projectsRef.on('value', snapshot => {
			let projects = [];

			snapshot.forEach(child => {
				let project = new Project(child.val(), {
					ref: child.ref()
				});

				projects.push(project);
			});

			dispatch(setProjects(projects));
		});

		return () => {
			projectsRef.off();
		};
	};
}


/**
 * Create project
 */

export function createProject (attrs) {
	return (dispatch, getState) => {
		let user = getState().user;

		attrs.userId = user.id;

		return Project.create(attrs).then(project => {
			dispatch(addProject(project));
			dispatch(transitionTo(projectPath(project.get('name'))));

			return project;
		});
	};
}


/**
 * Add project
 */

export function addProject (attrs) {
	return {
		type: ActionTypes.ADD_PROJECT,
		data: serialize(attrs)
	};
}


/**
 * Set projects
 */

export function setProjects (projects) {
	return {
		type: ActionTypes.SET_PROJECTS,
		data: projects.map(serialize)
	};
}
