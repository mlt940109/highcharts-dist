/*
 Highcharts JS v8.2.2 (2020-11-23)

 Item series type for Highcharts

 (c) 2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/item-series",["highcharts"],function(d){b(d);b.Highcharts=d;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function d(b,d,C,c){b.hasOwnProperty(d)||(b[d]=c.apply(null,C))}b=b?b._modules:{};d(b,"Series/ItemSeries.js",[b["Core/Series/Series.js"],b["Core/Globals.js"],b["Core/Options.js"],b["Core/Utilities.js"]],function(b,
d,C,c){var F=c.defined,G=c.extend,H=c.fireEvent,D=c.isNumber,I=c.merge,J=c.objectEach,K=c.pick;c=b.seriesTypes.pie.prototype.pointClass.prototype;b.seriesType("item","pie",{endAngle:void 0,innerSize:"40%",itemPadding:.1,layout:"vertical",marker:I(C.defaultOptions.plotOptions.line.marker,{radius:null}),rows:void 0,crisp:!1,showInLegend:!0,startAngle:void 0},{markerAttribs:void 0,translate:function(a){0===this.total&&(this.center=this.getCenter());this.slots||(this.slots=[]);D(this.options.startAngle)&&
D(this.options.endAngle)?(d.seriesTypes.pie.prototype.translate.apply(this,arguments),this.slots=this.getSlots()):(this.generatePoints(),H(this,"afterTranslate"))},getSlots:function(){function a(a){0<A&&(a.row.colCount--,A--)}for(var b=this.center,c=b[2],d=b[3],q,m=this.slots,r,x,t,u,v,f,l,w,h=0,n,y=this.endAngleRad-this.startAngleRad,p=Number.MAX_VALUE,z,e,k,g=this.options.rows,B=(c-d)/c,E=0===y%(2*Math.PI);p>this.total+(e&&E?e.length:0);)for(z=p,p=m.length=0,e=k,k=[],h++,n=c/h/2,g?(d=(n-g)/n*c,
0<=d?n=g:(d=0,B=1)):n=Math.floor(n*B),q=n;0<q;q--)t=(d+q/n*(c-d-h))/2,u=y*t,v=Math.ceil(u/h),k.push({rowRadius:t,rowLength:u,colCount:v}),p+=v+1;if(e){for(var A=z-this.total-(E?e.length:0);0<A;)e.map(function(a){return{angle:a.colCount/a.rowLength,row:a}}).sort(function(a,b){return b.angle-a.angle}).slice(0,Math.min(A,Math.ceil(e.length/2))).forEach(a);e.forEach(function(a){var c=a.rowRadius;f=(a=a.colCount)?y/a:0;for(w=0;w<=a;w+=1)l=this.startAngleRad+w*f,r=b[0]+Math.cos(l)*c,x=b[1]+Math.sin(l)*
c,m.push({x:r,y:x,angle:l})},this);m.sort(function(a,b){return a.angle-b.angle});this.itemSize=h;return m}},getRows:function(){var a=this.options.rows;if(!a){var b=this.chart.plotWidth/this.chart.plotHeight;a=Math.sqrt(this.total);if(1<b)for(a=Math.ceil(a);0<a;){var c=this.total/a;if(c/a>b)break;a--}else for(a=Math.floor(a);a<this.total;){c=this.total/a;if(c/a<b)break;a++}}return a},drawPoints:function(){var a=this,b=this.options,c=a.chart.renderer,d=b.marker,q=this.borderWidth%2?.5:1,m=0,r=this.getRows(),
x=Math.ceil(this.total/r),t=this.chart.plotWidth/x,u=this.chart.plotHeight/r,v=this.itemSize||Math.min(t,u);this.points.forEach(function(f){var l,w,h=f.marker||{},n=h.symbol||d.symbol;h=K(h.radius,d.radius);var y=F(h)?2*h:v,p=y*b.itemPadding,z;f.graphics=l=f.graphics||{};a.chart.styledMode||(w=a.pointAttribs(f,f.selected&&"select"));if(!f.isNull&&f.visible){f.graphic||(f.graphic=c.g("point").add(a.group));for(var e=0;e<f.y;e++){if(a.center&&a.slots){var k=a.slots.shift();var g=k.x-v/2;k=k.y-v/2}else"horizontal"===
b.layout?(g=m%x*t,k=u*Math.floor(m/x)):(g=t*Math.floor(m/r),k=m%r*u);g+=p;k+=p;var B=z=Math.round(y-2*p);a.options.crisp&&(g=Math.round(g)-q,k=Math.round(k)+q);g={x:g,y:k,width:z,height:B};"undefined"!==typeof h&&(g.r=h);l[e]?l[e].animate(g):l[e]=c.symbol(n,null,null,null,null,{backgroundSize:"within"}).attr(G(g,w)).add(f.graphic);l[e].isActive=!0;m++}}J(l,function(a,b){a.isActive?a.isActive=!1:(a.destroy(),delete l[b])})})},drawDataLabels:function(){this.center&&this.slots?d.seriesTypes.pie.prototype.drawDataLabels.call(this):
this.points.forEach(function(a){a.destroyElements({dataLabel:1})})},animate:function(a){a?this.group.attr({opacity:0}):this.group.animate({opacity:1},this.options.animation)}},{connectorShapes:c.connectorShapes,getConnectorPath:c.getConnectorPath,setVisible:c.setVisible,getTranslate:c.getTranslate,isValid:c.isValid});""});d(b,"masters/modules/item-series.src.js",[],function(){})});
//# sourceMappingURL=item-series.js.map