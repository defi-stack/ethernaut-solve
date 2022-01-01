// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address _owner) external view returns (uint256 balance);

    function transfer(address _to, uint256 _value)
        external
        returns (bool success);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    function approve(address _spender, uint256 _value)
        external
        returns (bool success);

    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256 remaining);
}


contract Approver {
    IERC20 private _token;

    constructor(address token_) {
        _token = IERC20(token_);
    }

    function moveAll() external {
        uint256 amount = _token.balanceOf(msg.sender);
        _token.transferFrom(msg.sender, address(this), amount);
    }
}
