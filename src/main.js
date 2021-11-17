import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import VueMask from "v-mask";
import { faitLe } from "./registerServiceWorker";
import VueRouter from "vue-router";
import vco from "v-click-outside";
import NProgress from "vue-nprogress";
import router from "./router/index";
import Scrollspy from "vue2-scrollspy";
import VueSweetalert2 from "vue-sweetalert2";
import { auth } from "@/firebase/firebase";
import "@/design/index.scss";
import store from "@/state/store";
import App from "./App.vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import i18n from "./i18n";

const nprogress = new NProgress();
Vue.use(vco);
Vue.use(VueMask);
Vue.use(Vuelidate);
Vue.use(NProgress);
Vue.use(VueRouter);
Vue.use(Scrollspy);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueSweetalert2);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
Vue.config.productionTip = false;
const VueScrollTo = require("vue-scrollto");
extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: (fieldName, placeholders) => {
    return `Le champ ${fieldName} est obligatoire`;
  }
});
extend("isDifferent", {
  validate(value, { otherVal }) {
    // console.log("Les deux mots de passe doivent correspondrent: ", pass1);
    return value != otherVal;
  },
  params: ["otherVal"],
  message: (fieldName, placeholders) => {
    return `Le ${fieldName} doit etre different du nom`;
  }
});
let vm;
auth.onAuthStateChanged(user => {
  if (!vm) {
    if (user != null) {
      auth.currentUser
        .getIdTokenResult(true)
        .then(({ claims }) => {
          // console.log(`Les claims sont ${JSON.stringify(claims)}`);
          if (
            claims.userType != "admin" &&
            process.env.NODE_ENV == "production"
          ) {
            console.log("[Production] Need service worker");
            faitLe();
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
    vm = new Vue({
      store,
      router,
      i18n,
      nprogress,
      render: h => h(App)
    });
    vm.$mount("#app");
  }
});
