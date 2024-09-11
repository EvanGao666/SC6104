deploy.sh

```shell
#!/bin/bash
# install dependencies and build frontend and backend
yarn install && cd frontend && yarn install && yarn build
# deploy
yarn hardhat run ignition/modules/deploy.js --network sepolia && cd frontend && yarn start
```

git 命令

```shell
git add .
git commit -m "change"
git push -u origin main
```
