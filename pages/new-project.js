'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import startsWith from 'starts-with-any';
import React from 'react';

import { loadRepositories } from '../lib/github';
import DashboardWrapper from '../components/dashboard-wrapper';
import RepositoryList from '../components/repository-list';
import Actions from '../actions';
import Button from '../components/button';
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

		return <DashboardWrapper>
			<div className="clearfix">
				<h3 className="mt0 left">New project</h3>

				<div className="right">
					<Link to="/projects" className="btn red pr0">Cancel</Link>
				</div>
			</div>

			<p className="mt3">
				Select a repository, where OhCrash should open issues for reported errors.
			</p>

			<div className="mt2">
				<input
					placeholder="Enter a repository name"
					className="field"
					value={ this.state.query }
					type="text"
					autoFocus={ true }
					onChange={ this.setQuery } />
			</div>

			<RepositoryList
				repositories={ repositories }
				className="mt3"
				onClick={ this.selectRepository } />
		</DashboardWrapper>
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
