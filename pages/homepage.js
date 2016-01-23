'use strict';

/**
 * Dependencies
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import LogInButton from '../components/login-button';
import Actions from '../actions';
import Link from '../components/link';


/**
 * Home page
 */

const HomePage = React.createClass({
	componentWillMount: function () {
		document.title = 'OhCrash - Error reporting for JS apps';
	},

	render: function () {
		return <div>
			{ this.renderHeader() }
			{ this.renderSteps() }
			{ this.renderCallToAction() }
			{ this.renderFooter() }
		</div>;
	},

	renderHeader: function () {
		return <header className="center md-mt4 py4">
			<img src="/images/logo.svg" className="w300" />
			<h1>Fix errors before your users even notice them</h1>

			<div className="clearfix mb4">
				<div className="sm-col sm-col-2" style={{ height: '1px' }}></div>
				<p className="sm-col sm-col-8">
					OhCrash catches JavaScript errors and instantly opens nicely formed issues in the GitHub repository of your choice.
				</p>
			</div>

			{ this.renderLogInButton() }
		</header>;
	},

	renderSteps: function () {
		return <section>
			<section className="mt4 center">
				<h1 className="inline underline">How it works?</h1>
			</section>

			<section className="mt3 sm-py3 clearfix">
				<div className="sm-col sm-col-6 p3 sm-p4">
					<h2 className="mt0">1. Set up OhCrash</h2>
					<p>
						Install <a href="https://github.com/vdemedes/ohcrash">ohcrash</a> module via npm and initialize it using your API key.
					</p>
				</div>

				<div className="sm-col sm-col-6 sm-py4 px2 sm-px0">
					<div className="relative">
						{ this.renderSetupExample() }

						<img src="/images/pow.svg" className="absolute sticker-pow sticker-right md-show" />
					</div>
				</div>
			</section>

			<section className="mt3 sm-py3 clearfix">
				<div className="sm-col-right sm-col sm-col-6 p3 sm-p4">
					<h2 className="mt0">2. Errors raised</h2>
					<p>
						Failures happen, there's no 100% protection for that.
						But OhCrash helps you spot these errors by catching and reporting them.
					</p>
				</div>

				<div className="sm-col sm-col-6 sm-py4 px2 sm-px0">
					<div className="relative">
						{ this.renderErrorExample() }

						<img src="/images/oops.svg" className="absolute sticker-oops sticker-left md-show" />
					</div>
				</div>
			</section>

			<section className="mt3 sm-py3 clearfix">
				<div className="sm-col sm-col-6 p3 sm-p4">
					<h2 className="mt0">3. Fix issues</h2>
					<p>
						As soon as error is caught, a new issue on GitHub will be opened will
						all related information (which you can customize).
					</p>
				</div>

				<div className="sm-col sm-col-6 px2 sm-px0 sm-py4">
					<div className="relative">
						<img src="/images/issue.png" className="fit block border-right py2" />
						<img src="/images/omg.svg" className="absolute sticker-omg sticker-right md-show" />
					</div>
				</div>
			</section>
		</section>;
	},

	renderSetupExample: function () {
		return <pre className="bg-black white py4 px3 sm-rounded">
			<code>
				<span className="grey mr3">1</span>
				<span className="blue">require</span>
				<span className="grey">(</span>
				<span className="green">'ohcrash'</span>
				<span className="grey">)(</span>
				<span className="green">'tn7CtpVSMw'</span>
				<span className="grey">);</span>
			</code>
		</pre>;
	},

	renderErrorExample: function () {
		return <pre className="bg-black white py4 px3 sm-rounded">
			<code>
				<span className="red">Error: </span>
				<span className="grey">Oh no, it happened again!</span>
				<span className="block"></span>
				<span className="grey">    at /myapp/app.js:1:69</span>
			</code>
		</pre>;
	},

	renderCallToAction: function () {
		return <section className="mt4 px2 md-px0 center">
			<h1 className="mb3">Are you ready for dead-simple error reporting?</h1>

			{ this.renderLogInButton() }
		</section>;
	},

	renderFooter: function () {
		return <footer className="mt4 px2 md-px0 center grey">
			OhCrash is a free <a href="https://github.com/vdemedes/ohcrash-app">open-source</a> project brought to you by <a href="https://github.com/vdemedes">Vadim Demedes</a>.
		</footer>;
	},

	renderLogInButton: function () {
		let actions = this.props.actions;
		let props = {
			background: 'red',
			color: 'white',
			size: 'lg',
			onClick: actions.logIn
		};

		return <LogInButton { ...props } />;
	}
});


/**
 * Build props
 */

function mapStateToProps (state) {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
