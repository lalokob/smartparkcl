import Vue from 'vue'
import axios from 'axios'

const apipark = axios.create({
    // baseURL: 'http://189.236.136.117:2244/public/',
    baseURL: 'http://192.168.1.72/smartpark/public',
    timeout:2500,
});

// para usar dentro de componentes
Vue.prototype.$apipark = apipark

// para usar dentro de archivos JS
export { apipark }