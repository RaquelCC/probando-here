(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){t.exports=n(21)},18:function(t,e,n){},20:function(t,e,n){},21:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),o=n(10),r=n.n(o),s=(n(18),n(8)),c=n.n(s),h=n(11),u=n(1),l=n(3),p=n(4),d=n(6),g=n(5),m=n(2),f=n(7),w=(n(20),function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(d.a)(this,Object(g.a)(e).call(this,t))).state={app_id:t.app_id,app_code:t.app_code,useHTTPS:!0,zoom:t.zoom,theme:t.theme,style:t.style},n.platform=null,n.map=null,n.markers=[],n.currentPosition=!1,n}return Object(f.a)(e,t),Object(p.a)(e,[{key:"shouldComponentUpdate",value:function(t,e){return this.changeTheme(t.theme,t.style),!0}},{key:"changeTheme",value:function(t,e){var n=this.platform.getMapTileService({type:"base"}).createTileLayer("maptile",t,256,"png",{style:e});this.map.setBaseLayer(n)}},{key:"componentDidMount",value:function(){this.platform=new window.H.service.Platform(this.state);var t=this.platform.createDefaultLayers(),e=this.refs["here-map"];this.map=new window.H.Map(e,t.normal.map,{center:{lat:this.props.lat,lng:this.props.lng},zoom:this.state.zoom});var n=new window.H.mapevents.MapEvents(this.map);new window.H.mapevents.Behavior(n),new window.H.ui.UI.createDefault(this.map,t);this.currentPosition&&(console.log(this.currentPosition),this.map.removeObjects([this.currentPosition])),this.currentPosition=new window.H.map.Marker({lat:this.props.lat,lng:this.props.lng}),this.map.addObjects([this.currentPosition])}},{key:"componentDidUpdate",value:function(){var t=this;this.currentPosition&&(this.map.removeObjects([this.currentPosition]),this.currentPosition=new window.H.map.Marker({lat:this.props.lat,lng:this.props.lng}),this.map.addObjects([this.currentPosition])),this.props.marker&&-1===this.markers.indexOf(this.props.marker)&&(this.newMarker=new window.H.map.Marker({lat:this.props.marker.lat,lng:this.props.marker.long}),this.map.addObjects([this.newMarker])),""!==this.props.startingPoint.lat&&""!==this.props.endingPoint.lat&&(this.routeLine&&this.map.removeObjects([this.routeLine,this.startMarker,this.endMarker]),this.routingParameters={mode:"fastest;pedestrian",waypoint0:"geo!"+this.props.startingPoint.lat+","+this.props.startingPoint.long,waypoint1:"geo!"+this.props.endingPoint.lat+","+this.props.endingPoint.long,representation:"display"},console.log(this.routingParameters),this.onResult=function(e){var n,a,i,o,r;console.log(e),e.response&&e.response.route&&(a=(n=e.response.route[0]).shape,r=new window.H.geo.LineString,a.forEach(function(t){var e=t.split(",");r.pushLatLngAlt(e[0],e[1])}),i=n.waypoint[0].mappedPosition,o=n.waypoint[1].mappedPosition,t.routeLine=new window.H.map.Polyline(r,{style:{strokeColor:"blue",lineWidth:2}}),t.startMarker=new window.H.map.Marker({lat:i.latitude,lng:i.longitude}),t.endMarker=new window.H.map.Marker({lat:o.latitude,lng:o.longitude}),t.map.addObjects([t.routeLine,t.startMarker,t.endMarker]),t.map.setViewBounds(t.routeLine.getBounds()))},this.router=this.platform.getRoutingService(),this.router.calculateRoute(this.routingParameters,this.onResult,function(t){alert(t.message)}))}},{key:"render",value:function(){return i.a.createElement("div",{ref:"here-map",style:{width:"100%",height:"400px",background:"grey"}})}}]),e}(i.a.Component)),v=function(t){function e(){return Object(l.a)(this,e),Object(d.a)(this,Object(g.a)(e).apply(this,arguments))}return Object(f.a)(e,t),Object(p.a)(e,[{key:"render",value:function(){var t=[],e=this.props.changeTheme;return["normal.day","normal.day.grey","normal.day.transit","normal.night","normal.night.grey","reduced.night","reduced.day","pedestrian.day","pedestrian.night"].forEach(function(n){t.push(i.a.createElement("button",{key:n,onClick:e,id:n},n))}),i.a.createElement("div",null,t)}}]),e}(i.a.Component),b=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(d.a)(this,Object(g.a)(e).call(this,t))).state={start:"",end:""},n.handleChangeInput=n.handleChangeInput.bind(Object(m.a)(n)),n.handleChangeInput2=n.handleChangeInput2.bind(Object(m.a)(n)),n}return Object(f.a)(e,t),Object(p.a)(e,[{key:"handleChangeInput",value:function(t){this.setState(Object(u.a)({},this.state,{start:t.target.value}))}},{key:"handleChangeInput2",value:function(t){this.setState(Object(u.a)({},this.state,{end:t.target.value}))}},{key:"render",value:function(){var t=this;return i.a.createElement("div",null,i.a.createElement("input",{onChange:function(e){return t.handleChangeInput(e)},value:this.state.start,placeholder:"inicio recorrido"}),i.a.createElement("input",{onChange:function(e){return t.handleChangeInput2(e)},value:this.state.end,placeholder:"final recorrido"}),i.a.createElement("button",{onClick:function(){return t.props.getCoordinates(t.state.start,t.state.end)}},"Planificar"))}}]),e}(i.a.Component),j=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(d.a)(this,Object(g.a)(e).call(this,t))).state={input:""},n.handleInputChange=n.handleInputChange.bind(Object(m.a)(n)),n}return Object(f.a)(e,t),Object(p.a)(e,[{key:"handleInputChange",value:function(t){this.setState(Object(u.a)({},this.state,{input:t.target.value}))}},{key:"render",value:function(){var t=this;return i.a.createElement("div",null,i.a.createElement("input",{onChange:function(e){return t.handleInputChange(e)}}),i.a.createElement("button",{onClick:function(){t.props.getMarker(t.state.input),t.setState(Object(u.a)({},t.state,{input:""}))}},"Agregar Marcador"))}}]),e}(i.a.Component),k=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(d.a)(this,Object(g.a)(e).call(this,t))).state={app_id:"aNF8XAILH0I6wrjlttyu",app_code:"x5U_rooRVBrH10t0UyX4Sw",theme:"normal.day",startingPoint:{lat:"",long:""},endingPoint:{lat:"",long:""},marker:null},n.onChange=n.onChange.bind(Object(m.a)(n)),n.getCoordinates=n.getCoordinates.bind(Object(m.a)(n)),n.getMarker=n.getMarker.bind(Object(m.a)(n)),n}return Object(f.a)(e,t),Object(p.a)(e,[{key:"componentDidMount",value:function(){var t=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){t.setState(Object(u.a)({},t.state,{lat:e.coords.latitude,lng:e.coords.longitude,error:null}))},function(e){t.setState(Object(u.a)({},t.state,{error:e.message}))})}},{key:"getMarker",value:function(t){var e=this;t&&fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id="+this.state.app_id+"&app_code="+this.state.app_code+"&searchtext="+t).then(function(t){return t.json()}).then(function(t){e.setState(Object(u.a)({},e.state,{marker:{lat:t.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,long:t.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,address:t.Response.View[0].Result[0].Location.Address.Label}}))})}},{key:"onChange",value:function(t){t.preventDefault();var e=t.target.id;this.setState({theme:e})}},{key:"getCoordinates",value:function(){var t=Object(h.a)(c.a.mark(function t(e,n){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id="+this.state.app_id+"&app_code="+this.state.app_code+"&searchtext="+e).then(function(t){return t.json()}).then(function(t){return{lat:t.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,long:t.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,address:t.Response.View[0].Result[0].Location.Address.Label}});case 2:return this.startingPoint=t.sent,t.next=5,fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id="+this.state.app_id+"&app_code="+this.state.app_code+"&searchtext="+n).then(function(t){return t.json()}).then(function(t){return{lat:t.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,long:t.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,address:t.Response.View[0].Result[0].Location.Address.Label}});case 5:return this.endingPoint=t.sent,t.next=8,fetch("https://route.api.here.com/routing/7.2/calculateroute.json?app_id="+this.state.app_id+"&app_code="+this.state.app_code+"&waypoint0=geo!"+this.startingPoint.lat+","+this.startingPoint.long+"&waypoint1=geo!"+this.endingPoint.lat+","+this.endingPoint.long+"&mode=fastest;pedestrian;traffic:disabled").then(function(t){return t.json()}).then(function(t){return t.response.route[0].summary});case 8:this.routeSummary=t.sent,this.setState(Object(u.a)({},this.state,{startingPoint:Object(u.a)({},this.startingPoint),endingPoint:Object(u.a)({},this.endingPoint),routeSummary:this.routeSummary}));case 10:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(w,{app_id:this.state.app_id,app_code:this.state.app_code,lat:this.state.lat?this.state.lat:"-33.4489",lng:this.state.lng?this.state.lng:"-70.6693",zoom:"12",theme:this.state.theme,startingPoint:this.state.startingPoint,endingPoint:this.state.endingPoint,marker:this.state.marker}),i.a.createElement(v,{changeTheme:this.onChange}),i.a.createElement(b,{getCoordinates:this.getCoordinates}),i.a.createElement(j,{getMarker:this.getMarker}),i.a.createElement("div",null,this.state.lat?this.state.lat:"nada"),i.a.createElement("div",null,this.state.lng?this.state.lng:"nada"))}}]),e}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.65accbc6.chunk.js.map