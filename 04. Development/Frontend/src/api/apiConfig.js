import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PubSub } from "pubsub-js";
// const baseURL = process.env.ENDPOINT_BASE_URL;

const baseURL = "http://127.0.0.1:3000/api/v1/users";

const axiosInstance = axios.create({ baseURL });

export const setAccessToken = (token) => {
  accessToken = token;
};

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
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
    console.log("res axios instance");
    // if (statusCode === 401) {
    PubSub.publish("FORCE_LOGIN");
    // }

    return err?.response;
  }
);

let accessToken = "";
export const useAxios = () => {
  const navigation = useNavigate();
  // const { data: session } = useSession();
  // cookie
  console.log("useAxios");

  useEffect(() => {
    const token = PubSub.subscribe("FORCE_LOGIN", () => {
      navigation("/login");
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  // useEffect(() => {
  //   // accessToken = session?.accessToken;
  // }, [session?.accessToken]);
};

export default axiosInstance;
