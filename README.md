# Weather API

An open source API written in Express and Nodejs.

## Install

```
git clone git@github.com:s-ayers/weather.git
npm install
npm start
```

Open http://localhost:3000/api-docs

## Endpoints

### /city/{country}/{city}

Get the weather of a City. Most cities only have a country. American cities also
have a state.

Example: /city/us/New%20Lenox?state=IL

### /geolocation/{latitude}/{longitude}

Get the weather of a given geolocation.

Example: /geolocation/41.512/-87.9656

### /postal/{country}/{postal}

Get the weather of a given postal code. In America postal codes are colloquial
known as zip codes. Zip code is the kleenex of postal codes.

Example: /postal/ca/M5H

All endpoints have teh same response. Sample:
```
{
  "latitude": 41.512,
  "longitude": -87.9656,
  "date": "2024-00-04 09:09:34",
  "heat": "cold",
  "condition": "clear sky",
  "forecast": [
    {
      "heat": "cold",
      "condition": "overcast clouds",
      "date": "2024-01-05 12:00:00"
    },
    {
      "heat": "moderate",
      "condition": "light snow",
      "date": "2024-01-06 12:00:00"
    },
    {
      "heat": "moderate",
      "condition": "light snow",
      "date": "2024-01-07 12:00:00"
    },
    {
      "heat": "moderate",
      "condition": "overcast clouds",
      "date": "2024-01-08 12:00:00"
    },
    {
      "heat": "cold",
      "condition": "snow",
      "date": "2024-01-09 12:00:00"
    }
  ]
}
```

## config.json

OPEN_WEATHER_API_KEY - The API key to https://openweathermap.org/api

port - The port the web service will use. Port 3000 will be used if none is specified.

units - Unit of measure for tempature. Options are: imperial, metric, and kelvin.
Defaults to kelvin.


## Logs

Access logs are in ./logs


```
address - - [date time] Verb url response time useragent
```
Sample log
```
::1 - - [08/Dec/2023:06:08:09 +0000] "GET /api-docs/ HTTP/1.1" 200 3106 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0"
```
