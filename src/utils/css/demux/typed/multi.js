/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import is     from "is";
import number from "./number";

const
	floatCut = ( v = 0 ) => v.toFixed(3),
	alias    = {
		top   : '0%',
		bottom: '100%',
		center: '50%',
		left  : '0%',
		right : '100%'
	};

function demux( key, tweenable, target, data, box, offset ) {
	
	let count = data[key], v = '', nowhere = {};
	
	for ( let i = 0; i < count; i++ ) {
		number.demux(key + '_' + i, tweenable, nowhere, data, box, offset);
		v += nowhere[key + '_' + i] + ' ';
	}
	
	target[key] = v;
}

export default ( count ) => ( key, value, target, data, initials ) => {
	let values = value.split(' '), v;
	
	data[key] = count;
	
	for ( let i = 0; i < count; i++ ) {
		v = values[i % values.length];
		v = is.string(v) && alias[v] || v;
		number(key + '_' + i, v, target, data, initials)
	}
	
	return demux;
}