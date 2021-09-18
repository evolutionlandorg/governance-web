import Erc20ABI from '@/helpers/abi/erc20.json';
import TellerABI from '@/helpers/abi/teller.json';

export const EVO_TELLER_CONTRACT = {
  1: {
    address: '0x67e79e2603c1e2dd6576acd2899677ed9918c0cc',
    abi: TellerABI
  },
  3: {
    address: '0x38EF245FABf02e412a0DD8833fE15D0b0B50d2F0',
    abi: TellerABI
  },
  137: {
    address: '0x58Ab1d54f43f26803aac72003B1148D0c0616097',
    abi: TellerABI
  },
  80001: {
    address: '0xCB41aA8585A1D9bC1E824478BA3594e34C5008e3',
    abi: TellerABI
  }
}

export const KTON_CONTRACT = {
  1: {
    address: '0x9f284e1337a815fe77d2ff4ae46544645b20c5ff',
    abi: Erc20ABI
  },
  3: {
    address: '0x1994100c58753793D52c6f457f189aa3ce9cEe94',
    abi: Erc20ABI
  },
  137: {
    address: '0xE21b9bDA4ECeF9e4652BC5C6863F731C2151Ef28',
    abi: Erc20ABI
  },
  80001: {
    address: '0xED1d1d219f85Bc634f250db5e77E0330Cddc9b2a',
    abi: Erc20ABI
  }
}