// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 private value;

    struct ChangeRecord {
        address user;
        uint256 newValue;
        uint256 timestamp;
    }

    ChangeRecord[] public changeRecords;

    // 存储一个新的值
    function setValue(uint256 _value) public {
        value = _value;
        changeRecords.push(
            ChangeRecord({
                user: msg.sender,
                newValue: _value,
                timestamp: block.timestamp
            })
        );
    }

    // 获取当前值
    function getValue() public view returns (uint256) {
        return value;
    }

    // 获取所有变更记录
    function getChangeRecords() public view returns (ChangeRecord[] memory) {
        return changeRecords;
    }
}
