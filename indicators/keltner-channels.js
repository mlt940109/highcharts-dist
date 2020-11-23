/*
 Highstock JS v8.2.2 (2020-11-23)

 Indicator series type for Highstock

 (c) 2010-2019 Daniel Studencki

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/keltner-channels",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,l,b,d){a.hasOwnProperty(l)||(a[l]=d.apply(null,b))}a=a?a._modules:{};b(a,"Mixins/MultipleLines.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,b){var l=
b.defined,d=b.error,v=b.merge,h=a.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(e){var a=[];(this.pointArrayMap||[]).forEach(function(c){c!==e&&a.push("plot"+c.charAt(0).toUpperCase()+c.slice(1))});return a},toYData:function(e){var a=[];(this.pointArrayMap||[]).forEach(function(c){a.push(e[c])});return a},translate:function(){var a=this,b=a.pointArrayMap,c=[],g;c=a.getTranslatedLinesNames();h.prototype.translate.apply(a,
arguments);a.points.forEach(function(e){b.forEach(function(b,k){g=e[b];null!==g&&(e[c[k]]=a.yAxis.toPixels(g,!0))})})},drawGraph:function(){var a=this,b=a.linesApiNames,c=a.points,g=c.length,k=a.options,x=a.graph,y={options:{gapSize:k.gapSize}},r=[],f;a.getTranslatedLinesNames(a.pointValKey).forEach(function(a,b){for(r[b]=[];g--;)f=c[g],r[b].push({x:f.x,plotX:f.plotX,plotY:f[a],isNull:!l(f[a])});g=c.length});b.forEach(function(b,c){r[c]?(a.points=r[c],k[b]?a.options=v(k[b].styles,y):d('Error: "There is no '+
b+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=a["graph"+b],h.prototype.drawGraph.call(a),a["graph"+b]=a.graph):d('Error: "'+b+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=c;a.options=k;a.graph=x;h.prototype.drawGraph.call(a)}}});b(a,"Stock/Indicators/KeltnerChannelsIndicator.js",[a["Core/Series/Series.js"],a["Mixins/MultipleLines.js"],
a["Core/Utilities.js"]],function(a,b,n){var d=a.seriesTypes,l=n.correctFloat,h=n.merge,e=d.sma,w=d.ema,c=d.atr;a.seriesType("keltnerchannels","sma",{params:{period:20,periodATR:10,multiplierATR:2},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1,lineColor:void 0}},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>Upper Channel: {point.top}<br/>EMA({series.options.params.period}): {point.middle}<br/>Lower Channel: {point.bottom}<br/>'},
marker:{enabled:!1},dataGrouping:{approximation:"averages"},lineWidth:1},h(b,{pointArrayMap:["top","middle","bottom"],pointValKey:"middle",nameBase:"Keltner Channels",nameComponents:["period","periodATR","multiplierATR"],linesApiNames:["topLine","bottomLine"],requiredIndicators:["ema","atr"],init:function(){e.prototype.init.apply(this,arguments);this.options=h({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},getValues:function(a,b){var d=b.period,
e=b.periodATR,g=b.multiplierATR,f=a.yData;f=f?f.length:0;var h=[];b=w.prototype.getValues(a,{period:d,index:b.index});var k=c.prototype.getValues(a,{period:e}),n=[],t=[],p;if(!(f<d)){for(p=d;p<=f;p++){var m=b.values[p-d];var q=k.values[p-e];var u=m[0];a=l(m[1]+g*q[1]);q=l(m[1]-g*q[1]);m=m[1];h.push([u,a,m,q]);n.push(u);t.push([a,m,q])}return{values:h,xData:n,yData:t}}}}));""});b(a,"masters/indicators/keltner-channels.src.js",[],function(){})});
//# sourceMappingURL=keltner-channels.js.map