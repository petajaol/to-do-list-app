import axios from "axios";

const url = "http://localhost:3000/tasks/";

const restService = {
  async get(id = "") {
    const response = await axios.get(url + id);
    return response;
  },
  async post(body) {
    const response = await axios.post(url, body);
    return response;
  },
  async update(id, body) {
    const response = await axios.patch(url + id, body);
    return response;
  },
  async delete(id) {
    const response = await axios.delete(url + id);
    return response;
  },
};

export default restService;
