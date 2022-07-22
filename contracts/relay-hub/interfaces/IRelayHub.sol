// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

interface IRelayHub {

    function getBridgeAddress(uint256 chainId) external view returns (address);

    function checkReceiptProof(
        uint256 chainId,
        bytes[] calldata blockProofs,
        bytes calldata rawReceipt,
        bytes calldata proofSiblings,
        bytes calldata proofPath
    ) external view returns (bool);
}