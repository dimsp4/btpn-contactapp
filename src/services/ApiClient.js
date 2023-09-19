import axios from "axios";

const client = axios.create({
  baseURL: "https://contact.herokuapp.com/contact",
});

const apiClient = async ({ url, method, data = null }) => {
  try {
    const result = await client[method](url, data);
    return result;
  } catch (error) {
    throw error.message;
  }
};

export default apiClient;
