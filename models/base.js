'use strict';

/**
 * Dependencies
 */

import Backbone from 'backbone';
import Promise from 'pinkie-promise';
import omit from 'object.omit';


/**
 * Base model
 */

const Base = Backbone.Model.extend({
	initialize: function (attrs = {}, options = {}) {
		if (attrs._ref) {
			delete attrs._ref;
		}

		this._ref = options.ref;
	},

	ref: function () {
		return this._ref;
	},

	serialize: function () {
		let attrs = this.toJSON();
		attrs._ref = this.ref();

		return attrs;
	},

	save: function (options = {}) {
		let self = this;

		return new Promise((resolve, reject) => {
			function onComplete (err) {
				if (err) {
					reject(err);
					return;
				}

				resolve(self);
			}

			if (options.update) {
				this.ref().update(this.changed, onComplete);
			} else {
				this.ref().set(this.toJSON(), onComplete);
			}
		});
	},

	remove: function () {
		return new Promise((resolve, reject) => {
			this.ref().remove(err => {
				if (err) {
					reject(err);
					return;
				}

				resolve(this);
			});
		});
	}
}, {
	setup: function (firebaseRef) {
		this.rootRef = firebaseRef;
	},

	unserialize: function (data) {
		let ref = data._ref;
		let attrs = omit(data, '_ref');

		return new this(attrs, { ref });
	}
});


/**
 * Expose model
 */

export default Base;
