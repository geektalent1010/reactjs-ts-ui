// jshint ignore: start
/* eslint-disable */
!function(e,t){if("object"===typeof exports&&"object"===typeof module)module.exports=t(require("react"),require("react-dom"));else if("function"===typeof define&&define.amd)define(["react","react-dom"],t);else{var n="object"===typeof exports?t(require("react"),require("react-dom")):t(e.react,e["react-dom"]);for(var o in n)("object"===typeof exports?exports:e)[o]=n[o]}}(this,function(e,t){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=9)}([function(t,n){t.exports=e},function(e,t,n){e.exports=n(12)()},function(e,n){e.exports=t},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l=n(17),u=o(l),c=n(0),p=o(c),d=n(1),h=o(d),f=n(18),m=(o(f),n(19)),v=(h.default.any,h.default.func,h.default.node,{component:"span",childFactory:function(e){return e}}),g=function(e){function t(n,o){i(this,t);var a=r(this,e.call(this,n,o));return a.performAppear=function(e,t){a.currentlyTransitioningKeys[e]=!0,t.componentWillAppear?t.componentWillAppear(a._handleDoneAppearing.bind(a,e,t)):a._handleDoneAppearing(e,t)},a._handleDoneAppearing=function(e,t){t.componentDidAppear&&t.componentDidAppear(),delete a.currentlyTransitioningKeys[e];var n=(0,m.getChildMapping)(a.props.children);n&&n.hasOwnProperty(e)||a.performLeave(e,t)},a.performEnter=function(e,t){a.currentlyTransitioningKeys[e]=!0,t.componentWillEnter?t.componentWillEnter(a._handleDoneEntering.bind(a,e,t)):a._handleDoneEntering(e,t)},a._handleDoneEntering=function(e,t){t.componentDidEnter&&t.componentDidEnter(),delete a.currentlyTransitioningKeys[e];var n=(0,m.getChildMapping)(a.props.children);n&&n.hasOwnProperty(e)||a.performLeave(e,t)},a.performLeave=function(e,t){a.currentlyTransitioningKeys[e]=!0,t.componentWillLeave?t.componentWillLeave(a._handleDoneLeaving.bind(a,e,t)):a._handleDoneLeaving(e,t)},a._handleDoneLeaving=function(e,t){t.componentDidLeave&&t.componentDidLeave(),delete a.currentlyTransitioningKeys[e];var n=(0,m.getChildMapping)(a.props.children);n&&n.hasOwnProperty(e)?a.keysToEnter.push(e):a.setState(function(t){var n=s({},t.children);return delete n[e],{children:n}})},a.childRefs=Object.create(null),a.state={children:(0,m.getChildMapping)(n.children)},a}return a(t,e),t.prototype.UNSAFE_componentWillMount=function(){this.currentlyTransitioningKeys={},this.keysToEnter=[],this.keysToLeave=[]},t.prototype.componentDidMount=function(){var e=this.state.children;for(var t in e)e[t]&&this.performAppear(t,this.childRefs[t])},t.prototype.UNSAFE_componentWillReceiveProps=function(e){var t=(0,m.getChildMapping)(e.children),n=this.state.children;this.setState({children:(0,m.mergeChildMappings)(n,t)});for(var o in t){var i=n&&n.hasOwnProperty(o);!t[o]||i||this.currentlyTransitioningKeys[o]||this.keysToEnter.push(o)}for(var r in n){var a=t&&t.hasOwnProperty(r);!n[r]||a||this.currentlyTransitioningKeys[r]||this.keysToLeave.push(r)}},t.prototype.componentDidUpdate=function(){var e=this,t=this.keysToEnter;this.keysToEnter=[],t.forEach(function(t){return e.performEnter(t,e.childRefs[t])});var n=this.keysToLeave;this.keysToLeave=[],n.forEach(function(t){return e.performLeave(t,e.childRefs[t])})},t.prototype.render=function(){var e=this,t=[];for(var n in this.state.children)!function(n){var o=e.state.children[n];if(o){var i="string"!==typeof o.ref,r=e.props.childFactory(o),a=function(t){e.childRefs[n]=t};r===o&&i&&(a=(0,u.default)(o.ref,a)),t.push(p.default.cloneElement(r,{key:n,ref:a}))}}(n);var o=s({},this.props);return delete o.transitionLeave,delete o.transitionName,delete o.transitionAppear,delete o.transitionEnter,delete o.childFactory,delete o.transitionLeaveTimeout,delete o.transitionEnterTimeout,delete o.transitionAppearTimeout,delete o.component,p.default.createElement(this.props.component,o,t)},t;}(p.default.Component);g.displayName="TransitionGroup",g.propTypes={},g.defaultProps=v,t.default=g,e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=!("undefined"===typeof window||!window.document||!window.document.createElement),e.exports=t.default},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){var t="transition"+e+"Timeout",n="transition"+e;return function(e){if(e[n]){if(null==e[t])return new Error(t+" wasn't supplied to CSSTransitionGroup: this can cause unreliable animations and won't be supported in a future version of React. See https://fb.me/react-animation-transition-group-timeout for more information.");if("number"!==typeof e[t])return new Error(t+" must be a number (in milliseconds)")}return null}}t.__esModule=!0,t.nameShape=void 0,t.transitionTimeout=i;var r=n(0),a=(o(r),n(1)),s=o(a);t.nameShape=s.default.oneOfType([s.default.string,s.default.shape({enter:s.default.string,leave:s.default.string,active:s.default.string}),s.default.shape({enter:s.default.string,enterActive:s.default.string,leave:s.default.string,leaveActive:s.default.string,appear:s.default.string,appearActive:s.default.string})])},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),l=n(1),u=n.n(l),c=n(7),p=n(29),d=(n.n(p),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),d(t,[{key:"render",value:function(){var e=this.props,t=void 0;return e.hasRipple&&(t=s.a.createElement("circle",{cx:"12",cy:"12",r:"6"})),s.a.createElement("button",{className:"lightbox-btn "+(e.hasRipple?"lightbox-btn--ripple":""),onClick:e.onClick.bind(this)},s.a.createElement(c.a,{icon:e.icon,size:e.size},t))}}]),t}(s.a.Component);t.a=h,h.defaultProps={selectedImage:0,hasRipple:!1,size:24},h.propTypes={onClick:u.a.func.isRequired,icon:u.a.string.isRequired,hasRipple:u.a.bool,size:u.a.number}},function(e,t,n){"use strict";var o=n(0),i=n.n(o),r=n(1),a=n.n(r),s=n(28),l=function(e){return i.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:e.size,height:e.size,viewBox:"-6 -6 36 36"},e.children,s.a[e.icon].map(function(e){return i.a.createElement("path",{key:e,d:e})}))};l.propTypes={icon:a.a.string.isRequired,size:a.a.number.isRequired},t.a=l},function(e,t,n){"use strict";function o(e){return "string"!==typeof e.className?[]:e.className.split(/\s+/);}function i(e,t){t=[].concat(t);var n=o(e);for(var i in t)if(n.indexOf(t[i])>-1)return!0;return!1}function r(e,t){i(e,t)||(e.className=[e.className,t].join(" "))}function a(e,t){var n=o(e);e.className=n.filter(function(e){return e!==t}).join(" ")}function s(e,t){i(e,t)?a(e,t):r(e,t)}t.c=i,t.a=r,t.d=a,t.b=s},function(e,t,n){e.exports=n(10)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(11);t.default=o.a},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),l=n(1),u=n.n(l),c=n(14),p=n(32),d=n(33),h=(n.n(d),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),f=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.toggleLightbox=n.toggleLightbox.bind(n),n.state={showLightbox:!1,selectedImage:0},n}return r(t,e),h(t,[{key:"toggleLightbox",value:function(e){this.setState({showLightbox:!this.state.showLightbox,selectedImage:e})}},{key:"render",value:function(){var e=this.props,t=e.renderImageFunc.call(this,this.toggleLightbox,e.thumbnailWidth,e.thumbnailHeight),n=void 0;return this.state.showLightbox&&(n=s.a.createElement(p.a,null,s.a.createElement(c.a,Object.assign({},this.props,{toggleLightbox:this.toggleLightbox,selectedImage:this.state.selectedImage})))),s.a.createElement(s.a.Fragment,null,t,n)}}]),t}(s.a.Component);t.a=f,f.defaultProps={showImageModifiers:!0,thumbnailWidth:"80px",thumbnailHeight:"80px",renderImageFunc:function(e,t,n,o,i){return s.a.createElement("div",null)}},f.propTypes={showImageModifiers:u.a.bool,thumbnailWidth:u.a.string,thumbnailHeight:u.a.string,renderImageFunc:u.a.func,renderDescriptionFunc:u.a.func}},function(e,t,n){"use strict";function o(){}var i=n(13);e.exports=function(){function e(e,t,n,o,r,a){if(a!==i){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw (s.name="Invariant Violation", s)}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),l=n(15),u=(n.n(l),n(1)),c=n.n(u),p=n(26),d=n(6),h=n(8),f=n(31),m=(n.n(f),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),v=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleLeftClick=n.handleLeftClick.bind(n),n.handleRightClick=n.handleRightClick.bind(n),n.canMoveToLeft=n.canMoveToLeft.bind(n),n.canMoveToRight=n.canMoveToRight.bind(n),n.toggleControls=n.toggleControls.bind(n),n.handleKeyboard=n.handleKeyboard.bind(n),n.getDescriptions=n.getDescriptions.bind(n),n.state={selectedImageIndex:e.selectedImage,direction:"none",imagesDescriptions:{}},n}return r(t,e),m(t,[{key:"getDescriptions",value:function(){var e=this,t=this.state.imagesDescriptions;this.props.images.forEach(function(n,o){if(n.description){if(n.description.then)return void n.description.then(function(n){t[o]=n,e.setState({imagesDescriptions:t})});t[o]=n.description,e.setState({imagesDescriptions:t})}})}},{key:"componentDidMount",value:function(){this.getDescriptions(),document.addEventListener("keydown",this.handleKeyboard);document.body.scrollTop;Object(h.a)(document.documentElement,"lightbox-open"),document.body.style.paddingRight="0px",document.body.style.overflowY="hidden"}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyboard);Math.abs(parseInt(document.documentElement.style.top,10));Object(h.d)(document.documentElement,"lightbox-open"),document.body.style.paddingRight=null,document.body.style.overflowY=null}},{key:"handleKeyboard",value:function(e){var t=e.keyCode?e.keyCode:e.which;if(!(this.timeLastTransition&&new Date-this.timeLastTransition<350))switch(this.timeLastTransition=new Date,t){case 37:return this.handleLeftClick();case 39:return this.handleRightClick();case 27:return this.props.toggleLightbox()}}},{key:"handleLeftClick",value:function(){this.canMoveToLeft()&&this.setState({selectedImageIndex:this.state.selectedImageIndex-1,direction:"left"})}},{key:"handleRightClick",value:function(){this.canMoveToRight()&&this.setState({selectedImageIndex:this.state.selectedImageIndex+1,direction:"right"})}},{key:"canMoveToLeft",value:function(){return this.state.selectedImageIndex>0}},{key:"canMoveToRight",value:function(){return this.state.selectedImageIndex<this.props.images.length-1}},{key:"toggleControls",value:function(){Object(h.b)(this.refs.container,"hide-controls")}},{key:"render",value:function(){var e=[this.props,this.state],t=e[0],n=e[1],o=t.images[n.selectedImageIndex];if(!o)return console.error("Light box; ",t.images,n.selectedImageIndex),s.a.createElement("div",null);var i=void 0,r=void 0,a=n.imagesDescriptions[n.selectedImageIndex],u=(t.renderDescriptionFunc.call(this,a),"lightbox-transition-image");return this.canMoveToLeft()&&(i=s.a.createElement("div",{className:"lightbox-btn-left"},s.a.createElement(d.a,{icon:"left-arrow",onClick:this.handleLeftClick,size:56,hasRipple:!0}))),this.canMoveToRight()&&(r=s.a.createElement("div",{className:"lightbox-btn-right"},s.a.createElement(d.a,{icon:"right-arrow",onClick:this.handleRightClick,size:56,hasRipple:!0}))),s.a.createElement("div",{className:"lightbox-backdrop",ref:"container"},s.a.createElement("div",{className:"lightbox-btn-close"},s.a.createElement(d.a,{icon:"back-arrow",onClick:t.toggleLightbox,size:34,hasRipple:!0})),s.a.createElement("div",{className:"lightbox-title-content"},s.a.createElement("div",{className:"lightbox-title"},o.title)),s.a.createElement(l.CSSTransitionGroup,{transitionAppear:!0,transitionAppearTimeout:300,transitionEnterTimeout:300,transitionLeaveTimeout:300,transitionName:{enter:u+"-enter-"+n.direction,enterActive:u+"-enter-"+n.direction+"-active",leave:u+"-leave-"+n.direction,leaveActive:u+"-leave-"+n.direction+"-active",appear:u+"-appear",appearActive:u+"-appear-active"}},s.a.createElement(p.a,{key:o.src,src:o.src,showImageModifiers:t.showImageModifiers,toggleControls:this.toggleControls})),i,r)}}]),t}(s.a.Component);t.a=v,v.defaultProps={selectedImage:0,renderDescriptionFunc:function(e){return s.a.createElement("div",null,String(e))}},v.propTypes={selectedImage:c.a.number,images:c.a.array.isRequired,toggleLightbox:c.a.func.isRequired,showImageModifiers:c.a.bool,renderDescriptionFunc:c.a.func}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(16),r=o(i),a=n(3),s=o(a);e.exports={TransitionGroup:s.default,CSSTransitionGroup:r.default}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0;var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l=n(0),u=o(l),c=n(1),p=o(c),d=n(3),h=o(d),f=n(20),m=o(f),v=n(5),g=(v.nameShape.isRequired,p.default.bool,p.default.bool,p.default.bool,(0,v.transitionTimeout)("Appear"),(0,v.transitionTimeout)("Enter"),(0,v.transitionTimeout)("Leave"),{transitionAppear:!1,transitionEnter:!0,transitionLeave:!0}),y=function(e){function t(){var n,o,a;i(this,t);for(var s=arguments.length,l=Array(s),c=0;c<s;c++)l[c]=arguments[c];return n=o=r(this,e.call.apply(e,[this].concat(l))),o._wrapChild=function(e){return u.default.createElement(m.default,{name:o.props.transitionName,appear:o.props.transitionAppear,enter:o.props.transitionEnter,leave:o.props.transitionLeave,appearTimeout:o.props.transitionAppearTimeout,enterTimeout:o.props.transitionEnterTimeout,leaveTimeout:o.props.transitionLeaveTimeout},e)},a=n,r(o,a)}return a(t,e),t.prototype.render=function(){return u.default.createElement(h.default,s({},this.props,{childFactory:this._wrapChild}))},t}(u.default.Component);y.displayName="CSSTransitionGroup",y.propTypes={},y.defaultProps=g,t.default=y,e.exports=t.default},function(e,t){e.exports=function(){for(var e=arguments.length,t=[],n=0;n<e;n++)t[n]=arguments[n];if(t=t.filter(function(e){return null!=e}),0!==t.length)return 1===t.length?t[0]:t.reduce(function(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}})}},function(e,t,n){"use strict";var o=function(){};e.exports=o},function(e,t,n){"use strict";function o(e){if(!e)return e;var t={};return r.Children.map(e,function(e){return e}).forEach(function(e){t[e.key]=e}),t}function i(e,t){function n(n){return t.hasOwnProperty(n)?t[n]:e[n]}e=e||{},t=t||{};var o={},i=[];for(var r in e)t.hasOwnProperty(r)?i.length&&(o[r]=i,i=[]):i.push(r);var a=void 0,s={};for(var l in t){if(o.hasOwnProperty(l))for(a=0;a<o[l].length;a++){var u=o[l][a];s[o[l][a]]=n(u)}s[l]=n(l)}for(a=0;a<i.length;a++)s[i[a]]=n(i[a]);return s}t.__esModule=!0,t.getChildMapping=o,t.mergeChildMappings=i;var r=n(0)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){return _.length?_.forEach(function(n){return e.addEventListener(n,t,!1)}):setTimeout(t,0),function(){_.length&&_.forEach(function(n){return e.removeEventListener(n,t,!1)})}}t.__esModule=!0;var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u=n(21),c=o(u),p=n(23),d=o(p),h=n(24),f=o(h),m=n(25),v=n(0),g=o(v),y=n(1),b=o(y),w=n(2),E=n(5),_=[];m.transitionEnd&&_.push(m.transitionEnd),m.animationEnd&&_.push(m.animationEnd);var T=(b.default.node,E.nameShape.isRequired,b.default.bool,b.default.bool,b.default.bool,b.default.number,b.default.number,b.default.number,function(e){function t(){var n,o,a;i(this,t);for(var s=arguments.length,l=Array(s),u=0;u<s;u++)l[u]=arguments[u];return n=o=r(this,e.call.apply(e,[this].concat(l))),o.componentWillAppear=function(e){o.props.appear?o.transition("appear",e,o.props.appearTimeout):e()},o.componentWillEnter=function(e){o.props.enter?o.transition("enter",e,o.props.enterTimeout):e()},o.componentWillLeave=function(e){o.props.leave?o.transition("leave",e,o.props.leaveTimeout):e()},a=n,r(o,a)}return a(t,e),t.prototype.UNSAFE_componentWillMount=function(){this.classNameAndNodeQueue=[],this.transitionTimeouts=[]},t.prototype.componentWillUnmount=function(){this.unmounted=!0,this.timeout&&clearTimeout(this.timeout),this.transitionTimeouts.forEach(function(e){clearTimeout(e)}),this.classNameAndNodeQueue.length=0},t.prototype.transition=function(e,t,n){var o=(0,w.findDOMNode)(this);if(!o)return void(t&&t());var i=this.props.name[e]||this.props.name+"-"+e,r=this.props.name[e+"Active"]||i+"-active",a=null,l=void 0;(0,c.default)(o,i),this.queueClassAndNode(r,o);var u=function(e){e&&e.target!==o||(clearTimeout(a),l&&l(),(0,d.default)(o,i),(0,d.default)(o,r),l&&l(),t&&t())};n?(a=setTimeout(u,n),this.transitionTimeouts.push(a)):m.transitionEnd&&(l=s(o,u))},t.prototype.queueClassAndNode=function(e,t){var n=this;this.classNameAndNodeQueue.push({className:e,node:t}),this.rafHandle||(this.rafHandle=(0,f.default)(function(){return n.flushClassNameAndNodeQueue()}))},t.prototype.flushClassNameAndNodeQueue=function(){this.unmounted||this.classNameAndNodeQueue.forEach(function(e){e.node.scrollTop,(0,c.default)(e.node,e.className)}),this.classNameAndNodeQueue.length=0,this.rafHandle=null},t.prototype.render=function(){var e=l({},this.props);return delete e.name,delete e.appear,delete e.enter,delete e.leave,delete e.appearTimeout,delete e.enterTimeout,delete e.leaveTimeout,delete e.children,g.default.cloneElement(g.default.Children.only(this.props.children),e)},t;}(g.default.Component));T.displayName="CSSTransitionGroupChild",T.propTypes={},t.default=T,e.exports=t.default},function(e,t,n){"use strict";function o(e,t){e.classList?e.classList.add(t):(0,r.default)(e,t)||("string"===typeof e.className?e.className=e.className+" "+t:e.setAttribute("class",(e.className&&e.className.baseVal||"")+" "+t))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var i=n(22),r=function(e){return e&&e.__esModule?e:{default:e}}(i);e.exports=t.default},function(e,t,n){"use strict";function o(e,t){return e.classList?!!t&&e.classList.contains(t):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o,e.exports=t.default},function(e,t,n){"use strict";function o(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"");}e.exports=function(e,t){e.classList?e.classList.remove(t):"string"===typeof e.className?e.className=o(e.className,t):e.setAttribute("class",o(e.className&&e.className.baseVal||"",t))}},function(e,t,n){"use strict";function o(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-p)),o=setTimeout(e,n);return p=t,o}Object.defineProperty(t,"__esModule",{value:!0});var i=n(4),r=function(e){return e&&e.__esModule?e:{default:e}}(i),a=["","webkit","moz","o","ms"],s="clearTimeout",l=o,u=void 0,c=function(e,t){return e+(e?t[0].toUpperCase()+t.substr(1):t)+"AnimationFrame"};r.default&&a.some(function(e){var t=c(e,"request");if(t in window)return s=c(e,"cancel"),l=function(e){return window[t](e)}});var p=(new Date).getTime();u=function(e){return l(e)},u.cancel=function(e){window[s]&&"function"===typeof window[s]&&window[s](e)},t.default=u,e.exports=t.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.animationEnd=t.animationDelay=t.animationTiming=t.animationDuration=t.animationName=t.transitionEnd=t.transitionDuration=t.transitionDelay=t.transitionTiming=t.transitionProperty=t.transform=void 0;var o=n(4),i=function(e){return e&&e.__esModule?e:{default:e}}(o),r="transform",a=void 0,s=void 0,l=void 0,u=void 0,c=void 0,p=void 0,d=void 0,h=void 0,f=void 0,m=void 0,v=void 0;if(i.default){var g=function(){for(var e=document.createElement("div").style,t={O:function(e){return"o"+e.toLowerCase()},Moz:function(e){return e.toLowerCase()},Webkit:function(e){return"webkit"+e},ms:function(e){return"MS"+e}},n=Object.keys(t),o=void 0,i=void 0,r="",a=0;a<n.length;a++){var s=n[a];if(s+"TransitionProperty"in e){r="-"+s.toLowerCase(),o=t[s]("TransitionEnd"),i=t[s]("AnimationEnd");break}}return!o&&"transitionProperty"in e&&(o="transitionend"),!i&&"animationName"in e&&(i="animationend"),e=null,{animationEnd:i,transitionEnd:o,prefix:r}}();a=g.prefix,t.transitionEnd=s=g.transitionEnd,t.animationEnd=l=g.animationEnd,t.transform=r=a+"-"+r,t.transitionProperty=u=a+"-transition-property",t.transitionDuration=c=a+"-transition-duration",t.transitionDelay=d=a+"-transition-delay",t.transitionTiming=p=a+"-transition-timing-function",t.animationName=h=a+"-animation-name",t.animationDuration=f=a+"-animation-duration",t.animationTiming=m=a+"-animation-delay",t.animationDelay=v=a+"-animation-timing-function"}t.transform=r,t.transitionProperty=u,t.transitionTiming=p,t.transitionDelay=d,t.transitionDuration=c,t.transitionEnd=s,t.animationName=h,t.animationDuration=f,t.animationTiming=m,t.animationDelay=v,t.animationEnd=l,t.default={transform:r,end:s,property:u,timing:p,delay:d,duration:c}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),l=n(2),u=n.n(l),c=n(1),p=n.n(c),d=n(27),h=n(7),f=n(8),m=n(30),v=(n.n(m),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),g=[Math.pow(1.1,30),Math.pow(1/1.1,10)],y=g[0],b=g[1],w=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.resetImageInitialState=n.resetImageInitialState.bind(n),n.handleWindowResize=n.handleWindowResize.bind(n),n.handleRotate=n.handleRotate.bind(n),n.handleZoom=n.handleZoom.bind(n),n.setZoomLimits=n.setZoomLimits.bind(n),n.handleWheel=n.handleWheel.bind(n),n.handleMove=n.handleMove.bind(n),n.handleMoveEnd=n.handleMoveEnd.bind(n),n.handleMoveStart=n.handleMoveStart.bind(n),n.isInsideImage=n.isInsideImage.bind(n),n.state={loader:!0,ratio:1,positionX:0,positionY:0,rotate:0,width:0,height:0,boxWidth:0,boxHeight:0},n}return r(t,e),v(t,[{key:"componentDidMount",value:function(){this.resetImageInitialState(this.props),this.startPoints=null,window.addEventListener("resize",this.handleWindowResize),document.addEventListener("mousedown",this.handleMoveStart),document.addEventListener("mouseup",this.handleMoveEnd),document.addEventListener("touchstart",this.handleMoveStart),document.addEventListener("touchend",this.handleMoveEnd),window.setTimeout(this.props.toggleControls,500),this.props.showImageModifiers&&(document.addEventListener("mousemove",this.handleMove),document.addEventListener("touchmove",this.handleMove),document.addEventListener("wheel",this.handleWheel))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowResize),document.removeEventListener("mousedown",this.handleMoveStart),document.removeEventListener("mousemove",this.handleMove),document.removeEventListener("mouseup",this.handleMoveEnd),document.removeEventListener("touchstart",this.handleMoveStart),document.removeEventListener("touchmove",this.handleMove),document.removeEventListener("touchend",this.handleMoveEnd),document.removeEventListener("wheel",this.handleWheel)}},{key:"resetImageInitialState",value:function(e){var t=new Image,n=this;t.onload=function(){var e=[this.width,this.height],t=e[0],o=e[1],i=u.a.findDOMNode(n.refs.container),r=[i.offsetWidth,i.offsetHeight],a=r[0],s=r[1],l=Math.min(a/t,s/o);isNaN(l)&&(l=1),n.setState({loader:!1,ratio:l,rotate:0,positionX:(a-t*l)/2,positionY:(s-o*l)/2,width:this.width,height:this.height,boxWidth:a,boxHeight:s,moving:!1})},t.src=e.src}},{key:"handleWindowResize",value:function(){this.resetImageInitialState(this.props)}},{key:"handleRotate",value:function(e){this.setState({rotate:(360+this.state.rotate+e)%360})}},{key:"handleZoom",value:function(e,t){t||(t=1);var n=e>0?Math.pow(1.1,t):Math.pow(1/1.1,t),o=this.setZoomLimits(this.state.ratio*n),i=this.state,r=void 0,a=void 0;if(Math.min(i.boxWidth/i.width,i.boxHeight/i.height)>=o-.05)r=(i.boxWidth-i.width*o)/2,a=(i.boxHeight-i.height*o)/2;else{var s=i.boxWidth/2,l=i.boxHeight/2,u=s-i.positionX,c=l-i.positionY,p=u/(i.width*i.ratio),d=c/(i.height*i.ratio);r=s-i.width*o*p,a=l-i.height*o*d}this.setState({ratio:o,positionX:r,positionY:a})}},{key:"setZoomLimits",value:function(e){var t=this.state,n=Math.min(t.boxWidth/t.width,t.boxHeight/t.height);return e/n>y?y*n:e/n<b?b*n:e}},{key:"handleWheel",value:function(e){this.isInsideImage(e)&&this.handleZoom(e.deltaY)}},{key:"handleMove",value:function(e){e=this.getEv(e);var t=this.state;if(t.moving){var n=void 0,o=void 0;switch(t.rotate){case 90:o=this.startPoints[0]-e.pageX,n=e.pageY-this.startPoints[1];break;case 180:n=this.startPoints[0]-e.pageX,o=this.startPoints[1]-e.pageY;break;case 270:o=e.pageX-this.startPoints[0],n=this.startPoints[1]-e.pageY;break;default:n=e.pageX-this.startPoints[0],o=e.pageY-this.startPoints[1]}this.startPoints=[e.pageX,e.pageY],(t.positionX+n>=0||t.positionX+n<=t.boxWidth-t.width*t.ratio)&&(n=0),(t.positionY+o>=0||t.positionY+o<=t.boxHeight-t.height*t.ratio)&&(o=0),this.setState({positionX:t.positionX+n,positionY:t.positionY+o})}}},{key:"handleMoveEnd",value:function(e){this.setState({moving:!1})}},{key:"handleMoveStart",value:function(e){if(e=this.getEv(e),this.isInsideImage(e)&&1===e.which){this.startPoints=[e.pageX,e.pageY],this.setState({moving:!0});var t=this;window.setTimeout(function(){!t.state.moving&&t.startPoints&&t.startPoints[0]===e.pageX&&t.startPoints[1]===e.pageY&&Object(f.c)(e.target,["lightbox-backdrop","lightbox-image"])&&t.props.toggleControls()},200)}}},{key:"isInsideImage",value:function(e){var t=u.a.findDOMNode(this.refs.container).getBoundingClientRect();return!(e.pageY<t.top||e.pageY>t.bottom||e.pageX<t.left||e.pageX>t.right)}},{key:"getEv",value:function(e){return"touchstart"===e.type||"touchmove"===e.type||"touchend"===e.type?{pageX:e.touches[0].pageX,pageY:e.touches[0].pageY,which:1,target:e.target}:e}},{key:"render",value:function(){var e=[this.props,this.state],t=e[0],n=e[1],o="url("+t.src+")",i=void 0,r=void 0;t.showImageModifiers&&(i=s.a.createElement(d.a,{handleRotate:this.handleRotate,handleZoom:this.handleZoom,currentImage:t.src})),n.loader&&(o="none",r=s.a.createElement("div",{className:"lightbox-loader"},s.a.createElement(h.a,{icon:"spinner",size:58})));var a="rotate("+n.rotate+"deg)",l={height:"100%",backgroundImage:o,backgroundRepeat:"no-repeat",backgroundSize:n.width*n.ratio+"px "+n.height*n.ratio+"px",backgroundPosition:n.positionX+"px "+n.positionY+"px",MsTransform:a,WebkitTransform:a,transform:a};return s.a.createElement("div",{className:"lightbox-content-center"},i,s.a.createElement("div",{className:"lightbox-image-container",ref:"container"},s.a.createElement("div",{className:"lightbox-image"+(n.moving?" moving":""),style:l},r)))}}]),t}(s.a.Component);t.a=w,Image.propTypes={src:p.a.string.isRequired,showImageModifiers:p.a.bool.isRequired}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),l=n(1),u=n.n(l),c=n(6),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),d=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleRotateClockwise=n.handleRotateClockwise.bind(n),n.handleRotateCounterclockwise=n.handleRotateCounterclockwise.bind(n),n.handleZoomIn=n.handleZoomIn.bind(n),n.handleZoomOut=n.handleZoomOut.bind(n),n.handleDownload=n.handleDownload.bind(n),n}return r(t,e),p(t,[{key:"handleRotateClockwise",value:function(){this.props.handleRotate.call(this,90)}},{key:"handleRotateCounterclockwise",value:function(){this.props.handleRotate.call(this,-90)}},{key:"handleZoomIn",value:function(){this.props.handleZoom.call(this,1,10)}},{key:"handleZoomOut",value:function(){this.props.handleZoom.call(this,-1,10)}},{key:"handleDownload",value:function(){console.log(this.props.currentImage),window.open(this.props.currentImage)}},{key:"render",value:function(){return s.a.createElement("div",{className:"lightbox-modifiers-box"},s.a.createElement(c.a,{icon:"zoom-in",onClick:this.handleZoomIn,size:34,hasRipple:!0}),s.a.createElement(c.a,{icon:"zoom-out",onClick:this.handleZoomOut,size:34,hasRipple:!0}),s.a.createElement(c.a,{icon:"rotate-left",onClick:this.handleRotateCounterclockwise,size:34,hasRipple:!0}),s.a.createElement(c.a,{icon:"rotate-right",onClick:this.handleRotateClockwise,size:34,hasRipple:!0}),s.a.createElement(c.a,{icon:"download",onClick:this.handleDownload,size:34,hasRipple:!0}))}}]),t}(s.a.Component);t.a=d,d.propTypes={handleRotate:u.a.func.isRequired,handleZoom:u.a.func.isRequired,currentImage:u.a.string.isRequired}},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o={"zoom-out":["M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"],"zoom-in":["M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z","M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"],download:["M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"],"rotate-left":["M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"],"rotate-right":["M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"],"left-arrow":["M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"],"right-arrow":["M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],"back-arrow":["M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"],spinner:["M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"]}},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(0),s=n.n(a),l=n(2),u=n.n(l),c=n(1),p=n.n(c),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),d(t,[{key:"componentDidMount",value:function(){this._popup=document.createElement("div"),document.body.appendChild(this._popup),this._render()}},{key:"componentDidUpdate",value:function(){this._render()}},{key:"componentWillUnmount",value:function(){u.a.unmountComponentAtNode(this._popup),document.body.removeChild(this._popup)}},{key:"_render",value:function(){u.a.render(this.props.children,this._popup)}},{key:"render",value:function(){return null}}]),t}(s.a.PureComponent);t.a=h,h.propTypes={children:p.a.node}},function(e,t){}]);});
//# sourceMappingURL=index.js.map