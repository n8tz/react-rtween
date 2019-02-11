/*!
 * MIT License
 * 
 * Copyright (c) 2018 Wise Wild Web
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=14)}([function(e,t){e.exports=require("@babel/runtime/helpers/getPrototypeOf")},function(e,t){e.exports=require("rtween")},function(e,t){e.exports=require("@babel/runtime/helpers/objectSpread")},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("@babel/runtime/helpers/get")},function(e,t){e.exports=require("react-dom")},function(e,t){e.exports=require("@babel/runtime/helpers/classCallCheck")},function(e,t){e.exports=require("@babel/runtime/helpers/createClass")},function(e,t){e.exports=require("@babel/runtime/helpers/possibleConstructorReturn")},function(e,t){e.exports=require("@babel/runtime/helpers/inherits")},function(e,t){e.exports=require("is")},function(e,t){e.exports=require("@babel/runtime/helpers/toConsumableArray")},function(e,t){e.exports=require("@babel/runtime/helpers/typeof")},function(e,t){e.exports=require("taskflows")},function(e,t,n){"use strict";n.r(t);var i=n(6),r=n.n(i),o=n(7),s=n.n(o),a=n(8),l=n.n(a),u=n(0),h=n.n(u),c=n(9),f=n.n(c),p=n(3),_=n.n(p),d=n(12),w=n.n(d),m=n(2),y=n.n(m),b=n(11),v=n.n(b),S=n(4),g=n.n(S),x=n(10),M=n.n(x),R=n(5),A=n.n(R),k=n(13),P=n.n(k),T=n(10),O=function(e,t){var n=Math.pow(10,t);return Math.round(e*n)/n},E=Math.min,B=Math.max,C={prefix:/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":/trident/i.test(navigator.userAgent)?"ms":"opera"in window?"O":"",dashedPrefix:/webkit/i.test(navigator.appVersion)?"-webkit-":/firefox/i.test(navigator.userAgent)?"-moz-":/trident/i.test(navigator.userAgent)?"-ms-":"opera"in window?"-o-":""},D={addWheelEvent:function(e,t){var n,i,r="";e.addEventListener?n="addEventListener":(n="attachEvent","detachEvent",r="on"),i="onwheel"in t.createElement("div")?"wheel":void 0!==t.onmousewheel?"mousewheel":"DOMMouseScroll";var o=10,s=40,a=800;function l(e){var t=0,n=0,i=0,r=0;return"detail"in e&&(n=e.detail),"wheelDelta"in e&&(n=-e.wheelDelta/120),"wheelDeltaY"in e&&(n=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=n,n=0),i=t*o,r=n*o,"deltaY"in e&&(r=e.deltaY),"deltaX"in e&&(i=e.deltaX),(i||r)&&e.deltaMode&&(1==e.deltaMode?(i*=s,r*=s):(i*=a,r*=a)),i&&!t&&(t=i<1?-1:1),r&&!n&&(n=r<1?-1:1),{spinX:t,spinY:n,pixelX:i,pixelY:r}}function u(t,o,s,a,u){t[n](r+o,s._wheelList=function(t){!t&&(t=e.event);var n={originalEvent:t,target:t.target||t.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==t.type?0:1,deltaX:0,delatZ:0,preventDefault:function(){t.preventDefault?t.preventDefault():t.returnValue=!1},normalized:l(t)};return"mousewheel"==i?n.deltaY=-.025*t.wheelDelta:"wheel"==i&&"Moz"==C.prefix?n.deltaY=t.deltaY/3:n.deltaY="wheel"==i?t.deltaY/100:t.deltaY,s.call(a||this,n)},u||!1)}return function(e,t,n,r){u(e,i,t,n,r),"DOMMouseScroll"==i&&u(e,"MozMousePixelScroll",t,n,r)}}(window,document),rmWheelEvent:function(e,t){var n,i,r="";addEventListener?n="removeEventListener":(n="detachEvent",r="on"),i="onwheel"in t.createElement("div")?"wheel":void 0!==t.onmousewheel?"mousewheel":"DOMMouseScroll";function o(e,t,i,o,s){e[n](r+t,i._wheelList)}return function(e,t,n,r){o(e,i,t),"DOMMouseScroll"==i&&o(e,"MozMousePixelScroll",t)}}(window,document),mapInBoxCSS:function(e,t,n,i,r){var o="";(T.number(e._z)||T.number(e._x)||T.number(e._y)||T.number(e.z)||T.number(e.x)||T.number(e.y))&&(o="translate3d("+O((e._x||0)*(n.x||0)+(e.x||0)+(r&&r.x||0),2)+(i&&i.x||"px")+", "+O((e._y||0)*(n.y||0)+(e.y||0)+(r&&r.y||0),2)+(i&&i.y||"px")+", "+O((e._z||0)*(n.z||0)+(e.z||0)+(r&&r.z||0),2)+(i&&i.z||"px")+")"),e.rotate&&T.number(e.rotate)&&(o+=" rotate("+O((e.rotate||0)%360,2)+"deg)"),e.rotateX&&T.number(e.rotateX)&&(o+=" rotateX("+O((e.rotateX||0)%360,2)+"deg)"),e.rotateY&&T.number(e.rotateY)&&(o+=" rotateY("+O((e.rotateY||0)%360,2)+"deg)"),T.number(e.opacity)&&(t.opacity=E(1,B(0,O(e.opacity,2)))),t.transform=o,T.number(e._width)&&(t.width=e._width*(n.x||0)+"px"),T.number(e._height)&&(t.height=e._height*(n.y||0)+"px"),T.number(e.width)&&(t.width=e.width+(i&&i.x||"px")),T.number(e.height)&&(t.height=e.height+(i&&i.y||"px")),T.number(e.zIndex)&&(t.zIndex=e.zIndex)}},z=n(1),j=n.n(z),I=new Function("try {return this===window;}catch(e){ return false;}")(),Y=M.a.array,q={x:0,y:0,z:0,_x:0,_y:0,_z:0,rotateY:0,rotateX:0,rotate:0},L=new RegExp("([+-]?(?:[0-9]*[.])?[0-9]+)\\s*("+["em","ex","%","px","cm","mm","in","pt","pc","ch","rem","vh","vw","vmin","vmax"].join("|")+")"),X=function(e){var t={};return Object.keys(e).map(function(n){L.test((e[n]+"").trim())&&(t[n]=(e[n]+"").trim().replace(L,"$2"),e[n]=parseFloat((e[n]+"").trim().replace(L,"$1")))}),t},U={}.constructor;function N(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i=(!t[0]||t[0].prototype instanceof _.a.Component||t[0]===_.a.Component)&&t.shift(),o=(!t[0]||t[0]instanceof U)&&t.shift();return i&&(i.prototype instanceof _.a.Component||i===_.a.Component)?function(e){function t(){var e;r()(this,t);var n=(e=l()(this,h()(t).apply(this,arguments))).constructor;return e._box={x:100,y:100,z:800},e._curMotionStateId=n.InitialMotionState||"stand",e}return f()(t,e),s()(t,[{key:"goToMotionStateId",value:function(e){var t=this,n=this.constructor,i=n.motionStates[e],r=this._curMotionStateId;if(!this._rendered)return this._delayedMotionTarget=e;(this.running&&(this.running=arguments),this.running||e==this._curMotionStateId)||(this._tweenRefCSS||this.makeTweenable(),this.running=!0,new P.a([n.motionStates[this._curMotionStateId]&&function(e,t){return n.motionStates[r].leaving(e,t,r)},function(){t._curMotionStateId=e,!0!==t.running&&setTimeout(function(){return t.goToMotionStateId.apply(t,v()(t.running))}),t.running=!1},i&&function(e,t){return i.entering(e,t,r)},function(){i.refs&&Object.keys(i.refs).map(function(e){t.updateRefStyle(e,i.refs[e][0]),t.applyTweenState(e,i.refs[e][1])})}],this).run())}},{key:"applyTweenState",value:function(e,t,n){var i=this;Object.keys(t).map(function(r){return i._tweenRefMaps[e][r]=(!n&&i._tweenRefMaps[e][r]||0)+t[r]})}},{key:"updateRefStyle",value:function(e,t,n){var i=this;if(Y(e)&&Y(t))return e.map(function(e,r){return i.updateRefStyle(e,t[r],n)});if(Y(e))return e.map(function(e){return i.updateRefStyle(e,t,n)});if(this._tweenRefCSS||this.makeTweenable(),!n&&this.refs[e]){var r=this.refs[e]instanceof Element?this.refs[e]:A.a.findDOMNode(this.refs[e]);r&&Object.assign(r.style,t)}this._tweenRefCSS[e]=this._tweenRefCSS[e]||{},Object.assign(this._tweenRefCSS[e],t)}},{key:"resetTweenable",value:function(){for(var e=this,t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];n.forEach(function(t){e._tweenRefMaps[t]=y()({},e._tweenRefOrigin[t])})}},{key:"addScrollableAnim",value:function(e,t,n){var i;Y(e)?i=e:(i=e.anims,e.length),i instanceof j.a||(i=new j.a(i,this._tweenRefMaps)),this.makeTweenable(),this.makeScrollable(),this._scrollableAnims.push(i),this._scrollPos=this._scrollPos||0,this._scrollableArea=this._scrollableArea||0,this._scrollableArea=Math.max(this._scrollableArea,i.duration)}},{key:"clearScrollableAnim",value:function(e){if(this._scrollableAnims){var t=this._scrollableAnims.indexOf(e);-1!=t&&this._scrollableAnims.splice(t),this._scrollableArea=Math.max.apply(Math,v()(this._scrollableAnims.map(function(e){return e.duration})).concat([0]))}}},{key:"clearScrollableAnims",value:function(){this._scrollableAnims&&(this._scrollableAnims=[],this._scrollPos=this._scrollableArea=0)}},{key:"scrollTo",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(this._scrollableAnims){var i=e,r=function(e){return t._scrollPos=e,t.componentDidScroll&&t.componentDidScroll(~~e)};return e=Math.max(0,e),e=Math.min(e,this._scrollableArea),n?this._scrollableAnims.forEach(function(t){return t.runTo(e,n,void 0,r)}):(this._scrollableAnims.forEach(function(t){return t.goTo(e)}),r(e)),this._live||(this._live=!0,requestAnimationFrame(this.__rafLoop=this.__rafLoop||this._rafLoop.bind(this))),!(i-e)}}},{key:"pushAnim",value:function(e,t,n){var i,r,o=this;return Y(e)?i=e:(i=e.anims,r=e.initial),i instanceof j.a||(i=new j.a(i,this._tweenRefMaps)),this.makeTweenable(),!n&&r&&Object.keys(r).map(function(t){return o.applyTweenState(t,r[t],e.reset)}),i.run(this._tweenRefMaps,function(){var e=o._runningAnims.indexOf(i);-1!=e&&o._runningAnims.splice(e,1),t&&t(i)}),this._runningAnims.push(i),this._live||(this._live=!0,requestAnimationFrame(this.__rafLoop=this.__rafLoop||this._rafLoop.bind(this))),i}},{key:"tweenable",value:function(e,t,n){Array.prototype.slice.call(arguments).map(function(e){return(e instanceof j.a?"rtween":e instanceof Array&&"array")||w()(e)});return{}}},{key:"tweenRef",value:function(e,t,n,i,r,o){this.makeTweenable();var s=this.constructor,a=s.motionStates&&s.motionStates[this._curMotionStateId];return this._tweenRefs[e]||this._tweenRefTargets.push(e),a&&a.refs&&a.refs[e]?(t=t||y()({},a.refs[e][0]),n=n||y()({},a.refs[e][1])):(t=t||{},n=n||{}),this._tweenRefs[e]=!0,Y(n)&&(this._tweenRefUnits[e]=n[1],n=n[0]),n.getPosAt?n=n.getPosAt(i,!o&&this._tweenRefMaps[e]||Object.assign({},q,n.scope||{})):(o=r,r=i,this._tweenRefUnits[e]=X(n)),this._tweenRefOrigin[e]=n,!o&&this._tweenRefCSS[e]?this._tweenRefCSS[e]=y()({},t):this._tweenRefCSS[e]=t&&y()({},t)||{},t=this._tweenRefCSS[e],n=this._tweenRefMaps[e]=!o&&this._tweenRefMaps[e]||Object.assign({},q,n||{}),D.mapInBoxCSS(n,t,this._box,this._tweenRefUnits[e]),r?{style:y()({},this._tweenRefCSS[e])}:{style:y()({},this._tweenRefCSS[e]),ref:e}}},{key:"makeScrollable",value:function(){var e=this;this._scrollEnabled||(this._scrollEnabled=!0,this._scrollableAnims=[],I&&D.addWheelEvent(A.a.findDOMNode(this),this._onScroll=function(t){var n=e._scrollPos+t.deltaY;e.shouldApplyScroll&&!e.shouldApplyScroll()||e.scrollTo(n)&&t.preventDefault()}))}},{key:"makeTweenable",value:function(){var e=this;this._tweenEnabled||(this._rtweensByProp={},this._rtweensByStateProp={},this._tweenRefCSS={},this._tweenRefs={},this._tweenRefMaps={},this._tweenRefUnits={},this._tweenEnabled=!0,this._tweenRefOrigin={},this._tweenRefTargets=this._tweenRefTargets||[],this._runningAnims=this._runningAnims||[],I&&window.addEventListener("resize",this._onResize=function(){e._updateBox(),e._updateTweenRefs()}))}},{key:"_updateBox",value:function(){var e=A.a.findDOMNode(this);e&&(this._box.inited=!0,this._box.x=e.offsetWidth,this._box.y=e.offsetHeight)}},{key:"getTweenableRef",value:function(e){return this.refs[e]instanceof Element?this.refs[e]:A.a.findDOMNode(this.refs[e])}},{key:"_rafLoop",value:function(){this._updateTweenRefs(),requestAnimationFrame(this.__rafLoop)}},{key:"_updateTweenRefs",value:function(){for(var e,t,n=0;n<this._tweenRefTargets.length;n++)e=this._tweenRefTargets[n],D.mapInBoxCSS(this._tweenRefMaps[e],this._tweenRefCSS[e],this._box,this._tweenRefUnits[e]),(t=this._tweenEnabled&&"__root"==e?A.a.findDOMNode(this):this.getTweenableRef(e))&&Object.assign(t.style,this._tweenRefCSS[e])}},{key:"componentWillUnmount",value:function(){this._tweenEnabled&&(this._tweenEnabled=!1,window.removeEventListener("resize",this._onResize)),this._scrollEnabled&&(this._scrollEnabled=!1,this._scrollableAnims=void 0,D.rmWheelEvent(A.a.findDOMNode(this),this._onScroll)),g()(h()(t.prototype),"componentWillUnmount",this)&&g()(h()(t.prototype),"componentWillUnmount",this).call(this)}},{key:"componentDidMount",value:function(){var e=this.constructor;this._rendered=!0,this._tweenEnabled&&(this._updateBox(),this._updateTweenRefs()),this._delayedMotionTarget&&(this.goToMotionStateId(this._delayedMotionTarget),delete this._delayedMotionTarget),e.scrollableAnim&&this.addScrollableAnim(e.scrollableAnim),g()(h()(t.prototype),"componentDidMount",this)&&g()(h()(t.prototype),"componentDidMount",this).call(this)}},{key:"componentDidUpdate",value:function(e,n){var i=this;this._tweenEnabled&&(this._updateBox(),this._updateTweenRefs(),this._rtweensByProp&&Object.keys(e).forEach(function(t){return i._rtweensByProp[t]&&i.props[t]!==e[t]&&i._rtweensByProp[t][i.props[t]]&&i.pushAnim(i._rtweensByProp[t][i.props[t]])},this),this._rtweensByStateProp&&n&&Object.keys(n).forEach(function(e){return i._rtweensByStateProp[e]&&i.state[e]!==n[e]&&i._rtweensByStateProp[e][i.state[e]]&&i.pushAnim(i._rtweensByStateProp[e][i.state[e]])},this)),g()(h()(t.prototype),"componentDidUpdate",this)&&g()(h()(t.prototype),"componentDidUpdate",this).call(this)}},{key:"registerPropChangeAnim",value:function(e,t,n){this._rtweensByProp=this._rtweensByProp||{},this._rtween=this._rtween||new j.a,this._rtweensByProp[e]=this._rtweensByProp[e]||{},this._rtweensByProp[e][t]=this._rtweensByProp[e][t]||new j.a,this._rtweensByProp[e][t].mount(n)}},{key:"registerStateChangeAnim",value:function(e,t,n){this._rtweensByStateProp=this._rtweensByStateProp||{},this._rtween=this._rtween||new j.a,this._rtweensByStateProp[e]=this._rtweensByStateProp[e]||{},this._rtweensByStateProp[e][t]=this._rtweensByStateProp[e][t]||new j.a,this._rtweensByStateProp[e][t].mount(n)}}]),t}(i):function(e){return N(e,o)}}n.d(t,"Component",function(){return W}),n.d(t,"asTweener",function(){return N});var W=N({})(_.a.Component),F=function(e){function t(){return r()(this,t),l()(this,h()(t).apply(this,arguments))}return f()(t,e),s()(t,[{key:"render",value:function(){return"Should have some render fn here in "+this.constructor.displayName}}]),t}(W);t.default=F}]);