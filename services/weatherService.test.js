const axios = require('axios');
const config = require('../config.json');
const {
  geolocation,
  postal,
  city,
  weatherBuilder,
  weatherForecast,
  convertKelvinToFahrenheit,
  convertCelciusToFahrenheit,
  heatType,
  formatDate
} = require('./weatherService');

jest.mock('axios');

describe('weatherService', () => {
  describe('geolocation', () => {
    it('should return weather data for given latitude and longitude', async () => {

      const latitude = 37.7749;
      const longitude = -122.4194;
      const mockWeatherData = {
        coord: { lat: latitude, lon: longitude },
        dt: 1631234567,
        main: { temp: 330.15 },
        weather: [{ description: 'Cloudy' }]
      };
      const mockWeatherForecast = [
        { dt_txt: '2021-09-10 12:00:00', main: { temp: 293.15 }, weather: [{ description: 'Cloudy' }] },
        { dt_txt: '2021-09-11 12:00:00', main: { temp: 298.15 }, weather: [{ description: 'Sunny' }] }
      ];
      axios.get.mockResolvedValueOnce({ data: mockWeatherData });
      axios.get.mockResolvedValueOnce({ data: { list: mockWeatherForecast } });

      const result = await geolocation(latitude, longitude);

      expect(result).toEqual({
        latitude,
        longitude,
        date: '2021-08-09 19:42:47',
        heat: 'hot',
        condition: 'Cloudy',
        forecast: [
          { heat: 'moderate', condition: 'Cloudy', date: '2021-09-10 12:00:00' },
          { heat: 'moderate', condition: 'Sunny', date: '2021-09-11 12:00:00' }
        ]
      });
      // expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          lat: latitude,
          lon: longitude,
          units: config.units
        }
      });
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          lat: latitude,
          lon: longitude,
          units: config.units
        }
      });
    });
  });

  describe('postal', () => {
    it('should return weather data for given country and postal code', async () => {
      const country = 'US';
      const zip = '94102';
      const mockWeatherData = {
        coord: { lat: 37.7749, lon: -122.4194 },
        dt: 1631234567,
        main: { temp: 293.15 },
        weather: [{ description: 'Cloudy' }]
      };
      const mockWeatherForecast = [
        { dt_txt: '2021-09-10 12:00:00', main: { temp: 293.15 }, weather: [{ description: 'Cloudy' }] },
        { dt_txt: '2021-09-11 12:00:00', main: { temp: 298.15 }, weather: [{ description: 'Sunny' }] }
      ];
      axios.get.mockResolvedValueOnce({ data: mockWeatherData });
      axios.get.mockResolvedValueOnce({ data: { list: mockWeatherForecast } });

      const result = await postal(country, zip);

      expect(result).toEqual({
        latitude: 37.7749,
        longitude: -122.4194,
        date: '2021-08-09 19:42:47',
        heat: 'moderate',
        condition: 'Cloudy',
        forecast: [
          { heat: 'moderate', condition: 'Cloudy', date: '2021-09-10 12:00:00' },
          { heat: 'moderate', condition: 'Sunny', date: '2021-09-11 12:00:00' }
        ]
      });
      // expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          units: config.units,
          zip: `${zip},${country}`
        }
      });
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          lat: 37.7749,
          lon: -122.4194,
          units: config.units
        }
      });
    });
  });

  describe('city', () => {
    it('should return weather data for given country, city, and state', async () => {
      const country = 'US';
      const cityName = 'San Francisco';
      const state = 'CA';
      const mockWeatherData = {
        coord: { lat: 37.7749, lon: -122.4194 },
        dt: 1631234567,
        main: { temp: 293.15 },
        weather: [{ description: 'Cloudy' }]
      };
      const mockWeatherForecast = [
        { dt_txt: '2021-09-10 12:00:00', main: { temp: 293.15 }, weather: [{ description: 'Cloudy' }] },
        { dt_txt: '2021-09-11 12:00:00', main: { temp: 298.15 }, weather: [{ description: 'Sunny' }] }
      ];
      axios.get.mockResolvedValueOnce({ data: mockWeatherData });
      axios.get.mockResolvedValueOnce({ data: { list: mockWeatherForecast } });

      const result = await city(country, cityName, state);

      expect(result).toEqual({
        latitude: 37.7749,
        longitude: -122.4194,
        date: '2021-08-09 19:42:47',
        heat: 'moderate',
        condition: 'Cloudy',
        forecast: [
          { heat: 'moderate', condition: 'Cloudy', date: '2021-09-10 12:00:00' },
          { heat: 'moderate', condition: 'Sunny', date: '2021-09-11 12:00:00' }
        ]
      });
      // expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          q: `${cityName},${state},${country}`,
          units: config.units
        }
      });
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          lat: 37.7749,
          lon: -122.4194,
          units: config.units
        }
      });
    });

    it('should return weather data for given country and city', async () => {

      const country = 'US';
      const cityName = 'San Francisco';
      const mockWeatherData = {
        coord: { lat: 37.7749, lon: -122.4194 },
        dt: 1631234567,
        main: { temp: 293.15 },
        weather: [{ description: 'Cloudy' }]
      };
      const mockWeatherForecast = [
        { dt_txt: '2021-09-10 12:00:00', main: { temp: 293.15 }, weather: [{ description: 'Cloudy' }] },
        { dt_txt: '2021-09-11 12:00:00', main: { temp: 298.15 }, weather: [{ description: 'Sunny' }] }
      ];
      axios.get.mockResolvedValueOnce({ data: mockWeatherData });
      axios.get.mockResolvedValueOnce({ data: { list: mockWeatherForecast } });

      const result = await city(country, cityName);

      expect(result).toEqual({
        latitude: 37.7749,
        longitude: -122.4194,
        date: '2021-08-09 19:42:47',
        heat: 'moderate',
        condition: 'Cloudy',
        forecast: [
          { heat: 'moderate', condition: 'Cloudy', date: '2021-09-10 12:00:00' },
          { heat: 'moderate', condition: 'Sunny', date: '2021-09-11 12:00:00' }
        ]
      });
      // expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          q: `${cityName},${country}`,
          units: config.units
        }
      });
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          lat: 37.7749,
          lon: -122.4194,
          units: config.units
        }
      });
    });
  });

  describe('weatherForecast', () => {
    it('should return weather forecast for given latitude and longitude', async () => {
      const latitude = 37.7749;
      const longitude = -122.4194;
      const mockWeatherForecast = [
        { dt_txt: '2021-09-10 12:00:00', main: { temp: 293.15 }, weather: [{ description: 'Cloudy' }] },
        { dt_txt: '2021-09-11 12:00:00', main: { temp: 330.15 }, weather: [{ description: 'Sunny' }] }
      ];
      axios.get.mockResolvedValueOnce({ data: { list: mockWeatherForecast } });

      const result = await weatherForecast(latitude, longitude);

      expect(result).toEqual([
        { heat: 'moderate', condition: 'Cloudy', date: '2021-09-10 12:00:00' },
        { heat: 'hot', condition: 'Sunny', date: '2021-09-11 12:00:00' }
      ]);
      expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          appid: config.OPEN_WEATHER_API_KEY,
          lat: latitude,
          lon: longitude,
          units: config.units
        }
      });
    });
  });

  describe('convertKelvinToFahrenheit', () => {
    it('should convert temperature from Kelvin to Fahrenheit', () => {
      const temp = 293.15;

      const result = convertKelvinToFahrenheit(temp);

      expect(result).toBe(68);
    });
  });

  describe('convertCelciusToFahrenheit', () => {
    it('should convert temperature from Celsius to Fahrenheit', () => {
      const temp = 25;

      const result = convertCelciusToFahrenheit(temp);

      expect(result).toBe(77);
    });
  });

  describe('heatType', () => {
    it('should return heat type based on temperature and config units', () => {
      const temp = 293.15;
      const result = heatType(temp, 'metric');

      expect(result).toBe('hot');
    });

    it('should return heat type based on temperature and config units (imperial)', () => {
      const temp = 68;
      const result = heatType(temp, 'imperial');

      expect(result).toBe('moderate');
    });

    it('should return heat type based on temperature and config units (kelvin)', () => {
      // 68 Fahrenheit = 293.15 Kelvin
      const temp = 293.15;
      const result = heatType(temp, 'kelvin');

      expect(result).toBe('moderate');
    });

    it('should return "hot" for temperature above 80', () => {
      const temp = 90;
      const result = heatType(temp, 'imperial');

      expect(result).toBe('hot');
    });

    it('should return "cold" for temperature below 32', () => {
      const temp = 25;
      const result = heatType(temp, 'imperial');

      expect(result).toBe('cold');
    });
  });

  describe('formatDate', () => {
    it('should format timestamp to "YYYY-MM-DD HH:mm:ss" format', () => {
      const timestamp = 1631234567;

      const result = formatDate(timestamp);

      expect(result).toBe('2021-08-09 19:42:47');
    });
  });
});