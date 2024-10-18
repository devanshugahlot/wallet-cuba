import React, { useContext, useState } from 'react';
import { Grid } from 'react-feather';
import { Link } from 'react-router-dom';
import { Image } from '../../AbstractElements';
import CubaIcon from '../../assets/images/logo/logo.png';
import CustomizerContext from '../../_helper/Customizer';
import logo from './images/GrowWaysLogo.png'

const SidebarLogo = () => {
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } = useContext(CustomizerContext);

  const openCloseSidebar = () => {
    toggleSidebar(!toggleIcon);
  };

  const layout1 = localStorage.getItem("sidebar_layout") || layout;

  return (
    <div className='logo-wrapper'>
      {layout1 !== 'compact-wrapper dark-sidebar' && layout1 !== 'compact-wrapper color-sidebar' && mixLayout ? (
        <Link to={`/dashboard/default/${layoutURL}`}>
          <div style={{display : "flex" , alignItems : "center"}}>
          <Image attrImage={{ className: 'img-fluid d-inline', src: logo, alt: '' , style : {height : "90px" , width : "80px"}}} />
            <p style={{fontSize : "20px" , marginTop : "20px"}}>Groways</p>
            </div>
        </Link>
      ) : (
        <Link to={`/dashboard/default/${layoutURL}`}>
          <Image attrImage={{ className: 'img-fluid d-inline', src: `${require('../../assets/images/logo/logo_dark.png')}`, alt: '' }} />
        </Link>
      )}
      <div className='back-btn' onClick={() => openCloseSidebar()}>
        <i className='fa fa-angle-left'></i>
      </div>
      <div className='toggle-sidebar' onClick={openCloseSidebar}>
        <Grid className='status_toggle middle sidebar-toggle' />
      </div>
    </div>
  );
};

export default SidebarLogo;
