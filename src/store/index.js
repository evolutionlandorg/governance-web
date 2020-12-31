import Vue from 'vue'
import Vuex from 'vuex'
import BigNumber from 'bignumber.js'
import { ZERO } from '@/helpers/bignumber';
import * as Mutation from './mutation-type';
import * as Methods from '@/helpers/constants';
import * as Config from './config';
import * as Api from '@/helpers/api';
import ApolloQuery from '@/helpers/apollo/queries';

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
  balanceOfStaking: ZERO,
  balanceOfLandOwner: ZERO,
  balanceOfApostleOwner: ZERO,
  
  tokenVoteRate: ZERO,
  landVoteRate: ZERO,
  apostleVoteRate: ZERO,

  earned: ZERO,
  reward: ZERO
}

const INITIAL_EVOLUTION_KTON = {
  balanceOf: ZERO,
  allowance: ZERO
}

// ----- proposal----- //
// {
//   "address": "0x7801Ec6e9CEbAD29490031aF8D85A8D2F4FF5ff4",
//   "msg": {
//     "version": "0.1.3",
//     "timestamp": "1607412528",
//     "space": "evolutionland",
//     "type": "proposal",
//     "payload": {
//       "end": 1607756400,
//       "body": "who is testing?",
//       "name": "Test poll",
//       "start": 1607410800,
//       "choices": ["Xiao", "Furqan"],
//       "metadata": {},
//       "snapshot": "9219405"
//     }
//   },
//   "sig": "0x3774305618f03440d943aa85a5551e1189991297514e7c70dd26818a42d2a7d6140e015bc5b7159d134cdaa33f92bf3f2ff4f39ece57cd95342c2a336df7d4341c",
//   "authorIpfsHash": "QmY4ZRjQLeG1FnVkh3qsGKXVmgWdHfSdpnDGPebZXAiKe7",
//   "relayerIpfsHash": "QmdLAsoVrC9wbFmvEXsVjYqwppXyw7dWRJWoazPrSuA5Ph"
// }

export default new Vuex.Store({
  state: {
    count: 2,
    web3Modal: { ...INITIAL_STATE },
    evolutionTeller: {
      ...INITIAL_EVOLUTION_TELLER
    },
    kton: {
      ...INITIAL_EVOLUTION_KTON
    },
    proposals: []
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
    _evolutionTeller_get_power: (state, getters) => {
      const {evolutionTeller} = state;

      return {
        totalPower: evolutionTeller.balanceOf,
        stakingPower: evolutionTeller.balanceOfStaking.times(evolutionTeller.tokenVoteRate),
        landPower: evolutionTeller.balanceOfLandOwner.times(evolutionTeller.landVoteRate),
        apostlePower: evolutionTeller.balanceOfApostleOwner.times(evolutionTeller.apostleVoteRate),
      }
    },
    _evolutionTeller_is_approve_kton:(state, getters) => {
      return state.kton.allowance.isGreaterThan(Config.KTON_EVOLUTIONTELLER_APPROVE_VALUE_THRESHOLD);
    },
    // ------------------------ Kton ------------------------ //
    _kton_get_value: (state, getters) => {
      return state.kton
    },
    // ---------------------- Proposal ---------------------- //
    _proposal_get_value: (state, getters) => {
      return state.proposals
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
        txQueue: [...payload.data, ...state.web3Modal.txQueue]
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

    // ---------------------- Proposal --------------------- //
    [Mutation.PROPOSAL_SET_VALUE](state, payload) {
      state.proposals = [
        ...payload.data
      ]
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
      const balanceOf = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF, payload.params);
      const balanceOfStaking = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF_STAKING, payload.params);
      const balanceOfApostleOwner = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF_APOSTLEOWNER, payload.params);
      const balanceOfLandOwner = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF_LANDOWNER, payload.params);
      const voteRates = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_VOTE_RATE, []);
      const dividends = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_DIVIDENDS, payload.params);

      commit({
        type: Mutation.EVOLUTIONTELLER_SET_VALUE,
        data: {
          balanceOf: new BigNumber(balanceOf.result),
          balanceOfLandOwner: new BigNumber(balanceOfLandOwner.result),
          balanceOfApostleOwner: new BigNumber(balanceOfApostleOwner.result),
          balanceOfStaking: new BigNumber(balanceOfStaking.result),
          
          tokenVoteRate: new BigNumber(voteRates.result[0]),
          landVoteRate: new BigNumber(voteRates.result[1]),
          apostleVoteRate: new BigNumber(voteRates.result[2]),

          earned: new BigNumber(dividends.result[0]),
          reward: new BigNumber(dividends.result[1]),
        }
      })
    },

    async _evolutionTeller_stake({ commit, dispatch, getters }, payload) {
      const result = await payload.$web3Modal.contractCall(
        Methods.EVO_TELLER_STAKE, 
        payload.params);

      // dispatch('_common_init_address_info', {
      //   $web3Modal: payload.$web3Modal,
      //   params: [getters._web3Modal_get_value.address]
      // })
    },

    async _evolutionTeller_withdraw({ commit, dispatch, getters }, payload) {
      const result = await payload.$web3Modal.contractCall(
        Methods.EVO_TELLER_WITHDRAW, 
        payload.params);

      // dispatch('_common_init_address_info', {
      //   $web3Modal: payload.$web3Modal,
      //   params: [getters._web3Modal_get_value.address]
      // })
    },

    async _evolutionTeller_getReward({ commit, dispatch, getters }, payload) {
      const result = await payload.$web3Modal.contractCall(
        Methods.EVO_TELLER_GET_REWARD, 
        payload.params);
    },

    // ------------------------ Kton ------------------------ //
    async _kton_fetch_info({ commit, getters }, payload) {

      const balanceOf = await payload.$web3Modal.contractCall(Methods.KTON_BALANCE_OF, payload.params);
      const allowance = await payload.$web3Modal.contractCall(Methods.KTON_ALLOWANCE, [payload.params[0], Methods.EVO_TELLER_CONTRACT[getters._web3Modal_get_value.chainId].address]);

      commit({
        type: Mutation.KTON_SET_VALUE,
        data: {
          balanceOf: new BigNumber(balanceOf.result),
          allowance: new BigNumber(allowance.result),
        }
      })
    },

    async _kton_approve_to_evolutionTeller({ commit, dispatch, getters }, payload) {
      const result = await payload.$web3Modal.contractCall(
        Methods.KTON_APPROVE, 
        [
          Methods.EVO_TELLER_CONTRACT[getters._web3Modal_get_value.chainId].address, 
          Config.KTON_EVOLUTIONTELLER_APPROVE_VALUE
        ]);
      
      dispatch('_kton_fetch_info', {
        $web3Modal: payload.$web3Modal,
        params: [getters._web3Modal_get_value.address]
      })
    },

    // ------------------------ Proposal ------------------------ //
    async _proposal_fetch_info({ commit, dispatch, getters }, payload) {
      const result = await Api.apiGetProposals();
      const proposals = Object.keys(result).map((item) => {
        return result[item];
      }) || [];

      commit({
        type: Mutation.PROPOSAL_SET_VALUE,
        data: proposals
      })
    },
    
    // ---------------------- Dividends --------------------- //
    async _dividends_fetch_history({ commit, dispatch, getters }, payload) {
      // ApolloQuery.
      const result = await Api.apiGetStakeHistory();
      const proposals = Object.keys(result).map((item) => {
        return result[item];
      }) || [];

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
