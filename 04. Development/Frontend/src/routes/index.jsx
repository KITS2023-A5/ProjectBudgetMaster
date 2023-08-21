import BudgetPage from "../pages/budget";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notfound";
import ProfilePage from "../pages/profile";
import ResetPasswordPage from "../pages/resetPassword";
import SignupPage from "../pages/signup";
import TransactionPage from "../pages/transaction";
import StatisticPage from "../pages/statistic";

// Public routers
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/resetPassword", component: ResetPasswordPage },
  { path: "/transaction", component: TransactionPage },
  { path: "/budget", component: BudgetPage },
  { path: "/statistic", component: StatisticPage },
  { path: "/profile", component: ProfilePage },
  { path: "*", component: NotFoundPage },
];

// Private routes
// export const privateRoutes = [{ path: "/profile", component: ProfilePage }];
