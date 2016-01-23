'use strict';

/**
 * Serialize model
 */

export default function serialize (model) {
	if (!model) {
		return model;
	}

	return model.serialize ? model.serialize() : model;
}
