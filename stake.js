var detectEthereumProvider = require('@metamask/detect-provider');
var Eth = require('ethjs-query');
var EthContract = require('ethjs-contract');
var ktonContract;
var tellerContract;
startApp();

async function startApp() {
  const provider = await detectEthereumProvider();
  if (!provider) {
    alert('No currentProvider for web3');
    return;
  }
  eth = new Eth(provider);
  contract = new EthContract(eth);
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reward',
          type: 'uint256',
        },
      ],
      name: 'RewardAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reward',
          type: 'uint256',
        },
      ],
      name: 'RewardPaid',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Staked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Withdrawn',
      type: 'event',
    },
    {
      inputs: [],
      name: 'CONTRACT_INTERSTELLAR_ENCODER',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'CONTRACT_OBJECT_OWNERSHIP',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'DURATION',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
      name: 'addRewardDistribution',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'apostleVoteRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'balanceOfApostleOwner',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'balanceOfLandOwner',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'balanceOfStaking',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
      name: 'checkRewardAvailable',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'earned',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'getReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_registry', type: 'address' },
        { internalType: 'address', name: '_voter', type: 'address' },
        { internalType: 'address', name: '_reward', type: 'address' },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'landVoteRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'lastUpdateTime',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'lock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'periodEnd',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'registry',
      outputs: [
        {
          internalType: 'contract ISettingsRegistry',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
      name: 'removeRewardDistribution',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'rewardAmount',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'rewardDistributions',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'rewardPerToken',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'rewardPerTokenStored',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'rewardRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'rewards',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'contract IERC20', name: '_token', type: 'address' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' },
      ],
      name: 'seize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_apostleVoteRate', type: 'uint256' },
      ],
      name: 'setApostleVoteRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_landVoteRate', type: 'uint256' },
      ],
      name: 'setLandVoteRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_lock', type: 'uint256' }],
      name: 'setLock',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: '_tokenVoteRate', type: 'uint256' },
      ],
      name: 'setTokenVoteRate',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'stake',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'stakingLock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'token',
      outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'tokenVoteRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'userRewardPerTokenPaid',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'vote',
      outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [],
      name: 'withdrawWithReward',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];
  const addresss = '0x38EF245FABf02e412a0DD8833fE15D0b0B50d2F0';
  const Teller = contract(abi);
  tellerContract = Teller.at(addresss);

  const erc20abi = [
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' },
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  const ktonaddr = '0x1994100c58753793D52c6f457f189aa3ce9cEe94';
  const Kton = contract(erc20abi);
  ktonContract = Kton.at(ktonaddr);
}

function listenForClicks(teller) {
}

window.Approve = function() {
  ktonContract.approve(
    '0x38EF245FABf02e412a0DD8833fE15D0b0B50d2F0',
    '0x52b7d2dcc80cd400000000',
    { from: web3.eth.coinbase },
    function(error, result) {
      if (error) {
        console.log(error);
        return;
      }
      // will return txHash as result
      console.log(result);
    }
  );
};

window.UpdateInfo = async function() {
  var lockButtons = '<button class="btn btn-primary" id="lock" onClick="Lock()">Lock</button>'
        + '<button class="btn btn-primary" id="Unlock" onClick="Approve()">Unlock</button>';

  tellerContract.balanceOfStaking(web3.eth.coinbase).then(function(result) {
    el('#user').innerHTML = web3.eth.coinbase;
    el('#kton-power').innerHTML = (result[0] / 1e18).toFixed(2) * 10;
  });
  tellerContract.balanceOfLandOwner(web3.eth.coinbase).then(function(result) {
    console.log('balanceOfLandOwner', result[0]);
    el('#land-power').innerHTML = (result[0]) * 100;
  });
  tellerContract.balanceOfApostleOwner(web3.eth.coinbase).then(function(result) {
    console.log('balanceOfApostleOwner', result[0]);
    el('#apostle-power').innerHTML = (result[0]) * 1;
  });
  tellerContract.balanceOf(web3.eth.coinbase).then(function(result) {
    console.log('xxxxxxxx', result[0]);
    el('#total-power').innerHTML = (result[0] / 1e18).toFixed(2);
  });
  ktonContract.allowance(
    web3.eth.coinbase,
    '0x38EF245FABf02e412a0DD8833fE15D0b0B50d2F0',
  ).then(function(result) {
    if (result[0] > 0) {
      console.log('has been approved');
      el('#lowerhalf').innerHTML = lockButtons;
    } else {
      console.log('not been approved');
    }
  });
};


// http://107.167.191.203:8880/api/evolutionland/proposals
window.ProposalList = async function() {
  var proposalli = function(title, end) {
    return '<li> <div class="proposal"> <p style="display: block;margin-bottom:0px;margin-top:10px;font-size: 20px;">'
          + title + '</p>' + 'Time: <p>' + end + '</p> <button class="btn btn-primar">Vote</button> </div> </li>';
  };
  const url = 'http://107.167.191.203:8880/api/evolutionland/proposals';
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);
  var proposals = xmlHttp.responseText;
  proposals = JSON.parse(proposals);
  for (var key in proposals) {
    var proposal = proposals[key].msg.payload;
    console.log(proposal.name);
    console.log(proposal.start);
    console.log(proposal.end);
    // var start = new Date(proposal.start * 1000).toJSON().replace('T', ' ').substring(0, 19);
    var end = new Date(proposal.end * 1000).toJSON().replace('T', ' ').substring(0, 19);
    el('#proposallist').innerHTML += proposalli(proposal.name, end);
  }
};

