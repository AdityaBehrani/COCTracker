import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/';

// queries 
export const fetchPlayerWithId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}players/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const fetchPlayerWithTh = async (level) => {
    try {
      const response = await axios.get(`${API_URL}players/search/${level}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const fetchPlayersWithClan = async (id) => {
    try {
      const response = await axios.get(`${API_URL}players/clan/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const fetchClanWithId = async (id) => {
    try {
      const response = await axios.get(`${API_URL}clans/id/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const fetchClanWithCountry = async (country) => {
    try {
      const response = await axios.get(`${API_URL}clans/id/${country}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const fetchAttacksWithPlayerId = async (id) => {
    try {
      const response = await axios.get(`${API_URL}attacks/id/player/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const fetchAttacksWithClanId = async (id) => {
    try {
      const response = await axios.get(`${API_URL}attacks/id/clan/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const fetchAttacksWithWarId = async (id) => {
    try {
      const response = await axios.get(`${API_URL}attacks/id/war/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};


// mutations 
export const deletePlayerWithId = async (id) => {
    try {
      const response = await axios.get(`${API_URL}players/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const postIncrementPlayerLevel = async (id) => {
    try {
      const response = await axios.get(`${API_URL}players/increment_level/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const postIncrementPlayerTownhall = async (id) => {
    try {
      const response = await axios.get(`${API_URL}players/increment_townhall/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const postChangePlayerClan = async (id, newClan) => {
    try {
      const response = await axios.post(`${API_URL}players/change_clan`, { '_id': id, 'clan_id': newClan });

      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};

export const postAddPlayer = async (id, username, level, th_level, clan_id, player_country) => {
    try {
      const response = await axios.post(`${API_URL}players/create_player`, { 
        '_id': id, 
        'player_username': username,
        'player_level': level,
        'townhall_level': th_level,
        'player_country': player_country,
        'clan_id': clan_id
    });

      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
};



