'use strict';

/**
 * Dependencies
 */

import assign from 'object-assign';

import * as TransitionActions from './transition';
import * as ProjectActions from './project';
import * as UserActions from './user';


/**
 * Expose all actions at once
 */

const actions = assign(
	{},
	TransitionActions,
	ProjectActions,
	UserActions
);

export default actions;
