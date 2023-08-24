import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PubSub } from "pubsub-js";
import Cookies from "js-cookie";

// import dotenv from "dotenv";
// dotenv.config();

// const ENDPOINT = process.env.APP_ENDPOINT;
// const PREFIX = process.env.APP_PREFIX;
// const ENDPOINT = import.meta.env.VITE_APP_ENDPOINT;
// const PREFIX = import.meta.env.VITE_APP_PREFIX;
// console.log(ENDPOINT);

// const baseURL = "http://45.117.179.168:8080/api";
const baseURL = "http://localhost:8080/api";
// const baseURL = `${ENDPOINT}/${PREFIX}`;

const axiosInstance = axios.create({ baseURL });
// axiosInstance.defaults.withCredentials = true;

// axiosInstance.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const statusCode = err?.response?.status;
    if (statusCode !== 200) {
      // console.log("FORCE_LOGIN");
      PubSub.publish("FORCE_LOGIN");
    }
    return err?.response;
  }
);

let accessToken = "";
export const useAxios = () => {
  const navigation = useNavigate();
  useEffect(() => {
    const token = PubSub.subscribe("FORCE_LOGIN", () => {
      navigation("/login");
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  let token = Cookies.get("token");

  useEffect(() => {
    accessToken = Cookies.get("token");
  }, [token]);
};

export default axiosInstance;
