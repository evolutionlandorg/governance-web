import Vue from 'vue'
import Vuex from 'vuex'
import BigNumber from 'bignumber.js'
import { ZERO } from '@/helpers/bignumber';
import * as Mutation from './mutation-type';
import * as Methods from '@/helpers/constants';

Vue.use(Vuex)

const INITIAL_STATE = {
  fetching: false,
  address: "",
  connected: false,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null,
  txQueue: []
};

const INITIAL_EVOLUTION_TELLER = {
  balanceOf: ZERO,
  balanceOfLandOwner: ZERO,
  balanceOfApostleOwner: ZERO,
  balanceOfStaking: ZERO,
}

const INITIAL_EVOLUTION_KTON = {
  balanceOf: ZERO,
  allowance: ZERO
}

export default new Vuex.Store({
  state: {
    count: 2,
    web3Modal: { ...INITIAL_STATE },
    evolutionTeller: {
      ...INITIAL_EVOLUTION_TELLER
    },
    kton: {
      ...INITIAL_EVOLUTION_KTON
    }
  },
  getters: {

    // ---------------------- Web3Modal --------------------- //
    _web3Modal_get_value: (state, getters) => {
      return state.web3Modal
    },
    // ------------------ Evolution Teller ------------------ //
    _evolutionTeller_get_value: (state, getters) => {
      return state.evolutionTeller
    },
    // ------------------------ Kton ------------------------ //
    _kton_get_value: (state, getters) => {
      return state.kton
    }
  },
  mutations: {
    // ---------------------- mutations --------------------- //
    // ---------------------- Web3Modal --------------------- //
    [Mutation.WEB3MODAL_SET_VALUE](state, payload) {
      state.web3Modal = {
        ...state.web3Modal,
        ...payload.data
      }
    },
    [Mutation.WEB3MODAL_RESET_VALUE](state, payload) {
      state.web3Modal = {
        ...INITIAL_STATE
      }
    },
    [Mutation.WEB3MODAL_BEFORE_TXQUEUE](state, payload) {
      state.web3Modal = {
        ...state.web3Modal,
        txQueue: [...payload.data, ...state.txQueue]
      }
    },


    // ------------------ Evolution Teller ------------------ //
    [Mutation.EVOLUTIONTELLER_SET_VALUE](state, payload) {
      state.evolutionTeller = {
        ...state.evolutionTeller,
        ...payload.data
      }
    },


    // ------------------------ Kton ------------------------ //
    [Mutation.KTON_SET_VALUE](state, payload) {
      state.kton = {
        ...state.kton,
        ...payload.data
      }
    },


    // ------------------------ Test ------------------------ //
    [Mutation.TEST_SET_VALUE](state, payload) {
      state.count = payload.data
    }

  },
  actions: {
    // ---------------------- Web3Modal --------------------- //
    _web3Modal_set_value({ commit }, payload) {
      commit({
        type: Mutation.WEB3MODAL_SET_VALUE,
        data: payload
      })
    },
    _web3Modal_reset_value({ commit }, payload) {
      commit({
        type: Mutation.WEB3MODAL_RESET_VALUE,
      })
    },
    _web3Modal_before_txqueue({ commit }, payload) {
      commit({
        type: Mutation.WEB3MODAL_BEFORE_TXQUEUE,
        data: payload
      })
    },

    // ------------------ Evolution Teller ------------------ //
    async _evolutionTeller_fetch_info({ commit }, payload) {

      const balanceOf = await payload.$web3Modal.contractCall(Methods.EVO_TELLTER_BALANCE_OF, [payload.params]);
      const balanceOfStaking = await payload.$web3Modal.contractCall(Methods.EVO_TELLTER_BALANCE_OF_STAKING, [payload.params]);
      const balanceOfApostleOwner = await payload.$web3Modal.contractCall(Methods.EVO_TELLTER_BALANCE_OF_APOSTLEOWNER, [payload.params]);
      const balanceOfLandOwner = await payload.$web3Modal.contractCall(Methods.EVO_TELLTER_BALANCE_OF_LANDOWNER, [payload.params]);

      commit({
        type: Mutation.EVOLUTIONTELLER_SET_VALUE,
        data: {
          balanceOf: new BigNumber(balanceOf.result),
          balanceOfLandOwner: new BigNumber(balanceOfStaking.result),
          balanceOfApostleOwner: new BigNumber(balanceOfApostleOwner.result),
          balanceOfStaking: new BigNumber(balanceOfLandOwner.result)
        }
      })
    },

    // ------------------------ Kton ------------------------ //
    async _kton_fetch_info({ commit, getters }, payload) {

      const balanceOf = await payload.$web3Modal.contractCall(Methods.KTON_BALANCE_OF, [payload.params]);
      const allowance = await payload.$web3Modal.contractCall(Methods.KTON_ALLOWANCE, [payload.params, Methods.EVO_TELLER_CONTRACT[getters._web3Modal_get_value.chainId].address]);

      commit({
        type: Mutation.KTON_SET_VALUE,
        data: {
          balanceOf: new BigNumber(balanceOf.result),
          allowance: new BigNumber(allowance.result),
        }
      })
    },

    // ----------------------- Common ----------------------- //
    async _common_init_address_info({ commit, dispatch }, payload) {
      dispatch('_evolutionTeller_fetch_info', payload);
      dispatch('_kton_fetch_info', payload);
    },

    // ------------------------ Test ------------------------ //
    _test_set_value({ commit }, payload) {
      commit({
        type: Mutation.TEST_SET_VALUE,
        data: payload
      })
    }
  },
  modules: {
  }
})
