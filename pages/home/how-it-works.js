'use strict';

/**
 * Dependencies
 */

import React from 'react';

import Link from '../../components/link';


/**
 * How it works? for homepage
 */

const HowItWorks = React.createClass({
	render: function () {
		return <section className="mt8">
			<h1 className="center">How it works?</h1>

			{ this.renderSetupStep() }
			{ this.renderErrorStep() }
			{ this.renderIssueStep() }
		</section>;
	},

	renderSetupStep: function () {
		return <div className="mt8 clearfix">
			<div className="px4 md-col md-col-6">
				<h3 className="mt0 mb1">1. Set up OhCrash client</h3>
				<p className="mt0">
					Install <a href="https://github.com/vdemedes/ohcrash" target="_blank">ohcrash</a> module via npm and initialize it using your API key.
				</p>
			</div>

			<div className="px4 md-col md-col-6">
				<div className="window">
					<div className="window-header clearfix">
						<div className="left">
							<span></span>
							<span></span>
							<span></span>
						</div>

						<div className="right">
							app.js
						</div>
					</div>

					<div className="window-body">
						<pre>
							require(<span className="red">'ohcrash'</span>)(<span className="red">'your API key'</span>);
						</pre>
					</div>
				</div>
			</div>
		</div>;
	},

	renderErrorStep: function () {
		return <div className="mt8 clearfix">
			<div className="px4 md-col md-col-6">
				<div className="window">
					<div className="window-header clearfix">
						<div className="left">
							<span></span>
							<span></span>
							<span></span>
						</div>

						<div className="right">
							node
						</div>
					</div>

					<div className="window-body">
						<pre>
							<span className="red">Error:</span> Oh no, it happened again!
							<span className="block ml2">at handler (example.js:3:7)</span>
						</pre>
					</div>
				</div>
			</div>

			<div className="px4 md-col md-col-6">
				<h3 className="mt0 mb1">2. OhCrash catches errors</h3>
				<p className="mt0">
					Failures happen, there's no 100% protection for that. But OhCrash helps you spot these errors by catching and reporting them.
				</p>
			</div>
		</div>;
	},

	renderIssueStep: function () {
		return <div className="mt8 clearfix">
			<div className="px4 md-col md-col-6">
				<h3 className="mt0 mb1">3. Fix issues</h3>
				<p className="mt0">
					As soon as error is caught, a new issue on GitHub will be opened will all related information (which you can customize).
				</p>
			</div>

			<div className="px4 md-col md-col-6">
				<div className="window">
					<div className="window-header clearfix">
						<div className="left">
							<span></span>
							<span></span>
							<span></span>
						</div>

						<div className="right">
							github issues
						</div>
					</div>

					<div className="window-body default-font h5">
						<p className="m0">
							Hey, OhCrash just reported an error!
							Here are the relevant details:
						</p>

						<ul className="list-reset mb0">
							<li><b>Error name:</b> Error</li>
							<li><b>Message:</b> Oh no, it happened again!</li>
							<li></li>
							<li>
								<b>Clean stack trace:</b>
								<div className="bg-light-blue p1 mt1">
									<pre>
										handler (example.js:3:7)
									</pre>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>;
	}
});


/**
 * Expose component
 */

export default HowItWorks;
