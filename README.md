# SC6113: Smart Contract DApp

This project demonstrates deploying and interacting with Solidity smart contracts using Hardhat and a React frontend. The smart contract is deployed on the Sepolia testnet, and the frontend interacts with it through MetaMask.

## Project Setup

### Clone the repository

```bash
git clone https://github.com/EvanGao666/SC6113.git
```

### Install dependencies

```bash
#!/bin/bash
# Install dependencies for both backend and frontend
yarn install && cd frontend && yarn install
```

## Deploying the Smart Contract

### Deploy to Sepolia Testnet

1. **Set up environment variables:**

    Create a `.env` file in the root directory:

    ```bash
    touch .env
    ```

    Add your Sepolia API URL and private key to the `.env` file in the following format:

    ```bash
    SEPOLIA_API_URL=your_sepolia_api_url
    PRIVATE_KEY=your_private_key
    ```

2. **Compile the smart contracts:**

    ```bash
    yarn hardhat compile
    ```

3. **Run deployment:**

    ```bash
    # Deploy to the Sepolia testnet
    yarn hardhat run ignition/modules/deploy.js --network sepolia

    # Build the frontend and start the development server
    cd frontend && yarn start
    ```

## Additional Commands

### Git Commands

Use the following commands to track and push changes:

```bash
git add .
git commit -m "your commit message"
git push -u origin main
```

### Render Deployment

For deployment on Render, use the following build and start commands:

```bash
# Build Command
yarn install && cd frontend && yarn install && yarn build

# Start Command
cd frontend && npx serve -s build -l $PORT
```

PORT is 10000, don't forget to set up!
