import Vue from 'vue'
import axios from 'axios'

const apipark = axios.create({
    // baseURL: 'http://192.168.1.243/test/smartparkapi/public',//testing
    baseURL: 'http://192.168.1.177/smartparkapi/public',//prod
    // baseURL: 'http://192.168.1.86/smartpark/public',//dev
    timeout:2500,
});

// para usar dentro de componentes
Vue.prototype.$apipark = apipark

// para usar dentro de archivos JS
export { apipark }