
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

var easingFn = require('Comp/utils/easingFn');
export default function ( target ) {
    // dir = dir || 'top';


    return {
        reset : true,
        initial : {

            [target] : {
                opacity : 1,
                _z : 0,
                rotateY : 0
            }
        },
        anims   : [
            {
                type     : "Tween",
                target   : target,
                from     : 0,
                duration : 750,
                easeFn   : easingFn.easeInOutBack,
                apply    : {
                    _z    : -.3,
                    opacity : -1
                }
            },
            {
                type     : "Tween",
                target   : target,
                from     : 250,
                duration : 500,
                apply    : {
                    rotateY : -180
                }
            }
        ]
    };
};