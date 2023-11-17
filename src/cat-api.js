import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.timeout = 3000;
axios.defaults.headers.common['x-api-key'] =
  'live_SrH6JCALfDuuE8eLhZOtFhcASqmIRYZDZjDF0gdHR2v3B9OQ013XVvtStIwbF62A';

const axiosInstance = axios.create();

function fetchBreeds() {
  return axiosInstance.get('/breeds');
}

function fetchCatByBreed(breedId) {
  return axiosInstance.get(`/images/search?breed_ids=${breedId}&limit=1`);
}

export { fetchBreeds, fetchCatByBreed };
