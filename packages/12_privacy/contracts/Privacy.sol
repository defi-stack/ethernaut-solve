// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Privacy {
    // slot 0
    bool public locked = true;

    // slot 1
    uint256 public ID = block.timestamp;

    // slot 2
    uint8 private flattening = 10;
    uint8 private denomination = 255;
    uint16 private awkwardness = uint16(now);

    // slot 3, 4, 5
    bytes32[3] private data;

    constructor(bytes32[3] memory _data) public {
        data = _data;
    }

    function unlock(bytes16 _key) public {
        // bytes16(bytes32<A<16>, B<16>>) return A
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
