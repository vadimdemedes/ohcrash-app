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
		'': 'home',
		'projects': 'projects',
		'projects/new': 'newProject',
		'projects/:name': 'project',
		'settings': 'settings',
		'docs': 'docs',
		'tour': 'tour'
	}
});


/**
 * Expose router
 */

export default router;
