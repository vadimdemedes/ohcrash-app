'use strict';

/**
 * Dependencies
 */

import Backbone from 'backbone';


/**
 * Router
 */

const Router = Backbone.Router.extend({
	run: function () {
		Backbone.history.start({ pushState: true });
	}
});


/**
 * Expose router
 */

export default Router;
