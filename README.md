## governance-web

The following assumes the use of node@>=v14.10.0.

#### install 
```
npm install browserify -g
npm install
browserify init_web3.js -o web3_bundle.js
```

### Contributing
We use eslint to lint our code, if you contribute please make sure to run ```npm run lint-all``` before you commit and make a pull request. <br />To lint _only_ your new work, please run ```npm run lint-new-works```

#### Deploy
Put file vote.html and web3_bundle.js to the static web server.

```
npm i -g http-server
```
