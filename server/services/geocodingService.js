import axios from 'axios';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const geocodeLocation = async (locationString) => {
  if (!locationString) return { lat: null, lng: null };

  // Task: Integrate Google Maps Geocoding API
  try {
    if (GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'placeholder_key') {
      const gmapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationString)}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(gmapUrl, { timeout: 5000 });
      if (response.data.status === 'OK') {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      }
    }
  } catch (error) {
    logger.error(`Google Maps geocoding failed: ${error.message}`);
  }

  // Task: Implement Nominatim fallback
  try {
    logger.info('Falling back to Nominatim OSM geocoding...');
    const osmUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationString)}`;
    const response = await axios.get(osmUrl, {
      headers: { 'User-Agent': 'RELIX-NGO-Platform' },
      timeout: 5000
    });
    
    if (response.data && response.data.length > 0) {
      return { 
        lat: parseFloat(response.data[0].lat), 
        lng: parseFloat(response.data[0].lon) 
      };
    }
  } catch (error) {
    logger.error(`Nominatim geocoding failed: ${error.message}`);
  }

  // Task: Store lat: null, lng: null if both geocoding fails
  logger.warn(`Could not geocode location: ${locationString}`);
  return { lat: null, lng: null };
};
