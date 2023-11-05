import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'animate.css'

const app = createApp(App)
app.config.globalProperties.axios = axios
app.use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
// axios.defaults.baseURL = 'http://10.18.252.45:80'
axios.defaults.baseURL = 'http://localhost:80';
