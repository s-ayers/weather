
const axios = require('axios');


exports.geolocation = async (latitude, longitude) => {
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

};

exports.postal = async (country, postal) => {
  // https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
};

exports.city = async (country, city, state) => {
  // https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

};