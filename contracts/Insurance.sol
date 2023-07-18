// contracts/InsuranceBroker.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/hardhat/console.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract Insurance is ERC721,ERC721URIStorage{
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private tokenIds;

    int userLength;

    string public baseURI;
    struct User{
        uint256 userId;
        string userName;
        string carName;
        uint carPrice;
        uint policyType;
        uint256 premium;
    }
    mapping(uint256=>User) internal users;
    mapping(uint256=>bool) internal ids;

  
   

    constructor() ERC721("InsurancePolicy", "IP") {

    }
    
    function _baseURI(string memory cid) internal  returns (string memory) {
     
    return "https://w3s.link/ipfs";
    }
  
    function addToken(uint256 _userId,string memory _userName,string memory _carName,uint256 _carPrice,uint _policyType,uint256 _premium ) public payable returns(uint256,User memory){
        //  uint256 pId = tokenIds.current();
        require(ids[_userId]==false,"Token already exists");
        require(_premium==msg.value || _premium>msg.value,"Insufficient Amount Paid");

        User memory userData =users[_userId];
        
        userData.userId=_userId;
        userData.userName=_userName;
        userData.carName=_carName;
        userData.carPrice=_carPrice;
        userData.policyType=_policyType;
        userData.premium=_premium;
        users[_userId]=userData;
        ids[_userId]=true;
         _safeMint(msg.sender, _userId);
        //  _setTokenURI(_userId, _uri);
         userLength++;
        return(_userId,users[_userId]);
      }
      function addMetadata(uint256 _userId,string memory _url)public returns(bool)
      {
        require(ids[_userId]==true,"Token not present");
         _setTokenURI(_userId, _url);
         return true;


      }
      function totalUsers ()public returns(int)
      {
        return userLength;
      }
      
    //    function mint(address to,uint256 t_id,string memory _uri) public payable returns(uint256,User memory){

    //     User storage t_user=users[t_id];
    //     require(t_user.userId==t_id," ID donot match");
    //     require(t_user.premium==msg.value || t_user.premium>msg.value,"Insufficient Amount Paid");
        
        
       
    //     console.log("Minting Token");
    //     _safeMint(to, t_id);
    //      _setTokenURI(t_id, _uri);
    //     //  _setTokenURI(t_id, _uri);   
    //     //  _setTokenURI(newItemId,mint_policy);
    //     // tokenIds.increment();
    //     return(t_id,t_user);
    //     //  return (t_id,t_policy);
    // }

      
    //    function mint(address to,uint256 t_id,string memory _uri) public payable returns(uint256,User memory){

    //     User storage t_user=users[t_id];
    //     require(t_user.userId==t_id," ID donot match");
    //     require(t_user.premium==msg.value || t_user.premium>msg.value,"Insufficient Amount Paid");
        
        
       
    //     console.log("Minting Token");
    //     _safeMint(to, t_id);
    //      _setTokenURI(t_id, _uri);
    //     //  _setTokenURI(t_id, _uri);   
    //     //  _setTokenURI(newItemId,mint_policy);
    //     // tokenIds.increment();
    //     return(t_id,t_user);
    //     //  return (t_id,t_policy);
    // }

     function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
       
          function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
        }
    
    }
      // function setBaseURI(string memory cid) public  returns(string memory){
    //     baseURI=cid;
    // }

    //  function tokenURI(uint256 _tokenId) public view override(ERC721, ERC721URIStorage)returns (string memory)
    //     {
    //         // string(abi.encodePacked(a,' ',b));
    //        string memory newToken=_tokenId.toString();
          
    //        return string.concat(baseURI, newToken,".json");
    //     // string mem
    //     // return super.tokenURI(_tokenId,".json");
    //     // return string(bytes.concat(bytes(baseURI), bytes(_tokenId), bytes(".json")));
    //     }
    // event request(User , Policy );

    // function purchaseRequest(string memory _userName,int _userAge,uint256 _carRegNo,int _regRegion,int _carType,string memory _carName,uint256 _carMake,uint256 _carYear,uint256 _carPrice,uint256 _driverLicense,int _policyType) public returns(User memory, Policy memory)
    // {
    //     uint256 pId = tokenIds.current();

    //     User memory userData =users[pId];
    //     userData.userId=pId;
    //     userData.userName=_userName;
    //     userData.userAge=_userAge;
    //     userData.carRegNo=_carRegNo;
    //     userData.regRegion=_regRegion;
    //     userData.carName=_carName;
    //     userData.carType=_carType;
    //     userData.carMake=_carMake;
    //     userData.carYear=_carYear;
    //     userData.carPrice=_carPrice;
    //     userData.driverLicense=_driverLicense;
    //     users[pId]=userData;

    //     Policy memory policy=insurance[pId];
    //     policy.policyId=pId;
    //     policy.policyType=_policyType;
    //     insurance[pId]=policy;
       
    //     emit request(users[pId],insurance[pId]);
    //     return(users[pId],insurance[pId]);

        

    // }
    
   
    // function calculateAmount(uint256 _pId) public returns(uint256,uint256,Policy memory) {
    //     Policy memory policy=insurance[_pId];
        
    //     int reqPolicy=policy.policyType;

    //     User memory customer=users[_pId];
       
    //     uint fl_premium;
    //     uint comp_premium;
    //     uint base_price;
    //     uint c_age;
    //     uint c_region;
        
    //     //Third Party Liability Insurance
    //     if (reqPolicy==0)
    //     {
    //         if (  customer.carMake<1000 || customer.carMake==1000)
    //         {
    //             fl_premium=2094;
    //         }
    //         else if(customer.carMake>1000 && customer.carMake<1500)
    //         {
    //             fl_premium=3416;
    //         }
    //         else if(customer.carMake==1500 || customer.carMake>1500)
    //         {
    //             fl_premium=7897;
    //         }
    //         // emit premium(fl_premium);
           
    //         policy.premiumAmount=fl_premium;
    //     }
    //     //Comprehensive
    //          else if(reqPolicy==1)
    //         {
    //             if(customer.carPrice<100000 || customer.carPrice==100000)
    //             {
    //                 base_price=customer.carPrice*250/10000;
    //             }
    //             else if(customer.carPrice>100000 && customer.carPrice<300000)
    //             {
    //                 base_price=customer.carPrice*235/10000;
    //             }
    //             else if(customer.carPrice==300000 || customer.carPrice>1000000 && customer.carPrice<10000000)
    //             {
    //                 base_price=customer.carPrice*325/10000;
    //             }


    //             if(customer.userAge>22 && customer.userAge<26)
    //             {
    //                 c_age=base_price*25/100;
    //             }
    //             else if(customer.userAge>24 && customer.userAge<31)
    //             {
    //                 c_age=base_price*15/100;
    //             }
    //             else if(customer.userAge>30 && customer.userAge<61)
    //             {
    //                 c_age=base_price+base_price*10/100;
    //             }

    //             //new car or SUV
    //             if(customer.carType==1 || customer.carType==2)
    //             {
    //                 base_price=base_price-base_price*10/100;

    //             }
    //             //sports
    //             else if(customer.carType==3)
    //             {
    //                 base_price=base_price+base_price*20/100;

    //             }

    //             if(customer.regRegion==1){
    //                 c_region=base_price*5/100;

    //             }
                
    //         comp_premium=base_price+c_age+c_region;
    //         policy.premiumAmount=comp_premium;  
    //         }
            
            
    //         insurance[_pId]=policy;
            
           
    //         return(fl_premium,comp_premium,insurance[_pId]);

    // }
    
    // function purchase(int _orderStatus,uint256 p_Id) public payable returns(Policy memory){
        
    //     Policy storage policy1=insurance[p_Id];
        
    //     if (_orderStatus == 1){
            
            
    //         if(msg.value>insurance[p_Id].premiumAmount || msg.value==insurance[p_Id].premiumAmount)
    //         {
    //             insurance[p_Id].orderStatus=_orderStatus;
    //             insurance[p_Id].balance=msg.value-insurance[p_Id].premiumAmount;
    //             insurance[p_Id].premiumPaid=msg.value;
    //             insurance[p_Id].policyPayor=msg.sender;
    //         }
    //         // insurance[p_Id]=policy1;
    //     }
    //     return (insurance[p_Id]);
            


    // }
   
      


   

    // function claimDamage(uint256 _claimId,uint256 _incType,uint256 _incDate,string memory _desc,uint256 _amount) public payable returns (Claim memory)
    // {
    
        
    //     Policy memory c_policy=insurance[_claimId];
    //     require(_incType==1,"Claim type not correct");
    //     require(c_policy.policyPayor==msg.sender,"Only policy holder can claim");
    //     require(c_policy.orderStatus==1,"You donot hold this policy");
    //     Claim memory claim=insuranceClaims[_claimId];


    //     //incidemt Type 1=Damage
    //     if(_incType==1)
    //     {
    //         claim.claimId=c_policy.policyId;
    //         claim.incType=_incType;
    //         claim.incDate=_incDate;
    //         claim.desc=_desc;

    //         uint _value=(msg.value*18/100000);
    //         address acc=0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        
    //         (bool sent, bytes memory data) = acc.call{value: _value}("");
    //     require(sent, "Failed to send Ether");
        
    //       claim.claimAmount=_value;
    //       claim.status="Approved";
    //       insuranceClaims[_claimId]=claim;
    //     }
    //     return (insuranceClaims[_claimId]);
        

    //     }

   
        

