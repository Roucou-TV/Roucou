import store from "@/state/store";

export default [
  {
    path: "/",
    name: "default",
    meta: {
      authRequired: false // a changer en cas de mise en production
    },
    component: () => import("./views/home/index")
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
