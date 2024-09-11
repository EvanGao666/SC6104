#!/bin/bash
# install dependencies and build frontend and backend
yarn install && yarn hardhat run ignition/modules/deploy.js --network sepolia
# build frontend and start server
cd frontend && yarn install && yarn build && yarn start