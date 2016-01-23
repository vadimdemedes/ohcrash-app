'use strict';

/**
 * Dependencies
 */

import { SET_PROJECTS, ADD_PROJECT } from '../constants/action-types';


/**
 * Projects reducer
 */

function projects (state = [], action) {
	switch (action.type) {
		case SET_PROJECTS:
			return action.data;

		case ADD_PROJECT:
			return [action.data].concat(state);

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default projects;
