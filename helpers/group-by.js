'use strict';

/**
 * Group array elements into groups of N
 */

export default function groupBy (arr, n) {
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
