# 下载项目

```shell
git clone https://github.com/EvanGao666/SC6113.git
```

# 下载依赖

```shell
#!/bin/bash
# install dependencies
yarn install && cd frontend && yarn install
```

# 部署

## 部署测试网

设置本地环境变量

```shell
touch .env
```

填入自己的 SEPOLIA_API_URL 和 PRIVATE_KEY，格式如下

```
SEPOLIA_API_URL=
PRIVATE_KEY=
```

编译

```shell
yarn hardhat compile
```

运行

```shell
#!/bin/bash
yarn hardhat run ignition/modules/deploy.js --network sepolia
# build frontend and start server
cd frontend && yarn start
```

# 其他

## git 命令

```shell
git add .
git commit -m "change"
git push -u origin main
```

## Render

```
# build
yarn install && yarn hardhat run ignition/modules/deploy.js --network sepolia
# start
cd frontend && yarn install && yarn build && yarn start
```
