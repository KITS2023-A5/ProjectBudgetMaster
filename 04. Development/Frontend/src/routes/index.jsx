import BudgetPage from "../pages/budget";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notfound";
import ProfilePage from "../pages/profile";
import ResetPasswordPage from "../pages/resetPassword";
import SignupPage from "../pages/signup";
import TransactionPage from "../pages/transaction";
import StatisticPage from "../pages/statistic";

// Public routes
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/resetPassword", component: ResetPasswordPage },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "*", component: NotFoundPage },
];

// Private routers
export const privateRoutes = [
  { path: "/transaction", component: TransactionPage },
  { path: "/budget", component: BudgetPage },
  { path: "/statistic", component: StatisticPage },
  { path: "/profile", component: ProfilePage },
];
