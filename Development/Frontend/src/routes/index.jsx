import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notfound";
import ProfilePage from "../pages/profile";

// Public routers
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "*", component: NotFoundPage },
];

// Private routes
export const privateRoutes = [{ path: "/profile", component: ProfilePage }];
