//index.js
import Web3ModalVue from './Web3Modal.vue';
export default {

  install(Vue, options) {
    console.log('web3Modal intall')

    const Web3Modal = Vue.extend(Web3ModalVue);
    const instance = new Web3Modal({
      el: document.createElement('div')
    });

    document.getElementById('app').appendChild(instance.$el);

    // if (options) {
    // }

    const web3ModalMethod = {
      init(...params) {
        instance.init(...params);
      },
      connect() {
        instance.onConnect();
      },
      disconnect() {
        instance.resetApp();
      },
      getWeb3() {
        return instance.getWeb3();
      },
      contractCall(functionSig, params = {}, options = {}) {
        return instance.contractCall(functionSig, params, options);
      }
    };

    Vue.prototype.$web3Modal = web3ModalMethod;

    Vue.component('WebModal', Web3ModalVue);
  }
}