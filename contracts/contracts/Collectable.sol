// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

string constant METADATA_FILEPATH = ".json";
string constant METADATA_SEPERATOR = "/";

contract Collectable is ERC1155, Ownable {
    constructor(string memory collectableName, string memory collectableSymbol) ERC1155("") {
        name = collectableName;
        symbol = collectableSymbol;
    }

    string public name;
    string public symbol;
    bool public everyoneMint;

    uint16 public atToken;
    uint16 private _collectionId;

    mapping(uint16 => string) private _collections;
    mapping(uint16 => uint256) private _collectionOffset;
    mapping(uint256 => uint16) private _idToCollection;

    function uri(uint256 id) public view virtual override returns (string memory) {
        if (_idToCollection[id] != 0) {
            uint16 collectionId = _idToCollection[id];
            return string(abi.encodePacked(
                _collections[collectionId],
                METADATA_SEPERATOR,
                uint2str(id - _collectionOffset[collectionId]),
                METADATA_FILEPATH
            ));
        }
        return "";
    }

    function uint2str(uint _i) internal pure returns (string memory ) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function _addCollection(string memory dirHash) internal returns (uint16) {
        _collectionId += 1;
        _collectionOffset[_collectionId] = atToken;
        _collections[_collectionId] = dirHash;
        return _collectionId;
    }

    function getCollection(uint256 id) public view returns (uint16) {
        return _idToCollection[id];
    }

    function mint(string memory baseURI, uint16 editions) public onlyOwner {
        _idToCollection[atToken + 1] = _addCollection(baseURI);
        atToken += 1;
        _mint(_msgSender(), atToken, editions, "");
    }

    function mintBatch(uint8 size, string memory baseURI, uint16 editions) public onlyOwner {
        require(everyoneMint || owner() == _msgSender(), "Ownable: caller is not the owner");
        _addCollection(baseURI);
        for (uint8 i = 0; i < size; i += 1) {
            atToken += 1;
            _idToCollection[atToken] = _collectionId;
            _mint(_msgSender(), atToken, editions, "");
        }
    }
}