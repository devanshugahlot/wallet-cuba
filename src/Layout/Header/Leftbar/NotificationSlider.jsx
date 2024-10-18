import React from 'react';
// import { Link } from 'react-router-dom';
// import { H6, Image } from '../../../AbstractElements';
// import fireImage from '../../../assets/images/giftools.gif';
// import Slider from 'react-slick';
// import { notificationSliderOption } from './NotificationSliderOption';
import './Leftbar.css'
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


const NotificationSlider = () => {
  return (
    // <div className='notification-slider overflow-hidden '>
    //   <Slider className='m-0' {...notificationSliderOption}>
    //     <div className='d-flex h-100'>
    //       <Image attrImage={{ src: fireImage, alt: 'gif' }} />
    //       <H6 attrH6={{ className: 'mb-0 f-w-400' }}>
    //         <span className='font-primary'>Don't Miss Out! </span>
    //         <span className='f-light'>Out new update has been release.</span>
    //       </H6>
    //       <i className='icon-arrow-top-right f-light' />
    //     </div>
    //     <div className='d-flex h-100'>
    //       <Image attrImage={{ src: fireImage, alt: 'gif' }} />
    //       <H6 attrH6={{ className: 'mb-0 f-w-400' }}>
    //         <span className='f-light'>Something you love is now on sale! </span>
    //       </H6>
    //       <Link className='ms-1' to='https://1.envato.market/3GVzd' target='_blank'>
    //         Buy now !
    //       </Link>
    //     </div>
    //   </Slider>
    // </div>
    <>
      {/* <div style={{ display: "flex" , width:'700px'}} className="lefticon">
        <div
          style={{
            display: "flex",
            justifyContent:'center',
            alignItems: "center",
          }}
          className="fristicon"
        >
          <h5 style={{ fontSize: '16px', fontFamilyL: 'Roboto, Helvetica, Arial, sans-serif' }}>Main Wallet</h5>
          <div className="frist-wallet">
            <AccountBalanceWalletIcon
              style={{ color: "rgb(216, 175, 114)" }}
            />
            <span style={{ color: '#000', marginLeft: '3px' }}>10</span>
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center",justifyContent:'center', gap:'0px' }}
          className="secondicon"
        >
          <h5 style={{ fontSize: '16px', fontFamilyL: 'Roboto, Helvetica, Arial, sans-serif' }}>Main Wallet</h5>
          <div className="second-wallet">
            <AccountBalanceWalletIcon
              style={{ color: "rgb(216, 175, 114)" }}
            />
            <span style={{ color: '#000', marginLeft: '3px' }}>100</span>
          </div>
        </div>
       
      </div> */}
    </>
  );
};

export default NotificationSlider;
