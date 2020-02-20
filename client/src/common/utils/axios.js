import Axios from "axios";

var axios = Axios.create({
 baseURL: "http://192.168.1.132:5000/"
  /* other custom settings */
});

export default axios;
