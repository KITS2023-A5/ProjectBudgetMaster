import { Navigate, Route, Routes } from "react-router-dom";
import ArrowToTop from "./helpers/ArrowToTop";
import ScrollToTop from "./helpers/ScrollToTop";
import { privateRoutes, publicRoutes } from "./routes/index";
import axiosInstance, { useAxios } from "./api/apiConfig";
import { useEffect } from "react";
import { notification } from "antd";
import { requestGetUserFromToken } from "./redux/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/loading";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isLoading = useSelector((state) => state.auth.loadingCheckLogin);

  useEffect(() => {
    checkLogin();
  }, []);

  function BudgetHooks() {
    useAxios();
    return null;
  }

  const checkLogin = async () => {
    try {
      // console.log("checkLogin");
      const result = await dispatch(requestGetUserFromToken());
      unwrapResult(result);
    } catch (error) {
      notification.error({
        message: "Server error",
      });
    }
  };

  return (
    <>
      <BudgetHooks />
      <ScrollToTop />
      <Routes>
        {publicRoutes.map((route) => {
          const Page = route.component;
          return isLoading ? (
            <Route key={route.path} path={route.path} element={<Loading />} />
          ) : (
            <Route key={route.path} path={route.path} element={<Page />} />
          );
        })}

        {privateRoutes.map((route) => {
          const Page = route.component;

          return isLoading ? (
            <Route key={route.path} path={route.path} element={<Loading />} />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={userInfo ? <Page /> : <Navigate to={"/login"} />}
            />
          );
        })}
      </Routes>
      <ArrowToTop />
    </>
  );
}

export default App;
