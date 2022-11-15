import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:8000/api/token/",
        data: {
          username: e.target.username.value,
          password: e.target.password.value,
        },
      });
      let data = await response.data;
      console.log("data:", data);

      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
        alert("Something went wrong!");
      }
    }
    // let response = await fetch("http://localhost:8000/api/token/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   }),
    // });
    // let data = await response.data;
    // console.log("data:", data);

    // if (response.status === 200) {
    //   setAuthTokens(data);
    //   setUser(jwtDecode(data.access));
    //   localStorage.setItem("authTokens", JSON.stringify(data));
    //   navigate("/");
    // } else {
    //   console.log(response.status);
    //   alert("Something went wrong!");
    // }
  };

  let logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  // let updateToken = async () => {
  //   let response = await fetch("http://localhost:8000/api/token/refresh/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refresh: authTokens?.refresh }),
  //   });
  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setAuthTokens(data);
  //     setUser(jwtDecode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //     console.log("Token updated!");
  //   } else {
  //     logOutUser();
  //   }
  //   if (loading) {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    // if (loading) {
    //   updateToken();
    // }
    // let fourMinutes = 1000 * 60 * 4;
    // let interval = setInterval(() => {
    //   if (authTokens) {
    //     updateToken();
    //   }
    // }, fourMinutes);
    // return () => clearInterval(interval);

    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  let contextData = {
    user: user,
    loginUser: loginUser,
    logOutUser: logOutUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
