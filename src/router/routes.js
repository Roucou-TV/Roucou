import store from "@/state/store";

export default [
  {
    path: "/",
    alias: "/categorys",
    name: "category",
    meta: {
      authRequired: false // a changer en cas de mise en production
    },
    component: () => import("./views/categorys/index")
  },
  {
    path: "/colors",
    name: "colors",
    meta: {
      authRequired: false // a changer en cas de mise en production
    },
    component: () => import("./views/colors/index")
  },

  {
    path: "/channels",
    name: "channels",
    meta: {
      authRequired: false // a changer en cas de mise en production
    },
    component: () => import("./views/channels/index")
  },
  {
    path: "/test",
    name: "test",
    meta: {
      authRequired: false // a changer en cas de mise en production
    },
    component: () => import("./views/test")
  },
  {
    path: "/users",
    name: "users",
    meta: {
      authRequired: false // a changer en cas de mise en production
    },
    component: () => import("./views/users/index")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/account/login"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      }
    }
  }
];
