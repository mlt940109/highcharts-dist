/*
 Highstock JS v8.2.2 (2020-11-23)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/volume-by-price",["highcharts","highcharts/modules/stock"],function(k){a(k);a.Highcharts=k;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function k(a,k,q,y){a.hasOwnProperty(k)||(a[k]=y.apply(null,q))}a=a?a._modules:{};k(a,"Stock/Indicators/VBPIndicator.js",[a["Core/Animation/AnimationUtilities.js"],a["Core/Series/Series.js"],
a["Core/Globals.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,k,q,y,m){var D=a.animObject;a=q.noop;var B=m.addEvent,C=m.arrayMax,E=m.arrayMin,z=m.correctFloat,A=m.error,F=m.extend,G=m.isArray,t=Math.abs,v=k.seriesTypes.column.prototype;k.seriesType("vbp","sma",{params:{ranges:12,volumeSeriesID:"volume"},zoneLines:{enabled:!0,styles:{color:"#0A9AC9",dashStyle:"LongDash",lineWidth:1}},volumeDivision:{enabled:!0,styles:{positiveColor:"rgba(144, 237, 125, 0.8)",negativeColor:"rgba(244, 91, 91, 0.8)"}},
animationLimit:1E3,enableMouseTracking:!1,pointPadding:0,zIndex:-1,crisp:!0,dataGrouping:{enabled:!1},dataLabels:{allowOverlap:!0,enabled:!0,format:"P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}",padding:0,style:{fontSize:"7px"},verticalAlign:"top"}},{nameBase:"Volume by Price",bindTo:{series:!1,eventName:"afterSetExtremes"},calculateOn:"render",markerAttribs:a,drawGraph:a,getColumnMetrics:v.getColumnMetrics,crispCol:v.crispCol,init:function(c){q.seriesTypes.sma.prototype.init.apply(this,arguments);
var b=this.options.params;var g=this.linkedParent;b=c.get(b.volumeSeriesID);this.addCustomEvents(g,b);return this},addCustomEvents:function(c,b){function g(){d.chart.redraw();d.setData([]);d.zoneStarts=[];d.zoneLinesSVG&&(d.zoneLinesSVG.destroy(),delete d.zoneLinesSVG)}var d=this;d.dataEventsToUnbind.push(B(c,"remove",function(){g()}));b&&d.dataEventsToUnbind.push(B(b,"remove",function(){g()}));return d},animate:function(c){var b=this,g=b.chart.inverted,d=b.group,n={};!c&&d&&(c=g?"translateY":"translateX",
g=g?b.yAxis.top:b.xAxis.left,d["forceAnimate:"+c]=!0,n[c]=g,d.animate(n,F(D(b.options.animation),{step:function(c,d){b.group.attr({scaleX:Math.max(.001,d.pos)})}})))},drawPoints:function(){this.options.volumeDivision.enabled&&(this.posNegVolume(!0,!0),v.drawPoints.apply(this,arguments),this.posNegVolume(!1,!1));v.drawPoints.apply(this,arguments)},posNegVolume:function(c,b){var g=b?["positive","negative"]:["negative","positive"],d=this.options.volumeDivision,n=this.points.length,a=[],e=[],h=0,l;c?
(this.posWidths=a,this.negWidths=e):(a=this.posWidths,e=this.negWidths);for(;h<n;h++){var f=this.points[h];f[g[0]+"Graphic"]=f.graphic;f.graphic=f[g[1]+"Graphic"];if(c){var w=f.shapeArgs.width;var u=this.priceZones[h];(l=u.wholeVolumeData)?(a.push(w/l*u.positiveVolumeData),e.push(w/l*u.negativeVolumeData)):(a.push(0),e.push(0))}f.color=b?d.styles.positiveColor:d.styles.negativeColor;f.shapeArgs.width=b?this.posWidths[h]:this.negWidths[h];f.shapeArgs.x=b?f.shapeArgs.x:this.posWidths[h]}},translate:function(){var c=
this,b=c.options,g=c.chart,d=c.yAxis,a=d.min,x=c.options.zoneLines,e=c.priceZones,h=0,l,f,w;v.translate.apply(c);var u=c.points;if(u.length){var k=.5>b.pointPadding?b.pointPadding:.1;b=c.volumeDataArray;var r=C(b);var p=g.plotWidth/2;var H=g.plotTop;var m=t(d.toPixels(a)-d.toPixels(a+c.rangeStep));var q=t(d.toPixels(a)-d.toPixels(a+c.rangeStep));k&&(a=t(m*(1-2*k)),h=t((m-a)/2),m=t(a));u.forEach(function(a,b){f=a.barX=a.plotX=0;w=a.plotY=d.toPixels(e[b].start)-H-(d.reversed?m-q:m)-h;l=z(p*e[b].wholeVolumeData/
r);a.pointWidth=l;a.shapeArgs=c.crispCol.apply(c,[f,w,l,m]);a.volumeNeg=e[b].negativeVolumeData;a.volumePos=e[b].positiveVolumeData;a.volumeAll=e[b].wholeVolumeData});x.enabled&&c.drawZones(g,d,c.zoneStarts,x.styles)}},getValues:function(a,b){var c=a.processedXData,d=a.processedYData,n=this.chart,x=b.ranges,e=[],h=[],l=[],f;if(a.chart)if(f=n.get(b.volumeSeriesID))if((b=G(d[0]))&&4!==d[0].length)A("Type of "+a.name+" series is different than line, OHLC or candlestick.",!0,n);else return(this.priceZones=
this.specifyZones(b,c,d,x,f)).forEach(function(a,b){e.push([a.x,a.end]);h.push(e[b][0]);l.push(e[b][1])}),{values:e,xData:h,yData:l};else A("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,n);else A("Base series not found! In case it has been removed, add a new one.",!0,n)},specifyZones:function(a,b,g,d,n){if(a){var c=g.length;for(var e=g[0][3],h=e,l=1,f;l<c;l++)f=g[l][3],f<e&&(e=f),f>h&&(h=f);c={min:e,max:h}}else c=!1;c=(e=c)?e.min:E(g);f=e?e.max:C(g);e=this.zoneStarts=[];h=[];
var k=0;l=1;if(!c||!f)return this.points.length&&(this.setData([]),this.zoneStarts=[],this.zoneLinesSVG.destroy()),[];var m=this.rangeStep=z(f-c)/d;for(e.push(c);k<d-1;k++)e.push(z(e[k]+m));e.push(f);for(d=e.length;l<d;l++)h.push({index:l-1,x:b[0],start:e[l-1],end:e[l]});return this.volumePerZone(a,h,n,b,g)},volumePerZone:function(a,b,g,d,n){var c=this,e=g.processedXData,h=g.processedYData,l=b.length-1,f=n.length;g=h.length;var k,m,q,r,p;t(f-g)&&(d[0]!==e[0]&&h.unshift(0),d[f-1]!==e[g-1]&&h.push(0));
c.volumeDataArray=[];b.forEach(function(b){b.wholeVolumeData=0;b.positiveVolumeData=0;for(p=b.negativeVolumeData=0;p<f;p++)q=m=!1,r=a?n[p][3]:n[p],k=p?a?n[p-1][3]:n[p-1]:r,r<=b.start&&0===b.index&&(m=!0),r>=b.end&&b.index===l&&(q=!0),(r>b.start||m)&&(r<b.end||q)&&(b.wholeVolumeData+=h[p],k>r?b.negativeVolumeData+=h[p]:b.positiveVolumeData+=h[p]);c.volumeDataArray.push(b.wholeVolumeData)});return b},drawZones:function(a,b,g,d){var c=a.renderer,k=this.zoneLinesSVG,e=[],h=a.plotWidth,l=a.plotTop,f;g.forEach(function(c){f=
b.toPixels(c)-l;e=e.concat(a.renderer.crispLine([["M",0,f],["L",h,f]],d.lineWidth))});k?k.animate({d:e}):k=this.zoneLinesSVG=c.path(e).attr({"stroke-width":d.lineWidth,stroke:d.color,dashstyle:d.dashStyle,zIndex:this.group.zIndex+.1}).add(this.group)}},{destroy:function(){this.negativeGraphic&&(this.negativeGraphic=this.negativeGraphic.destroy());return y.prototype.destroy.apply(this,arguments)}});""});k(a,"masters/indicators/volume-by-price.src.js",[],function(){})});
//# sourceMappingURL=volume-by-price.js.map