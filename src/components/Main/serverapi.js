import axios from "axios";

// const baseURL = process.env.REACT_APP_API_ORIGIN + process.env.REACT_APP_API_DEFAULT_PREFIX
const baseURL = process.env.REACT_APP_API_ORIGIN
const serverapi = axios.create();

serverapi.defaults.baseURL = baseURL

export default serverapi;