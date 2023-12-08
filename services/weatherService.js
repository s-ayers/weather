const axios = require('axios')
const config = require('../config.json')

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000)

  let month = date.getMonth()
  if (month < 10) {
    month = `0${month}`
  }

  let day = date.getDate()
  if (day < 10) {
    day = `0${day}`
  }

  let hour = date.getHours()
  if (hour < 10) {
    hour = `0${hour}`
  }

  let minute = date.getMinutes()
  if (minute < 10) {
    minute = `0${minute}`
  }

  let second = date.getSeconds()
  if (second < 10) {
    second = `0${second}`
  }

  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
}

const convertKelvinToFahrenheit = (temp) => {
  return ((temp - 273.15) * 9 / 5) + 32
}

const convertCelciusToFahrenheit = (temp) => {
  return (temp * 9 / 5) + 32
}

const heatType = (temp, units = null) => {
  let description = 'hot'
  switch (units ?? config.units) {
    case 'imperial':
      break

    case 'metric':
      temp = convertCelciusToFahrenheit(temp)
      break

    case 'kelvin':
    default:
      temp = convertKelvinToFahrenheit(temp)
      break
  }

  if (temp < 80) {
    description = 'moderate'
  }
  if (temp < 32) {
    description = 'cold'
  }

  return description
}

const weatherForecast = async (latitude, longitude) => {
  const weather = []
  const forecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      appid: config.OPEN_WEATHER_API_KEY,
      lat: latitude,
      lon: longitude,
      units: config.units
    }
  })

  forecast.data.list.forEach((item) => {
    const txt = item.dt_txt.split(' ')
    if (txt[1] !== '12:00:00') {
      return
    }
    const future = {
      heat: heatType(item.main.temp),
      condition: item.weather[0].description,
      date: item.dt_txt
    }

    weather.push(future)
  })

  return weather
}

const weatherBuilder = async (current) => {
  const weather = {
    latitude: current.coord.lat,
    longitude: current.coord.lon,
    date: formatDate(current.dt),
    heat: heatType(current.main.temp),
    condition: current.weather[0].description,
    forecast: await weatherForecast(current.coord.lat, current.coord.lon)
  }

  return weather
}

exports.geolocation = async (latitude, longitude) => {
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  const current = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      appid: config.OPEN_WEATHER_API_KEY,
      lat: latitude,
      lon: longitude,
      units: config.units
    }
  })

  return weatherBuilder(current.data)
}

exports.postal = async (country, zip) => {
  // https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  const current = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      appid: config.OPEN_WEATHER_API_KEY,
      units: config.units,
      zip: `${zip},${country}`
    }
  })

  return weatherBuilder(current.data)
}

exports.city = async (country, city, state) => {
  // https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
  let countryState = ''
  if (state) {
    countryState = `${state},`
  }
  countryState += `${country}`

  const current = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      appid: config.OPEN_WEATHER_API_KEY,
      q: `${city},${countryState}`,
      units: config.units
    }
  })

  return weatherBuilder(current.data)
}

exports.formatDate = formatDate;
exports.convertKelvinToFahrenheit = convertKelvinToFahrenheit;
exports.convertCelciusToFahrenheit = convertCelciusToFahrenheit;
exports.heatType = heatType;
exports.weatherForecast = weatherForecast;
