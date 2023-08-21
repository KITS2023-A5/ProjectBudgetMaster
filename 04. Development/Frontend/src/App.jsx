import { Route, Routes } from "react-router-dom";
import ArrowToTop from "./helpers/ArrowToTop";
import ScrollToTop from "./helpers/ScrollToTop";
import { publicRoutes } from "./routes/index";
import axiosInstance, { setAccessToken, useAxios } from "./api/apiConfig";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   const accessToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJpZCI6IjY0ZGU0ZTJkNDU2ZDg0NDI5MGMxMmNiMyIsImlhdCI6MTY5MjI5MTE4NCwiZXhwIjoxNjkyODk1OTg0fQ.wGTqQOGl8YiQDtJXZWyItIyWtJWtz24EMeg2izTUmGw";
  //   setAccessToken(accessToken);

  //   axiosInstance
  //     .patch("/updateMyInfo")
  //     .then((response) => {
  //       console.log("Response:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  // function BudgetHooks() {
  //   useAxios();
  //   return null;
  // }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {publicRoutes.map((route) => {
          const Page = route.component;
          return (
            <Route key={route.path} path={route.path} element={<Page />} />
          );
        })}
      </Routes>
      <ArrowToTop />
    </>
  );
}

export default App;
