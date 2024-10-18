import React from 'react';
import { Col, Row } from 'reactstrap';
import { Widgets2Data, Widgets2Data2, WidgetsData, WidgetsData17, WidgetsData18, WidgetsData2, WidgetsData3, WidgetsData4, WidgetsData5, WidgetsData6, WidgetsData7, WidgetsData8 } from '../../../Data/DefaultDashboard';
import Widgets1 from '../../Common/CommonWidgets/Widgets1';
import Widgets2 from '../../Common/CommonWidgets/Widgets2';
import { useAccount } from 'wagmi'
import { buyPackages } from '../../../api/integrateConfig';
import { useState } from 'react';

const WidgetsWrapper = () => {
  const { address} = useAccount(); 
  const [widgets,setWidgets] = useState([
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 20,
      total: ( <span style={{color : "black"}}>$20</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 30,
      total: ( <span style={{color : "black"}}>$30</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 80,
      total: ( <span style={{color : "black"}}>$80</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 160,
      total: ( <span style={{color : "black"}}>$160</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 320,
      total: ( <span style={{color : "black"}}>$320</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 640,
      total: ( <span style={{color : "black"}}>$640</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 1280,
      total: ( <span style={{color : "black"}}>$1280</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 2560,
      total: ( <span style={{color : "black"}}>$2560</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 5120,
      total: ( <span style={{color : "black"}}>$5120</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    },
    {
      title: (<button
        className='active-button'
        >
        Active
      </button>),
      gros: 10240,
      // total: '$10240',
      total : ( <span style={{color : "black"}}>$10240</span>),
      color: 'success',
      // icon: 'return-box',
      icon: 'cart'      
    }               
  ])
  // total: (
  //   <span style={{ color: 'black' }}>$20</span>
  // ),
  const handleClick = async (total)=>{
    console.log("this is the function where you have to get buy package")
    console.log(`the total is : ${total}`)
    // const {userId , address, transactionHash, packageType } = req.body;
    const num = parseInt(total.replace('$' , ''), 10);
    const transactionHash = "0x6df737816d9d21d8ca8a54139af66fb08d45fe9d235e1c779d2b60c5d8035869"; 
    let data = {
      userId : localStorage.getItem("userID"),   //  in order to get user id from this, user must first go to edit profile section because this is where user ID is set to localsotrage otherwise it might throw error
      address : address,
      transactionHash : transactionHash,
      packageType : num
  }
  try{
    const response = await buyPackages(data);
    console.log(response.message);
  }catch(error){
    console.log(`error in buying package from the , data sent from the frontend : ${error.message}`)
  }
  }

  return (
    <>
      <Col xxl='auto'  className='box-col-6'>
        <Row>
          {
            widgets.map((ele)=>(
              <Col  >
                <Widgets1 data={ele} str = 'pck' />
              </Col>
            ))
          }
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

export default WidgetsWrapper;
