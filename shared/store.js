'use strict';

/**
 * Dependencies
 */

import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import appReducer from '../reducers';
import router from './router';


/**
 * Transition middleware
 */

function transitionMiddleware () {
	return next => {
		return action => {
			let hasTransition = typeof action === 'object' && action.transition;

			if (!hasTransition) {
				return next(action);
			}

			let options = {};

			if (action.transition.replace) {
				options.replace = true;
			} else {
				options.trigger = true;
			}

			let path = action.transition.to;

			if (path[0] === '/') {
				path = path.slice(1);
			}

			router.navigate(path, options);
		};
	};
}


/**
 * Store
 */

const createAppStore = applyMiddleware(
	thunkMiddleware,
	transitionMiddleware
)(createStore);

const store = createAppStore(appReducer);


/**
 * Expose store
 */

export default store;
