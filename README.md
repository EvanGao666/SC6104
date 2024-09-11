deploy.sh

```shell
#!/bin/bash
yarn install && yarn hardhat run ignition/modules/deploy.js --network sepolia
# 构建并启动前端
cd frontend && yarn install && yarn build && yarn start
```

git 命令

```shell
git add .
git commit -m "change"
git push -u origin main
```
