'use strict';

/**
 * Dependencies
 */

import { combineReducers } from 'redux';

import projects from './projects';
import user from './user';


/**
 * Main reducer function
 */

const reducer = combineReducers({
	projects,
	user
});


/**
 * Expose reducer
 */

export default reducer;
