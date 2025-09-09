
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @title CarbonBudgetToken (CBT)
/// @notice Supply initialized to chosen reference carbon budget.
/// @dev Emissions are reflected by burning tokens through owner-controlled function.
contract CarbonBudgetToken is ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /// @notice role-free minimal owner-gated burn/mint for PoC; migrate to AccessControl for production.
    function initialize(string memory name_, string memory symbol_, uint256 initialSupply) public initializer {
        __ERC20_init(name_, symbol_);
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        _mint(msg.sender, initialSupply);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /// @notice burn tokens held by the contract owner (e.g., via oracle/ops account) to reflect annual emissions
    function burnFromOwner(uint256 amount) external onlyOwner {
        _burn(owner(), amount);
    }

    /// @notice one-off mint hook to correct small deltas during reconciliation (governance-guarded in production)
    function mintToOwner(uint256 amount) external onlyOwner {
        _mint(owner(), amount);
    }
}
