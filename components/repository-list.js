'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Link from './link';


/**
 * Repository list component
 */

const RepositoryList = React.createClass({
	render: function () {
		if (this.props.repositories.length === 0) {
			return null;
		}

		let groups = groupBy(this.props.repositories, 3);

		let rows = groups.map(repositories => {
			return repositories.map(repository => {
				return <div key={ repository.id } className="p2 md-col md-col-4">
					<a href="#" onClick={ this.selectRepository.bind(this, repository) }>
						<div className="grid-list-item p2">
							{ repository.full_name }
						</div>
					</a>
				</div>;
			});
		});

		rows = rows.map((row, index) => {
			return <div key={ index } className="clearfix mxn2">{ row }</div>;
		});

		return <div>{ rows }</div>;
	},

	selectRepository: function (repository, e) {
		e.preventDefault();

		if (this.props.onClick) {
			this.props.onClick(repository);
		}
	}
});


/**
 * Helpers
 */

function groupBy (arr, n) {
	let newArr = [];
	let currArr = [];

	let k = 0;

	if (arr.length < n) {
		return [arr];
	}

	for (let i = 0; i < arr.length; i++) {
		currArr.push(arr[i]);

		if ((k++) + 1 === n) {
			k = 0;
			newArr.push(currArr);
			currArr = [];
		}
	}

	return newArr;
}


/**
 * Expose component
 */

export default RepositoryList;
