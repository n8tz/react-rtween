/*
 *   The MIT License (MIT)
 *   Copyright (c) 2019. Wise Wild Web
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

import deepEqual from "fast-deep-equal";
import is        from "is";
import PropTypes from "prop-types";
import React     from 'react';
import ReactDom  from "react-dom";
import domUtils  from "../utils/dom";

import withTweener from "../spells/withTweener";
import TweenRef    from "./TweenRef";

@withTweener
export default class Draggable extends React.Component {
	static propTypes    = {
		xAxis: PropTypes.string,
		yAxis: PropTypes.string,
	};
	static defaultProps = {
		Comp: 'div',
	};
	state               = {};
	_                   = {};
	root                = React.createRef();
	
	componentWillUnmount() {
		let node = this.root?.current;
		if ( this._.scrollEnabled ) {
			this._.scrollEnabled = false;
			
			//this._.axes          = undefined;
			node && this._.dragList && domUtils.removeEvent(node
				, this._.dragList)
		}
	}
	
	componentDidMount() {
		this._registerScrollListeners();
	}
	
	/**
	 * Return scrollable parent node list basing a dom node
	 * @param node
	 * @returns {T[]}
	 */
	getScrollableNodes( node ) {
		let scrollable = domUtils.findReactParents(node), _ = this._;
		
		return scrollable.map(
			id => (is.string(id)
			       ? this._.refs[id] && ReactDom.findDOMNode(this._.refs[id]) || this.refs[id] || document.getElementById(id)
			       : id));
	}
	
	/**
	 * todo rewrite or use lib
	 * Init touch & scroll listeners
	 * Drive scroll & drag values updates
	 * @private
	 */
	_registerScrollListeners() {
		let rootNode                  = this.root?.current,
		    { xAxis, yAxis, tweener } = this.props,
		    lastStartTm,
		    cLock, dX,
		    parents,
		    dY, parentsState,
		    _                         = tweener._;
		if ( rootNode ) {
			domUtils.addEvent(
				rootNode, this._.dragList = {
					'dragstart': ( e, touch, descr ) => {//@todo
						let pTweener,
						    x,
						    y, i, style;
						
						parents      = this.getScrollableNodes(e.target);
						//console.log("start")
						lastStartTm  = Date.now();
						dX           = 0;
						dY           = 0;
						parentsState = [];
						for ( i = 0; i < parents.length; i++ ) {
							pTweener = parents[i];
							// react comp with tweener support
							if ( pTweener.__isTweener && pTweener._.scrollEnabled ) {
								x = xAxis && pTweener._getAxis(xAxis);
								y = yAxis && pTweener._getAxis(yAxis);
							}
							
						}
						//this._updateNodeInertia()
						//e.stopPropagation();
						//e.preventDefault();
					},
					'click'    : ( e, touch, descr ) => {//@todo
						if ( lastStartTm &&
							!((lastStartTm > Date.now() - _.options.maxClickTm) &&
								Math.abs(dY) < _.options.maxClickOffset &&
								Math.abs(dX) < _.options.maxClickOffset)
						) {
							e.preventDefault();
							e.stopPropagation();
							//console.log("prevented click", Math.abs(dX), Math.abs(dY))
							//console.log(':o ' + (lastStartTm - Date.now()) + ' ' + dX + ' ' + dY)
						}
						//else console.log("click", Math.abs(dX), Math.abs(dY))
						
					},
					'drag'     : ( e, touch, descr ) => {//@todo
						let tweener,
						    x, deltaX, xDispatched, vX,
						    y, deltaY, yDispatched, vY,
						    cState, i;
						
						dX = -(descr._lastPos.x - descr._startPos.x);
						dY = -(descr._lastPos.y - descr._startPos.y);
						
						if ( lastStartTm && ((lastStartTm > Date.now() - _.options.maxClickTm) && Math.abs(dY) < _.options.maxClickOffset && Math.abs(dX) < _.options.maxClickOffset) )// skip tap & click
						{
							//console.log(':u ' + (lastStartTm - Date.now()) + ' ' + dX + ' ' + dY)
							return;
						}
						else {
							
							xDispatched = !dX;
							yDispatched = !dY;
							if ( _.options.dragDirectionLock ) {
								if ( cLock === "Y" || !cLock && Math.abs(dY * .5) > Math.abs(dX) ) {
									cLock = "Y";
									dX    = 0;
									//xDispatched = true;
								}
								else if ( cLock === "X" || !cLock && Math.abs(dX * .5) > Math.abs(dY) ) {
									cLock = "X";
									dY    = 0;
									//yDispatched = true;
								}
							}
							//console.log("drag", dX, dY, cLock, _.options.dragDirectionLock);
							for ( i = 0; i < parents.length; i++ ) {
								tweener = parents[i];
								// react comp with tweener support
								if ( tweener.__isTweener && tweener._.scrollEnabled ) {
									
									x = xAxis && tweener._getAxis(xAxis);
									y = yAxis && tweener._getAxis(yAxis);
									
									if ( !parentsState[i] ) {
										parentsState[i] = { x: x?.scrollPos, y: y?.scrollPos };
										x?.inertia?.startMove();
										y?.inertia?.startMove();
										xAxis && !x.inertiaFrame && tweener.applyInertia(x, xAxis);
										yAxis && !y.inertiaFrame && tweener.applyInertia(y, yAxis);
									}
									
									if ( x )
										deltaX = dX && (dX / tweener._.box.x) * (x.scrollableWindow || x.scrollableArea) || 0;
									if ( y )
										deltaY = dY && (dY / tweener._.box.y) * (y.scrollableWindow || y.scrollableArea) || 0;
									
									if ( !xDispatched && deltaX && x?.inertia?.isInbound(parentsState[i].x + deltaX)
										&& (tweener.componentShouldScroll(xAxis, deltaX)) ) {
										x.inertia.hold(parentsState[i].x + deltaX);
										xDispatched = true;
									}
									//console.log("scrollY", tweener.isAxisOut("scrollY", parentsState[i].y
									// + deltaY, true));
									if ( !yDispatched && deltaY && y?.inertia?.isInbound(parentsState[i].y + deltaY)
										&& (tweener.componentShouldScroll(yAxis, deltaY)) ) {
										y.inertia.hold(parentsState[i].y + deltaY);
										yDispatched = true;
									}
								}
								
							}
							if ( yDispatched && xDispatched ) {
								//e.stopPropagation();
								//e.cancelable && e.preventDefault();
								//return;
							}
							//dX = 0;
							//dY = 0;
						}
					}
					
					,
					'dropped': ( e, touch, descr ) => {
						let pTweener,
						    x, deltaX, xDispatched, vX,
						    y, deltaY, yDispatched, vY,
						    cState, i;
						
						cLock = undefined;
						//lastStartTm                     = undefined;
						//document.body.style.userSelect  = '';
						//document.body.style.touchAction = '';
						for ( i = 0; i < parents.length; i++ ) {
							pTweener = parents[i];
							// react comp with tweener support
							if ( pTweener.__isTweener && pTweener._.scrollEnabled && parentsState[i] ) {
								pTweener._getAxis(xAxis)?.inertia?.release();
								pTweener._getAxis(yAxis)?.inertia?.release();
							}
							//else if ( is.element(tweener) ) {
							//	cState = parentsState[i];
							//	if ( cState ) {
							//		cState.inertia.x.release();
							//		cState.inertia.y.release();
							//	}
							//}
							
						}
						if ( lastStartTm && !((lastStartTm > Date.now() - _.options.maxClickTm) && Math.abs(dY)
							< _.options.maxClickOffset && Math.abs(dX) < _.options.maxClickOffset) )// skip tap
						// &
						// click
						{
							e.stopPropagation();
							e.cancelable && e.preventDefault();
							//console.log("prevented", Math.abs(dX), Math.abs(dY))
							//return;
						}
						//else {
						//console.log("not prevented", Math.abs(dX), Math.abs(dY))
						//}
						//lastStartTm = 0;
						parents = parentsState = null;
					}
				},
				null,
				_.options.enableMouseDrag
			)
			this._.doRegister = !!rootNode;
		}
		else {
			this._.doRegister = true;
		}
	}
	
	getProps() {
		let props = this.props;
		props     = { ...props };
		delete props.Comp;
		delete props.xAxis;
		delete props.yAxis;
		delete props.tweener;
		delete props.forwardedRef;
		return props;
	}
	
	render() {
		let {
			    children,
			    Comp,
			    forwardedRef,
			    items = [],
		    } = this.props;
		if ( forwardedRef ) {
			//this.root =  forwardedRef;
		}
		return <Comp {...this.getProps()} ref={this.root}>{children}</Comp>;
	}
}
Draggable.div = ( props ) => {
	return <Draggable {...props}/>;
}