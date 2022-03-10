import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

// loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// 驗證
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules' // https://vee-validate.logaretm.com/v4/guide/global-validators#vee-validaterules
import { localize, setLocale } from '@vee-validate/i18n' // https://vee-validate.logaretm.com/v4/guide/i18n#using-vee-validatei18n
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import App from './App.vue'
import router from './router'

const app = createApp(App)

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
// 設定預設語系
setLocale('zh_TW')

app.use(router)
app.use(VueAxios, axios)
app.component('VLoading', Loading)
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
