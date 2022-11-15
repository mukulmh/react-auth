import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://localhost:8000";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logOutUser } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const access = jwtDecode(authTokens.access);
    const refresh = jwtDecode(authTokens.refresh);
    const accExpired = dayjs.unix(access.exp).diff(dayjs()) < 1;
    const refExpired = dayjs.unix(refresh.exp).diff(dayjs()) < 1;
    console.log("accExpired: ", accExpired);
    console.log("refExpired: ", refExpired);
    if (!accExpired) {
      return req;
    }
    if (refExpired){
      logOutUser()
    }

    try {
      const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data?.access}`;
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
      }
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
