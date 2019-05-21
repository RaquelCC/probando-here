import React from 'react';
// import { Marker } from 'react-leaflet';

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.platform = null;
    this.map = null;

    this.state = {
      app_id: props.app_id,
      app_code: props.app_code,
      useHTTPS: true,
      // useCIT: true,
      center: {
        lat: props.lat,
        lng: props.lng,
      },
      zoom: props.zoom,
      theme: props.theme,
      style: props.style,
    }
    
    this.markers = []

    
  }


  shouldComponentUpdate(props, state) {
    this.changeTheme(props.theme, props.style);
    return true;
  }

  changeTheme(theme, style) {
    var tiles = this.platform.getMapTileService({ 'type': 'base' });
    var layer = tiles.createTileLayer(
      'maptile',
      theme,
      256,
      'png',
      { 'style': style }
    );
    this.map.setBaseLayer(layer);
  }



  // TODO: Add theme selection discussed later HERE

  componentDidMount() {

    this.platform = new window.H.service.Platform(this.state);

    var layer = this.platform.createDefaultLayers();
    var container = this.refs["here-map"];

    this.map = new window.H.Map(container, layer.normal.map, {
      center: this.state.center,
      zoom: this.state.zoom,
    })

    var events = new window.H.mapevents.MapEvents(this.map);
    // eslint-disable-next-line
    var behavior = new window.H.mapevents.Behavior(events);
    // eslint-disable-next-line
    var ui = new window.H.ui.UI.createDefault(this.map, layer)

  }

  componentDidUpdate() {
    if (this.props.marker && this.markers.indexOf(this.props.marker) === -1) {
    
        this.newMarker = new window.H.map.Marker({
          lat: this.props.marker.lat,
          lng: this.props.marker.long
        });
        this.map.addObjects([this.newMarker])
    }
    if (this.props.startingPoint.lat !== "" && this.props.endingPoint.lat !== "") {
      // console.log("props!")
      if (this.routeLine) {
        this.map.removeObjects([this.routeLine, this.startMarker, this.endMarker]);
      }
      this.routingParameters = {
        // The routing mode:
        'mode': 'fastest;pedestrian',
        // The start point of the route:
        'waypoint0': /*'geo!-33.417442,-70.6057'*/"geo!" + this.props.startingPoint.lat + "," + this.props.startingPoint.long,
        // The end point of the route:
        'waypoint1': /*'geo!-33.454103,-70.688219'*/"geo!" + this.props.endingPoint.lat + "," + this.props.endingPoint.long,
        // To retrieve the shape of the route we choose the route
        // representation mode 'display'
        'representation': 'display'
      };

      console.log(this.routingParameters)

      // Define a callback function to process the routing response:
      this.onResult = result => {
        console.log(result)
        var route,
          routeShape,
          startPoint,
          endPoint,
          linestring;
        if (result.response && result.response.route) {
          // Pick the first route from the response:
          route = result.response.route[0];
          // Pick the route's shape:
          routeShape = route.shape;

          // Create a linestring to use as a point source for the route line
          linestring = new window.H.geo.LineString();

          // Push all the points in the shape into the linestring:
          routeShape.forEach(function (point) {
            var parts = point.split(',');
            linestring.pushLatLngAlt(parts[0], parts[1]);
          });

          // Retrieve the mapped positions of the requested waypoints:
          startPoint = route.waypoint[0].mappedPosition;
          endPoint = route.waypoint[1].mappedPosition;

          // Create a polyline to display the route:
          this.routeLine = new window.H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 2 }
          });

          // Create a marker for the start point:
          this.startMarker = new window.H.map.Marker({
            lat: startPoint.latitude,
            lng: startPoint.longitude
          });

          // Create a marker for the end point:
          this.endMarker = new window.H.map.Marker({
            lat: endPoint.latitude,
            lng: endPoint.longitude
          });

          // Add the route polyline and the two markers to the map:
          this.map.addObjects([this.routeLine, this.startMarker, this.endMarker]);

          // Set the map's viewport to make the whole route visible:
          this.map.setViewBounds(this.routeLine.getBounds());
        }
      };

      // Get an instance of the routing service:
      this.router = this.platform.getRoutingService();

      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      this.router.calculateRoute(this.routingParameters, this.onResult,
        function (error) {
          alert(error.message);
        });

    }
  }

  

  render() {
    return (
      <div ref="here-map" style={{ width: '100%', height: '400px', background: 'grey' }}>
      </div>
    );
  }
}
