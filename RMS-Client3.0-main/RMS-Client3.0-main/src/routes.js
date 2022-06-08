
import StudentView from './views/main-pages/StudentView';
import UserProfile from "./views/main-pages/UserProfile";
import Annoucement from "./views/main-pages/annoucement";
import Ideas from "./views/main-pages/ideas";
import Memes from "./views/main-pages/memes-gallery";
//Auth
import Login from "views/pages/Login.js";

const routes = [
  {
    path: "/register",
    name: "Register",
    icon: "nc-icon nc-single-02",
    component: StudentView,
    layout: "/client",
    enabled: false,
},

{
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-calendar-60",
    component: UserProfile,
    layout: "/client",
    enabled: true,
},
{
    path: "/Annocement",
    name: "View Annocements",
    icon: "nc-icon nc-atom",
    component: Annoucement,
    layout: "/client",
    enabled: true,
},
{
  path: "/ideas",
  name: "View Ideas",
  icon: "nc-icon nc-bulb-63",
  component: Ideas,
  layout: "/client",
  enabled: true,
},
{
  path: "/login",
  name: "Login",
  icon: "nc-icon nc-atom",
  component: Login,
  layout: "/auth",
  enabled: false,
},
{
  path: "/memes-gallery",
  name: "Hostel Gallery",
  icon: "nc-icon nc-album-2",
  component: Memes,
  layout: "/client",
  enabled: false,
},
];

export default routes;
