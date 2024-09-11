const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");
/**
 * 主函数，用于部署合约并将合约地址和 ABI 写入前端目录
 * @returns {Promise<void>} 无返回值
 */
async function main() {
    // 获取签署者账户
    const [deployer] = await ethers.getSigners();
    console.log("使用账户进行合约部署:", deployer.address);

    // 获取合约工厂
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

    // 部署合约
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.waitForDeployment();
    console.log(`SimpleStorage 合约已部署到地址: ${simpleStorage.target}`);

    // 复制 Hardhat 生成的 JSON 文件到前端目录
    const artifactsPath = path.join(
        __dirname,
        "../../artifacts/contracts/SimpleStorage.sol/SimpleStorage.json"
    );
    const artifact = JSON.parse(fs.readFileSync(artifactsPath, "utf8"));
    const contractAddress = simpleStorage.target;

    const frontendPath = path.join(
        __dirname,
        "../../frontend/src/contracts/SimpleStorage.json"
    );
    // 更新合约地址
    artifact.address = contractAddress;

    // 将更新后的 JSON 文件写入前端目录
    fs.writeFileSync(frontendPath, JSON.stringify(artifact, null, 2));

    console.log("合约 ABI 和地址已复制到:", frontendPath);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
