import NormalPage from "@/views/NormalPage";
import UserPage from "@/views/UserPage";
import AdminPage from "@/views/AdminPage";
 
export default [
  {
    exact: true,
    path: "/",
    component: NormalPage
  },
  {
    path: "/user-page",
    component: UserPage,
    authority: ["user", "admin"],
    redirectPath: "/login"
  },
  {
    path: "/admin-page",
    component: AdminPage,
    authority: ["admin"],
    redirectPath: "/403"
  }
];