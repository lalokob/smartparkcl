import Vue from 'vue'
import axios from 'axios'

const apipark = axios.create({
    baseURL: 'http://192.168.1.86/smartparkapi/public',//prod
    // baseURL: 'http://192.168.1.250/smartparkapi/public',//dev
    timeout:20000,
});

// para usar dentro de componentes
Vue.prototype.$apipark = apipark

// para usar dentro de archivos JS
export { apipark }