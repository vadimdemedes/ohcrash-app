'use strict';

/**
 * Dependencies
 */

import { transitionTo } from './transition';
import * as ActionTypes from '../constants/action-types';
import serialize from '../helpers/serialize';
import User from '../models/user';
import { projectsPath } from '../helpers/urls';


/**
 * User
 */


/**
 * Log in and redirect to user's dashboard
 */

export function logIn () {
	return (dispatch, getState) => {
		let user = getState().user;

		if (user) {
			dispatch(transitionTo(projectsPath()));
			return Promise.resolve();
		}

		return User.logIn()
			.then(user => {
				dispatch(setUser(user));
				dispatch(transitionTo(projectsPath()));
			})
			.catch(err => {
				// TODO: check err
				User.logOut();
				dispatch(transitionTo('/'));
			});
	};
}


/**
 * Set current user
 */

export function setUser (user) {
	return {
		type: ActionTypes.SET_USER,
		data: serialize(user)
	};
}


/**
 * Log out
 */

export function logOut () {
	return dispatch => {
		User.logOut();
		dispatch(setUser(null));
		dispatch(transitionTo('/'));
	};
}
