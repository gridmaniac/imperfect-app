import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  computed: {
    isDark () {
      return (this.$vuetify.theme.dark)
        ? 'dark'
        : 'light'
    }
  }
}).$mount('#app')
