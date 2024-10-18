import React, { useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { H4 } from "../../../AbstractElements";
import SvgIcon from "../Component/SvgIcon";
import { useState } from "react";
import MyContext from "../../../Context/MyContext";
import Swal from 'sweetalert2'
import { useAccount,useDisconnect } from 'wagmi'
import { buyPackages, buySlots, updatePackage, updateslot } from "../../../api/integrateConfig";
import { ABI, BUSDABI, BUSDcontractAddress, contractAddress } from "../../../blockchain";
import { useContractWrite } from 'wagmi'
// const hovertitledata =[
//   {
//     title:'one can purchase this slot only when he was package of $20, $30, $80'
//   }
// ]
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 

const Widgets1 = ({ data , str}) => {  
  const {userData} = useContext(MyContext);
  const {address} = useAccount();
  const [loading,setLoading] = useState(false);
  const [loadingSlot , setLoadingSlot] = useState(false);
  const {writeAsync:approve  
  } = useContractWrite({
    abi:BUSDABI,
    address:BUSDcontractAddress,
    functionName:'approve'    
  }) 
  const {writeAsync:buyPackage  
  } = useContractWrite({
    abi:ABI,
    address:contractAddress,
    functionName:'buyPackage'    
  }) 
  const handleSubmit = async (amount) => {  
    console.log('helloe form there')
    try{
      if(amount <= 0 || amount == ""){
        Swal.fire({
          icon:"error",
          text:"Amount must be greater then zero"
        })
      }
      if(!userData){
        Swal.fire({
          icon:"error",
          text:"Please login again"
        })        
      }
      setLoading(true);
      let response = await buyPackages({userId:userData.userId,address,packageType:amount.toString()});
      let amountInWei = Number(amount) * (10**18);
      let appr = await approve({args:[contractAddress,(amountInWei*2).toString()]});
      await sleep(5000);
      let transaction = await buyPackage({args:[response.data.refferAddress,response.data.packageUpdatAddress,amountInWei.toString()]});
      await sleep(5000);
      let apiResponse = await updatePackage({address,refferAddress:response.data.refferAddress,transactionHash:transaction.hash,packageAddress:response.data.packageUpdatAddress,amount,userId:userData.userId})
      setLoading(false);
      if(apiResponse){
        Swal.fire({
          icon:"success",
          text:'Package Buy Successfully'
        })
      }else{
        Swal.fire({
          icon:"error",
          text:"Internel Server Error"
        })
      }
    }catch(err){
      setLoading(false);
      console.log(err);
      if(err?.response?.data?.message){
        Swal.fire({
          icon:"error",
          text:err?.response?.data?.message
        })
      }else if(err?.response?.data?.error){
        Swal.fire({
          icon:"error",
          text:err?.response?.data?.error
        })
      }else if(err.message){
        Swal.fire({
          icon:"error",
          text:err.message
        })
      }        
    }
  }

  const {writeAsync:buySlot  
  } = useContractWrite({
    abi:ABI,
    address:contractAddress,
    functionName:'buySlot'    
  })
  const handleCLick = async (gros)=>{
    console.log(str)
    console.log(`in hre `)
    setLoadingSlot(true);
    // const num = parseInt(total.replace('$' , ''), 10);
    // console.log(`handle click si clicked and the amount:s${num}s`)
    console.log(`the gros value is : ${gros}`)

    let data = {
        userId : localStorage.getItem("userID"),   //  in order to get user id from this, user must first go to edit profile section because this is where user ID is set to localsotrage otherwise it might throw error
        address : address,
        slotType : gros
    }
    try{
        console.log("data",data);
        console.log(`in hre where the request is called`)
    const response = await buySlots(data); // must read : this is calling the backend api for slots purchase. earlier it was buySlot(data)
    console.log("response",response);
    if(!response){
      Swal.fire({
        icon:"Error",
        text:'Error occured'
      })
      return;
    }
    let amountInWei = Number(response.data.amount) * (10**18);
    let appr = await approve({args:[contractAddress,(amountInWei*2).toString()]});
    await sleep(5000);
    let transaction = await buySlot({args:[response.data.refferAddress,response.data.uplinAddress,amountInWei.toString()]});

    let apiResponse = await updateslot({address,refferAddress:response.data.refferAddress,transactionHash:transaction.hash,uplineAddress:response.data.uplineAddress,amount:response.data.amount,userId:userData.userId})
    setLoading(false);
    if(apiResponse){
        Swal.fire({
          icon:"success",
          text:'Slot Buy Successfully'
        })
      }else{
        Swal.fire({
          icon:"error",
          text:"Internel Server Error"
        })
      }
    console.log(`response recieved from the user is ${response.message}`)
    // for (const key in response) {
    //                 if (response.hasOwnProperty(key)) {
    //                       console.log(key + ": ss :  " + response[key]);
    //                     }
    //                 }
                }catch(error){
                    console.log(` error occurred : ${error.message}`)
                    Swal.fire({
                      icon:"Error",
                      text:'Error occured'
                    })
                }finally{
                  setLoadingSlot(false);
                }
    // const {userId , address, transactionHash, slotType } = req.body;
}

  return (
    <Card className="widget-1">
      <CardBody>
        <div className="widget-content">
          <div className={`widget-round ${data.color}`}>
            <div className="bg-round">
              <SvgIcon className="svg-fill" iconId={`${data.icon}`} />
              <SvgIcon className="half-circle svg-fill" iconId="halfcircle" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <H4>{data.total}</H4>
            <span className="f-light">
  {str === 'slot' ? (
    loadingSlot ? (
      <button className="active-button">Processing...</button>
    ) : (
      <button className="active-button" onClick={() => handleCLick(data.gros)}>Active</button>
    )
  ) : str === 'pck' ? (
    loading ? (
      <button className="active-button">Processing...</button>
    ) : (
      <button className="active-button" onClick={() => handleSubmit(data.gros)}>Active</button>
    )
  ) : null} {/* This will render nothing if str is neither 'slot' nor 'pck' */}
</span>
          </div>
        </div>
        <div className={`font-${data.color} f-w-500`}>
          <i
            className={`icon-arrow-${
              data.gros < 50 ? "down" : "up"
            } icon-rotate me-1`}
          />
          <span>{`${data.gros < 50 ? "-" : "+"}${data.gros}%`}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Widgets1;
