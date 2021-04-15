// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Collectable.sol";

// marketplace and nft contract need to be
// owned by the same wallet.
contract Marketplace is Ownable {
    mapping(uint16 => uint256) collectionPrice_;
    Collectable nftContract_;

    constructor(address nftContract) {
        nftContract_ = Collectable(nftContract);
    }

    function setPrice(uint16 collectionId, uint256 price) public onlyOwner {
        collectionPrice_[collectionId] = price;
    }

    function purchase(uint256 id, uint16 editions) public payable {
        uint256 price = collectionPrice_[nftContract_.getCollection(id)];
        require(price > 0 && nftContract_.balanceOf(owner(), id) >= editions, "Not for sale");
        require(price * editions == msg.value, "Wrong price");
        (bool success, ) = owner().call{value: price}("");
        require(success, "Xfer failed");
        nftContract_.safeTransferFrom(owner(), _msgSender(), id, editions, "");
    }
}