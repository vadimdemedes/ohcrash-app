'use strict';

/**
 * Dependencies
 */

import React from 'react';

import { projectsPath } from '../helpers/urls';
import Button from './button';
import Link from './link';


/**
 * Top navigation component
 */

// TODO: Make it clean
const TopNavigation = React.createClass({
	render: function () {
		return <div>
			{ this.renderDesktopNav() }
			{ this.renderMobileNav() }
		</div>;
	},

	renderDesktopNav: function () {
		let navProps = {
			className: [
				'top-navigation',
				'clearfix',
				'sm-show',
				'px2',
				'md-px0',
				'py2',
				'md-py3'
			].join(' ')
		};

		let itemProps = {
			className: 'inline-block mr2'
		};

		if (!this.props.user) {
			let buttonProps = {
				type: 'outline',
				color: 'red',
				onClick: this.props.onLogIn
			}

			return <nav { ...navProps }>
				<ul className="list-reset left">
					<li { ...itemProps }>
						<Link to="/">Home</Link>
					</li>

					<li { ...itemProps }>
						<a href="https://github.com/vdemedes/ohcrash#installation">Docs</a>
					</li>

					<li { ...itemProps }>
						<a href="https://github.com/vdemedes/ohcrash/issues/new">Support</a>
					</li>
				</ul>

				<ul className="list-reset right">
					<li>
						<Button { ...buttonProps }>Log In with GitHub</Button>
					</li>
				</ul>
			</nav>;
		}

		let buttonProps = {
			type: 'outline',
			color: 'red',
			onClick: this.props.onLogOut
		};

		return <nav { ...navProps }>
			<ul className="list-reset left">
				<li { ...itemProps }>
					<Link to="/">Home</Link>
				</li>

				<li { ...itemProps }>
					<Link to={ projectsPath() }>Projects</Link>
				</li>

				<li { ...itemProps }>
					<a href="https://github.com/vdemedes/ohcrash#installation">Docs</a>
				</li>

				<li { ...itemProps }>
					<a href="https://github.com/vdemedes/ohcrash/issues/new">Support</a>
				</li>
			</ul>

			<ul className="list-reset right">
				<li>
					<Button { ...buttonProps }>Log Out</Button>
				</li>
			</ul>
		</nav>
	},

	renderMobileNav: function () {
		if (!this.props.user) {
			let buttonProps = {
				type: 'outline',
				color: 'red',
				onClick: this.props.onLogIn
			};

			return <nav className="sm-hide py3">
				<div className="clearfix border-top py2">
					<div className="col col-12 center">
						<Link to="/">Home</Link>
					</div>
				</div>

				<div className="clearfix border-top">
					<div className="col col-6 border-right py2 center">
						<a href="https://github.com/vdemedes/ohcrash#installation">Docs</a>
					</div>

					<div className="col col-6 py2 center">
						<a href="https://github.com/vdemedes/ohcrash/issues/new">Support</a>
					</div>
				</div>

				<div className="border-top py3 center">
					<Button { ...buttonProps }>Log In with GitHub</Button>
				</div>
			</nav>;
		}

		let buttonProps = {
			type: 'outline',
			color: 'red',
			onClick: this.props.onLogOut
		};

		return <nav className="sm-hide py3">
			<div className="clearfix border-top">
				<div className="col col-6 border-right py2 center">
					<Link to="/">Home</Link>
				</div>

				<div className="col col-6 py2 center">
					<Link to={ projectsPath() }>Projects</Link>
				</div>
			</div>

			<div className="clearfix border-top">
				<div className="col col-6 border-right py2 center">
					<a href="https://github.com/vdemedes/ohcrash#installation">Docs</a>
				</div>

				<div className="col col-6 py2 center">
					<a href="https://github.com/vdemedes/ohcrash/issues/new">Support</a>
				</div>
			</div>

			<div className="center border-top py3">
				<Button { ...buttonProps }>Log Out</Button>
			</div>
		</nav>;
	}
});


/**
 * Expose component
 */

module.exports = TopNavigation;
