#!/bin/bash
# install dependencies and build frontend and backend
yarn install && cd frontend && yarn install && yarn build
# deploy
yarn hardhat run ignition/modules/deploy.js --network sepolia && cd frontend && yarn start