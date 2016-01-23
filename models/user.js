'use strict';

/**
 * Dependencies
 */

import Promise from 'pinkie-promise';
import url from 'url-join';

import Model from './base';


/**
 * User
 */

const User = Model.extend({

}, {
	currentUser: function () {
		let authData = this.rootRef.getAuth();

		if (!authData) {
			return null;
		}

		return new User({
			githubAccessToken: authData.github.accessToken,
			profileImageURL: authData.github.profileImageURL,
			displayName: authData.github.displayName,
			username: authData.github.username,
			email: authData.github.email,
			id: authData.uid
		});
	},

	isLoggedIn: function () {
		return !!this.currentUser();
	},

	logIn: function () {
		if (this.isLoggedIn()) {
			return Promise.resolve(this.currentUser());
		}

		return new Promise((resolve, reject) => {
			let options = {
				remember: 'default',
				scope: 'user,public_repo'
			};

			this.rootRef.authWithOAuthPopup('github', (err, authData) => {
				if (err) {
					reject(err);
					return;
				}

				let user = this.currentUser();

				this.rootRef.child(url('users', user.get('id'))).set(user.toJSON(), err => {
					if (err) {
						reject(err);
						return;
					}

					this.rootRef.child(url('usernames', user.get('id'))).set(user.get('username'));
					this.rootRef.child(url('accessTokens', user.get('id'))).set(authData.github.accessToken);

					resolve(user);
				});
			}, options);
		});
	},

	logOut: function () {
		this.rootRef.unauth();
	}
});


/**
 * Expose model
 */

export default User;
