const fetchOptions = {
  API_KEY: '24183865-520b97805ca8322c4646aea82',
  BASE_URL: 'https://pixabay.com/api/',
  page: 1,
  per_page: 12,
};

function fetchApi(query, page) {
  const { API_KEY, BASE_URL, per_page } = fetchOptions;
  return fetch(`${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Nothing was found'));
  });
}

export { fetchApi };
