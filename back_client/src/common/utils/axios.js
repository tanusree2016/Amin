import Axios from "axios";

var axios = Axios.create({
 baseURL: "http://beeping.me/"
  /* other custom settings */
});

export default axios;
