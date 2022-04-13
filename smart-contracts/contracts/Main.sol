// SPDX License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A POC for a decentralised file library
 * @author Atlantis team
 */
 
contract AtlantisFileManager is Ownable {
    /// @notice Returns the base url
    string public baseUrl;

    /// @notice Stores metadata about a file
    struct File {
        uint256 id;
        string fileName;
        string fileHash;
    }

    /// @notice Stores a colection of publicly available metadata
    File[] public publicFiles;
    /// @notice Stores a colection of privately available metadata
    File[] private privateFiles;

    /// @dev Accepts the user address as the key and an array of integers as the value
    /// @dev Each integer in the array of integers marks the id for a File Struct on the privateFiles array
    /// @notice Connects a private file to a user 
    mapping(address => uint256[]) private privateFilesIndex;

    event BaseUrlSet(address owner, string baseUrl);
    event AddFile(address indexed fileOwner, string fileName, string fileHash, uint256 index);
    event ShareFile(address indexed from, address indexed to, uint256 fileIndex);

    modifier stopZeroStart(uint256 _start) {
        require(_start > 0, "Cannot start from zero(0) starts from one(1)");
        _;
    }

    /// @notice Sets the base url for all uploaded files
    function setBaseUrl(string memory _baseUrl) external onlyOwner {
        baseUrl = _baseUrl;

        emit BaseUrlSet(msg.sender, _baseUrl);
    } 

    /// @dev handles the storing of files
    function _addFile(string memory _fileHash, string memory _fileName, bool _isPublic) internal {
        uint256 index = _isPublic ? publicFiles.length + 1 :  privateFiles.length + 1;
        File memory file = File({id: index, fileName: _fileName, fileHash: _fileHash});

        if(_isPublic) {
            publicFiles.push(file);
        } else {
            privateFiles.push(file);

            privateFilesIndex[msg.sender].push(index);
        }

        emit AddFile(msg.sender, _fileName, _fileHash, index);
    }

    /// @notice Stores a new file when we are certain of its public status
    function addFile(string memory _fileHash, string memory _fileName, bool _isPublic) external {
        _addFile(_fileHash, _fileName, _isPublic);
    }

    /// @notice Storess a new file when we are not certain of it public status
    function addFile(string memory _fileHash, string memory _fileName) external {
        _addFile(_fileHash, _fileName, true);
    }

    /// @notice Returns public files starting from the beginning id given 
    /// @notice Spanning the total quantity needed or the number of files available
    function getPublicFiles(uint256 _start, uint256 _length) 
        external 
        view 
        stopZeroStart(_start)
        returns (uint256[] memory id, string[] memory fileName, string[] memory fileHash) 
    {
        uint256 filesLength = publicFiles.length;
        
        uint256 end;
        (_length, end) = _calculateEndAndLengthValue(filesLength, _length, _start);

        (id, fileName, fileHash) = _intialiseResponseArray(_length);

        uint256 counter = 0;

        for(uint256 index = _start; index < end; index++) {
            File memory file = publicFiles[index - 1];
            
            id[counter] = file.id;
            fileName[counter] = file.fileName;
            fileHash[counter] = file.fileHash;
            
            counter++;
        }

        return (id, fileName, fileHash);
    }

    /// @notice Returns private files belonging to a user starting from the _start value given 
    /// @notice Spanning the total quantity needed or the number of files available
    function getPrivateFiles(uint256 _start, uint256 _length) 
        external 
        view 
        stopZeroStart(_start)
        returns (uint256[] memory id, string[] memory fileName, string[] memory fileHash) 
    {
        uint256[] memory userPrivateFileIndexes = privateFilesIndex[msg.sender];
        uint256 filesLength = userPrivateFileIndexes.length;
        
        require(filesLength != 0, "You currently have no private files");        
        
        uint256 end;
        (_length, end) = _calculateEndAndLengthValue(filesLength, _length, _start);

        (id, fileName, fileHash) = _intialiseResponseArray(_length);

        uint256 counter = 0;

        for(uint index = _start; index < end; index++) {
            File memory file = privateFiles[userPrivateFileIndexes[index - 1] - 1];

            id[counter] = file.id;
            fileName[counter] = file.fileName;
            fileHash[counter] = file.fileHash;

            counter++;
        }

        return (id, fileName, fileHash);
    }

    /// @dev Calculates the lemgth of the response array and the max limit of the forloop
    function _calculateEndAndLengthValue(uint256 _filesLength, uint256 _length, uint256 _start) 
        internal 
        pure 
        returns(uint256 length, uint256 end)
    {
        require(_start <= _filesLength, "No more files");
        
        length = _length;
        
        end = _start + length;

        if(_filesLength < end) {
            length = (_filesLength - _start) + 1;
            end = _filesLength + 1;
        }

        return (length, end);
    }

    /// @dev initialises the array needed for response
    function _intialiseResponseArray(uint256 _length) 
        internal 
        pure 
        returns (uint256[] memory id, string[] memory fileName, string[] memory fileHash)
    {
        id = new uint256[](_length);
        fileName = new string[](_length);
        fileHash = new string[](_length);

        return (id, fileName, fileHash);
    }

    /// @notice Allows a user to share their private file with another user
    function share(address _to, uint256 _fileId) external {
        uint256[] memory userPrivateFileIndexes = privateFilesIndex[msg.sender];
        uint256 filesLength = userPrivateFileIndexes.length;
        
        require(filesLength != 0, "You currently have no private files");
        require(_fileId <= filesLength, "File not found");

        uint256 fileIndex = userPrivateFileIndexes[_fileId - 1];

        privateFilesIndex[_to].push(fileIndex);

        emit ShareFile(msg.sender, _to, fileIndex);
    }
}