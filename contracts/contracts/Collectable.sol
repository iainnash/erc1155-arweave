// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

string constant METADATA_FILEPATH = ".json";
string constant METADATA_SEPERATOR = "/";

contract Collectable is ERC1155, Ownable {
    /*
     * bytes4(keccak256('getFeeBps(uint256)')) == 0x0ebd4c7f
     * bytes4(keccak256('getFeeRecipients(uint256)')) == 0xb9c4d9fb
     *
     * => 0x0ebd4c7f ^ 0xb9c4d9fb == 0xb7799584
     */
    // bytes4 private constant _INTERFACE_ID_FEES = 0xb7799584;

    constructor(string memory collectableName, bool everyoneMint) ERC1155("") {
        _everyoneMint = everyoneMint;
        // _feeBPS = 1500;
        name = collectableName;
    }

    // function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    //   return interfaceId == _INTERFACE_ID_FEES || super.supportsInterface(interfaceId);
    // }

    string public name;
    bool private _everyoneMint;
    uint16 private _atToken;
    uint16 private _collectionId;
    // uint16 private _feeBPS;
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

    // TODO(validate): copied code
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
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
        _collectionOffset[_collectionId] = _atToken;
        _collections[_collectionId] = dirHash;
        return _collectionId;
    }

    function getCollection(uint256 id) public view returns (uint16) {
        return _idToCollection[id];
    }

    function mint(string memory baseURI, uint16 editions) public {
        require(_everyoneMint || owner() == _msgSender(), "Ownable: caller is not the owner");
        _idToCollection[_atToken + 1] = _addCollection(baseURI);
        _atToken += 1;
        _mint(_msgSender(), _atToken, editions, "");
    }

    function mintBatch(uint8 size, string memory baseURI, uint16 editions) public {
        require(_everyoneMint || owner() == _msgSender(), "Ownable: caller is not the owner");
        _addCollection(baseURI);
        for (uint8 i = 0; i < size; i += 1) {
            _atToken += 1;
            _idToCollection[_atToken] = _collectionId;
            _mint(_msgSender(), _atToken, editions, "");
        }
    }
}