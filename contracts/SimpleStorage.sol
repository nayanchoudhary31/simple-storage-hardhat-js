// SPDX-License-Identifier: MIT

// pragma solidity >= 0.8.0 < 0.9.0;
pragma solidity ^0.8.7;

contract SimpleStorage {
    struct Person {
        uint256 favNumber;
        string name;
    }

    uint256 public favNumber;

    Person[] public person;

    mapping(string => uint256) public nameToNumberMap;

    function store(uint256 _newFavNumber) public virtual {
        favNumber = _newFavNumber;
    }

    function retreive() public view returns (uint256) {
        return favNumber;
    }

    function addPerson(string memory _name, uint256 _number) public {
        Person memory p = Person(_number, _name);
        nameToNumberMap[_name] = _number;
        person.push(p);
    }

    function getPerson(
        uint256 _index
    ) public view returns (string memory, uint256) {
        return (person[_index].name, person[_index].favNumber);
    }
}
