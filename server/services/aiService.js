import axios from 'axios';
import logger from '../utils/logger.js';

const AI_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const aiApiClient = axios.create({
  baseURL: AI_URL,
  timeout: 10000, // Task 67: 10-second timeout
});

export const processImageWithAI = async (filePath) => {
    // Task 70: Generic retry HTTP client
    let attempts = 0;
    while(attempts < 3) {
        try {
            // Task 69: Node to Python
            const formData = new FormData(); // using Node 18+ native or form-data package
            // Mocking the call:
            // const res = await aiApiClient.post('/api/ai/process', formData);
            // return res.data;
            return { success: true, text: "Mock structured text" }
        } catch (error) {
            attempts++;
            logger.warn(`AI Service request failed, attempt ${attempts}: ${error.message}`);
            if (attempts >= 3) throw new Error('AI Service unavailable');
            await new Promise(res => setTimeout(res, 1000 * attempts));
        }
    }
}
