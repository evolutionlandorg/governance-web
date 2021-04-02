//index.js
import Web3ModalVue from './Web3Modal.vue';
import VueI18n from 'vue-i18n';

let _i18n = null

export function RewriteLocale (i18n) {
  _i18n = i18n
}

export default {

  install(Vue, options) {
    Vue.prototype._i18n = options.i18n
    console.log('web3Modal intall')

    const Web3Modal = Vue.extend(Web3ModalVue);
    const instance = new Web3Modal({
      el: document.createElement('div'),
    });

    document.body.appendChild(instance.$el)


    // if (options) {
    // }

    const web3ModalMethod = {
      init(...params) {
        instance.init(...params);
      },
      async connect() {
        await instance.onConnect();
      },
      async disconnect() {
        await instance.resetApp();
      },
      getWeb3() {
        return instance.getWeb3Modal();
      },
      contractCall(functionSig, params = {}, options = {}) {
        return instance.contractCall(functionSig, params, options);
      },
      isConnected() {
        const web3 = instance.getWeb3Modal();
        
        if(web3 && web3.web3) {
          return true;
        }

        return false;
      }
    };

    Vue.prototype.$web3Modal = web3ModalMethod;

    Vue.component('WebModal', Web3ModalVue);
  }
}