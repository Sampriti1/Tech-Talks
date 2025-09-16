const apiUrl = process.env.REACT_APP_API_URL;

export const fetchBlogs = () => {
  return fetch(`${apiUrl}/blog`)
    .then((res) => res.json());
};
