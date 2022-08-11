import Vue from "vue"
import VueRouter from "vue-router"
// import Home from "../views/Home.vue"
// const Home = () => import('../views/Home.vue')

Vue.use(VueRouter)

const routes = [
  // {
  //   path: "/",
  //   redirect: "/about",
  // },
  {
    path: "/about",
    name: "about",
    component: () => import("./../views/about.vue"),
  },
  {
    path: "/CalculationEngine",
    name: "CalculationEngine",
    component: () => import("./../views/CalculationEngine.vue"),
  },
  {
    path: "/example",
    name: "example",
    component: () => import("./../views/Example.vue"),
  },
  {
    path: "/example1",
    name: "example1",
    component: () => import("./../views/Example1.vue"),
  },
  {
    path: "/example2",
    name: "example2",
    component: () => import("./../views/Example2.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
