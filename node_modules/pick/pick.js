#!/usr/bin/env node
/*jslint nodejs:true */

// Returns a random element of an array.
//
// Example:
//
// > pick([1, 2, 3]);
// 1

function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

exports.pick = pick;