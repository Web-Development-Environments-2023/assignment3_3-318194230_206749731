// Import necessary modules and components
import Vue from "vue";

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true;
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Import routes and configure VueRouter
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
import { BButton, BModal } from 'bootstrap-vue';

export default {
  components: {
    'b-button': BButton,
    'b-modal': BModal
  },
  // Rest of the code
}

// Import and configure plugins
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { state } from "./store";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

// Configure Axios interceptors for request and response
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// Use VueAxios plugin with Vue and configure production tip
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

// Define shared data object
const shared_data = {
  ...state,
  username: localStorage.username,
  login(username) {
    // Method to login and store the username
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
    localStorage.setItem("lastSearch", JSON.stringify({}));
    this.lastSearch = {}
    localStorage.setItem("LastSeenRecipes", JSON.stringify({"recipes_id":[]}))
    this.watchedRecipes = {"recipes_id":[]}
  },
  logout() {
    // Method to logout and clear the username
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
    localStorage.removeItem("lastSearch");
    this.lastSearch ={}
    localStorage.removeItem("LastSeenRecipes")
    this.watchedRecipes = undefined

  },
};
console.log(shared_data);

// Create Vue instance
new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      // Method to display a toast notification
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
