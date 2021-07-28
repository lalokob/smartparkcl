import Vue from 'vue'
import axios from 'axios'

const apipark = axios.create({
    baseURL: 'http://192.168.10.12/smartparkapi/public',//prod
    // baseURL: 'http://192.168.10.15/smartparkapi/public',//dev
    timeout: 8000,
});

// para usar dentro de componentes
Vue.prototype.$apipark = apipark

// para usar dentro de archivos JS
export { apipark }