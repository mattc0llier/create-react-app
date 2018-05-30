import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    message: 'hello, its me',
    temp: '0',
    city: null,
  }


  componentDidMount() {

    console.log('started')

    fetch('http://api.openweathermap.org/data/2.5/weather?q=london&APPID=c81375da1aed259ae20e218655ad8746')
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
        })
      })

  }

  //let celcius = ({this.state.temp} - 273.15),
  //let farenheit = ({this.state.temp}*(9/5)) - 459.67)

  render() {

    console.log(this.state)

    return (
      <main className="App">

          <h1>{this.state.city}, {this.state.country}</h1>
          <h4>{this.state.weather}</h4>
          <h1>{this.state.temp}^C ( F)</h1>
          <h4> Pressure: {this.state.pressure}</h4>
          <h4> Humidity: {this.state.humidity}</h4>
          <h4> Min: {this.state.temp_min} ( F)</h4>
          <h4> Max: {this.state.temp_max} ( F)</h4>


      </main>
    );
  }
}

export default App;
