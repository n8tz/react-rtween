/*!
 * react-rtween
 * Copyright (C) 2019  Nathanael Braun
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
module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=14)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("@babel/runtime/helpers/getPrototypeOf")},function(e,t){e.exports=require("@babel/runtime/helpers/objectSpread")},function(e,t){e.exports=require("rtween")},function(e,t){e.exports=require("@babel/runtime/helpers/get")},function(e,t){e.exports=require("@babel/runtime/helpers/classCallCheck")},function(e,t){e.exports=require("@babel/runtime/helpers/createClass")},function(e,t){e.exports=require("@babel/runtime/helpers/possibleConstructorReturn")},function(e,t){e.exports=require("@babel/runtime/helpers/inherits")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("is")},function(e,t){e.exports=require("@babel/runtime/helpers/toConsumableArray")},function(e,t){e.exports=require("@babel/runtime/helpers/typeof")},function(e,t){e.exports=require("taskflows")},function(e,t,n){"use strict";n.r(t);var r=n(5),o=n.n(r),a=n(6),i=n.n(a),s=n(7),l=n.n(s),u=n(1),c=n.n(u),f=n(8),p=n.n(f),d=n(0),h=n.n(d),w=n(12),m=n.n(w),y=n(2),b=n.n(y),v=n(11),S=n.n(v),g=n(4),x=n.n(g),M=n(10),R=n.n(M),A=n(9),_=n.n(A),k=n(13),P=n.n(k),E=n(10),T=function(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n},O=Math.min,C=Math.max,B={prefix:/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":/trident/i.test(navigator.userAgent)?"ms":"opera"in window?"O":"",dashedPrefix:/webkit/i.test(navigator.appVersion)?"-webkit-":/firefox/i.test(navigator.userAgent)?"-moz-":/trident/i.test(navigator.userAgent)?"-ms-":"opera"in window?"-o-":""},D={addWheelEvent:function(e,t){var n,r,o="";e.addEventListener?n="addEventListener":(n="attachEvent","detachEvent",o="on"),r="onwheel"in t.createElement("div")?"wheel":void 0!==t.onmousewheel?"mousewheel":"DOMMouseScroll";var a=10,i=40,s=800;function l(e){var t=0,n=0,r=0,o=0;return"detail"in e&&(n=e.detail),"wheelDelta"in e&&(n=-e.wheelDelta/120),"wheelDeltaY"in e&&(n=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=n,n=0),r=t*a,o=n*a,"deltaY"in e&&(o=e.deltaY),"deltaX"in e&&(r=e.deltaX),(r||o)&&e.deltaMode&&(1==e.deltaMode?(r*=i,o*=i):(r*=s,o*=s)),r&&!t&&(t=r<1?-1:1),o&&!n&&(n=o<1?-1:1),{spinX:t,spinY:n,pixelX:r,pixelY:o}}function u(t,a,i,s,u){t[n](o+a,i._wheelList=function(t){!t&&(t=e.event);var n={originalEvent:t,target:t.target||t.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==t.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){t.preventDefault?t.preventDefault():t.returnValue=!1},normalized:l(t)};return"mousewheel"==r?n.deltaY=-.025*t.wheelDelta:"wheel"==r&&"Moz"==B.prefix?n.deltaY=t.deltaY/3:n.deltaY="wheel"==r?t.deltaY/100:t.deltaY,i.call(s||this,n)},u||!1)}return function(e,t,n,o){u(e,r,t,n,o),"DOMMouseScroll"==r&&u(e,"MozMousePixelScroll",t,n,o)}}(window,document),rmWheelEvent:function(e,t){var n,r,o="";addEventListener?n="removeEventListener":(n="detachEvent",o="on"),r="onwheel"in t.createElement("div")?"wheel":void 0!==t.onmousewheel?"mousewheel":"DOMMouseScroll";function a(e,t,r,a,i){e[n](o+t,r._wheelList)}return function(e,t,n,o){a(e,r,t),"DOMMouseScroll"==r&&a(e,"MozMousePixelScroll",t)}}(window,document),mapInBoxCSS:function(e,t,n,r,o){var a="";(E.number(e._z)||E.number(e._x)||E.number(e._y)||E.number(e.z)||E.number(e.x)||E.number(e.y))&&(a="translate3d("+T((e._x||0)*(n.x||0)+(e.x||0)+(o&&o.x||0),2)+(r&&r.x||"px")+", "+T((e._y||0)*(n.y||0)+(e.y||0)+(o&&o.y||0),2)+(r&&r.y||"px")+", "+T((e._z||0)*(n.z||0)+(e.z||0)+(o&&o.z||0),2)+(r&&r.z||"px")+")"),e.rotate&&E.number(e.rotate)&&(a+=" rotate("+T((e.rotate||0)%360,2)+"deg)"),e.rotateX&&E.number(e.rotateX)&&(a+=" rotateX("+T((e.rotateX||0)%360,2)+"deg)"),e.rotateY&&E.number(e.rotateY)&&(a+=" rotateY("+T((e.rotateY||0)%360,2)+"deg)"),E.number(e.opacity)&&(t.opacity=O(1,C(0,T(e.opacity,2)))),t.transform=a,E.number(e._width)&&(t.width=e._width*(n.x||0)+"px"),E.number(e._height)&&(t.height=e._height*(n.y||0)+"px"),E.number(e.width)&&(t.width=e.width+(r&&r.x||"px")),E.number(e.height)&&(t.height=e.height+(r&&r.y||"px")),E.number(e.zIndex)&&(t.zIndex=e.zIndex)}},z=h.a.createContext({tweenerById:{}}),j=n(3),I=n.n(j),Y=new Function("try {return this===window;}catch(e){ return false;}")(),q=R.a.array,L={x:0,y:0,z:0,_x:0,_y:0,_z:0,rotateY:0,rotateX:0,rotate:0},X=new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*("+["em","ex","%","px","cm","mm","in","pt","pc","ch","rem","vh","vw","vmin","vmax"].join("|")+")"),U=function(e){var t={};return Object.keys(e).map(function(n){X.test((e[n]+"").trim())&&(t[n]=(e[n]+"").trim().replace(X,"$2"),e[n]=parseFloat((e[n]+"").trim().replace(X,"$1")))}),t},W={}.constructor;function N(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=(!t[0]||t[0].prototype instanceof h.a.Component||t[0]===h.a.Component)&&t.shift(),a=(!t[0]||t[0]instanceof W)&&t.shift();if(!r||!(r.prototype instanceof h.a.Component||r===h.a.Component))return function(e){return N(e,a)};var s={refs:{}};return function(e){function t(){var e;o()(this,t);var n=(e=l()(this,c()(t).apply(this,arguments))).constructor;return e._=s,s.box={x:100,y:100,z:800},s.curMotionStateId=n.InitialMotionState||"stand",e}return p()(t,e),i()(t,[{key:"goToMotionStateId",value:function(e){var t=this,n=this.constructor,r=n.motionStates[e],o=s.curMotionStateId;if(!s.rendered)return s.delayedMotionTarget=e;(this.running&&(this.running=arguments),this.running||e==s.curMotionStateId)||(s.tweenRefCSS||this.makeTweenable(),this.running=!0,new P.a([n.motionStates[s.curMotionStateId]&&function(e,t){return n.motionStates[o].leaving(e,t,o)},function(){s.curMotionStateId=e,!0!==t.running&&setTimeout(function(){return t.goToMotionStateId.apply(t,S()(t.running))}),t.running=!1},r&&function(e,t){return r.entering(e,t,o)},function(){r.refs&&Object.keys(r.refs).map(function(e){t.updateRefStyle(e,r.refs[e][0]),t.applyTweenState(e,r.refs[e][1])})}],this).run())}},{key:"applyTweenState",value:function(e,t,n){var r=this;Object.keys(t).map(function(o){return r._tweenRefMaps[e][o]=(!n&&r._tweenRefMaps[e][o]||0)+t[o]})}},{key:"updateRefStyle",value:function(e,t,n){var r=this;if(q(e)&&q(t))return e.map(function(e,o){return r.updateRefStyle(e,t[o],n)});if(q(e))return e.map(function(e){return r.updateRefStyle(e,t,n)});if(s.tweenRefCSS||this.makeTweenable(),!n&&this.refs[e]){var o=this.refs[e]instanceof Element?this.refs[e]:_.a.findDOMNode(this.refs[e]);o&&Object.assign(o.style,t)}s.tweenRefCSS[e]=s.tweenRefCSS[e]||{},Object.assign(s.tweenRefCSS[e],t)}},{key:"resetTweenable",value:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(e){s.tweenRefMaps[e]=b()({},s.tweenRefOrigin[e])})}},{key:"addScrollableAnim",value:function(e,t,n){var r,o=this._;q(e)?r=e:(r=e.anims,e.length),r instanceof I.a||(r=new I.a(r,o.tweenRefMaps)),this.makeTweenable(),this.makeScrollable(),o.scrollableAnims.push(r),o.scrollPos=o.scrollPos||0,o.scrollableArea=o.scrollableArea||0,o.scrollableArea=Math.max(o.scrollableArea,r.duration)}},{key:"clearScrollableAnim",value:function(e){if(s.scrollableAnims){var t=s.scrollableAnims.indexOf(e);-1!=t&&s.scrollableAnims.splice(t),s.scrollableArea=Math.max.apply(Math,S()(s.scrollableAnims.map(function(e){return e.duration})).concat([0]))}}},{key:"clearScrollableAnims",value:function(){s.scrollableAnims&&(s.scrollableAnims=[],s.scrollPos=s.scrollableArea=0)}},{key:"scrollTo",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(s.scrollableAnims){var r=e,o=function(e){return s.scrollPos=e,t.componentDidScroll&&t.componentDidScroll(~~e)};return e=Math.max(0,e),e=Math.min(e,s.scrollableArea),n?s.scrollableAnims.forEach(function(t){return t.runTo(e,n,void 0,o)}):(s.scrollableAnims.forEach(function(t){return t.goTo(e)}),o(e)),s.live||(s.live=!0,requestAnimationFrame(s._rafLoop=s._rafLoop||this._rafLoop.bind(this))),!(r-e)}}},{key:"pushAnim",value:function(e,t,n){var r,o,a=this;return q(e)?r=e:(r=e.anims,o=e.initial),r instanceof I.a||(r=new I.a(r,s.tweenRefMaps)),this.makeTweenable(),!n&&o&&Object.keys(o).map(function(t){return a.applyTweenState(t,o[t],e.reset)}),r.run(s.tweenRefMaps,function(){var e=s.runningAnims.indexOf(r);-1!=e&&s.runningAnims.splice(e,1),t&&t(r)}),s.runningAnims.push(r),s.live||(s.live=!0,requestAnimationFrame(s._rafLoop=s._rafLoop||this._rafLoop.bind(this))),r}},{key:"tweenable",value:function(e,t,n){Array.prototype.slice.call(arguments).map(function(e){return(e instanceof I.a?"rtween":e instanceof Array&&"array")||m()(e)});return{}}},{key:"tweenRef",value:function(e,t,n,r,o,a){this.makeTweenable();var i=this.constructor,s=this._,l=i.motionStates&&i.motionStates[s.curMotionStateId];return s.tweenRefs[e]||s.tweenRefTargets.push(e),l&&l.refs&&l.refs[e]?(t=t||b()({},l.refs[e][0]),n=n||b()({},l.refs[e][1])):(t=t||{},n=n||{}),s.tweenRefs[e]=!0,q(n)&&(s.tweenRefUnits[e]=n[1],n=n[0]),n.getPosAt?n=n.getPosAt(r,!a&&s.tweenRefMaps[e]||Object.assign({},L,n.scope||{})):(a=o,o=r,s.tweenRefUnits[e]=U(n)),s.tweenRefOrigin[e]=n,!a&&s.tweenRefCSS[e]?s.tweenRefCSS[e]=b()({},t):s.tweenRefCSS[e]=t&&b()({},t)||{},t=s.tweenRefCSS[e],n=s.tweenRefMaps[e]=!a&&s.tweenRefMaps[e]||Object.assign({},L,n||{}),D.mapInBoxCSS(n,t,s.box,s.tweenRefUnits[e]),s.refs[e]=s.refs[e]||h.a.createRef(),o?{style:b()({},s.tweenRefCSS[e])}:{style:b()({},s.tweenRefCSS[e]),ref:s.refs[e]}}},{key:"makeScrollable",value:function(){var e=this;s.scrollEnabled||(s.scrollEnabled=!0,s.scrollableAnims=[],Y&&D.addWheelEvent(_.a.findDOMNode(this),s.onScroll=function(t){var n=s.scrollPos+t.deltaY;e.shouldApplyScroll&&!e.shouldApplyScroll()||e.scrollTo(n)&&t.preventDefault()}))}},{key:"makeTweenable",value:function(){var e=this;s.tweenEnabled||(s.rtweensByProp={},s.rtweensByStateProp={},s.tweenRefCSS={},s.tweenRefs={},s.tweenRefMaps={},s.tweenRefUnits={},s.tweenEnabled=!0,s.tweenRefOrigin={},s.tweenRefTargets=s.tweenRefTargets||[],s.runningAnims=s.runningAnims||[],Y&&window.addEventListener("resize",s.onResize=function(){e._updateBox(),e._updateTweenRefs()}))}},{key:"_updateBox",value:function(){var e=_.a.findDOMNode(this);e&&(s.box.inited=!0,s.box.x=e.offsetWidth,s.box.y=e.offsetHeight)}},{key:"getTweenableRef",value:function(e){return s.refs[e].current}},{key:"_rafLoop",value:function(){this._updateTweenRefs(),requestAnimationFrame(s._rafLoop)}},{key:"_updateTweenRefs",value:function(){if(s.tweenEnabled)for(var e,t,n=0;n<s.tweenRefTargets.length;n++)e=s.tweenRefTargets[n],D.mapInBoxCSS(s.tweenRefMaps[e],s.tweenRefCSS[e],s.box,s.tweenRefUnits[e]),(t=s.tweenEnabled&&"__root"==e?_.a.findDOMNode(this):this.getTweenableRef(e))&&Object.assign(t.style,s.tweenRefCSS[e])}},{key:"componentWillUnmount",value:function(){s.tweenEnabled&&(s.tweenEnabled=!1,window.removeEventListener("resize",s.onResize)),s.scrollEnabled&&(s.scrollEnabled=!1,s.scrollableAnims=void 0,D.rmWheelEvent(_.a.findDOMNode(this),s.onScroll)),x()(c()(t.prototype),"componentWillUnmount",this)&&x()(c()(t.prototype),"componentWillUnmount",this).call(this)}},{key:"componentDidMount",value:function(){var e=this.constructor;s.rendered=!0,s.tweenEnabled&&(this._updateBox(),this._updateTweenRefs()),s.delayedMotionTarget&&(this.goToMotionStateId(s.delayedMotionTarget),delete s.delayedMotionTarget),e.scrollableAnim&&this.addScrollableAnim(e.scrollableAnim),x()(c()(t.prototype),"componentDidMount",this)&&x()(c()(t.prototype),"componentDidMount",this).call(this)}},{key:"componentDidUpdate",value:function(e,n){var r=this;s.tweenEnabled&&(this._updateBox(),this._updateTweenRefs(),s.rtweensByProp&&Object.keys(e).forEach(function(t){return s.rtweensByProp[t]&&r.props[t]!==e[t]&&s.rtweensByProp[t][r.props[t]]&&r.pushAnim(s.rtweensByProp[t][r.props[t]])},this),s.rtweensByStateProp&&n&&Object.keys(n).forEach(function(e){return s.rtweensByStateProp[e]&&r.state[e]!==n[e]&&s.rtweensByStateProp[e][r.state[e]]&&r.pushAnim(s.rtweensByStateProp[e][r.state[e]])},this)),x()(c()(t.prototype),"componentDidUpdate",this)&&x()(c()(t.prototype),"componentDidUpdate",this).call(this)}},{key:"registerPropChangeAnim",value:function(e,t,n){s.rtweensByProp=s.rtweensByProp||{},s.rtween=s.rtween||new I.a,s.rtweensByProp[e]=s.rtweensByProp[e]||{},s.rtweensByProp[e][t]=s.rtweensByProp[e][t]||new I.a,s.rtweensByProp[e][t].mount(n)}},{key:"registerStateChangeAnim",value:function(e,t,n){s.rtweensByStateProp=s.rtweensByStateProp||{},s.rtween=s.rtween||new I.a,s.rtweensByStateProp[e]=s.rtweensByStateProp[e]||{},s.rtweensByStateProp[e][t]=s.rtweensByStateProp[e][t]||new I.a,s.rtweensByStateProp[e][t].mount(n)}},{key:"render",value:function(){return h.a.createElement(z.Provider,{value:this.tweenRef.bind(this)},x()(c()(t.prototype),"render",this).call(this))}}]),t}(r)}var F=function(e){function t(){var e,n;o()(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=l()(this,(e=c()(t)).call.apply(e,[this].concat(a)))).state={},n}return p()(t,e),i()(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.id,r=t.style,o=t.initial,a=t.pos,i=t.noRef,s=t.reset;return h.a.createElement(z.Consumer,null,function(t){var l=e.props.children;return h.a.isValidElement(l)&&(l=h.a.cloneElement(l,b()({},t(n,r||l.props.style,o,a,i,s)))),l})}}]),t}(h.a.Component);n.d(t,"Component",function(){return V}),n.d(t,"asTweener",function(){return N}),n.d(t,"TweenRef",function(){return F});var V=N({})(h.a.Component),H=function(e){function t(){return o()(this,t),l()(this,c()(t).apply(this,arguments))}return p()(t,e),i()(t,[{key:"render",value:function(){return"Should have some render fn here in "+this.constructor.displayName}}]),t}(V);t.default=H}]);