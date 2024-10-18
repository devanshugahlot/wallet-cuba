import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { BackgroundColor, EmailAddress, ForgotPassword, Password, RememberPassword, SignIn } from "../Constant";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import man from "../assets/images/dashboard/profile.png";
import { readContract } from '@wagmi/core'
import CustomizerContext from "../_helper/Customizer";
import OtherWay from "./OtherWay";
import { ToastContainer, toast } from "react-toastify";
import { useAccount,useDisconnect } from 'wagmi'
import { checkAddressExists, createAccount, updateData } from "../api/integrateConfig";
import { getNetwork } from '@wagmi/core'
import { ABI, BUSDABI, BUSDcontractAddress, contractAddress } from "../blockchain";
import Swal from 'sweetalert2'
import { useContractWrite } from 'wagmi'
import MyContext from "../Context/MyContext";
import { useSearchParams } from 'react-router-dom'
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Signin = ({ selected }) => {
  const { address,status} = useAccount(); 
  const { chain } = getNetwork();
  const [email, setEmail] = useState("test@gmail.com");
  const [balance,setBalance] = useState(0);
  const [password, setPassword] = useState("test123");
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const [walletAddress, setWalletAddress] = useState("");   //new line added by me
  const [showForm,setShowForm] = useState(false);
  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [isLoading,setLoading] = useState(false);
  const [name, setName] = useState(localStorage.getItem("Name"));
  const {getUserData} = useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams()
  
  const {writeAsync:approve  
  } = useContractWrite({
    abi:BUSDABI,
    address:BUSDcontractAddress,
    functionName:'approve'    
  }) 
  const {writeAsync:invest  
  } = useContractWrite({
    abi:ABI,
    address:contractAddress,
    functionName:'invest'    
  }) 


  const checkAccountExists = async (account_address) => {
    try{
      if(!account_address){
        return;
      }
      let response = await checkAddressExists(account_address);
      console.log(response);
      if(response.data){
        getUserData(account_address)
        if(response.data.isActive){          
          localStorage.setItem("login", JSON.stringify(true));
          history(`/dashboard/default/${layoutURL}`);
        }else{
          setShowForm(true);
        }
      }else{
        setShowForm(true);
      }
    }catch(err){
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

  const getBalance = async () => {
    if(address){
      
      let decimals = await readContract({
        abi:BUSDABI,
        address: BUSDcontractAddress,
        functionName: 'decimals',
      })
      const result = await readContract({
        abi:BUSDABI,
        address: BUSDcontractAddress,
        functionName: 'balanceOf',
        args: [address],
      })
      checkAccountExists(address);
      setBalance(Number(result)/10**Number(decimals));      
    }
  }

  

  // useEffect(() => {
  //   localStorage.setItem("profileURL", man);
  //   localStorage.setItem("Name", "Emay Walter");
  // }, [value, name]);

  const loginAuth = async (e) => {
    e.preventDefault();
    setValue(man);
    setName("Emay Walter");
    if (email === "test@gmail.com" && password === "test123") {
      localStorage.setItem("login", JSON.stringify(true));
      history(`/dashboard/default/${layoutURL}`);
      toast.success("Successfully logged in!..");
    } else {
      toast.error("You enter wrong password or username!..");
    }
  };


  const signin = async () => {
    if(!address){
      Swal.fire({
        icon:"error",
        text:"Please connect wallet"
      });      
      return;
    }

    if(!walletAddress){
      Swal.fire({
        icon:"error",
        text:"Please enter refferal address"
      })
      return;
    }

    if(Number(balance) <= 11){
      Swal.fire({
        icon:"error",
        text:'Balance should be greater then 11 USDT'
      })
      return;
    }

    try{
      const data = {        
        address : address,
        referBy : walletAddress
      }
      let response = await createAccount(data);
      
      if(response.data){     
      setLoading(true)   
        let decimals = await readContract({
          abi:BUSDABI,
          address: BUSDcontractAddress,
          functionName: 'decimals',
        })
  
        let amount = 11 * ((10) ** Number(decimals));
        let half = Number(11 / 2);
        let amounts = Array();
        for(let i=0;i<response.data.uplineAddress.length;i++){
          let levelDivide = Number(Number(half) / 11);
          amounts.push(levelDivide);
        }
        console.log(amounts);
        let totalAmount = amounts.reduce((ac,cur)=>Number(ac)+Number(cur),0);
        console.log(totalAmount);
        let adminIncome = Number(half) - Number(totalAmount);

        let approved = await approve({args:[contractAddress,"22000000000000000000"],from:address})
        await sleep(5000);
        let amountInWei = Array();
        amounts.forEach((element,index)=>{
          amountInWei.push(Number(element) * Number(10**18).toString());
        })
        console.log(amounts, " amounts");
        let adminIncomeWei = (Number(adminIncome) * Number(10 ** 18)).toString();
        let halfWei = (Number(half) * (10 ** 18)).toString();
        console.log(halfWei, " halfWei");
        console.log(adminIncomeWei,"adminIncomeWei");
        let invested = await invest({args:[response.data.refferAddress,response.data.uplineAddress,amountInWei,halfWei,adminIncomeWei]});
        await sleep(5000);
        setLoading(false);
        response = await updateData({address,referBy:walletAddress,transactionHash:invested.hash,uplineAddresses:response.data.uplineAddress,amount:11,levelDistribution:amounts,adminIncome:adminIncomeWei/10**18})        
        getUserData(address);
        localStorage.setItem("login", JSON.stringify(true));
        history(`/dashboard/default/${layoutURL}`);
      }else{
      setLoading(false)
        localStorage.setItem("login", JSON.stringify(true));
        history(`/dashboard/default/${layoutURL}`);
      }
      
    }catch(err){   
    setLoading(false)
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

  useEffect(()=>{
    console.log(searchParams.get('refferal'))
    if(searchParams.get('refferal')){
      setWalletAddress(searchParams.get('refferal'))
    }
  },[searchParams])

  useEffect(()=>{      
    if(address){
      getBalance();
    }else{
      setShowForm(false);
    }    
  },[address])
  

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <H4 >{selected === "simpleLogin" ? "" : "Sign In With Wallet Login"}</H4>
                  <P>{"Enter your email & password to login"}</P>
                  {/* <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input className="form-control" type={togglePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup> */}
                  <w3m-button />
                  <p style={{marginBottom:"10px"}}></p>
                  {
                    showForm &&
                    <>
                      <FormGroup className="position-relative">
                        <Label className="col-form-label m-0 pt-0">
                          Refferal Wallet Address (Trust Wallet, Metamask)
                        </Label>
                        
                        <div className="position-relative">
                          <Input
                            className="form-control"
                            type="text"
                            name="walletAddress"
                            placeholder="Enter your refferal wallet address"
                            required
                            value={walletAddress}
                            onChange={(event) => setWalletAddress(event.target.value)}
                          />
                        </div>
                        <small className="text-muted">Joining Amount: $11</small>
                      </FormGroup>
                      <div>
                          <p>Wallet : {status ? status == 'disconnected' ? 'Not Connected' : 'Connected' : 'Not Connected'}</p>
                          <p>Network : {chain ? chain.name : 'Not Connected'}</p>
                          <p>Registration : Available</p>
                          <p>Balance : {balance} USDT</p>
                          <p>Approved : {status ? status == 'disconnected' ? 'Not Connected' : 'Connected' : 'Not Connected'}</p>
                        </div>
                      <div className="position-relative form-group mb-0">
                        {/* <div className="checkbox">
                          <Input id="checkbox1" type="checkbox" />
                          <Label className="text-muted" for="checkbox1">
                            {RememberPassword}
                          </Label>
                        </div>

                        <Link className='link' to={`/pages/authentication/forget-pwd`}>
                          {ForgotPassword}
                        </Link> */}                    
                        <p>
                          {""}
                          </p>
                        {/* <FormGroup> */}
                          {!isLoading ?
                          <button
                          type="button"
                          
                          className="d-block w-100"
                          onClick={signin}
                            style={{          
                              border:'none',
                              padding:'10px 0',
                              color: "#000",
                            }}
                          >
                            Create Account
                          </button> : 
                          <button
                          type="button"                          
                          className="d-block w-100"                          
                            style={{          
                              border:'none',
                              padding:'10px 0',
                              fontWeight:'bold',
                              color: "#000",
                            }}
                          >
                            Pending...
                          </button>                           
                          }
                        {/* </FormGroup>                     */}
                      </div>
                    </>
                  }
                  {/* <OtherWay /> */}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default Signin;
