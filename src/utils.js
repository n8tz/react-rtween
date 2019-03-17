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

var
	is          = require('is'),
	floatCut    = function ( v, l ) {
		var p = Math.pow(10, l);
		return Math.round(v * p) / p;
	},
	min         = Math.min,
	max         = Math.max,
	isBrowser   = typeof window !== 'undefined',
	Dom         = isBrowser ? {
		prefix      : (/webkit/i).test(navigator.appVersion) ? 'webkit' :
		              (/firefox/i).test(navigator.userAgent) ? 'Moz' :
		              (/trident/i).test(navigator.userAgent) ? 'ms' :
		              'opera' in window ? 'O' : '',
		dashedPrefix: (/webkit/i).test(navigator.appVersion) ? '-webkit-' :
		              (/firefox/i).test(navigator.userAgent) ? '-moz-' :
		              (/trident/i).test(navigator.userAgent) ? '-ms-' :
		              'opera' in window ? '-o-' : ''
	} : {
		prefix      : '',
		dashedPrefix: ''
	},
	customProps = {
		_x         : true,
		x          : true,
		_y         : true,
		y          : true,
		_z         : true,
		z          : true,
		transform  : true,
		perspective: true,
		matrix     : true,// @todo
		rotate     : true,
		rotateX    : true,
		rotateY    : true,
		_width     : true,
		_height    : true,
	},
	__          = {
		onPageHided      : [],
		onPageShown      : [],
		dragging         : [],
		dragEnabled      : [],
		dragEnabledDesc  : [],
		fingers          : {},
		nbFingers        : 0,
		dragstartAnywhere: function ( e ) {
			var o,
			    me            = __,
			    i             = me.dragEnabled.indexOf(this),
			    finger,
			    desc, fingers = [];
			
			if ( i === -1 ) {
				return;
			}
			//e.preventDefault();
			//e.stopPropagation();
			
			if ( !me.nbFingers ) {
				Dom.addEvent(document,
				             {
					             'touchmove': me.dragAnywhere,
					             'mousemove': me.dragAnywhere,
					             'touchend' : me.dropAnywhere,
					             'mouseup'  : me.dropAnywhere,
				             });
				Dom.addEvent(this,
				             {
					             'click': me.dropWithoutClick
				             }, null, null, true);
			}
			
			if ( e.changedTouches && e.changedTouches.length ) {
				fingers = e.changedTouches
			}
			else fingers.push(e);
			
			for ( var t = 0, ln = fingers.length; t < ln; t++ ) {
				finger = fingers[t];
				
				
				desc = me.dragEnabledDesc[i];
				
				if ( desc.nbFingers ) continue;
				
				me.nbFingers++;
				
				me.fingers[finger.identifier] = me.fingers[finger.identifier] || [];
				me.fingers[finger.identifier].push(desc);
				
				
				desc.nbFingers++;
				
				desc._startPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
				desc._startPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
				desc._startTs    = e.timeStamp;
				
				
				desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
				desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
				
				for ( o = 0; o < desc.dragstart.length; o++ )
					desc.dragstart[o][0].call(desc.dragstart[o][1] ||
						                          this, e, finger, desc);
			}
		},
		dragAnywhere     : function ( e ) {
			var o,
			    me              = __,
			    finger, fingers = [], stopped,
			    desc            = __.dragging[0];
			
			
			if ( e.changedTouches && e.changedTouches.length ) {
				fingers = e.changedTouches
			}
			else fingers.push(e);
			
			for ( var i = 0, ln = fingers.length; i < ln; i++ ) {
				finger = fingers[i];
				desc   = me.fingers[finger.identifier];
				me.fingers[finger.identifier] &&
				me.fingers[finger.identifier].forEach(
					desc => {
						if ( stopped ) {
							desc._lastPos.x = desc._startPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
							desc._lastPos.y = desc._startPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
							return;
						}
						desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
						desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
						
						for ( o = 0; o < desc.drag.length; o++ )
							stopped = desc.drag[o][0].call(desc.drag[o][1] || this, e,
							                               finger,
							                               desc) === false;
					}
				)
				
			}
		},
		dropWithoutClick : function ( e ) {
			if ( __.preventNextClick ) {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				__.preventNextClick = false;
			}
			Dom.removeEvent(this,
			                {
				                'click': this.dropWithoutClick
			                });
		},
		dropAnywhere     : function ( e ) {
			var o,
			    me = __, finger, fingers = [],
			    prevent;
			
			if ( e.changedTouches && e.changedTouches.length ) {
				fingers = e.changedTouches
			}
			else fingers.push(e);
			
			for ( var i = 0, ln = fingers.length; i < ln; i++ ) {
				finger = fingers[i];
				me.nbFingers--;
				me.fingers[finger.identifier] &&
				me.fingers[finger.identifier].forEach(
					desc => {
						
						
						desc.nbFingers--;
						prevent         = prevent || desc.mouseDrag && (e.timeStamp - desc._startTs > 250);
						desc._lastPos.x = Dom.prefix == 'MS' ? finger.x : finger.pageX;
						desc._lastPos.y = Dom.prefix == 'MS' ? finger.y : finger.pageY;
						
						for ( o = 0; o < desc.dropped.length; o++ )
							desc.dropped[o][0].call(desc.dropped[o][1] ||
								                        this, e,
							                        finger, desc);
						
						
					}
				)
				me.fingers[finger.identifier] = null;
			}
			if ( prevent ) {
				me.preventNextClick = true;
			}
			if ( !me.nbFingers ) {
				Dom.removeEvent(document,
				                {
					                'touchmove': me.dragAnywhere,
					                'mousemove': me.dragAnywhere,
					                'touchend' : me.dropAnywhere,
					                'mouseup'  : me.dropAnywhere
				                });
			}
		},
		getDraggable     : function ( node, mouseDrag ) {
			var i = this.dragEnabled.indexOf(node), desc;
			if ( i === -1 ) {
				this.dragEnabled.push(node);
				this.dragEnabledDesc.push(
					desc = {
						mouseDrag,
						nbFingers: 0,
						locks    : 0,
						_startPos: {
							x: 0,
							y: 0
						},
						_lastPos : {
							x: 0,
							y: 0
						},
						dragstart: [],
						drag     : [],
						dragEnd  : [],
						dropped  : []
					}
				);
				//debugger;
				Dom.addEvent(node,
				             {
					             'mousedown' : mouseDrag && this.dragstartAnywhere,
					             'touchstart': this.dragstartAnywhere
				             }, null, null, true);
			}
			else desc = this.dragEnabledDesc[i];
			return desc;
		},
		freeDraggable    : function ( node ) {
			var i = this.dragEnabled.indexOf(node), desc;
			if ( i !== -1 ) {
				this.dragEnabled.splice(i, 1);
				this.dragEnabledDesc.splice(i, 1);
				
				Dom.removeEvent(node,
				                {
					                'mousedown' : this.dragstartAnywhere,
					                'touchstart': this.dragstartAnywhere
				                });
			}
		},
		addOverflowEvent : function addFlowListener( element, fn ) {
			
			var type = 'over', flow = type == 'over';
			
			element.addEventListener('OverflowEvent' in window ? 'overflowchanged' : type + 'flow',
			                         function ( e ) {
				                         if ( e.type == (type + 'flow') ||
					                         ((e.orient == 0 && e.horizontalOverflow == flow) ||
						                         (e.orient == 1 && e.verticalOverflow == flow) ||
						                         (e.orient == 2 && e.horizontalOverflow == flow &&
							                         e.verticalOverflow == flow)) ) {
					                         return fn.call(this, e);
				                         }
			                         }, false);
			
		},
		addEvent         : function ( node, type, fn, bubble ) {
			if ( node.addEventListener ) {
				node.addEventListener(type, fn, bubble);
			}
			else if ( node.attachEvent ) {
				node.attachEvent('on' + type,
				                 fn.related = function ( e ) {
					                 return fn.call(node, e);
				                 });
			}
		},
		removeEvent      : function ( node, type, fn, bubble ) {
			if ( node.removeEventListener ) {
				node.removeEventListener(type, fn, bubble);
			}
			else if ( node.attachEvent ) {
				node.detachEvent('on' + type, fn.related);
			}
		},
		rmDragFn         : function ( arr, fn, scope ) {
			for ( var i = 0, ln = arr.length; i < ln; i++ ) {
				if ( arr[i][0] === fn )
					return arr.splice(i, 1);
			}
			
			console.warn("Rm event : Listener not found !!");
		},
		_createElement   : function ( tag, opt, refs, parent ) {
			var a, o, i, ln,
			    node = parent || document.createElement(tag);
			
			//if (parent) opt = {content:opt};
			
			if ( opt )
				for ( o in opt )
					if ( opt.hasOwnProperty(o) && opt[o] !== undefined
						&& !_createElementAttr.hasOwnProperty(o) ) {
						a       = document.createAttribute(o);
						a.value = opt[o];
						node.setAttributeNode(a);
					}
			
			refs && opt.$id && (refs[opt.$id] = node);
			
			opt.style && Dom.applyCss(node, opt.style);
			
			opt.cls && Dom.addCls(node, opt.cls);
			
			if ( opt.events ) {
				for ( o in opt.events )
					if ( opt.events.hasOwnProperty(o) && o !== "$scope" )
						Dom.addEvent(node, o, opt.events[o], opt.events.$scope);
			}
			if ( opt.content ) {
				if ( typeof opt.content === 'string' || typeof opt.content[o] == 'number' ) {
					node.innerHTML = opt.content;
				}
				else if ( opt.content instanceof Array ) {
					for ( i = 0, ln = opt.content.length; i < ln; i++ )
						node.appendChild(
							typeof opt.content[i] == 'string' || typeof opt.content[i] == 'number' || !opt.content[i] ?
							document.createTextNode(opt.content[i] || '') :
							isElement(opt.content[i]) ?
							opt.content[i] :
							__createElement(opt.content[i].tagName || 'div', opt.content[i], refs)
						);
				}
				else {
					node.appendChild(
						opt.content instanceof HTMLElement ?
						opt.content : __createElement(
							opt.content.tagName || 'div', opt.content, refs)
					);
				}
			}
			
			return node;
		}
	},
	Dom         = {
		addEvent     : function ( node, type, fn, mouseDrag, bubble ) {
			var desc;
			if ( is.object(type) ) {
				for ( var o in type )
					if ( type.hasOwnProperty(o) )
						this.addEvent(node, o, type[o], fn);
				return;
			}
			else if ( type == 'dragstart' ) {
				__.getDraggable(node, mouseDrag).dragstart.push([fn, mouseDrag]);
			}
			else if ( type == 'drag' ) {
				__.getDraggable(node, mouseDrag).drag.push([fn, mouseDrag]);
			}
			else if ( type == 'dropped' ) {
				__.getDraggable(node, mouseDrag).dropped.push([fn, mouseDrag]);
			}
			else {
				if ( node.addEventListener ) {
					node.addEventListener(type, fn, bubble);
				}
				else if ( node.attachEvent ) {
					node.attachEvent('on' + type,
					                 fn.related = function ( e ) {
						                 return fn.call(node, e);
					                 });
				}
			}
			
		},
		removeEvent  : function ( node, type, fn, scope, bubble ) {
			var i, desc;
			
			if ( is.object(type) ) {
				for ( var o in type )
					if ( type.hasOwnProperty(o) )
						this.removeEvent(node, o, type[o], scope);
				
			}
			else if ( /^(drag|drop)/.test(type) ) {
				desc = __.getDraggable(node);
				__.rmDragFn(desc[type], fn, scope);
				if ( !desc.dragstart.length
					&& !desc.drag.length
					&& !desc.dragEnd.length
					&& !desc.dropped.length )
					__.freeDraggable(node);
			}
			else {
				if ( node.removeEventListener ) {
					node.removeEventListener(type, fn, bubble);
				}
				else if ( node.attachEvent ) {
					node.detachEvent('on' + type, fn.related);
				}
			}
			
		},
		offset       : function ( elem ) {// @todo
			var dims = { top: 0, left: 0, width: elem.offsetWidth, height: elem.offsetHeight };
			while ( elem ) {
				dims.top  = dims.top + parseInt(elem.offsetTop);
				dims.left = dims.left + parseInt(elem.offsetLeft);
				elem      = elem.offsetParent;
			}
			return dims;
		},
		addWheelEvent: isBrowser && (function ( window, document ) {
			
			var prefix = "", _addEventListener, _rmEventListener, onwheel, support;
			
			// detect event model
			if ( window.addEventListener ) {
				_addEventListener = "addEventListener";
				_rmEventListener  = "removeEventListener";
			}
			else {
				_addEventListener = "attachEvent";
				_rmEventListener  = "detachEvent";
				prefix            = "on";
			}
			
			// detect available wheel event
			support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
			          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
			          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
			
			const addWheelListener = function ( elem, callback, scope, useCapture ) {
				_addWheelListener(elem, support, callback, scope, useCapture);
				
				// handle MozMousePixelScroll in older Firefox
				if ( support == "DOMMouseScroll" ) {
					_addWheelListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
				}
			};
			// Reasonable defaults
			var PIXEL_STEP         = 10;
			var LINE_HEIGHT        = 40;
			var PAGE_HEIGHT        = 800;
			
			function normalizeWheel( /*object*/ event ) /*object*/ {
				var sX         = 0, sY = 0,       // spinX, spinY
				    pX = 0, pY = 0;       // pixelX, pixelY
				
				// Legacy
				if ( 'detail' in event ) {
					sY = event.detail;
				}
				if ( 'wheelDelta' in event ) {
					sY = -event.wheelDelta / 120;
				}
				if ( 'wheelDeltaY' in event ) {
					sY = -event.wheelDeltaY / 120;
				}
				if ( 'wheelDeltaX' in event ) {
					sX = -event.wheelDeltaX / 120;
				}
				
				// side scrolling on FF with DOMMouseScroll
				if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
					sX = sY;
					sY = 0;
				}
				
				pX = sX * PIXEL_STEP;
				pY = sY * PIXEL_STEP;
				
				if ( 'deltaY' in event ) {
					pY = event.deltaY;
				}
				if ( 'deltaX' in event ) {
					pX = event.deltaX;
				}
				
				if ( (pX || pY) && event.deltaMode ) {
					if ( event.deltaMode == 1 ) {          // delta in LINE units
						pX *= LINE_HEIGHT;
						pY *= LINE_HEIGHT;
					}
					else {                             // delta in PAGE units
						pX *= PAGE_HEIGHT;
						pY *= PAGE_HEIGHT;
					}
				}
				
				// Fall-back if spin cannot be determined
				if ( pX && !sX ) {
					sX = (pX < 1) ? -1 : 1;
				}
				if ( pY && !sY ) {
					sY = (pY < 1) ? -1 : 1;
				}
				
				return {
					spinX : sX,
					spinY : sY,
					pixelX: pX,
					pixelY: pY
				};
			}
			
			function _addWheelListener( elem, eventName, callback, scope, useCapture ) {
				elem[_addEventListener](prefix + eventName, callback._wheelList = function ( originalEvent ) {
					!originalEvent && (originalEvent = window.event);
					
					// create a normalized event object
					var event = {
						// keep a ref to the original event object
						originalEvent : originalEvent,
						target        : originalEvent.target || originalEvent.srcElement,
						type          : "wheel",
						deltaMode     : originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
						deltaX        : 0,
						delatZ        : 0,
						preventDefault: function () {
							originalEvent.preventDefault ?
							originalEvent.preventDefault() :
							originalEvent.returnValue = false;
						},
						normalized    : normalizeWheel(originalEvent)
					};
					
					// calculate deltaY (and deltaX) according to the event
					if ( support == "mousewheel" ) {
						event.deltaY = -1 / 40 * originalEvent.wheelDelta;
						// Webkit also support wheelDeltaX
						//                            originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 *
						// originalEvent.wheelDeltaX );
					}
					else if ( support == "wheel" && Dom.prefix == "Moz" ) {
						event.deltaY = originalEvent.deltaY / 3;
					}
					else if ( support == "wheel" ) {
						event.deltaY = originalEvent.deltaY / 100;
					}
					else {
						event.deltaY = originalEvent.deltaY;
					}
					//                        if (typeof originalEvent.wheelDeltaY !== 'number')
					//                            event.wheelDeltaY = originalEvent.deltaY/100;
					
					//                        event.wheelDelta = deltaY*120;
					
					// it's time to fire the callback
					return callback.call(scope || this, event);
					
				}, useCapture || false);
			}
			
			return addWheelListener;
		})(window, document),
		rmWheelEvent : isBrowser && (function ( window, document ) {
			
			var prefix = "", _rmEventListener, onwheel, support;
			
			// detect event model
			if ( addEventListener ) {
				_rmEventListener = "removeEventListener";
			}
			else {
				_rmEventListener = "detachEvent";
				prefix           = "on";
			}
			
			// detect available wheel event
			support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
			          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
			          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
			
			let rmWheelListener = function ( elem, callback, scope, useCapture ) {
				_EventListener(elem, support, callback, scope, useCapture);
				
				// handle MozMousePixelScroll in older Firefox
				if ( support == "DOMMouseScroll" ) {
					_EventListener(elem, "MozMousePixelScroll", callback, scope, useCapture);
				}
			};
			
			function _EventListener( elem, eventName, callback, scope, useCapture ) {
				elem[_rmEventListener](prefix + eventName, callback._wheelList);
			}
			
			return rmWheelListener;
		})(window, document),
		mapInBoxCSS  : function ( pos, css, box, units, offset ) {
			var t = '';
			if ( is.number(pos._z) || is.number(pos._x) || is.number(pos._y) || is.number(pos.z) ||
				is.number(pos.x) || is.number(pos.y) )
				t = 'translate3d(' +
					floatCut((pos._x || 0) * (box.x || 0) + (pos.x || 0) + (offset && offset.x || 0), 2) +
					(units && units.x || 'px') + ', ' +
					floatCut((pos._y || 0) * (box.y || 0) + (pos.y || 0) + (offset && offset.y || 0), 2) +
					(units && units.y || 'px') + ', ' +
					floatCut((pos._z || 0) * (box.z || 0) + (pos.z || 0) + (offset && offset.z || 0), 2) +
					(units && units.z || 'px') + '' +
					')';
			
			//@todo matrix
			if ( pos.rotate && is.number(pos.rotate) )
				t += ' rotate(' + floatCut((pos.rotate || 0) % 360, 2) + 'deg)';
			if ( pos.rotateX && is.number(pos.rotateX) )
				t += ' rotateX(' + floatCut((pos.rotateX || 0) % 360, 2) + 'deg)';
			if ( pos.rotateY && is.number(pos.rotateY) )
				t += ' rotateY(' + floatCut((pos.rotateY || 0) % 360, 2) + 'deg)';
			
			if ( is.number(pos.opacity) )
				css.opacity = min(1, max(0, floatCut(pos.opacity, 2)));
			
			pos.perspective && (t = "perspective(" + pos.perspective + (units && units.perspective || 'px') + ") " + t)
			
			t && (
				css.transform = t
			);
			
			
			is.number(pos._width) && (css.width = (pos._width) * (box.x || 0) + 'px');
			is.number(pos._height) && (css.height = (pos._height) * (box.y || 0) + 'px');
			
			is.number(pos.width) && (css.width = (pos.width) + (units && units.x || 'px'));
			is.number(pos.height) && (css.height = (pos.height) + (units && units.y || 'px'));
			
			is.number(pos.zIndex) && (css.zIndex = pos.zIndex);
			
			
			Object.keys(pos).forEach(
				key => {
					if ( !(key in customProps) )
						css[key] = pos[key] + (units && units[key] || 'px')
				}
			)
		},
	};
export default Dom;