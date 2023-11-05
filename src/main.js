import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios'
app.config.globalProperties.axios = axios
axios.defaults.baseURL = 'http://10.16.1.100:80';


createApp(App).use(store).use(router).use(ElementPlus).mount('#app');
//# sourceMappingURL=main.js.map