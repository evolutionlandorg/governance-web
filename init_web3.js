var Eth = require('ethjs-query');
var EthContract = require('ethjs-contract');
if (typeof web3 !== 'undefined') {
  eth = new Eth(web3.currentProvider);
  contract = new EthContract(eth);
  startApp();
} else {
  alert('No currentProvider for web3');
}

function startApp() {
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
  const teller = Teller.at(addresss);
  listenForClicks(teller);

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
  ];
  const ktonaddr = '0x1994100c58753793D52c6f457f189aa3ce9cEe94';
  const Kton = contract(erc20abi);
  const kton = Kton.at(ktonaddr);
  listenForApprove(kton);
}

function listenForClicks(teller) {
  let LOCK_DURATION_IN_DAYS = null;
  let button = document.getElementById('withdraw');
  button.addEventListener('click', function() {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    var value = document.getElementById('valueAmount').value;
    if (value <= 0) {
      window.alert('must withdraw more than 0');
      return;
    }
    teller.withdraw(
      value * 1e18,
      { from: web3.eth.coinbase },
      function(error, result) {
        if (error) {
          console.log(error);
          return;
        }
        // will return txHash as result
        console.log(result);
        var rsp = document.getElementById('response');
        rsp.innerHTML = 'withdraw txhash: ' + result;
      }
    );
  });
  button = document.getElementById('stake');
  button.addEventListener('click', function() {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    var value = document.getElementById('valueAmount').value;
    if (value <= 0) {
      window.alert('must stake more than 0');
      return;
    }
    teller.stake(
      value * 1e18,
      { from: web3.eth.coinbase },
      function(error, result) {
        if (error) {
          console.log(error);
          return;
        }
        // will return txHash as result
        console.log(result);
        var rsp = document.getElementById('response');
        rsp.innerHTML = 'stake txhash: ' + result;
      }
    );
  });
  button = document.getElementById('getvote');
  button.addEventListener('click', function() {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    var votes = '';
    teller.balanceOf(web3.eth.coinbase).then(function(result) {
      console.log('result:', result);
      var rsp = document.getElementById('response');
      votes =
        '<p style="color:rgb(255,0,0);">totalVote: ' +
        (result[0] / 1e18).toFixed(2) +
        '</p>';
      teller.balanceOfStaking(web3.eth.coinbase).then(function(result) {
        console.log('result:', result);
        var rsp = document.getElementById('response');
        votes +=
          '<p style="color:rgb(0,200,100);">stakingVote: ' +
          (result[0] / 1e18).toFixed(2) +
          ' * 10</p>';
      });
      teller.balanceOfLandOwner(web3.eth.coinbase).then(function(result) {
        console.log('result:', result);
        var rsp = document.getElementById('response');
        votes +=
          '<p style="color:rgb(0,200,100);">landVote: ' +
          result[0] +
          ' * 100</p>';
      });
      teller.balanceOfApostleOwner(web3.eth.coinbase).then(function(result) {
        console.log('result:', result);
        var rsp = document.getElementById('response');
        rsp.innerHTML =
          votes +
          '<p style="color:rgb(0,200,100);">apostleVote: ' +
          result[0] +
          ' * 1</p>';
      });
    });
  });
  button = document.getElementById('getTotalSupply');
  button.addEventListener('click', () => {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    teller.totalSupply().then((result) => {
      // 11000000000000000000
      console.log('In totalSupply');
      console.log('result:', result);
      var rsp = document.getElementById('response');
      rsp.innerHTML =
        '<p style="color:rgb(0,200,100);">Total Supply: ' +
        (result[0] / 1e18).toFixed(2) +
        ' </p>';
    });
  });
  button = document.getElementById('getStakedBalance');
  button.addEventListener('click', () => {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    teller.balanceOf(web3.eth.coinbase).then(function(result) {
      console.log('balanceOf:', result[0]);
      teller.balanceOfStaking(web3.eth.coinbase).then(function(result) {
        console.log('result:', result);
        var rsp = document.getElementById('response');
        rsp.innerHTML =
          '<p style="color:rgb(0,200,100);">Your Stake is : ' +
          (result[0] / 1e18).toFixed(2) +
          ' KTONs </p>';
      });
    });
  });
  button = document.getElementById('unclaimedRewards');
  button.addEventListener('click', () => {
    // TODO: Resolve the earned() function not found issue
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    teller.earned(web3.eth.coinbase).then(function(result) {
      console.log('Unclaimed Rewards balance of:', (result[0] / 1e18).toFixed(2), 'RINGS');
      var rsp = document.getElementById('response');
      rsp.innerHTML =
        '<p style="color:rgb(0,200,100);"> Your Unclaimed Rewards are : ' +
        (result[0] / 1e18).toFixed(2) +
        ' RINGS</p>';
    });
  });
  button = document.getElementById('endOfFreeze');
  button.addEventListener('click', () => {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    teller.lock().then(function(result){
      LOCK_DURATION_IN_DAYS = (Number(result[0]) / 60 / 60 / 24).toFixed(2); // result[0] is in seconds
      console.log('teller lock', LOCK_DURATION_IN_DAYS);
      teller.stakingLock(web3.eth.coinbase).then(function(result) {
        console.log('result stakingLock:', Number(result[0]));
        let timeLeft = new Date().getTime() / 1000 - Number(result[0]);
        let daysLeft =
        LOCK_DURATION_IN_DAYS - Math.ceil(timeLeft / 1000 / 60 / 60 / 24);
        var rsp = document.getElementById('response');
        rsp.innerHTML =
        '<p style="color:rgb(0,200,100);"> Days left in Freeze end: ' +
        daysLeft +
        ' days </p>';
      });
    });
  });
  button = document.getElementById('claimReward');
  button.addEventListener('click', () => {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    teller.getReward({from: web3.eth.coinbase}).then(function(result) {
      console.log('claim reward .getReward() result', result);
      var rsp = document.getElementById('response');
      rsp.innerHTML =
        '<p style="color:rgb(0,200,100);"> Here\'s your hash, please wait for confirmations : ' +
        result +
        '</p>';
    });
  });
  button = document.getElementById('withdrawWithReward');
  button.addEventListener('click', () => {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    teller.earned(web3.eth.coinbase).then(function(result) {
      // eslint-disable-next-line eqeqeq
      if ((result[0] / 1e18).toFixed(2) == 0) {
        alert('Cannot withdraw 0 rewards');
        return;
      }
      teller.withdrawWithReward({ from: web3.eth.coinbase })
        .then(function(result) {
          console.log('claim with withdraw reward result (Check your Unclaimed rewards first)', result);
          var rsp = document.getElementById('response');
          rsp.innerHTML =
          '<p style="color:rgb(0,200,100);"> You have claimed and withdrawn RINGS, hash is: ' +
          result +
          '</p>';
        });
    });
  });
}

function listenForApprove(kton) {
  let button = document.getElementById('approve');
  button.addEventListener('click', function() {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    var value = document.getElementById('ktonAmount').value;
    if (value <= 0) {
      window.alert('must approve more than 0');
      return;
    }
    kton.approve(
      '0x38EF245FABf02e412a0DD8833fE15D0b0B50d2F0',
      value * 1e18,
      { from: web3.eth.coinbase },
      function(error, result) {
        if (error) {
          console.log(error);
          return;
        }
        // will return txHash as result
        console.log(result);
        var rsp = document.getElementById('response');
        rsp.innerHTML = 'approve txhash: ' + result;
      }
    );
  });
  button = document.getElementById('myKTONBalance');
  button.addEventListener('click', function() {
    if (!web3.eth.coinbase) {
      window.alert('please connect metamask!');
      return;
    }
    kton.balanceOf(web3.eth.coinbase).then(function(result) {
      console.log('My KTON Balance', String(result[0]));
      var rsp = document.getElementById('response');
      rsp.innerHTML =
        '<p style="color:rgb(0,200,100);">My KTON Balance: ' +
        (result[0] / 1e18).toFixed(2) +
        ' </p>';
    });
  });
}
