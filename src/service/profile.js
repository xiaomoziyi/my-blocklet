import axios from '../libs/api';

export function getProfile() {
  return axios.get('api/profile', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
}

export function updateProfile(params) {
  return axios.post('api/profile', params);
}
