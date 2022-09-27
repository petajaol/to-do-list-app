import axios from "axios";

const url = "http://localhost:3000/chores/";
const restService = {
  get(id = "") {
    axios.get(url+id).then((res) => {
      console.log(res.data);
    });
  },
  post(body) {
    axios.post(url, body).then((res) => {
      console.log(res.data);
    });
  },
  update(id, body) {
    axios.patch(url+id, body).then((res) => {
      console.log(res.data);
    });
  },
  delete(id) {
    axios.delete(url+id).then((res) => {
      console.log(res.data);
    });
  },
};

export default restService;
