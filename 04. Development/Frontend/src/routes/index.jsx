import BudgetPage from "../pages/budget";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notfound";
import ProfilePage from "../pages/profile";
import ResetPasswordPage from "../pages/resetPassword";
import SignupPage from "../pages/signup";
import TransactionPage from "../pages/transaction";
import StatisticPage from "../pages/statistic";
import AdminHomePage from "../admin/page/home";
import TrackingUserPage from "../admin/page/trackingUser";
import CustomerServicePage from "../admin/page/customerService";
import CustomerBehaviorAnalyticsPage from "../admin/page/customerBehaviorAnalytics";
import Category from "../admin/page/Category";

// Public routes
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/resetPassword", component: ResetPasswordPage },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/admin", component: AdminHomePage},
  { path: "/admin/customerService", component: CustomerServicePage},
  { path: "/admin/customerBehaviorAnalytics", component: CustomerBehaviorAnalyticsPage},
  { path: "/admin/trackingUser", component: TrackingUserPage},
  { path: "/admin/category", component: Category},
  { path: "*", component: NotFoundPage },
];

// Private routers
export const privateRoutes = [
  { path: "/transaction", component: TransactionPage },
  { path: "/budget", component: BudgetPage },
  { path: "/statistic", component: StatisticPage },
  { path: "/profile", component: ProfilePage },
];
