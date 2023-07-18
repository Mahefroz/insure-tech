// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

contract WellsDiv is ERC1155, Ownable, Pausable {
    using Strings for uint256;
    uint256 public constant Well1 = 1;
    uint256 public constant Well2 = 2;
    mapping(uint256 => int256) internal well_price;

    constructor() ERC1155("https://game.example/api/item/cid/") {
        well_price[Well1] = 1;
        well_price[Well2] = 1;
        _mint(address(this), Well1, 10, "");
        _mint(address(this), Well2, 20, "");
    }

    // function uri(uint256 tokenId) public view override returns (string memory) {
    //     return
    //         string.concat(
    //             super.uri(tokenId),
    //             Strings.toString(tokenId),
    //             ".json"
    //         );
    // }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {}

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    // function transferToken(
    //     address _to,
    //     uint256 _id,
    //     uint256 _amount,
    //     bytes memory _data
    // ) public payable returns (uint) {
    //     int256 eth_price = 1658;

    //     // int256 eth_price=getLatestPrice();
    //     uint256 _msg_value = msg.value / 1000000000000000000;
    //     require(_id == Well1 || _id == Well2, "Inavlid Id ");
    //     require(
    //         well_price[_id] == int256(_msg_value) * eth_price ||
    //             well_price[_id] < int256(_msg_value) * eth_price,
    //         "Insufficient token amount paid"
    //     );
    //     require(
    //         !Address.isContract(_to) && _to != address(0),
    //         "Invalid Address"
    //     );
    //     safeTransferFrom(address(this), _to, _id, _amount, _data);
    //     console.log(msg.value);
    //     return (msg.value);
    // }
}
