import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Edit from "./views/Edit.vue";
import None from "./views/None.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: Edit,
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/404',
      component: None
    }
  ]
});
