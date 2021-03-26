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
  43: {
    address: '0xE233a0E201219f792B878517e840903B8d62B9d3',
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
  43: {
    address: '0xfA91cA10745A80CcFD83Ad29Aa33Fdc5E8Ba582E',
    abi: Erc20ABI
  }
}
