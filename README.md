部署测试网 一键调用 deploy.sh

下载依赖

```shell
#!/bin/bash
# install dependencies and build frontend and backend
yarn install && cd frontend && yarn install && yarn build
```

部署测试网

```shell
#!/bin/bash
yarn hardhat node && yarn hardhat run ignition/modules/deploy.js --network sepolia
# build frontend and start server
cd frontend && yarn start
```

部署本地网

```shell
#!/bin/bash
yarn hardhat node && yarn hardhat run ignition/modules/deploy.js --network localhost
# build frontend and start server
cd frontend && yarn start
```

git 命令

```shell
git add .
git commit -m "change"
git push -u origin main
```
