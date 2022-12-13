// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

import "../InjectorContextHolder.sol";

contract StorageLayoutChecker is InjectorContextHolder {

    uint256 internal _slot100;

    constructor(ConstructorArguments memory constructorArgs) InjectorContextHolder(constructorArgs) {
    }

    function makeSureInjectorLayoutIsNotCorrupted() external pure {
        bytes32 slot;
        assembly {
            slot := _slot100.slot
        }
        require(slot == bytes32(uint256(_LAYOUT_OFFSET)), "SlotLayoutChecker: layout is corrupted");
    }
}