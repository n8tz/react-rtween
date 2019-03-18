/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import is from "is";

const
	unitsRe      = new RegExp(
		"([+-]?(?:[0-9]*[.])?[0-9]+)\\s*(" +
		['em', 'ex', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax'].join('|')
		+ ")"
	),
	floatCut     = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	defaultUnits = {
		blur      : 'px',
		brightness: '%',
		contrast  : '%',
		dropShadow: true,
		grayscale : '%',
		hueRotate : 'deg',
		invert    : "%",
		opacity   : "%",
		saturate  : "%",
		sepia     : "%"
	};
const filters    = {};

function demux( key, tweenable, target, data, box ) {
	
	if ( data["filter_head"] === key ) {
		let filters = "";
		Object.keys(data[key]).forEach(
			fkey => {
				let dkey        = key + '_' + fkey;
				data[key][fkey] = true;
				filters += fkey + "(" + floatCut(tweenable[dkey], 2) + data[dkey] + ") ";
			}
		)
		target.filter = filters;
	}
	
}

export default ( key, value, target, data, initials ) => {
	
	data["filter_head"] = data["filter_head"] || key;
	data[key]           = data[key] || {};
	initials[key]       = 0;
	
	Object.keys(value).forEach(
		fkey => {
			let fValue      = value[fkey],
			    dkey        = key + '_' + fkey,
			    match       = is.string(fValue) ? fValue.match(unitsRe) : false;
			data[key][fkey] = true;
			initials[dkey]  = 0;
			if ( match ) {
				if ( data[dkey] && data[dkey] !== match[2] ) {
					console.warn("Have != units on prop ! Ignore ", dkey, "present:" + data[dkey], "new:" + match[2]);
					target[dkey] = 0;
				}
				else {
					data[dkey]   = match[2];
					target[dkey] = parseFloat(match[1]);
				}
			}
			else {
				target[dkey] = fValue;
				if ( !data[dkey] && fkey in defaultUnits )
					data[dkey] = defaultUnits[fkey];
			}
		}
	)
	return demux;
}