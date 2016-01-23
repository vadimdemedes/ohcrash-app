'use strict';

/**
 * Dependencies
 */

import Router from '../lib/router';


/**
 * Router
 */

const router = new Router({
	routes: {
		'': 'homepage',
		'projects': 'projects',
		'projects/new': 'newProject',
		'projects/:name': 'project',
		'settings': 'settings'
	}
});


/**
 * Expose router
 */

export default router;
