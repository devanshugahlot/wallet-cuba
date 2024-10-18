import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, LogIn, Mail, User } from "react-feather";
// import man from "../../../assets/images/dashboard/profile.png";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { LI, UL, Image, P } from "../../../AbstractElements";
import CustomizerContext from "../../../_helper/Customizer";
import { Account, Admin, Inbox, LogOut, Taskboard } from "../../../Constant";
import BasicMenu from "./UserDropdown";
import { useDisconnect } from 'wagmi'
import MyContext from "../../../Context/MyContext";
import { useAccount } from 'wagmi'
import { checkAddressExists } from "../../../api/integrateConfig";

const UserHeader = () => {
  const history = useNavigate();
  const { address} = useAccount();
  const {userData} = useContext(MyContext);
  const { disconnect } = useDisconnect();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState(userData ? userData.name : 'Test');
  const { layoutURL } = useContext(CustomizerContext);
  const authenticated = JSON.parse(localStorage.getItem("authenticated"));
  const auth0_profile = JSON.parse(localStorage.getItem("auth0_profile"));
  const checkAccountExists = async (account_address) => {
    try{
      if(!account_address){
        return;
      }
      let response = await checkAddressExists(account_address);
      console.log(response,"header");
      if(!response.data){
        window.location.href = "/login"
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    setProfile(localStorage.getItem("profileURL"));
    setName(localStorage.getItem("Name") ? localStorage.getItem("Name") : name);
  }, []);

  const Logout = () => {
    localStorage.removeItem("profileURL");
    localStorage.removeItem("token");
    localStorage.removeItem("auth0_profile");
    localStorage.removeItem("Name");
    localStorage.setItem("authenticated", false);
    disconnect();
    history(`/login`);
    
  };

  const UserMenuRedirect = (redirect) => {
    history(redirect);
  };

  useEffect(()=>{
    if(address){
      checkAccountExists(address);
    }else{
      window.location.href = "/login"
    }
  },[address]);

  return (
    <div className="User-icons">

    <li className="profile-nav user-icons onhover-dropdown  pe-0 py-0" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <div className="media profile-media" style={{display:'flex',alignItems:'center'}}>
        {/* <Image
        
          attrImage={{
            className: "b-r-10 m-0",
            src: `${authenticated ? auth0_profile.picture : profile}`,
            alt: "",
          }}
        /> */}
        {/* <img src="template/public/user-icon1bg.png" alt="" /> */}
        <BasicMenu />
        <AccountCircleRoundedIcon style={{ fontSize: 'large', background:'#A7A8AD', borderRadius:'50%' }} />
        <div className="media-body" >
          <span>{authenticated ? auth0_profile.name : name}</span>
          <P attrPara={{ className: "mb-0 font-roboto" }}>
            {Admin} <i className="middle fa fa-angle-down"></i>
          </P>
        </div>
      </div>
      <UL attrUL={{ className: "simple-list profile-dropdown onhover-show-div" }}>
        <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/users/edit/${layoutURL}`),
          }}>
          <User />
          <span>{Account} </span>
        </LI>

        <LI attrLI={{ onClick: Logout }}>
          <LogIn />
          <span>{LogOut}</span>
        </LI>
      </UL>


    </li>
    </div>

  );
};

export default UserHeader;



{/* <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/email-app/${layoutURL}`),
          }}>
          <Mail />
          <span>{Inbox}</span>
        </LI> */}
{/* <LI
          attrLI={{
            onClick: () => UserMenuRedirect(`/app/todo-app/todo/${layoutURL}`),
          }}>
          <FileText />
          <span>{Taskboard}</span>
        </LI> */}