// contracts/InsuranceBroker.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Auditsiq is ERC721, ERC721URIStorage, Ownable {
    using Address for address;
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private tokenIds;
    bool paused;
    modifier isPaused() {
        require(!paused, "Contract is Paused");
        _;
    }
    mapping(string => bool) internal ids;
    mapping(string => uint256) internal token;
    mapping(address => bool) internal admin_list;
    mapping(address => address[]) internal auditor_list;

    // mapping(uint256 => address[]) internal auditors_list;
    constructor(bool ispaused) ERC721("AIQ-Token", "AIQ") {
        paused = ispaused;
    }

    function _baseURI(string memory cid) internal pure returns (string memory) {
        return "https://w3s.link/ipfs";
    }

    function addCompanyAdmins(
        address _admin,
        bool _status
    ) public onlyOwner returns (bool) {
        require(!Address.isContract(_admin), "Invalid Address");
        require(_admin != address(0x0), "Invalid Address");
        if (_status == true) {
            require(admin_list[_admin] == false, "Admin already exists");
        } else if (_status == false) {
            require(admin_list[_admin] == true, "Admin doesnot exist");
        }
        admin_list[_admin] = _status;
    }

    function addAuditors(address[] memory _auditor) public returns (bool) {
        require(admin_list[msg.sender] == true, "Invalid Company Admin");
        for (uint256 i = 0; i < _auditor.length; i++) {
            addSingleAuditor(_auditor[i]);
        }
        // auditor_list[msg.sender] = _auditor;
    }

    function addSingleAuditor(address aud) public {
        require(admin_list[msg.sender] == true, "Invalid Company Admin");
        require(msg.sender != aud, "Admin cannot be the auditor");
        for (uint256 i = 0; i < auditor_list[msg.sender].length; i++) {
            require(
                auditor_list[msg.sender][i] != aud,
                "Auditor already exists"
            );
        }

        console.log("len", auditor_list[msg.sender].length);
        // for (uint256 i = 0; i < auditor_list[msg.sender].length; i++) {
        // if (auditor_list[msg.sender][i] == aud) {
        //     console.log("Auditor Already exists");
        //     return;
        // } else {
        if (
            !aud.isContract() &&
            aud != address(0x0) &&
            checkAuditor(aud) == true
        ) {
            auditor_list[msg.sender].push(aud);
        }
        // }
        // }
    }

    function checkAuditor(address _aud) internal view returns (bool) {
        address[] memory list = auditor_list[msg.sender];
        for (uint256 i = 0; i < list.length; i++) {
            if (list[i] == _aud) {
                return false;
            }
        }
        return true;
    }

    function addToken(
        string memory _uri,
        address company_admin
    ) public isPaused returns (uint256) {
        require(bytes(_uri).length != 0, "URL cannot be empty");
        require(ids[_uri] == false, "Token already exists");
        require(
            admin_list[company_admin] == true,
            "Invalid company admin address"
        );

        if (!admin_list[msg.sender]) {
            address[] memory auditors = auditor_list[company_admin];
            for (uint256 i = 0; i < auditors.length; i++) {
                require(
                    auditor_list[company_admin][i] == msg.sender,
                    "Invalid Auditor"
                );
                tokenIds.increment();
                uint256 token_id = tokenIds.current();
                _safeMint(company_admin, token_id);
                _setTokenURI(token_id, _uri);
                ids[_uri] = true;
                token[_uri] = token_id;
                return (token_id);
            }
        }
    }

    function getId(string memory cid) public view returns (uint256) {
        return token[cid];
    }

    function togglePause() public onlyOwner {
        paused = !paused;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(
        uint256 _tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        // super._burn(_tokenId);
    }
}
