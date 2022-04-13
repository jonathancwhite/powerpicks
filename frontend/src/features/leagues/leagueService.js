import axios from 'axios'

const API_URL = '/api/leagues/'

// Create new league
const createLeague = async (leagueData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, leagueData, config)

  return response.data
}

// Get user leagues
const getLeagues = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user league
const deleteLeague = async (leagueId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + leagueId, config)

  return response.data
}

const leagueService = {
  createLeague,
  getLeagues,
  deleteLeague,
}

export default leagueService