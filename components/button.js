'use strict';

/**
 * Dependencies
 */

import React from 'react';


/**
 * Button component
 */

const Button = React.createClass({
	render: function () {
		let classes = ['btn'];

		let color = this.props.color || 'white';
		let size = this.props.size || 'md';
		let type = this.props.type || 'primary';

		if (this.props.background) {
			classes.push('bg-' + this.props.background);
		}

		classes.push(color);
		classes.push('btn-' + type);
		classes.push('btn-' + size);

		let className = classes.join(' ');

		// add any custom class names
		className += ' ';
		className += this.props.className || '';

		let props = {
			className: className,
			onClick: this.props.onClick
		};

		return <button { ...props }>
			{ this.props.children }
		</button>;
	}
});


/**
 * Expose component
 */

export default Button;
