// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title ContentPassport
/// @notice Stores immutable authenticity records for digital content on Base blockchain
contract ContentPassport {
    struct Passport {
        string  passportId;
        bytes32 contentHash;
        address creatorWallet;
        uint256 timestamp;
        uint8   trustScore;
        bool    isAIGenerated;
        string  ipfsHash;
        bool    exists;
    }

    mapping(string => Passport) private passports;
    string[] private passportIds;

    event ContentRegistered(
        string indexed passportId,
        address indexed creator,
        uint8 trustScore,
        bool isAIGenerated,
        uint256 timestamp
    );

    /// @notice Register new content and create its passport
    function registerContent(
        string  calldata passportId,
        bytes32 contentHash,
        uint8   trustScore,
        bool    isAIGenerated,
        string  calldata ipfsHash
    ) external {
        require(!passports[passportId].exists, "Passport already registered");
        require(trustScore <= 100, "Trust score must be 0-100");

        passports[passportId] = Passport({
            passportId:    passportId,
            contentHash:   contentHash,
            creatorWallet: msg.sender,
            timestamp:     block.timestamp,
            trustScore:    trustScore,
            isAIGenerated: isAIGenerated,
            ipfsHash:      ipfsHash,
            exists:        true
        });

        passportIds.push(passportId);

        emit ContentRegistered(passportId, msg.sender, trustScore, isAIGenerated, block.timestamp);
    }

    /// @notice Fetch a passport by ID
    function getPassport(string calldata passportId)
        external
        view
        returns (Passport memory)
    {
        require(passports[passportId].exists, "Passport not found");
        return passports[passportId];
    }

    /// @notice Verify if content hash matches a registered passport
    function verifyContent(string calldata passportId, bytes32 contentHash)
        external
        view
        returns (bool)
    {
        if (!passports[passportId].exists) return false;
        return passports[passportId].contentHash == contentHash;
    }

    /// @notice Total number of passports registered
    function totalPassports() external view returns (uint256) {
        return passportIds.length;
    }
}
