var Eth = require('ethjs-query');
var EthContract = require('ethjs-contract');
if (typeof web3 !== 'undefined') {
    eth = new Eth(web3.currentProvider);
    contract = new EthContract(eth);
    startApp();
} else {
    alert("No currentProvider for web3");
}

function startApp() {
    const abi = [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"BalanceOfStaking","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfApostleOwner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfLandOwner","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const addresss = '0x38EF245FABf02e412a0DD8833fE15D0b0B50d2F0';
    const Teller = contract(abi);
    const teller = Teller.at(addresss);
    listenForClicks(teller);

    const erc20abi = [{"constant": false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const ktonaddr = '0x1994100c58753793D52c6f457f189aa3ce9cEe94';
    const Kton = contract(erc20abi);
    const kton = Kton.at(ktonaddr);
    listenForApprove(kton);
}

function listenForClicks(teller) {
    var button = document.getElementById('withdraw');
    button.addEventListener('click', function() {
        if (!web3.eth.coinbase) {
            window.alert("please connect metamask!");
            return;
        }
        var value = document.getElementById('valueAmount').value;
        if (value <= 0) {
            window.alert("must withdraw more than 0");
            return;
        }
        teller.withdraw(value*1e18, {from: web3.eth.coinbase}, function(error, result) {
            if (error) {
                 console.log(error);
                 return;
            }  
            // will return txHash as result
            console.log(result);
            var rsp = document.getElementById('response');
            rsp.innerHTML = "withdraw txhash: " + result;
        })
   });
    var button = document.getElementById('stake');
    button.addEventListener('click', function() {
        if (!web3.eth.coinbase) {
            window.alert("please connect metamask!");
            return;
        }
        var value = document.getElementById('valueAmount').value;
        if (value <= 0) {
            window.alert("must stake more than 0");
            return;
        }
        teller.stake(value*1e18, {from: web3.eth.coinbase}, function(error, result) {
            if (error) {
                console.log(error);
                return;
            }  
            // will return txHash as result
            console.log(result);
            var rsp = document.getElementById('response');
            rsp.innerHTML = "stake txhash: " + result;
        })
    });
    var button = document.getElementById('getvote');
    button.addEventListener('click', function() {
        if (!web3.eth.coinbase) {
            window.alert("please connect metamask!");
            return;
        }
        var votes = "";
        teller.balanceOf(web3.eth.coinbase).then(function(result) {
            console.log("result:", result);
            var rsp = document.getElementById('response');
            votes = '<p style="color:rgb(255,0,0);">totalVote: ' + (result[0]/1e18).toFixed(2) + '</p>';
            teller.balanceOfStaking(web3.eth.coinbase).then(function(result) {
                console.log("result:", result);
                var rsp = document.getElementById('response');
                votes += '<p style="color:rgb(0,200,100);">stakingVote: ' + (result[0]/1e18).toFixed(2) + ' * 10</p>';
            });
            teller.balanceOfLandOwner(web3.eth.coinbase).then(function(result) {
                console.log("result:", result);
                var rsp = document.getElementById('response');
                votes += '<p style="color:rgb(0,200,100);">landVote: ' + result[0] + ' * 100</p>';
            });
            teller.balanceOfApostleOwner(web3.eth.coinbase).then(function(result) {
                console.log("result:", result);
                var rsp = document.getElementById('response');
                rsp.innerHTML = votes + '<p style="color:rgb(0,200,100);">apostleVote: ' + result[0] + ' * 1</p>';
            });
        });
    });
}
function listenForApprove(kton) {
    var button = document.getElementById('approve');
    button.addEventListener('click', function() {
        if (!web3.eth.coinbase) {
            window.alert("please connect metamask!");
            return;
        }
        var value = document.getElementById('ktonAmount').value;
        if (value <= 0) {
            window.alert("must approve more than 0");
            return;
        }
        kton.approve("0x38EF245FABf02e412a0DD8833fE15D0b0B50d2F0", value*1e18, {from: web3.eth.coinbase}, function(error, result) {
            if (error) {
                 console.log(error);
                 return;
            }  
            // will return txHash as result
            console.log(result);
            var rsp = document.getElementById('response');
            rsp.innerHTML = "approve txhash: " + result;
        });
   });
}

