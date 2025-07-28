import axios from 'axios'

const BASE_URL = 'https://api.weatherapi.com/v1/marine.json?'
const API_KEY = import.meta.env.VITE_WEATHERAPI_API_KEY 

export async function getSurfConditions(lat, lng) {
  try {
    const params = {
      q: `${lat},${lng}`
    }

    const response = await axios.get(BASE_URL, {
      params,
      headers: {
        'Key': API_KEY
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching WeatherAPI data:', error)
    return null
  }
}