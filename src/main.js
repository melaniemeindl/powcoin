const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate(
  '9ccd52ddaf2f93db18d26051aff7429610a894946043dc9cc64c61532908a9cb'
);

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const powCoin = new Blockchain();

// Mine first block
powCoin.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
powCoin.addTransaction(tx1);

// Mine block
powCoin.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
powCoin.addTransaction(tx2);

// Mine block
powCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(
  `Balance of xavier is ${powCoin.getBalanceOfAddress(myWalletAddress)}`
);

// Uncomment this line if you want to test tampering with the chain
// powCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', powCoin.isChainValid() ? 'Yes' : 'No');
