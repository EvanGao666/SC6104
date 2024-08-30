// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 private value;

    // 存储一个新的值
    function setValue(uint256 _value) public {
        value = _value;
    }

    // 获取当前值
    function getValue() public view returns (uint256) {
        return value;
    }
}
