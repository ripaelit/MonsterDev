// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

// libraries
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract CrazzzyMonsters is ERC721Enumerable, ERC2981, Ownable, ReentrancyGuard{
    using Strings for uint256;
    uint256 public publicTimestamp = 1681326000; // Wednesday, April 12, 7PM UTC
    string baseURI;
    string public baseExtension = ".json";
    uint256 public cost = 60 ether;
    uint256 public wlCost = 45 ether;
    uint256 public constant maxSupply = 10000;
    uint256[maxSupply] internal availableIds;
    address public burnContract;
    bool public paused = false;
    address[] holders;
    uint256[] counts;
    address public teamWallet = 0x81a6147d6bd8B43F13704908D1Fb30460980283d;
    uint256 public teamFee = 950; // 95%
    address public crmaxWallet = 0xd40D96B07e0f9FDFE66306F0975f6025E01A5ce5;
    uint256 public crmaxFee = 50; // 5%
    address public royaltyWallet = 0x9D2349C58861287358905e133F28c5F0a5b687E3;
    uint256 constant SCALE = 1000;
    mapping(address => bool) public whitelisted;
    uint256 public whitelistedCount;

    struct MintInfo {
        bool paused;
        uint256 supply;
        uint256 publicTimestamp;
    }

    constructor() ERC721("Crazzzy Monsters", "CMOG") {
        setDefaultRoyalty(royaltyWallet, 1000);
    }

    // external
    function setBurnContractAddress(address newAddr) external onlyOwner {
        burnContract = newAddr;
    }

    function withdraw() external {
        uint256 balance = address(this).balance;
        uint256 team = (balance * teamFee) / SCALE;
        uint256 crmax = (balance * crmaxFee) / SCALE;
        (bool sent, ) = payable(teamWallet).call{value: team}("");
        require(sent, "Sending cro failed");
        (sent, ) = payable(crmaxWallet).call{value: crmax}("");
        require(sent, "Sending cro failed");
    }

    function burn(uint256 tokenId) external {
        require(msg.sender == burnContract, "Not the burn contract");
        _burn(tokenId);
    }

    function getMintInfo() external view returns (MintInfo memory) {
        return MintInfo(paused, totalSupply(), publicTimestamp);
    }

    // public
    function setDefaultRoyalty(
        address receiver,
        uint96 feeNumerator

    ) public onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function mint(uint256 amount) public payable {
        require(!paused, "paused");
        require(block.timestamp >= publicTimestamp, "Mint is not live yet");
        require(amount > 0 && amount <= 25, "Invalid amount");
        uint256 supply = totalSupply();
        require(supply + amount <= maxSupply, "Max supply exceeded");
        uint256 amountNormal = amount;
        uint256 amountDiscount = 0;

        if (whitelisted[msg.sender]) {
            if (balanceOf(msg.sender) < 25) {
                if (balanceOf(msg.sender) + amount < 25) {
                    amountDiscount = amount;
                    amountNormal = 0;
                }
                else {
                    amountDiscount = 25 - balanceOf(msg.sender);
                    amountNormal = amount - amountDiscount;
                }
            }
        }
        require(msg.value >= cost * amountNormal + wlCost * amountDiscount, "insufficient funds");

        for (uint256 i = 0; i < amount; i++) {
            _safeMint(msg.sender, _getNewId(supply+i));
        }
    }

    function walletOfOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(
        string memory _newBaseExtension
    ) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function setAirDropCounts(
        address[] memory _holders,
        uint256[] memory _counts
    ) external onlyOwner {
        require(_holders.length == _counts.length, "Input Data error");
        for (uint256 i = 0; i < _holders.length; i++) {
            holders.push(_holders[i]);
            counts.push(_counts[i]);
        }
    }

    function airdropNFTs(
        address[] memory _holders,
        uint256[] memory _counts
    ) external onlyOwner {
        require(_holders.length == _counts.length, "Input Data error");
        uint256 supply = totalSupply();
        for (uint256 i = 0; i < _holders.length; i++) {
            for (uint256 j = 0; j < _counts[i]; j++) {
                _safeMint(_holders[i], _getNewId(supply + j));
            }
            supply += _counts[i];
        }
    }

    function mintCost(address _minter)
        external
        view
        returns (uint256)
    {
        if (whitelisted[_minter]) return wlCost;
        return cost;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function setWlCost(uint256 _newCost) public onlyOwner {
        wlCost = _newCost;
    }

    function setWhitelisted(address _address, bool _whitelisted)
        public
        onlyOwner
    {
        if (whitelisted[_address] == _whitelisted) {
            return;
        }
        whitelisted[_address] = _whitelisted;
        if (_whitelisted == true) {
            ++whitelistedCount;
        }
        else {
            --whitelistedCount;
        }
    }

    function setWhitelistAddresses(address[] memory addresses) public onlyOwner {
        require(whitelistedCount + addresses.length <= 25, "Whitelist size cannot exceed 25");
        for (uint i = 0; i < addresses.length; i++) {
            if (whitelisted[addresses[i]] == true) {
                continue;
            }
            else {
                whitelisted[addresses[i]] = true;
                ++whitelistedCount;
            }
        }
    }

    function setPublicTimestamp(uint256 publicTimestamp_) public onlyOwner {
        publicTimestamp = publicTimestamp_;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Enumerable, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function _getNewId(uint256 _totalMinted) internal returns (uint256 value) {
        uint256 remaining = maxSupply - _totalMinted;
        uint256 rand = uint256(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    block.difficulty,
                    block.timestamp,
                    remaining
                )
            )
        ) % remaining;
        value = 0;
        if (availableIds[rand] != 0) value = availableIds[rand];
        else value = rand;
        if (availableIds[remaining - 1] == 0)
            availableIds[rand] = remaining - 1;
        else availableIds[rand] = availableIds[remaining - 1];
        value += 1;
    }
}