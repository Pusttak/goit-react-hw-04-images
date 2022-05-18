function fetchGallery(url) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  });
}

export default fetchGallery;
