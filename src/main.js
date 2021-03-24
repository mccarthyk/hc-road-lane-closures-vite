import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.errorHandler = errorHandler
app.config.performance = true

// if (import.meta.env.DEV)
app.mount('#app')

function errorHandler(err, vm, info) {
  if (import.meta.env.PROD) return // send to sentry?
  console.error(err)
  console.warn(vm)
  console.warn(info)
}

export default app
