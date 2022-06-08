// import visitorLogView from './views/visitorLogView';
import StudentView from './views/StudentView';
import panel from './views/panel';
// import rentRecieptView from './views/rentRecieptView';
import supervisor from "./views/supervisor";
import alottmentView from "./views/alottmentView";
import group from"./views/group";
// import expense from "./views/expense";
import AllData from "./views/AllData";
import UserProfile from "./views/UserProfile";
import User from "./views/login";
import Annoucements from "./views/annoucements";
import Ideas from './views/ideas';
import GroupEvaluatios from "./views/Evaluation";
import SetWeightage from "./views/Set_Evaluation_weightage";

var routes = [
    {
        path: "/login",
        name: "Login",
        icon: "nc-icon nc-calendar-60",
        component: User,
        layout: "/admin",
        enabled: false,
    }, 
    {
        path: "/dashboard",
        name: "Roster",
        icon: "nc-icon nc-calendar-60",
        component: AllData,
        layout: "/admin",
        enabled: true,
    }, 
    {
        path: "/Student",
        name: "Student",
        icon: "nc-icon nc-single-02",
        component: StudentView,
        layout: "/admin",
        enabled: true,
    },
    // {
    //     path: "/record-expenses",
    //     name: "Record Expenses",
    //     icon: "nc-icon nc-box",
    //     component: expense,
    //     layout: "/admin",
    //     enabled: true,
    // },
    {
        path: "/panel",
        name: "Manage Panel",
        icon: "nc-icon nc-badge",
        component: panel,
        layout: "/admin",
        enabled: true,
    },
    {
      path: "/supervisor",
      name: "Manage Panelists",
      icon: "nc-icon nc-badge",
      component: supervisor,
      layout: "/admin",
      enabled: true,
  },
    // {
    //     path: "/collect-payment",
    //     name: "Collect Payment",
    //     icon: "nc-icon nc-credit-card",
    //     component: rentRecieptView,
    //     layout: "/admin",
    //     enabled: false,
    // },
    {
        path: "/alottment",
        name: "Alottment",
        icon: "nc-icon nc-single-02",
        component: alottmentView,
        layout: "/admin",
        enabled: true,
    },
    {
        path: "/group",
        name: "Manage Group",
        icon: "nc-icon nc-single-02",
        component: group,
        layout: "/admin",
        enabled: true,
    },
    // {
    //     path: "/visitor",
    //     name: "Visitor Log Book",
    //     icon: "nc-icon nc-spaceship",
    //     component: visitorLogView,
    //     layout: "/admin",
    //     enabled: false,
    // }, 
    {
        path: "/Student-profile/:id",
        name: "Manage Student Profile",
        icon: "nc-icon nc-single-02",
        component: UserProfile,
        layout: "/admin",
        enabled: false,
    },
    {
        path: "/EvaluateGroups",
        name: "Group Evaluation",
        icon: "nc-icon nc-paper",
        component: GroupEvaluatios,
        layout: "/admin",
        enabled: true,
    },
    {
        path: "/SetEvaluateWeightage",
        name: "Set Evaluation weightage",
        icon: "nc-icon nc-paper",
        component: SetWeightage,
        layout: "/admin",
        enabled: true,
    },
    {
        path: "/annoucements",
        name: "Annoucements",
        icon: "nc-icon nc-bell-55",
        component: Annoucements,
        layout: "/admin",
        enabled: true,
    },
    {
        path: "/ideas",
        name: "Ideas",
        icon: "nc-icon nc-bulb-63",
        component: Ideas,
        layout: "/admin",
        enabled: true,
    },
];
export default routes;