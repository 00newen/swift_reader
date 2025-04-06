import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface SessionResponse {
  message: string;
  code: string;
  id: number;
}

export interface SessionData {
  id: string;
  code: string;
  message: string;
}

export const api = {
  createSession: async (): Promise<SessionResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/session`);
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  getSession: async (sessionCode: string): Promise<SessionData> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/sessions/${sessionCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  },
};
