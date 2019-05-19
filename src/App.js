import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import ThemeSelector from './components/ThemeSelector';
import GeocoordinateGetter from './components/GeocoordinateGetter';


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
    }

    this.onChange = this.onChange.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.setState({
  //           lat: position.coords.latitude, 
  //           long: position.coords.longitude,
  //           error: null,
  //         });
  //       },
  //       (error) => this.setState(
  //         {error: error.message}
  //       )
  //     );
  //   }
  // }

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

      console.log(this.startingPoint)
      console.log(this.endingPoint)

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
      }
    })




  }

  render() {
    return (
      <div className="App">
        <Map
          app_id={this.state.app_id}
          app_code={this.state.app_code}
          lat="-33.4489"
          lng="-70.6693"
          zoom="12"
          theme={this.state.theme}
          startingPoint={this.state.startingPoint}
          endingPoint={this.state.endingPoint}
        />
        <ThemeSelector changeTheme={this.onChange} />
        <GeocoordinateGetter
          getCoordinates={this.getCoordinates}
        />
      </div>
    );
  }
}