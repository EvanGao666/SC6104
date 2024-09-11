deploy.sh

```shell
#!/bin/bash
# install dependencies and build frontend and backend
yarn install && yarn hardhat run ignition/modules/deploy.js --network sepolia
# build frontend and start server
cd frontend && yarn install && yarn build && yarn start
```

git 命令

```shell
git add .
git commit -m "change"
git push -u origin main
```
