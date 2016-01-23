'use strict';

/**
 * Dependencies
 */

import parseLinkHeader from 'parse-link-header';


/**
 * GitHub API client
 */

export function loadRepositories (accessToken, callback) {
	let repos = [];

	function next (url) {
		return loadUrl(url, accessToken).then(res => {
			let link = parseLinkHeader(res.headers.get('link'));

			if (link.next) {
				return res.json().then(res => {
					repos.push.apply(repos, res);
					callback(repos);

					return next(link.next.url);
				});
			} else {
				return res.json().then(res => {
					repos.push.apply(repos, res);
					callback(repos);
				});
			}
		});
	}

	return next('https://api.github.com/user/repos?type=owner');
}

function loadUrl (url, accessToken) {
	return fetch(url, {
		headers: {
			'Authorization': 'token ' + accessToken
		}
	});
}
