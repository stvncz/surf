import axios from 'axios'

const BASE_URL = 'https://api.stormglass.io/v2/weather/point'
const API_KEY = import.meta.env.VITE_STORMGLASS_API_KEY // On met la clé dans un .env.local

const lat = 58.7984;
const lng = 17.8081;
const params = 'waveHeight,airTemperature';

export async function getSurfConditions(lat, lng) {
    fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
    headers: {
        'Authorization': API_KEY
    }
    }).then((response) => response.json()).then((jsonData) => {
    return response.data
    });
}

export async function getSurfConditions2(lat, lng) {
  try {
    const params = {
      lat,
      lng,
      params: 'waveHeight,windSpeed,windDirection,swellDirection',
      source: 'noaa' // source de données (plus stable)
    }

    const response = await axios.get(BASE_URL, {
      params,
      headers: {
        Authorization: API_KEY
      }
    })

    return response.data
  } catch (error) {
    console.log('Error fetching Stormglass data:', error)
    console.error('Error fetching Stormglass data:', error)
    return null
  }
}
