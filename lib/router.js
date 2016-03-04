'use strict';

/**
 * Dependencies
 */

import Backbone from 'backbone';


/**
 * Router
 */

const Router = Backbone.Router.extend({
	initialize: function () {
		this.currentRoute = null;
	},

	run: function () {
		this.on('route', this.onChange);

		Backbone.history.start({ pushState: true });
	},

	onChange: function (route) {
		this.currentRoute = route;

		let hash = location.hash;

		if (hash !== '#' && hash !== '') {
			setTimeout(() => {
				location.hash = '#non-existent';
				location.hash = hash;
			}, 100);
		}

		window.scrollTo(0, 0);
	},

	test: function (url) {
		let pattern;

		Object.keys(this.routes).forEach(pat => {
			let route = this.routes[pat];

			if (this.currentRoute === route) {
				pattern = pat;
			}
		});

		if (url[0] === '/') {
			url = url.slice(1);
		}

		return this._routeToRegExp(pattern).test(url);
	}
});


/**
 * Expose router
 */

export default Router;
