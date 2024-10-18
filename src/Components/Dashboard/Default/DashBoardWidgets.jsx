import React ,{useContext, useState} from 'react';
import { Col, Row } from 'reactstrap';
import Widgets1 from '../../Common/CommonWidgets/Widgets1';
import Widgets2 from '../../Common/CommonWidgets/Widgets2';
import Swal from 'sweetalert2'
import { WidgetsData10, WidgetsData11, WidgetsData12, WidgetsData13, WidgetsData14, WidgetsData15, WidgetsData16, WidgetsData9 } from '../../../Data/DefaultDashboard';
import { useAccount } from 'wagmi'
import { buySlots,updateslot } from '../../../api/integrateConfig';
import { useContractWrite } from 'wagmi'
import MyContext from '../../../Context/MyContext';
import { ABI, BUSDABI, BUSDcontractAddress, contractAddress } from '../../../blockchain';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const SlotActivation = () => {
    const {userData} = useContext(MyContext);
  const [loading,setLoading] = useState(false);
  const {writeAsync:approve  
  } = useContractWrite({
    abi:BUSDABI,
    address:BUSDcontractAddress,
    functionName:'approve'    
  }) 
  const {writeAsync:buySlot  
  } = useContractWrite({
    abi:ABI,
    address:contractAddress,
    functionName:'buySlot'    
  })
    const { address} = useAccount();  
    

    const handleCLick = async (gros)=>{
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
                    }
        // const {userId , address, transactionHash, slotType } = req.body;
    }

    return (
        <>
        <p>hello </p>
            <Col xxl='auto' className='box-col-6'>
                <Row>
                {/* onClick={handleCLick(WidgetsData9.total)} */}
                    <Col title='one can purchase this slot only when he was package of $20, $30, $80' >
                        <Widgets1 data={WidgetsData9} str = 'slot' />
                    </Col>
                    <Col title='one can purchase this slot only when he was package of $160' onClick={()=>{handleCLick(WidgetsData10.gros)}}>
                        <Widgets1 data={WidgetsData10}  str = 'slot' />
                    </Col>
                    <Col title='one can purchase this slot only when he was package of $160' onClick={()=>{handleCLick(WidgetsData11.gros)}}>
                        <Widgets1 data={WidgetsData11} str = 'slot' />
                    </Col>
                    <Col title='one can purchase this slot only when he was package of $320' onClick={()=>{handleCLick(WidgetsData12.gros)}}>
                        <Widgets1 data={WidgetsData12} str = 'slot' />
                    </Col>
                </Row>
            </Col> 
            <Col xxl='auto' className='box-col-6'>
                <Row>
                    <Col title='one can purchase this slot only when he was package of $320' onClick={()=>{handleCLick(WidgetsData13.gros)}}>
                        <Widgets1 data={WidgetsData13} str = 'slot' />
                    </Col>

                    <Col title='one can purchase this slot only when he was package of $640' onClick={()=>{handleCLick(WidgetsData14.gros)}}>
                        <Widgets1 data={WidgetsData14} str = 'slot' />
                    </Col>
                    <Col title='one can purchase this slot only when he was package of $1280' onClick={()=>{handleCLick(WidgetsData15.gros)}}>
                        <Widgets1 data={WidgetsData15} str = 'slot' />
                    </Col>
                    <Col title='one can purchase this slot only when he was package of $2560' onClick={()=>{handleCLick(WidgetsData16.gros)}}>
                        <Widgets1 data={WidgetsData16} str = 'slot' />
                    </Col>
                </Row>
            </Col>
            {/* <Col xxl='auto'   className='box-col-6'>
        <Row>
          <Col x xl='6' className='box-col-12'>
            <Widgets2 data={Widgets2Data} />
          </Col>
          <Col x xl='6' className='box-col-12'>
            <Widgets2 chartClass='profit-chart ' data={Widgets2Data2} />
          </Col>
        </Row>
      </Col> */}
        </>
    );
};

export default SlotActivation;
