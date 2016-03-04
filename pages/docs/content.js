'use strict';

/**
 * Dependencies
 */

import React from 'react';

import content from '../text/docs.md';


/**
 * Docs content
 */

const Content = React.createClass({
	render: function () {
		return <div className="px4 pb4 md-col md-col-9" dangerouslySetInnerHTML={{ __html: content }} />;
	}
});


/**
 * Expose component
 */

export default Content;
