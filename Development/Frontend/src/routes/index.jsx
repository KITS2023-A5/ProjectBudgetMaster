import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notfound";
import ProfilePage from "../pages/profile";
import ResetPasswordPage from "../pages/resetPassword";
import SignupPage from "../pages/signup";

// Public routers
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/resetPassword", component: ResetPasswordPage },
  { path: "*", component: NotFoundPage },
];

// Private routes
export const privateRoutes = [{ path: "/profile", component: ProfilePage }];
