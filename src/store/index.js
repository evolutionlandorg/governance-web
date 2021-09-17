import Vue from 'vue'
import Vuex from 'vuex'
import BigNumber from 'bignumber.js'
import VuexPersistence from 'vuex-persist'
import _ from 'lodash';
import { ZERO, greaterThan, toBigNumber } from '@/helpers/bignumber';
import * as Mutation from './mutation-type';
import * as Methods from '@/helpers/constants';
import * as Config from './config';
import * as Api from '@/helpers/api';
import * as GraphApi from '@/helpers/graphApi';

const vuexLocal = new VuexPersistence({
  key: 'evolution-land-gov',
  storage: window.localStorage
})

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
  txQueue: [],
};

const INITIAL_EVOLUTION_TELLER = {
  balanceOf: "0",
  balanceOfStaking: "0",
  balanceOfLandOwner: "0",
  balanceOfApostleOwner: "0",
  
  tokenVoteRate: "0",
  landVoteRate: "0",
  apostleVoteRate: "0",

  earned: "0",
  totalDividends: "0"
}

const INITIAL_EVOLUTION_KTON = {
  balanceOf: "0",
  allowance: "0"
}

const INITIAL_STAKED_HISTORY = {
  Locked: [],
  Unlocked: [],
  Dividend: []
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
  plugins: [vuexLocal.plugin],
  state: {
    count: 2,
    web3Modal: { ...INITIAL_STATE },
    evolutionTeller: {
      ...INITIAL_EVOLUTION_TELLER
    },
    kton: {
      ...INITIAL_EVOLUTION_KTON
    },
    proposals: [],
    stakedHistory: INITIAL_STAKED_HISTORY,
    language: ""
  },
  getters: {

    // ---------------------- Web3Modal --------------------- //
    _web3Modal_get_value: (state, getters) => {
      return state.web3Modal
    },
    _web3Modal_get_tx_queue: (state, getters) => {
      return [...state.web3Modal.txQueue]
    },
    // ------------------ Evolution Teller ------------------ //
    _evolutionTeller_get_value: (state, getters) => {
      return state.evolutionTeller
    },
    _evolutionTeller_get_power: (state, getters) => {
      const {evolutionTeller} = state;

      return {
        totalPower: evolutionTeller.balanceOf,
        stakingPower: toBigNumber(evolutionTeller.balanceOfStaking).times(evolutionTeller.tokenVoteRate),
        landPower: toBigNumber(evolutionTeller.balanceOfLandOwner).times(evolutionTeller.landVoteRate),
        apostlePower: toBigNumber(evolutionTeller.balanceOfApostleOwner).times(evolutionTeller.apostleVoteRate),
      }
    },
    _evolutionTeller_is_approve_kton:(state, getters) => {
      return greaterThan(state.kton.allowance, Config.KTON_EVOLUTIONTELLER_APPROVE_VALUE_THRESHOLD);
    },
    _evolutionTeller_staked_history:(state, getters) => {
      return state.stakedHistory;
    },
    // ------------------------ Kton ------------------------ //
    _kton_get_value: (state, getters) => {
      return state.kton
    },
    // ---------------------- Proposal ---------------------- //
    _proposal_get_value: (state, getters) => {
      return state.proposals
    },

    // ----------------------- Common ----------------------- //
    _i18n_get_value: (state, getters) => {
      return state.language
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
      },
      state.stakedHistory = {
        ...INITIAL_STAKED_HISTORY
      },
      state.evolutionTeller = {
        ...INITIAL_EVOLUTION_TELLER
      },
      state.kton = {
        ...INITIAL_EVOLUTION_KTON
      }
    },
    [Mutation.WEB3MODAL_BEFORE_TXQUEUE](state, payload) {
      state.web3Modal = {
        ...state.web3Modal,
        txQueue: [...payload.data, ...state.web3Modal.txQueue]
      }
    },
    [Mutation.WEB3MODAL_CLEAR_TXQUEUE](state, payload) {
      state.web3Modal = {
        ...state.web3Modal,
        txQueue: []
      }
    },
    [Mutation.WEB3MODAL_SET_STATUS_BY_HASH](state, payload) {

      const _index = _.findIndex(state.web3Modal.txQueue, {result: payload.data.hash});

      if(_index != -1) {
        const newTxQueue = [...state.web3Modal.txQueue];

        newTxQueue[_index].status = payload.data.status;
        state.web3Modal = {
          ...state.web3Modal,
          txQueue: newTxQueue
        }
      }
    },

    // ------------------ Evolution Teller ------------------ //
    [Mutation.EVOLUTIONTELLER_SET_VALUE](state, payload) {
      state.evolutionTeller = {
        ...state.evolutionTeller,
        ...payload.data
      }
    },
    [Mutation.EVOLUTIONTELLER_HISTORY_SET_VALUE](state, payload) {
      state.stakedHistory = {
        ...state.stakedHistory,
        [payload.data.type]: [...payload.data.value]
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
    },

    // ----------------------- Common ----------------------- //
    [Mutation.I18N_SET_LANGUAGE](state, payload) {
      state.language = payload.data
    },
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
    _web3Modal_clear_txqueue({ commit }, payload) {
      commit({
        type: Mutation.WEB3MODAL_CLEAR_TXQUEUE,
        data: []
      })
    },
    _web3Modal_set_tx_queue_status({ commit }, payload) {
      this.commit({
        type: Mutation.WEB3MODAL_SET_STATUS_BY_HASH,
        data: {
          hash: payload.hash,
          status: payload.status
        }
      })
    },

    // ------------------ Evolution Teller ------------------ //
    async _evolutionTeller_fetch_info({ commit }, payload) {
      if(!payload.$web3Modal.isConnected()) {
        return;
      }

      const balanceOf = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF, payload.params);
      const balanceOfStaking = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF_STAKING, payload.params);
      const balanceOfApostleOwner = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF_APOSTLEOWNER, payload.params);
      const balanceOfLandOwner = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_BALANCE_OF_LANDOWNER, payload.params);
      const voteRates = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_VOTE_RATE, []);
      const dividends = await payload.$web3Modal.contractCall(Methods.EVO_TELLER_DIVIDENDS, payload.params);
      const totalDividendsData = await GraphApi.apiGetTotalDividends(payload.landId, payload.params[0]);

      let totalDividends = '0';
      
      if(totalDividendsData && totalDividendsData.data && totalDividendsData.data.stakedRewards && totalDividendsData.data.stakedRewards.length > 0) {
        totalDividends = totalDividendsData.data.stakedRewards[0].amount
      }

      commit({
        type: Mutation.EVOLUTIONTELLER_SET_VALUE,
        data: {
          balanceOf: balanceOf.result,
          balanceOfLandOwner: balanceOfLandOwner.result,
          balanceOfApostleOwner: balanceOfApostleOwner.result,
          balanceOfStaking: balanceOfStaking.result,
          
          tokenVoteRate: voteRates.result[0],
          landVoteRate: voteRates.result[1],
          apostleVoteRate: voteRates.result[2],

          earned: dividends.result[0],
          totalDividends: totalDividends || '0',
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
      return result;
    },

    async _evolutionTeller_withdraw({ commit, dispatch, getters }, payload) {
      const result = await payload.$web3Modal.contractCall(
        Methods.EVO_TELLER_WITHDRAW, 
        payload.params);
      return result;
    },

    async _evolutionTeller_getReward({ commit, dispatch, getters }, payload) {
      const result = await payload.$web3Modal.contractCall(
        Methods.EVO_TELLER_GET_REWARD, 
        []);
    },

    // ------------------------ Kton ------------------------ //
    async _kton_fetch_info({ commit, getters }, payload) {
      if(!payload.$web3Modal.isConnected()) {
        return;
      }
      
      const balanceOf = await payload.$web3Modal.contractCall(Methods.KTON_BALANCE_OF, payload.params);
      const allowance = await payload.$web3Modal.contractCall(Methods.KTON_ALLOWANCE, [payload.params[0], Methods.EVO_TELLER_CONTRACT[getters._web3Modal_get_value.chainId].address]);

      commit({
        type: Mutation.KTON_SET_VALUE,
        data: {
          balanceOf: balanceOf.result,
          allowance: allowance.result,
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
      });
      
      return result;
    },

    // ------------------------ Proposal ------------------------ //
    async _proposal_fetch_info({ commit, dispatch, getters }, payload = '1') {
      const result = await Api.apiGetProposals(payload);
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
      
      // ApolloQuery
      if(!payload[1]){
        return null;
      }

      const result = await GraphApi.apiGetStakeHistory(...payload);

      commit({
        type: Mutation.EVOLUTIONTELLER_HISTORY_SET_VALUE,
        data:{
          type: payload[2] || 'Locked',
          value: result.data.stakedHistories
        }
      })
    },

    // async _dividends_fetch_total_dividends({ commit, dispatch, getters }, payload) {
    //   // ApolloQuery
    //   if(!payload[0]){
    //     return null;
    //   }

    //   const result = await GraphApi.apiGetTotalDividends(...payload);

    //   commit({
    //     type: Mutation.EVOLUTIONTELLER_HISTORY_SET_VALUE,
    //     data:{
    //       type: payload[1] || 'Locked',
    //       value: result.data.stakedHistories
    //     }
    //   })
    // },

    // ----------------------- Common ----------------------- //
    async _common_init_address_info({ commit, dispatch }, payload) {
      dispatch('_evolutionTeller_fetch_info', payload);
      dispatch('_kton_fetch_info', payload);
    },
    _i18n_set_language({ commit, dispatch }, payload) {
      commit({
        type: Mutation.I18N_SET_LANGUAGE,
        data: payload
      })
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
