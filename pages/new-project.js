'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import startsWith from 'starts-with-any';
import React from 'react';

import { loadRepositories } from '../lib/github';
import RepositoryList from '../components/repository-list';
import Actions from '../actions';
import Link from '../components/link';


/**
 * New project page
 */

const NewProjectPage = React.createClass({
	getInitialState: function () {
		return {
			query: null,
			repositories: []
		};
	},

	componentWillMount: function () {
		loadRepositories(this.props.user.githubAccessToken, repositories => {
			repositories = repositories.filter(repository => {
				return this.props.projects.filter(project => {
					return repository.full_name === project.fullName;
				}).length === 0;
			});

			this.setState({ repositories });
		});
	},

	componentDidMount: function () {
		document.title = 'New project - OhCrash';
	},

	render: function () {
		let repositories = this.state.repositories;
		let query = this.state.query;

		if (query) {
			repositories = repositories
				.filter(repository => {
					return repository.full_name.indexOf(query) >= 0;
				})
				.sort((a, b) => {
					return startsWith(b.name, query) - startsWith(a.name, query);
				})
				.sort((a, b) => {
					return a.fork - b.fork;
				});
		}

		return <div className="mt4">
			<h1 className="center">Add Project</h1>

			<div className="clearfix mt4">
				<p className="sm-col sm-col-10 m0">
					Select a repository, where OhCrash should open issues for reported errors.
				</p>

				<div className="sm-col sm-col-2 right-align">
					<Link to="/projects" className="red">Cancel</Link>
				</div>
			</div>

			<div className="mt2">
				<input
					placeholder="Enter a repository name"
					className="field"
					value={ this.state.query }
					type="text"
					autoFocus={ true }
					onChange={ this.setQuery } />
			</div>

			<div className="mt2">
				<RepositoryList
				repositories={ repositories }
				onClick={ this.selectRepository } />
			</div>
		</div>
	},

	selectRepository: function (repo) {
		this.props.actions.createProject({
			githubId: repo.id,
			fullName: repo.full_name,
			name: repo.name
		});
	},

	setQuery: function (e) {
		this.setState({
			query: e.target.value
		});
	}
});


/**
 * Build props
 */

function mapStateToProps (state) {
	return {
		projects: state.projects,
		user: state.user
	};
}

function mapDispatchToProps (dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}


/**
 * Expose page
 */

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectPage);
