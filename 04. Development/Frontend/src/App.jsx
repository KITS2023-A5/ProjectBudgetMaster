import { Route, Routes } from "react-router-dom";
import ArrowToTop from "./helpers/ArrowToTop";
import ScrollToTop from "./helpers/ScrollToTop";
import { publicRoutes } from "./routes/index";

function App() {
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
