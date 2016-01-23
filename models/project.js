'use strict';

/**
 * Dependencies
 */

import randomToken from 'rand-token';
import url from 'url-join';

import Model from './base';


/**
 * Project model
 */

const Project = Model.extend({

}, {
	create: function (attrs) {
		if (!attrs) {
			throw new Error('Expected attributes object in Project.create()');
		}

		let userId = attrs.userId;
		delete attrs.userId;

		let ref = this.rootRef.child(url('projects',userId)).push();
		attrs.apiKey = randomToken.generate(24);

		let project = new Project(attrs, { ref });

		this.rootRef.child(url('refs', attrs.apiKey)).set({
			user: userId,
			project: ref.key()
		});

		return project.save();
	}
});


/**
 * Expose model
 */

export default Project;
