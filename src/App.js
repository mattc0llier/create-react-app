import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    message: 'hello, its me',
    temp: '0',
    city: null,
    country: null,
    pressure: null,
    humidity: null,
    temp_min: null,
    temp_max: null,
    weather: null,
    lon: 0,
    lat: 0,
  }

//  kelvinToC = kelvin => Math.round(kelvin - 273.15)
//  kelvinToF = kelvin => Math.round((kelvin * (9/5)) - 459.67})

fetchWeather = city => fetch(
  `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c81375da1aed259ae20e218655ad8746`
)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temp: json.main.temp,
        city: json.name,
        country: json.sys.country,
        pressure: json.main.pressure,
        humidity: json.main.humidity,
        temp_min: json.main.temp_min,
        temp_max: json.main.temp_max,
        weather: json.weather.description,
        lon: json.coord.lon,
        lat: json.coord.lat,
        icon: json.weather[0].icon,

      })
    })

    fix = num => num.toFixed(5);

    // const fix = (a, b) => ({
    //   lat: a.toFixed(5),
    //   lon: b.toFixed(5)
    // })
    //
    // fix(lat, lon).lon


  componentDidMount() {
    console.log('started')
    this.fetchWeather('london')
    console.log(this.state.lon)
    console.log(this.state.lat)
  }

  //let celcius = ({this.state.temp} - 273.15),
  //let farenheit = ({this.state.temp}*(9/5)) - 459.67)

  // how do I organise it into a CSS grid with jsx?

  // Mapbox static map api to create background based on lat and long values.
  //https://api.mapbox.com/styles/v1/mapbox/cj44mfrt20f082snokim4ungi/static/-0.13000,51.51000,10.0,0,0/375x812?access_token=pk.eyJ1IjoibWF0dGNvbGxpZXIiLCJhIjoiV1pDdE1rQSJ9.hM-VvDggQos1FgJlkw0Q7g
  //https://www.mapbox.com/help/static-api-playground/

  render() {

    console.log(this.state)

    return (
      <main className="App" style={{background: `url(https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${this.fix(this.state.lon)},${this.fix(this.state.lat)},12.0,0,0/1200x1200?access_token=pk.eyJ1IjoibWF0dGNvbGxpZXIiLCJhIjoiV1pDdE1rQSJ9.hM-VvDggQos1FgJlkw0Q7g)`}}>
        <div class="map">
          <div class="layer">

            <h2>{this.state.city}, {this.state.country}</h2>
            <h4>{this.state.weather}</h4>
            <h1>{(this.state.temp)}°C ({this.state.temp * (9/5) - 459.67}°F)</h1>
            <h4> Pressure: {this.state.pressure}</h4>
            <h4> Humidity: {this.state.humidity}</h4>
            <h4> Min: {this.state.temp_min-273.15}°C ({this.state.temp * (9/5) - 459.67}°F)</h4>
            <h4> Max: {this.state.temp_max-273.15}°C ({this.state.temp * (9/5) - 459.67}°F)</h4>

            <select onChange={event => this.fetchWeather(event.target.value)}>
              <option>London</option>
              <option>Brisbane</option>
              <option>New York</option>
              <option>San Francisco</option>
              <option>Amsterdam</option>
            </select>

            <img src={logo}></img>

          </div>
          <img src="https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/#{ficLon},#{fixLat},10.0,0,0/800x500?access_token=pk.eyJ1IjoibWF0dGNvbGxpZXIiLCJhIjoiV1pDdE1rQSJ9.hM-VvDggQos1FgJlkw0Q7g"></img>
        </div>
      </main>
    );
  }
}

export default App;
