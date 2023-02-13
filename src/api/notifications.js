import axios from "./myaxios";

export default {
  send: async function (payload) {
    return await axios.post("/push/topic", payload);
  },
};
