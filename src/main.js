import { createApp } from 'vue'
import store from '@/store/store.js'
import App from '@/App.vue'
import vuetify from './plugins/vuetify'
import router from '@/router/router.js'
import components from "@/components/index.js"
const app = createApp(App)
components.forEach(component => {
  app.component(component.name, component)
});

app
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
