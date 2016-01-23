'use strict';

/**
 * Dependencies
 */

import { SET_USER } from '../constants/action-types';


/**
 * User reducer
 */

function user (state = null, action) {
	switch (action.type) {
		case SET_USER:
			return action.data;

		default:
			return state;
	}
}


/**
 * Expose reducer
 */

export default user;
