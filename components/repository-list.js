'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Repository list component
 *
 * Used in "New Project" page
 */

const RepositoryList = React.createClass({
	render: function () {
		let classes = [
			'list-reset'
		];

		if (this.props.className) {
			classes.push(this.props.className);
		}

		let repositories = this.props.repositories.map(this.renderItem);

		return <ul className={ classes.join(' ') }>
			{ repositories }
		</ul>;
	},

	renderItem: function (repository) {
		return <li key={ repository.id }>
			<a href="#" onClick={ this.selectRepository.bind(this, repository) }>
				{ repository.full_name }
			</a>
		</li>;
	},

	selectRepository: function (repository, e) {
		e.preventDefault();

		if (this.props.onClick) {
			this.props.onClick(repository);
		}
	}
});


/**
 * Expose component
 */

export default RepositoryList;
