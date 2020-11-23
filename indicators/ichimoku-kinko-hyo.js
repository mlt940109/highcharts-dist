/*
 Highstock JS v8.2.2 (2020-11-23)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/indicators/ichimoku-kinko-hyo",["highcharts","highcharts/modules/stock"],function(l){e(l);e.Highcharts=l;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function l(e,l,v,n){e.hasOwnProperty(l)||(e[l]=n.apply(null,v))}e=e?e._modules:{};l(e,"Stock/Indicators/IKHIndicator.js",[e["Core/Series/Series.js"],e["Core/Color/Color.js"],
e["Core/Globals.js"],e["Core/Utilities.js"]],function(e,l,v,n){function F(a){return a.reduce(function(a,b){return Math.max(a,b[1])},-Infinity)}function G(a){return a.reduce(function(a,b){return Math.min(a,b[2])},Infinity)}function x(a){return{high:F(a),low:G(a)}}function H(a){var d,b,w,e,h;a.series.forEach(function(a){if(a.xData)for(e=a.xData,h=b=a.xIncrement?1:e.length-1;0<h;h--)if(w=e[h]-e[h-1],"undefined"===typeof d||w<d)d=w});return d}function I(a,d,b,e){if(a&&d&&b&&e){var w=d.plotX-a.plotX;d=
d.plotY-a.plotY;var h=e.plotX-b.plotX;e=e.plotY-b.plotY;var l=a.plotX-b.plotX,g=a.plotY-b.plotY;b=(-d*l+w*g)/(-h*d+w*e);h=(h*g-e*l)/(-h*d+w*e);if(0<=b&&1>=b&&0<=h&&1>=h)return{plotX:a.plotX+h*w,plotY:a.plotY+h*d}}return!1}function D(a){var d=a.indicator;d.points=a.points;d.nextPoints=a.nextPoints;d.color=a.color;d.options=A(a.options.senkouSpan.styles,a.gap);d.graph=a.graph;d.fillGraph=!0;r.prototype.drawGraph.call(d)}var B=l.parse,E=n.defined,J=n.isArray,A=n.merge,K=n.objectEach,r=e.seriesTypes.sma;
v.approximations["ichimoku-averages"]=function(){var a=[],d;[].forEach.call(arguments,function(b,e){a.push(v.approximations.average(b));d=!d&&"undefined"===typeof a[e]});return d?void 0:a};e.seriesType("ikh","sma",{params:{period:26,periodTenkan:9,periodSenkouSpanB:52},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>TENKAN SEN: {point.tenkanSen:.3f}<br/>KIJUN SEN: {point.kijunSen:.3f}<br/>CHIKOU SPAN: {point.chikouSpan:.3f}<br/>SENKOU SPAN A: {point.senkouSpanA:.3f}<br/>SENKOU SPAN B: {point.senkouSpanB:.3f}<br/>'},
tenkanLine:{styles:{lineWidth:1,lineColor:void 0}},kijunLine:{styles:{lineWidth:1,lineColor:void 0}},chikouLine:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanA:{styles:{lineWidth:1,lineColor:void 0}},senkouSpanB:{styles:{lineWidth:1,lineColor:void 0}},senkouSpan:{styles:{fill:"rgba(255, 0, 0, 0.5)"}},dataGrouping:{approximation:"ichimoku-averages"}},{pointArrayMap:["tenkanSen","kijunSen","chikouSpan","senkouSpanA","senkouSpanB"],pointValKey:"tenkanSen",nameComponents:["periodSenkouSpanB","period",
"periodTenkan"],init:function(){r.prototype.init.apply(this,arguments);this.options=A({tenkanLine:{styles:{lineColor:this.color}},kijunLine:{styles:{lineColor:this.color}},chikouLine:{styles:{lineColor:this.color}},senkouSpanA:{styles:{lineColor:this.color,fill:B(this.color).setOpacity(.5).get()}},senkouSpanB:{styles:{lineColor:this.color,fill:B(this.color).setOpacity(.5).get()}},senkouSpan:{styles:{fill:B(this.color).setOpacity(.2).get()}}},this.options)},toYData:function(a){return[a.tenkanSen,a.kijunSen,
a.chikouSpan,a.senkouSpanA,a.senkouSpanB]},translate:function(){var a=this;r.prototype.translate.apply(a);a.points.forEach(function(d){a.pointArrayMap.forEach(function(b){E(d[b])&&(d["plot"+b]=a.yAxis.toPixels(d[b],!0),d.plotY=d["plot"+b],d.tooltipPos=[d.plotX,d["plot"+b]],d.isNull=!1)})})},drawGraph:function(){var a=this,d=a.points,b=d.length,e=a.options,l=a.graph,h=a.color,n={options:{gapSize:e.gapSize}},g=a.pointArrayMap.length,m=[[],[],[],[],[],[]],c={tenkanLine:m[0],kijunLine:m[1],chikouLine:m[2],
senkouSpanA:m[3],senkouSpanB:m[4],senkouSpan:m[5]},t=[],f=a.options.senkouSpan,u=f.color||f.styles.fill,C=f.negativeColor,p=[[],[]],z=[[],[]],v=0,q,x,y;for(a.ikhMap=c;b--;){var k=d[b];for(q=0;q<g;q++)f=a.pointArrayMap[q],E(k[f])&&m[q].push({plotX:k.plotX,plotY:k["plot"+f],isNull:!1});C&&b!==d.length-1&&(f=c.senkouSpanB.length-1,k=I(c.senkouSpanA[f-1],c.senkouSpanA[f],c.senkouSpanB[f-1],c.senkouSpanB[f]),q={plotX:k.plotX,plotY:k.plotY,isNull:!1,intersectPoint:!0},k&&(c.senkouSpanA.splice(f,0,q),c.senkouSpanB.splice(f,
0,q),t.push(f)))}K(c,function(b,c){e[c]&&"senkouSpan"!==c&&(a.points=m[v],a.options=A(e[c].styles,n),a.graph=a["graph"+c],a.fillGraph=!1,a.color=h,r.prototype.drawGraph.call(a),a["graph"+c]=a.graph);v++});a.graphCollection&&a.graphCollection.forEach(function(b){a[b].destroy();delete a[b]});a.graphCollection=[];if(C&&c.senkouSpanA[0]&&c.senkouSpanB[0]){t.unshift(0);t.push(c.senkouSpanA.length-1);for(g=0;g<t.length-1;g++){f=t[g];k=t[g+1];b=c.senkouSpanB.slice(f,k+1);f=c.senkouSpanA.slice(f,k+1);if(1<=
Math.floor(b.length/2))if(k=Math.floor(b.length/2),b[k].plotY===f[k].plotY){for(y=q=k=0;y<b.length;y++)k+=b[y].plotY,q+=f[y].plotY;k=k>q?0:1}else k=b[k].plotY>f[k].plotY?0:1;else k=b[0].plotY>f[0].plotY?0:1;p[k]=p[k].concat(b);z[k]=z[k].concat(f)}["graphsenkouSpanColor","graphsenkouSpanNegativeColor"].forEach(function(b,c){p[c].length&&z[c].length&&(x=0===c?u:C,D({indicator:a,points:p[c],nextPoints:z[c],color:x,options:e,gap:n,graph:a[b]}),a[b]=a.graph,a.graphCollection.push(b))})}else D({indicator:a,
points:c.senkouSpanB,nextPoints:c.senkouSpanA,color:u,options:e,gap:n,graph:a.graphsenkouSpan}),a.graphsenkouSpan=a.graph;delete a.nextPoints;delete a.fillGraph;a.points=d;a.options=e;a.graph=l},getGraphPath:function(a){var d=[],b;a=a||this.points;if(this.fillGraph&&this.nextPoints){if((b=r.prototype.getGraphPath.call(this,this.nextPoints))&&b.length){b[0][0]="L";d=r.prototype.getGraphPath.call(this,a);b=b.slice(0,d.length);for(var e=b.length-1;0<=e;e--)d.push(b[e])}}else d=r.prototype.getGraphPath.apply(this,
arguments);return d},getValues:function(a,d){var b=d.period,e=d.periodTenkan;d=d.periodSenkouSpanB;var l=a.xData,h=a.yData,n=h&&h.length||0;a=H(a.xAxis);var g=[],m=[],c;if(!(l.length<=b)&&J(h[0])&&4===h[0].length){var t=l[0]-b*a;for(c=0;c<b;c++)m.push(t+c*a);for(c=0;c<n;c++){if(c>=e){var f=h.slice(c-e,c);f=x(f);f=(f.high+f.low)/2}if(c>=b){var u=h.slice(c-b,c);u=x(u);u=(u.high+u.low)/2;var v=(f+u)/2}if(c>=d){var p=h.slice(c-d,c);p=x(p);p=(p.high+p.low)/2}t=h[c][3];var r=l[c];"undefined"===typeof g[c]&&
(g[c]=[]);"undefined"===typeof g[c+b]&&(g[c+b]=[]);g[c+b][0]=f;g[c+b][1]=u;g[c+b][2]=void 0;g[c][2]=t;c<=b&&(g[c+b][3]=void 0,g[c+b][4]=void 0);"undefined"===typeof g[c+2*b]&&(g[c+2*b]=[]);g[c+2*b][3]=v;g[c+2*b][4]=p;m.push(r)}for(c=1;c<=b;c++)m.push(r+c*a);return{values:g,xData:m,yData:g}}}});""});l(e,"masters/indicators/ichimoku-kinko-hyo.src.js",[],function(){})});
//# sourceMappingURL=ichimoku-kinko-hyo.js.map