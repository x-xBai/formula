import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import myDirectives from "./directives/index"
Vue.use(myDirectives)

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

// import vConsole from 'vconsole'
// new vConsole()
Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
