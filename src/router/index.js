import Vue from "vue";
import Router from "vue-router";
import Hello from "../components/Hello";
import Category from "../components/Category";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello
    },
    {
      path: "/Category",
      name: "Category",
      component: Category
    }
  ]
});
