/*
 Highcharts JS v8.2.2 (2020-11-23)

 (c) 2017-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/venn",["highcharts"],function(n){b(n);b.Highcharts=n;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function n(k,f,a,b){k.hasOwnProperty(f)||(k[f]=b.apply(null,a))}b=b?b._modules:{};n(b,"Mixins/Geometry.js",[],function(){return{getAngleBetweenPoints:function(b,f){return Math.atan2(f.x-b.x,f.y-b.y)},getCenterOfPoints:function(b){var f=
b.reduce(function(a,b){a.x+=b.x;a.y+=b.y;return a},{x:0,y:0});return{x:f.x/b.length,y:f.y/b.length}},getDistanceBetweenPoints:function(b,f){return Math.sqrt(Math.pow(f.x-b.x,2)+Math.pow(f.y-b.y,2))}}});n(b,"Mixins/GeometryCircles.js",[b["Mixins/Geometry.js"]],function(b){function f(e,l){l=Math.pow(10,l);return Math.round(e*l)/l}function a(e){if(0>=e)throw Error("radius of circle must be a positive number.");return Math.PI*e*e}function k(e,l){return e*e*Math.acos(1-l/e)-(e-l)*Math.sqrt(l*(2*e-l))}
function u(e,l){var a=q(e,l),b=e.r,g=l.r,p=[];if(a<b+g&&a>Math.abs(b-g)){b*=b;var c=(b-g*g+a*a)/(2*a);g=Math.sqrt(b-c*c);b=e.x;p=l.x;e=e.y;var k=l.y;l=b+c*(p-b)/a;c=e+c*(k-e)/a;e=g/a*-(k-e);a=g/a*-(p-b);p=[{x:f(l+e,14),y:f(c-a,14)},{x:f(l-e,14),y:f(c+a,14)}]}return p}function m(e){return e.reduce(function(e,a,b,g){g=g.slice(b+1).reduce(function(e,l,g){var f=[b,g+b+1];return e.concat(u(a,l).map(function(e){e.indexes=f;return e}))},[]);return e.concat(g)},[])}function c(e,a){return q(e,a)<=a.r+1e-10}
function v(e,a){return!a.some(function(a){return!c(e,a)})}function t(e){return m(e).filter(function(a){return v(a,e)})}var g=b.getAngleBetweenPoints,r=b.getCenterOfPoints,q=b.getDistanceBetweenPoints;return{getAreaOfCircle:a,getAreaOfIntersectionBetweenCircles:function(e){var a=t(e);if(1<a.length){var b=r(a);a=a.map(function(a){a.angle=g(b,a);return a}).sort(function(a,e){return e.angle-a.angle});var f=a[a.length-1];a=a.reduce(function(a,b){var l=a.startPoint,f=r([l,b]),c=b.indexes.filter(function(a){return-1<
l.indexes.indexOf(a)}).reduce(function(a,c){c=e[c];var k=g(c,b),B=g(c,l);k=B-(B-k+(B<k?2*Math.PI:0))/2;k=q(f,{x:c.x+c.r*Math.sin(k),y:c.y+c.r*Math.cos(k)});c=c.r;k>2*c&&(k=2*c);if(!a||a.width>k)a={r:c,largeArc:k>c?1:0,width:k,x:b.x,y:b.y};return a},null);if(c){var k=c.r;a.arcs.push(["A",k,k,0,c.largeArc,1,c.x,c.y]);a.startPoint=b}return a},{startPoint:f,arcs:[]}).arcs;if(0!==a.length&&1!==a.length){a.unshift(["M",f.x,f.y]);var c={center:b,d:a}}}return c},getCircleCircleIntersection:u,getCirclesIntersectionPoints:m,
getCirclesIntersectionPolygon:t,getCircularSegmentArea:k,getOverlapBetweenCircles:function(e,b,c){var g=0;c<e+b&&(c<=Math.abs(b-e)?g=a(e<b?e:b):(g=(e*e-b*b+c*c)/(2*c),c-=g,g=k(e,e-g)+k(b,b-c)),g=f(g,14));return g},isCircle1CompletelyOverlappingCircle2:function(a,b){return q(a,b)+b.r<a.r+1e-10},isPointInsideCircle:c,isPointInsideAllCircles:v,isPointOutsideAllCircles:function(a,b){return!b.some(function(b){return c(a,b)})},round:f}});n(b,"Mixins/NelderMead.js",[],function(){var b=function(b){b=b.slice(0,
-1);for(var a=b.length,k=[],f=function(a,b){a.sum+=b[a.i];return a},m=0;m<a;m++)k[m]=b.reduce(f,{sum:0,i:m}).sum/a;return k};return{getCentroid:b,nelderMead:function(k,a){var f=function(a,b){return a.fx-b.fx},u=function(a,b,c,g){return b.map(function(b,e){return a*b+c*g[e]})},m=function(a,b){b.fx=k(b);a[a.length-1]=b;return a},c=function(a){var b=a[0];return a.map(function(a){a=u(.5,b,.5,a);a.fx=k(a);return a})},v=function(a,b,c,g){a=u(c,a,g,b);a.fx=k(a);return a};a=function(a){var b=a.length,c=Array(b+
1);c[0]=a;c[0].fx=k(a);for(var e=0;e<b;++e){var g=a.slice();g[e]=g[e]?1.05*g[e]:.001;g.fx=k(g);c[e+1]=g}return c}(a);for(var t=0;100>t;t++){a.sort(f);var g=a[a.length-1],r=b(a),q=v(r,g,2,-1);q.fx<a[0].fx?(g=v(r,g,3,-2),a=m(a,g.fx<q.fx?g:q)):q.fx>=a[a.length-2].fx?q.fx>g.fx?(r=v(r,g,.5,.5),a=r.fx<g.fx?m(a,r):c(a)):(r=v(r,g,1.5,-.5),a=r.fx<q.fx?m(a,r):c(a)):a=m(a,q)}return a[0]}}});n(b,"Mixins/DrawPoint.js",[],function(){var b=function(a){return"function"===typeof a},f=function(a){var k,f=this,m=f.graphic,
c=a.animatableAttribs,v=a.onComplete,t=a.css,g=a.renderer,r=null===(k=f.series)||void 0===k?void 0:k.options.animation;if(f.shouldDraw())m||(f.graphic=m=g[a.shapeType](a.shapeArgs).add(a.group)),m.css(t).attr(a.attribs).animate(c,a.isNew?!1:r,v);else if(m){var q=function(){f.graphic=m=m.destroy();b(v)&&v()};Object.keys(c).length?m.animate(c,void 0,function(){q()}):q()}};return{draw:f,drawPoint:function(a){(a.attribs=a.attribs||{})["class"]=this.getClassName();f.call(this,a)},isFn:b}});n(b,"Series/Venn/VennPoint.js",
[b["Core/Series/Series.js"],b["Mixins/DrawPoint.js"],b["Core/Utilities.js"]],function(b,f,a){var k=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(b,c)};return function(b,c){function g(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(g.prototype=c.prototype,new g)}}(),u=a.extend,m=a.isNumber;b=function(a){function b(){var b=
null!==a&&a.apply(this,arguments)||this;b.options=void 0;b.series=void 0;return b}k(b,a);b.prototype.isValid=function(){return m(this.value)};b.prototype.shouldDraw=function(){return!!this.shapeArgs};return b}(b.seriesTypes.scatter.prototype.pointClass);u(b.prototype,{draw:f.draw});return b});n(b,"Series/Venn/VennUtils.js",[b["Mixins/GeometryCircles.js"],b["Mixins/Geometry.js"],b["Mixins/NelderMead.js"],b["Core/Utilities.js"]],function(b,f,a,n){var k=b.getAreaOfCircle,m=b.getCircleCircleIntersection,
c=b.getOverlapBetweenCircles,v=b.isPointInsideAllCircles,t=b.isPointInsideCircle,g=b.isPointOutsideAllCircles,r=f.getDistanceBetweenPoints,q=n.extend,e=n.isArray,l=n.isNumber,E=n.isObject,H=n.isString,w;(function(p){function n(a){var b=a.filter(function(a){return 2===a.sets.length}).reduce(function(a,b){b.sets.forEach(function(d,h,c){E(a[d])||(a[d]={overlapping:{},totalOverlap:0});a[d].totalOverlap+=b.value;a[d].overlapping[c[1-h]]=b.value});return a},{});a.filter(z).forEach(function(a){q(a,b[a.sets[0]])});
return a}function u(a,b,d,h,y){var c=a(b),C=a(d);y=y||100;h=h||1e-10;var e=d-b,g=1;if(b>=d)throw Error("a must be smaller than b.");if(0<c*C)throw Error("f(a) and f(b) must have opposite signs.");if(0===c)var D=b;else if(0===C)D=d;else for(;g++<=y&&0!==B&&e>h;){e=(d-b)/2;D=b+e;var B=a(D);0<c*B?b=D:d=D}return D}function w(a,b,d){var h=a+b;return 0>=d?h:k(a<b?a:b)<=d?0:u(function(h){h=c(a,b,h);return d-h},0,h)}function F(a){var b=0;2===a.length&&(b=a[0],a=a[1],b=c(b.r,a.r,r(b,a)));return b}function z(a){return e(a.sets)&&
1===a.sets.length}function x(a){var b={};return E(a)&&l(a.value)&&-1<a.value&&e(a.sets)&&0<a.sets.length&&!a.sets.some(function(a){var d=!1;!b[a]&&H(a)?b[a]=!0:d=!0;return d})}function G(a,b){return b.reduce(function(b,h){var d=0;1<h.sets.length&&(d=h.value,h=F(h.sets.map(function(b){return a[b]})),h=d-h,d=Math.round(h*h*1E11)/1E11);return b+d},0)}function A(a,b){return b.totalOverlap-a.totalOverlap}p.geometry=f;p.geometryCircles=b;p.nelderMead=a;p.addOverlapToSets=n;p.getDistanceBetweenCirclesByOverlap=
w;p.getLabelWidth=function(a,b,d){var h=b.reduce(function(a,b){return Math.min(b.r,a)},Infinity),y=d.filter(function(b){return!t(a,b)});d=function(d,h){return u(function(c){var e={x:a.x+h*c,y:a.y};e=v(e,b)&&g(e,y);return-(d-c)+(e?0:Number.MAX_VALUE)},0,d)};return 2*Math.min(d(h,-1),d(h,1))};p.getMarginFromCircles=function(a,b,d){b=b.reduce(function(b,d){d=d.r-r(a,d);return d<=b?d:b},Number.MAX_VALUE);return b=d.reduce(function(b,d){d=r(a,d)-d.r;return d<=b?d:b},b)};p.isSet=z;p.layoutGreedyVenn=function(a){var b=
[],d={};a.filter(function(a){return 1===a.sets.length}).forEach(function(a){d[a.sets[0]]=a.circle={x:Number.MAX_VALUE,y:Number.MAX_VALUE,r:Math.sqrt(a.value/Math.PI)}});var h=function(a,d){var h=a.circle;h.x=d.x;h.y=d.y;b.push(a)};n(a);var c=a.filter(z).sort(A);h(c.shift(),{x:0,y:0});var e=a.filter(function(a){return 2===a.sets.length});c.forEach(function(a){var c=a.circle,y=c.r,g=a.overlapping,C=b.reduce(function(a,h,C){var f=h.circle,k=w(y,f.r,g[h.sets[0]]),I=[{x:f.x+k,y:f.y},{x:f.x-k,y:f.y},{x:f.x,
y:f.y+k},{x:f.x,y:f.y-k}];b.slice(C+1).forEach(function(a){var b=a.circle;a=w(y,b.r,g[a.sets[0]]);I=I.concat(m({x:f.x,y:f.y,r:k},{x:b.x,y:b.y,r:a}))});I.forEach(function(b){c.x=b.x;c.y=b.y;var h=G(d,e);h<a.loss&&(a.loss=h,a.coordinates=b)});return a},{loss:Number.MAX_VALUE,coordinates:void 0});h(a,C.coordinates)});return d};p.loss=G;p.processVennData=function(a){a=e(a)?a:[];var b=a.reduce(function(a,b){x(b)&&z(b)&&0<b.value&&-1===a.indexOf(b.sets[0])&&a.push(b.sets[0]);return a},[]).sort(),d=a.reduce(function(a,
d){x(d)&&!d.sets.some(function(a){return-1===b.indexOf(a)})&&(a[d.sets.sort().join()]=d);return a},{});b.reduce(function(a,b,d,c){c.slice(d+1).forEach(function(d){a.push(b+","+d)});return a},[]).forEach(function(a){if(!d[a]){var b={sets:a.split(","),value:0};d[a]=b}});return Object.keys(d).map(function(a){return d[a]})};p.sortByTotalOverlap=A})(w||(w={}));return w});n(b,"Series/Venn/VennSeries.js",[b["Core/Animation/AnimationUtilities.js"],b["Core/Series/Series.js"],b["Core/Color/Color.js"],b["Mixins/Geometry.js"],
b["Mixins/GeometryCircles.js"],b["Mixins/NelderMead.js"],b["Core/Color/Palette.js"],b["Series/Venn/VennPoint.js"],b["Series/Venn/VennUtils.js"],b["Core/Utilities.js"]],function(b,f,a,n,u,m,c,v,t,g){var k=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d])};return a(b,d)};return function(b,d){function c(){this.constructor=b}a(b,d);b.prototype=null===
d?Object.create(d):(c.prototype=d.prototype,new c)}}(),q=b.animObject,e=f.seriesTypes.scatter,l=a.parse,E=n.getCenterOfPoints,H=u.getAreaOfIntersectionBetweenCircles,w=u.getCirclesIntersectionPolygon,p=u.isCircle1CompletelyOverlappingCircle2,J=u.isPointInsideAllCircles,K=u.isPointOutsideAllCircles,L=m.nelderMead;b=g.addEvent;var F=g.extend,z=g.isArray,x=g.isNumber,G=g.isObject,A=g.merge;g=function(a){function b(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.mapOfIdToRelation=void 0;
b.options=void 0;b.points=void 0;return b}k(b,a);b.getLabelPosition=function(a,b){var d=a.reduce(function(d,c){var e=c.r/2;return[{x:c.x,y:c.y},{x:c.x+e,y:c.y},{x:c.x-e,y:c.y},{x:c.x,y:c.y+e},{x:c.x,y:c.y-e}].reduce(function(d,c){var e=t.getMarginFromCircles(c,a,b);d.margin<e&&(d.point=c,d.margin=e);return d},d)},{point:void 0,margin:-Number.MAX_VALUE}).point;d=L(function(d){return-t.getMarginFromCircles({x:d[0],y:d[1]},a,b)},[d.x,d.y]);d={x:d[0],y:d[1]};J(d,a)&&K(d,b)||(d=1<a.length?E(w(a)):{x:a[0].x,
y:a[0].y});return d};b.getLabelValues=function(a,c){var d=a.sets,e=c.reduce(function(a,b){var c=-1<d.indexOf(b.sets[0]);a[c?"internal":"external"].push(b.circle);return a},{internal:[],external:[]});e.external=e.external.filter(function(a){return e.internal.some(function(b){return!p(a,b)})});a=b.getLabelPosition(e.internal,e.external);c=t.getLabelWidth(a,e.internal,e.external);return{position:a,width:c}};b.layout=function(a){var d={},c={};if(0<a.length){var e=t.layoutGreedyVenn(a),g=a.filter(t.isSet);
a.forEach(function(a){var h=a.sets,f=h.join();if(h=t.isSet(a)?e[f]:H(h.map(function(a){return e[a]})))d[f]=h,c[f]=b.getLabelValues(a,g)})}return{mapOfIdToShape:d,mapOfIdToLabelValues:c}};b.getScale=function(a,b,c){var d=c.bottom-c.top,e=c.right-c.left;d=Math.min(0<e?1/e*a:1,0<d?1/d*b:1);return{scale:d,centerX:a/2-(c.right+c.left)/2*d,centerY:b/2-(c.top+c.bottom)/2*d}};b.updateFieldBoundaries=function(a,b){var d=b.x-b.r,c=b.x+b.r,e=b.y+b.r;b=b.y-b.r;if(!x(a.left)||a.left>d)a.left=d;if(!x(a.right)||
a.right<c)a.right=c;if(!x(a.top)||a.top>b)a.top=b;if(!x(a.bottom)||a.bottom<e)a.bottom=e;return a};b.prototype.animate=function(a){if(!a){var b=q(this.options.animation);this.points.forEach(function(a){var d=a.shapeArgs;if(a.graphic&&d){var c={},e={};d.d?c.opacity=.001:(c.r=0,e.r=d.r);a.graphic.attr(c).animate(e,b);d.d&&setTimeout(function(){a&&a.graphic&&a.graphic.animate({opacity:1})},b.duration)}},this)}};b.prototype.drawPoints=function(){var a=this,b=a.chart,c=a.group,e=b.renderer;(a.points||
[]).forEach(function(d){var g={zIndex:z(d.sets)?d.sets.length:0},f=d.shapeArgs;b.styledMode||F(g,a.pointAttribs(d,d.state));d.draw({isNew:!d.graphic,animatableAttribs:f,attribs:g,group:c,renderer:e,shapeType:f&&f.d?"path":"circle"})})};b.prototype.init=function(){e.prototype.init.apply(this,arguments);delete this.opacity};b.prototype.pointAttribs=function(a,b){var c=this.options||{};a=A(c,{color:a&&a.color},a&&a.options||{},b&&c.states[b]||{});return{fill:l(a.color).brighten(a.brightness).get(),opacity:a.opacity,
stroke:a.borderColor,"stroke-width":a.borderWidth,dashstyle:a.borderDashStyle}};b.prototype.translate=function(){var a=this.chart;this.processedXData=this.xData;this.generatePoints();var c=t.processVennData(this.options.data);c=b.layout(c);var e=c.mapOfIdToShape,g=c.mapOfIdToLabelValues;c=Object.keys(e).filter(function(a){return(a=e[a])&&x(a.r)}).reduce(function(a,c){return b.updateFieldBoundaries(a,e[c])},{top:0,bottom:0,left:0,right:0});a=b.getScale(a.plotWidth,a.plotHeight,c);var f=a.scale,k=a.centerX,
l=a.centerY;this.points.forEach(function(a){var b=z(a.sets)?a.sets:[],c=b.join(),d=e[c],h=g[c]||{};c=h.width;h=h.position;var m=a.options&&a.options.dataLabels;if(d){if(d.r)var n={x:k+d.x*f,y:l+d.y*f,r:d.r*f};else d.d&&(d=d.d,d.forEach(function(a){"M"===a[0]?(a[1]=k+a[1]*f,a[2]=l+a[2]*f):"A"===a[0]&&(a[1]*=f,a[2]*=f,a[6]=k+a[6]*f,a[7]=l+a[7]*f)}),n={d:d});h?(h.x=k+h.x*f,h.y=l+h.y*f):h={};x(c)&&(c=Math.round(c*f))}a.shapeArgs=n;h&&n&&(a.plotX=h.x,a.plotY=h.y);c&&n&&(a.dlOptions=A(!0,{style:{width:c}},
G(m)&&m));a.name=a.options.name||b.join("\u2229")})};b.defaultOptions=A(e.defaultOptions,{borderColor:c.neutralColor20,borderDashStyle:"solid",borderWidth:1,brighten:0,clip:!1,colorByPoint:!0,dataLabels:{enabled:!0,verticalAlign:"middle",formatter:function(){return this.point.name}},inactiveOtherPoints:!0,marker:!1,opacity:.75,showInLegend:!1,states:{hover:{opacity:1,borderColor:c.neutralColor80},select:{color:c.neutralColor20,borderColor:c.neutralColor100,animation:!1},inactive:{opacity:.075}},tooltip:{pointFormat:"{point.name}: {point.value}"}});
return b}(e);F(g.prototype,{axisTypes:[],directTouch:!0,isCartesian:!1,pointArrayMap:["value"],pointClass:v,utils:t});f.registerSeriesType("venn",g);"";b(g,"afterSetOptions",function(a){var b=a.options.states;this.is("venn")&&Object.keys(b).forEach(function(a){b[a].halo=!1})});return g});n(b,"masters/modules/venn.src.js",[],function(){})});
//# sourceMappingURL=venn.js.map