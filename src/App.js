import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import ThemeSelector from './components/ThemeSelector';
import GeocoordinateGetter from './components/GeocoordinateGetter';
import AddMarker from './components/AddMarker';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      app_id: "aNF8XAILH0I6wrjlttyu",
      app_code: "x5U_rooRVBrH10t0UyX4Sw",
      theme: 'normal.day',
      startingPoint: {
        lat: '',
        long: '',
      },
      endingPoint: {
        lat: '',
        long: '',
      },
      marker: null,
    }

    this.onChange = this.onChange.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getMarker = this.getMarker.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      // console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            ...this.state,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          // alert(error.message)
          this.setState({
            ...this.state,
            error: error.message
          })
        }
      );
    }
  }

  getMarker(marker) {
    if (marker) {
    fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id=" + this.state.app_id + "&app_code=" + this.state.app_code + "&searchtext=" + marker)
      .then(data => data.json())
      .then(data => {
        this.setState({
          ...this.state,
          marker: {
            lat: data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
            long: data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
            address: data.Response.View[0].Result[0].Location.Address.Label,
          }
        })
      })
    }
  }

  onChange(evt) {
    evt.preventDefault();

    var change = evt.target.id;
    this.setState({
      "theme": change,
    });
  }

  async getCoordinates(start, end) {
    this.startingPoint = await fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id=" + this.state.app_id + "&app_code=" + this.state.app_code + "&searchtext=" + start)
      .then(data => data.json())
      .then(data => {
        return {
          lat: data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
          long: data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
          address: data.Response.View[0].Result[0].Location.Address.Label,
        }
      })
    this.endingPoint = await fetch("https://geocoder.api.here.com/6.2/geocode.json?app_id=" + this.state.app_id + "&app_code=" + this.state.app_code + "&searchtext=" + end)
      .then(data => data.json())
      .then(data => {
        return {
          lat: data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
          long: data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
          address: data.Response.View[0].Result[0].Location.Address.Label,
        }
      })

    this.routeSummary = await fetch("https://route.api.here.com/routing/7.2/calculateroute.json?app_id=" + this.state.app_id + "&app_code=" + this.state.app_code + "&waypoint0=geo!" + this.startingPoint.lat + "," + this.startingPoint.long + "&waypoint1=geo!" + this.endingPoint.lat + "," + this.endingPoint.long + "&mode=fastest;pedestrian;traffic:disabled")
      .then(data => data.json())
      .then(data => {
        // console.log("https://route.api.here.com/routing/7.2/calculateroute.json?app_id=" + this.state.app_id + "&app_code=" + this.state.app_code + "&waypoint0=geo!" + this.startingPoint.lat + "," + this.startingPoint.long + "&waypoint1=geo!" + this.endingPoint.lat + "," + this.endingPoint.long + "&mode=fastest;pedestrian;traffic:disabled")
        // console.log(data)
        return data.response.route[0].summary
      })

    this.setState({
      ...this.state,
      startingPoint: {
        ...this.startingPoint
        // lat: this.startingPoint.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
        // long: this.startingPoint.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
        // address: this.startingPoint.data.Response.View[0].Result[0].Location.Address.Label,
      },
      endingPoint: {
        ...this.endingPoint
        // lat: this.endingPoint.data.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude,
        // long: this.endingPoint.data.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude,
        // address: this.endingPoint.data.Response.View[0].Result[0].Location.Address.Label,
      },
      routeSummary: this.routeSummary
    })




  }

  render() {
    return (
      <div className="App">
        <Map
          app_id={this.state.app_id}
          app_code={this.state.app_code}
          lat={this.state.lat ? this.state.lat : "-33.4489"}
          lng={this.state.lng ? this.state.lng : "-70.6693"}
          zoom="12"
          theme={this.state.theme}
          startingPoint={this.state.startingPoint}
          endingPoint={this.state.endingPoint}
          marker={this.state.marker}
        />
        <ThemeSelector changeTheme={this.onChange} />
        <GeocoordinateGetter
          getCoordinates={this.getCoordinates}
        />
        <AddMarker
        getMarker={this.getMarker}
        />

        <div>{this.state.lat ? this.state.lat : "nada"}</div>
        <div>{this.state.lng ? this.state.lng : "nada"}</div>

      </div>
    );
  }
}