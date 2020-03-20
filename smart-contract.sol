pragma solidity ^0.5.1;

library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

/**ч
 * The massAddress library does this and that...
 */
library massAddress {
  
  function removeIndexAddress(address[] memory self, uint index) pure internal returns(address[] memory) {
    require(index>=0);
    if (index >= self.length) return self;
    for (uint i = index; i<self.length-1; i++){
        self[i] = self[i+1];
    }
    delete self[self.length-1];
    return self;
  }

  function searchIndexAddress(address[] memory self, address id) pure internal returns(uint){
    for(uint i=0; i<self.length; i++){
        if(self[i] == id) return i;
    }
    return uint(-1);
  }

}

contract Ownable{
    address private _owner;
    mapping (address => bool) public management;
    
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
        setManagment(0x57Ba6F9a42BBdf010205C83635121E54e75B30c6);
        setManagment(0x3671bB290e189b8E078d834c60B2F0AB1279d478);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(isOwner() || management[msg.sender], "Ownable: caller is not the owner");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    function setManagment(address _newManager) public onlyOwner returns(bool){
        require(_newManager!=address(0));
        management[_newManager] = true;
    }
}

/**
 * The RefStorage contract does this and that...
 */
contract RefStorage is Ownable{

    mapping (address => address []) referers;
    mapping (address => address) referals;
    mapping (address => bool) public contracts;
    address payable public refCashbox;
    SevenTOP public sevenTOP;

    event ReferrerAdded(address player, address referrer);

    constructor() public {
        refCashbox = 0x7255918677158ccdd41D48d42653C24BcFBbF29b;
    }

    modifier restricted() {
        require(contracts[msg.sender], "you don't have premission");
        _;
    }

    function addReferer(address _referrer) external restricted {
        if(_referrer!=address(0x0)){
            if(referals[tx.origin]==address(0) || referals[tx.origin]==refCashbox){
                referals[tx.origin] = _referrer;
                referers[_referrer].push(tx.origin);
                emit ReferrerAdded(tx.origin, _referrer);
            } 
        } else if(referals[tx.origin]== address(0)){
            referals[tx.origin] = refCashbox;
        }
    }

    function getReferal(address _user) public view returns(address){
        return referals[_user];
    }

    function getReferers(address _user) public view returns(address [] memory){
        return referers[_user];
    }   
    
    function setSevenTOP(SevenTOP _sevenTOP) public onlyOwner returns(bool){
        require(address(_sevenTOP)!=address(0));
        sevenTOP = _sevenTOP;
        return true;
    }
    
    function addContract(address _contr) public {
        require(msg.sender==address(sevenTOP) || isOwner());
        contracts[_contr] = true;
    }

    function changeRefCashbox(address payable _refCashbox) onlyOwner public {
        require(_refCashbox!=address(0));
        refCashbox = _refCashbox;
    }
}

/**
 * The sevenTOP contract does this and that...
 */
contract SevenTOP is Ownable{
    uint256 public ethPrice;
    mapping (uint => mapping (uint => Lottery)) public lotterys;
    // mapping (uint => mapping (uint => LimitLottery)) public limitLotterys;
    RefStorage public refStorage;

    address payable public cashbox;

    // struct Loto {
    //     uint time;
    //     uint price;
    // }

    // mapping (address => Loto) public lotteryValue;
    
    constructor() public {
        cashbox = 0x0976eCadc65c9C598bbF774Be78B8d0892173273;
    }

    function createNewLottery(uint _time, uint _price) public onlyOwner returns(address){
        require(address(lotterys[_time][_price])==address(0));
        lotterys[_time][_price] = new Lottery(_price, _time, RefStorage(refStorage), SevenTOP(this));
        lotterys[_time][_price].transferOwnership(msg.sender);
        // lotteryValue[address(lotterys[_time][_price])].time = _time;
        // lotteryValue[address(lotterys[_time][_price])].price = _price;
        refStorage.addContract(address(lotterys[_time][_price]));
        return address(lotterys[_time][_price]);
    }

    // function createNewLimitLottery(uint256 _limit, uint256 _price) public onlyOwner returns(address) {
    //     require(address(limitLotterys[_limit][_price])==address(0));
    //     limitLotterys[_limit][_price] = new LimitLottery(_limit, _price, RefStorage(refStorage), SevenTOP(this));
    //     limitLotterys[_limit][_price].transferOwnership(msg.sender);
    //     refStorage.addContract(address(limitLotterys[_limit][_price]));
    //     return address(limitLotterys[_limit][_price]);
    // }

    function setRefStorage(RefStorage _ref) onlyOwner public returns(bool){
        require(address(_ref)!=address(0x0));
        refStorage = _ref;
        return true;
    } 

    function updateEtherPrice(uint _newEthPrice) public onlyOwner returns(bool){
        ethPrice = _newEthPrice;
        return true;
    }

    function changeCashBox(address payable _cashbox) onlyOwner public {
        require(_cashbox!=address(0));
        cashbox = _cashbox;
    }
}


/**
 * The Lottery contract does this and that...
 */
contract Lottery is Ownable{
    using SafeMath for uint;
    using massAddress for address[];
    mapping (address => address []) referers;
    mapping (address => address) referals;

    address[] public tickets;

    uint256 public futureblock;
    uint256 public countOfTicket;
    
    uint256 timeSpending;
    uint256 public timeStart;
    uint256 public priceLottery; // цена билета
    RefStorage public refStorage;
    SevenTOP public sevenTOP;
    
    event Winner(address indexed user, uint amount);
    event FeePayed(address indexed owner, uint amount);
    event txCostRefunded(address indexed addr, uint256 amount);
    event NewPlayer(address indexed addr, uint amount);
    event BonusSent(address recipient, uint256 amount);
    event WinnerTicket(uint index);
    
    constructor(uint256 _priceLottery, uint256 _timeSpending, RefStorage _refStorage, SevenTOP _sevenTOP) public {
        // timeSpending = _timeSpending;
        priceLottery = _priceLottery;
        timeSpending = _timeSpending.mul(1 minutes);
        // futureblock = block.number + amountOfBlock;
        refStorage = _refStorage;
        sevenTOP = _sevenTOP;
    }

    function () external payable{
        require(calculateTicket(msg.value)>=1);
        uint amount = calculateTicket(msg.value);

        if(msg.value>calculateEther(amount)){
            uint rest = msg.value.sub(calculateEther(amount));
            msg.sender.transfer(rest);
            emit txCostRefunded(msg.sender, rest);
        }

        refStorage.addReferer(bytesToAddress(bytes(msg.data)));

        for(uint i=0; i<amount; i++){
            tickets.push(msg.sender);
            countOfTicket++;
        }
        emit NewPlayer(msg.sender, amount);
        if(playersMoreThanOne() && timeStart==0){
            timeStart = now;
        }
        if(timeStart!=0 && now>=timeStart+timeSpending){
            drawing();
        }
    }
    
    function buyTicket() public payable{
        require(calculateTicket(msg.value)>=1);
        uint amount = calculateTicket(msg.value);

        if(msg.value>calculateEther(amount)){
            uint rest = msg.value.sub(calculateEther(amount));
            msg.sender.transfer(rest);
            emit txCostRefunded(msg.sender, rest);
        }

        refStorage.addReferer(bytesToAddress(bytes(msg.data)));

        for(uint i=0; i<amount; i++){
            tickets.push(msg.sender);
            countOfTicket++;
        }
        emit NewPlayer(msg.sender, amount);
        if(playersMoreThanOne() && timeStart==0){
            timeStart = now;
        }
        if(timeStart!=0 && now>=timeStart+timeSpending){
            drawing();
        }
    }

    function drawing() public {
        require(playersMoreThanOne(), 'Not enough players');
        require(now >= timeStart+timeSpending, "Awaiting time");

        // if (block.number >= futureblock + 240) {
        //     futureblock = block.number;
        // }

        if(countOfTicket<10){
            uint random = uint((blockhash(block.number - 1))) % tickets.length;
            address winner = tickets[random];
            delete tickets;
            uint256 prize = address(this).balance.mul(85).div(100);
            uint256 refAmount = address(this).balance.mul(5).div(100);
            address(uint160(winner)).transfer(prize);
            emit Winner(winner, prize);
            address(uint160(refStorage.getReferal(winner))).transfer(refAmount);
            emit BonusSent(refStorage.getReferal(winner), refAmount);
            
            uint ownerFee = address(this).balance;
            address(uint160(sevenTOP.cashbox())).transfer(ownerFee);
            emit FeePayed(sevenTOP.cashbox(), ownerFee);
            delete tickets;
            countOfTicket = 0;
            emit WinnerTicket(random);
        } else{
            uint random = uint((blockhash(block.number - 1))) % tickets.length;
            address winnerOne = tickets[random];
            tickets = tickets.removeIndexAddress(random);
            emit WinnerTicket(random);
            random = uint((blockhash(block.number - 2))) % tickets.length;
            address winnerTwo = tickets[random];
            emit WinnerTicket(random);
            uint256 prizeOne = address(this).balance.mul(650).div(1000);
            uint256 prizeTwo = address(this).balance.mul(200).div(1000);

            uint256 refAmountOne = address(this).balance.mul(35).div(1000);
            uint256 refAmountTwo = address(this).balance.mul(15).div(1000);

            address(uint160(winnerOne)).transfer(prizeOne);
            emit Winner(winnerOne, prizeOne);
            address(uint160(winnerTwo)).transfer(prizeTwo);
            emit Winner(winnerTwo, prizeTwo);

            address(uint160(refStorage.getReferal(winnerOne))).transfer(refAmountOne);
            emit BonusSent(refStorage.getReferal(winnerOne), refAmountOne);
            address(uint160(refStorage.getReferal(winnerTwo))).transfer(refAmountTwo);
            emit BonusSent(refStorage.getReferal(winnerTwo), refAmountTwo);

            uint ownerFee = address(this).balance;
            address(uint160(sevenTOP.cashbox())).transfer(ownerFee);
            emit FeePayed(sevenTOP.cashbox(), ownerFee);
            delete tickets;
            countOfTicket = 0;
        }
        timeStart = 0;
        // _setFutureBlock();
    }

    // function _setFutureBlock() internal {
    //     futureblock = block.number + amountOfBlock;
    // }
    
    // function checkRandom(uint _block) public view returns(uint256){
    //     return uint((blockhash(_block - 1))) % tickets.length;
    // }
    
    // function checkRandom2(uint _block) public view returns(uint256){
    //     return uint((blockhash(_block - 1)));
    // }
    
    function playersMoreThanOne() public view returns(bool){
        address player = tickets[0];
        for(uint i=0; i<tickets.length; i++){
            if(player!=tickets[i]){
                return true;
            }
        }
        return false;
    }  

    function calculateTicket(uint256 _value) view public returns(uint256){
        uint256 amount = _value.mul(sevenTOP.ethPrice()).div(1 ether).div(priceLottery);
        return amount;
    }
    
    function calculateEther(uint256 _amount) view public returns(uint256){
        uint256 value = _amount.mul(1 ether).mul(priceLottery).div(sevenTOP.ethPrice())+1;
        return value;
    }

    // function getTicketsLength() view public returns(uint256){
    //     return tickets.length;
    // }

    function bytesToAddress(bytes memory source) internal pure returns(address parsedReferrer) {
        assembly {
            parsedReferrer := mload(add(source,0x14))
        }
        return parsedReferrer;
    }
    
    // function takeEther() public {
    //     msg.sender.transfer(address(this).balance);
    // }

    function getTimeEnd() public view returns(uint){
        return timeStart.add(timeSpending).sub(now);
    }

    function getNow() public view returns(uint){
        return now;
    }
    
}

contract LimitLottery is Ownable{
    using SafeMath for uint;
    using massAddress for address[];

    address[] public tickets;

    uint256 public futureblock;
    uint256 public countOfTicket;
    
    uint256 priceLottery; // цена билета
    uint public limit;
    RefStorage public refStorage;
    SevenTOP public sevenTOP;
    
    event Winner(address indexed user, uint amount);
    event FeePayed(address indexed owner, uint amount);
    event txCostRefunded(address indexed addr, uint256 amount);
    event NewPlayer(address indexed addr, uint amount);
    event BonusSent(address recipient, uint256 amount);
    event WinnerTicket(uint index);
    
    constructor(uint256 _priceLottery, uint256 _limit, RefStorage _refStorage, SevenTOP _sevenTOP) public {
        priceLottery = _priceLottery;
        refStorage = _refStorage;
        sevenTOP = _sevenTOP;
        limit = _limit;
    }

    function () external payable{
        require(calculateTicket(msg.value)>=1);
        uint amount = calculateTicket(msg.value);
        if(calculateTicket(msg.value).add(countOfTicket)>=limit){
            amount = limit.sub(countOfTicket);
            msg.sender.transfer(msg.value.sub(calculateEther(amount)));
        } else if(msg.value>calculateEther(amount)){
            msg.sender.transfer(msg.value.sub(calculateEther(amount)));
        }

        refStorage.addReferer(bytesToAddress(bytes(msg.data)));

        for(uint i=0; i<amount; i++){
            tickets.push(msg.sender);
            countOfTicket++;
        }
        if(countOfTicket >= limit){
            drawing();
        }
    }


    function drawing() public {
        uint random = uint((blockhash(block.number - 1))) % tickets.length;
        address winner = tickets[random];
        delete tickets;
        uint256 prize = address(this).balance.mul(85).div(100);
        uint256 refAmount = address(this).balance.mul(5).div(100);
        address(uint160(winner)).transfer(prize);
        emit Winner(winner, prize);
        address(uint160(refStorage.getReferal(winner))).transfer(refAmount);
        emit BonusSent(refStorage.getReferal(winner), refAmount);
        
        uint ownerFee = address(this).balance;
        address(uint160(owner())).transfer(ownerFee);
        emit FeePayed(owner(), ownerFee);
        delete tickets;
        countOfTicket = 0;
        emit WinnerTicket(random);
    }
    
    // function checkRandom(uint _block) public view returns(uint256){
    //     return uint((blockhash(_block - 1))) % tickets.length;
    // }
    
    // function checkRandom2(uint _block) public view returns(uint256){
    //     return uint((blockhash(_block - 1)));
    // } 

    function calculateTicket(uint256 _value) view public returns(uint256){
        uint256 amount = _value.mul(sevenTOP.ethPrice()).div(1 ether).div(priceLottery);
        return amount;
    }
    
    function calculateEther(uint256 _amount) view public returns(uint256){
        uint256 value = _amount.mul(1 ether).mul(priceLottery).div(sevenTOP.ethPrice())+1;
        return value;
    }

    function getTicketsLength() view public returns(uint256){
        return tickets.length;
    }

    function bytesToAddress(bytes memory source) internal pure returns(address parsedReferrer) {
        assembly {
            parsedReferrer := mload(add(source,0x14))
        }
        return parsedReferrer;
    }
    
    // function takeEther() public {
    //     msg.sender.transfer(address(this).balance);
    // }
    
}