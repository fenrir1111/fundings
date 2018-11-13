pragma solidity ^0.4.17;
contract PlayerToFundings {
    mapping(address => address[]) playersFundings;

    function joinFunding(address funding, address sender) public{
        playersFundings[sender].push(funding);
    }

    function getFundings(address sender) public view returns(address[] fundings){
        return playersFundings[sender];
    }
}

contract FundingFactory {
    address[] public fundings;
    PlayerToFundings playerToFundings;
    mapping(address => address[]) private creatorToFundings;

    constructor() public{
        address playerToFundingsAddress = new PlayerToFundings();
        playerToFundings = PlayerToFundings(playerToFundingsAddress);
    }

    function createFunding(string _projectName,uint _supportMoney, uint _goalMoney) public {
        address funding = new Funding(_projectName,_supportMoney, _goalMoney, playerToFundings,msg.sender);
        fundings.push(funding);

        address[] storage addresses = creatorToFundings[msg.sender];
        addresses.push(funding);
    }
    function getFundings() public view returns (address[]){
        return fundings;
    }
    function getCreatorFundings() public view returns(address[]){
        return creatorToFundings[msg.sender];
    }
    function getPlayerFoundings() public view returns(address[]){
        return playerToFundings.getFundings(msg.sender);
    }
}

contract Funding {
    bool flag = false;
    address public manager;
    string public projectName;
    uint public supportMoney;
    uint public endTime;
    uint public goalMoney;
    address[] public players;
    mapping(address => bool) playersMap;
    // 发起人的付款请求
    Request[] public requests;
    PlayerToFundings p2f;

    struct Request {
        string description;
        uint money;
        address shopAddress;
        bool complete;
        mapping(address=>bool) votedAddressMap;
        uint voteCount;
    }
    constructor (string _projectName, uint _supportMoney, uint _goalMoney, PlayerToFundings _p2f,address _address) public {
        manager = _address;
        projectName = _projectName;
        supportMoney = _supportMoney;
        goalMoney = _goalMoney;
        p2f = _p2f;
        endTime = now + 4 weeks;
    }
    // createRequest 付款申请函数，由众筹发起人调用
    function createRequest(string _desc, uint _money, address _shopAddress) public onManagerCanCall {
        require(_money <= address (this).balance);
        Request memory request = Request({
            description:_desc,
            money:_money,
            shopAddress:_shopAddress,
            complete:false,
            voteCount:0
            });
        requests.push(request);
    }
    // approveRequest 付款批准函数，由众筹参与人调用
    function approveRequest(uint index) public {
        // is players
        require( playersMap[msg.sender]);
        Request storage request = requests[index];
        // not voted before
        require(!request.votedAddressMap[msg.sender]);

        request.voteCount++;
        request.votedAddressMap[msg.sender] = true;
    }
    // finalize Request 众筹发起人调用，可以调用完成付款
    function finalizeRequest(uint index) public onManagerCanCall {
        Request storage request = requests[index];
        // request(!request.complete);
        require(request.voteCount * 2 > players.length);

        // 转账
        require(address(this).balance >= request.money );
        request.shopAddress.transfer(request.money);
        request.complete = true;
    }
    // moneyBack  退钱函数 有众筹发起人调用（众筹未成功时调用）
    function moneyBack() public view onManagerCanCall {

    }

    function support() public payable {
        require(msg.value == supportMoney);
        players.push(msg.sender);
    }
    function getTotalBalance() public view returns(uint){
        return address(this).balance;
    }
    function getRemainTime() public view returns(uint){
        return (endTime - now)/24/3600;
    }
    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
    function getRuquest(uint index) public view returns(string, uint,address,bool,bool,uint){
        Request storage request = requests[index];
        return (
        request.description,
        request.money,
        request.shopAddress,
        request.complete,
        request.votedAddressMap[msg.sender],
        request.voteCount
        );
    }
    function checkStatus() public {
        require(!flag);
        require(now>endTime);
        require(address(this).balance > goalMoney);
        flag = true;
    }
    modifier onManagerCanCall(){
        require(msg.sender == manager);
        _;
    }
}
