import React, { Fragment, useEffect, useRef, useState } from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumbs } from "../../../AbstractElements";
import './DashBoard.css'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import NorthIcon from '@mui/icons-material/North';
import { FaCopy } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import IntegrationNotistack from "./CopySuccsessful";
import { CiShare1 } from "react-icons/ci";
import { FaWallet } from "react-icons/fa6";
import { fetchAllActivities, fetchAllIncomeInfo, fetchLatestAnnouncement, fetchPackageInfoForDashboardBox, fetchSlotsInfoForDashboardBox } from "../../../api/integrateConfig";
import {useAccount} from 'wagmi';
import MyContext from "../../../Context/MyContext";
import { useContext } from "react";






const Dashboard = () => {
  const [refferalIncome , setRefferalIncome] = useState();
  const [levelIncome , setLevelIncome] = useState();
  const [slotIncome , setSlotIncome] = useState();
  const [totalIncome , setTotalIncome] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [packageIncome , setPackageIncome] = useState();
  const [totalReferrals , setTotalReferrals] = useState();
  const {address} = useAccount();
  const {userData} = useContext(MyContext);
  const [platformData , setPlatformData] = useState([])
  const [listOfALLPackages , setListOfAllPackages] = useState([]);
  const [listOfAllSlots , setListOfAllSlots] = useState([]);


  const [visibleItems, setVisibleItems] = useState(15); // Number of items to display initially

  const [isSeeMoreVisible, setIsSeeMoreVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
console.log(userData);  const [announcement , setAnnouncement] = useState('')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
        setIsSeeMoreVisible(false); // Reset visibility on larger screens
      }
    };
    localStorage.setItem("userID" , userData.userId)
    // Initial check on component mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSeeMoreClick = () => {
    setIsSeeMoreVisible(true);
    setIsButtonVisible(false);
  };


  const textToCopyRef = useRef(null);

  const handleCopyClick = () => {
    // Select the text inside the span
    textToCopyRef.current.select();
    // Copy the selected text to the clipboard
    document.execCommand('copy');
    // Deselect the text after copying
    window.getSelection().removeAllRanges();
  };

  // const platformdata1 = [
  //   {
  //     usericon: (<PersonAddAltRoundedIcon sx={{ fontSize: "15px" }} />),
  //     newuser: 'New User Joinabcd',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'NewUser'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<PersonAddAltRoundedIcon sx={{ fontSize: "15px" }} />),
  //     newuser: 'New User Join',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'NewUser'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<PersonAddAltRoundedIcon sx={{ fontSize: "15px" }} />),
  //     newuser: 'New User Join',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'NewUser'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<PersonAddAltRoundedIcon sx={{ fontSize: "15px" }} />),
  //     newuser: 'New User Join',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'NewUser'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<PersonAddAltRoundedIcon sx={{ fontSize: "15px" }} />),
  //     newuser: 'New User Join',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'NewUser'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<PersonAddAltRoundedIcon sx={{ fontSize: "15px" }} />),
  //     newuser: 'New User Join',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'NewUser'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },
  //   {
  //     usericon: (<FaWallet style={{ color: 'green' }} />),
  //     newuser: '+5 BUSD in x4',
  //     UserId: '869255',
  //     jioningtiming: '7 minutes',
  //     className: 'transaction'
  //   },


  // ]

  const showMoreItems = () => {
    setVisibleItems(visibleItems + 15); // Increase the number of visible items
  };

  const boxdata3 = [
    { name: 'x3/x4', link:  '0x017.....15597' }
  ]


  useEffect(()=>{
    const fetchListOfActivities = async()=>{
      try{
        const activityList = await fetchAllActivities();
        setPlatformData(activityList.allActivities);
        // console.log(activityList)
        // console.log(`activity list is : ${platformData}`)

      }catch(error){
        console.log(`error in fetching list of activities in useEffect : ${error.message}`)
      }
    }
    // fetchListOfActivities();

    const fetchAllIncome = async()=>{
      // const address = localStorage.getItem("address");
      let data = {
        address : address
      }
      try{
      const response = await fetchAllIncomeInfo(data);
      setTotalIncome(response.data.totalIncome);
      // setTotalProfit(response.data.totalProfit)
      setTotalReferrals(response.data.totalTeam);
      setRefferalIncome(response.data.refferalIncome);
      setPackageIncome(response.data.packageIncome);
      setSlotIncome(response.data.slotIncome);
      setLevelIncome(response.data.levelIncome);
      // setTotalTeam(response.data.totalTeam);
      setTotalUsers(response.data.totalMembers);
      }catch(error){
        console.log(`error in fetching all data : ${error.message}`);
      }
    
    }

    const fetchAnnouncement = async()=>{
      try{
        const response = await fetchLatestAnnouncement();
        setAnnouncement(response.statement);

      }catch(error){
        console.log(`error in fetch announcement : ${error.message}`);
      }
    }

    const fetchAllPackages = async()=>{
      try{
        let data = {
          address : address
        }
        const response = await fetchPackageInfoForDashboardBox(data);
        setListOfAllPackages([...response.allPackagesOfUser]);


      }catch(error){
        
      }
    }
    const fetchAllSlots = async()=>{
      try{
        const idOfuser = userData ? userData.userId : "";
        let data = {
          userId : idOfuser
        }
        const response = await fetchSlotsInfoForDashboardBox(data);
        setListOfAllSlots([...response.slotsOfUser]);

      }catch(error){
        console.log(`error in fetch all slots for dashboard function`)
      }
    }

    fetchListOfActivities();
    fetchAllIncome();
    fetchAnnouncement();
    fetchAllPackages();
    fetchAllSlots();

  }, [])


  const formatTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);

    const timeDifferenceInMilliseconds = currentDate - createdAtDate;
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    const minutes = Math.floor(timeDifferenceInSeconds / 60);

    if (minutes < 1) {
        return 'Just now';
    } else if (minutes < 60) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (hours < 24) {
            return hours === 1 ? `1 hour ago` : `${hours} hours ago`;
        } else {
            const days = Math.floor(hours / 24);
            const remainingHours = hours % 24;

            if (remainingMinutes === 0 && remainingHours === 0) {
                return days === 1 ? `1 day ago` : `${days} days ago`;
            } else if (remainingMinutes === 0) {
                return days === 1 ? `1 day ${remainingHours} hours ago` : `${days} days ${remainingHours} hours ago`;
            } else if (remainingHours === 0) {
                return days === 1 ? `1 day ${remainingMinutes} minutes ago` : `${days} days ago`;
            } else {
                return days === 1 ? `1 day ${remainingHours} hours ago` : `${days} days ${remainingHours} hours ago`;
            }
        }
    }
}
console.log(process.env)
  return (
    <div className="dashboard-container">

      <Fragment>
        <Breadcrumbs mainTitle="Dashboard" parent="Dashboard" title="Default" />
        <Container fluid={true}>

          {/* <div className='notification-slider overflow-hidden '>
       <Slider className='m-0' {...notificationSliderOption}>
       <div className='d-flex h-100'>
       <Image attrImage={{ src: fireImage, alt: 'gif' }} />
       <H6 attrH6={{ className: 'mb-0 f-w-400' }}>
       <span className='font-primary'>Don't Miss Out! </span>
       <span className='f-light'>Out new update has been release.</span>
           </H6>
           <i className='icon-arrow-top-right f-light' />
         </div>
         <div className='d-flex h-100'>
         <Image attrImage={{ src: fireImage, alt: 'gif' }} />
         <H6 attrH6={{ className: 'mb-0 f-w-400' }}>
         <span className='f-light'>Something you love is now on sale! </span>
         </H6>
         <Link className='ms-1' to='https:1.envato.market/3GVzd' target='_blank'>
             Buy now !
             </Link>
             </div>
             </Slider>
            </div> */}

          {/* <DashBoardWidgets /> */}
          <Row style={{ marginBottom: '50px' }}>


            <div className="dashboard-main-container">
              <div className="dashboard-inner-container">

                <div className="main-upper-left-div">

                  <div className="user-img-box">
                  <img width={'120px'} src={`${process.env.REACT_APP_IMAGE_URL}/${userData.profilePicture}`} alt="" />
                  </div>
                  <div>
                    <span style={{ color: '#8B9FA8', fontSize: '23px', fontWeight: '800' }}>{userData ? "ID "+userData.userId : ""}</span>
                  </div>
                  <div className={`see-more ${isSeeMoreVisible ? 'visible' : ''}`}>

                    <div>
                      <span style={{ color: '#black', fontSize: '16px', fontWeight: '600' }}>{address ? address.slice(0,7)+'...'+address.slice(38,48) : "0x0000...00000"}</span>
                    </div>
                    <div style={{ color: 'gray' }}>
                      Invited At {new Date(userData.createdAt).toLocaleDateString()} 
                      {/* <span className="ID-box">ID 1</span> */}
                    </div>
                  </div>

                  {isButtonVisible && <button className="see-more-1" onClick={handleSeeMoreClick}><IoEyeSharp /> Show See More</button>}

                </div>
                <div className="main-upper-right-div">
                  <div className="right-inner-row">
                    <div>
                      <span className="right-box-1-heading"> Referral link </span>
                    </div>
                    <div className="right-inner-flex-box">
                      <div>
                        {/* Use a ref to access the span text */}
                        <input
                          ref={textToCopyRef}
                          type="text"
                          value={userData ? `${process.env.REACT_APP_WEBSITE_URL}/login?refferal=${address}` : ""}
                          readOnly
                          style={{ color: '#406AFF', fontSize: '18px', fontWeight: '800', border: 'none', outline: 'none', background: 'transparent', width: '250px' }}
                        />
                      </div>
                      <div className="copy-button" onClick={handleCopyClick}>

                        <IntegrationNotistack />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* <a className="group absolute bottom-[-10px] sm:bottom-[-13px] z-[11] left-1/2 -translate-x-1/2 p-2.5" href="/social?user=468">
              <div className="flex items-center justify-center flex-row  space-x-2 "><div className="p-[3px] sm:p-[2px] w-[120px] sm:w-[105px]" style={{ backgroundImage: 'url("/social/likecounter/likeCounterBg.png")', backgroundRepeat: 'round', backgroundSize: 'cover' }}><div className="flex justify-between items-center bg-[#072230] group-hover:bg-transparent rounded px-2 py-0.5 space-x-3 "><span className="text-[#D885FF] group-hover:text-white group-hover:font-normal font-light text-xs sm:text-[10px]">Social</span><div className="flex space-x-1"><img className="sm:w-2.5" src="/social/likecounter/likeIcon.svg" /><span className="text-white font-light group-hover:font-normal text-xs sm:text-[10px]">0</span>
              </div></div></div>
              </div>
              </a> */}


            </div>




            <div className="dashboard-container-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <div className="dashboard-left-box" >

                <div className="first-container-box-left">
                  <b>Team</b>
                  <h5>2</h5>
                  <div className="icon-redius" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="zero-number"> 0</div>
                    <div className="reload-icon"> <img src="/images/activity_white.webp" alt="" /></div>
                  </div>
                </div>
                <div className="first-container-box-left">
                  <b>Total Referral</b>
                  <h5>{totalReferrals}</h5>
                  <div className="icon-redius" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="zero-number"> 0</div>
                    <div className="reload-icon"> <img src="/images/activity_white.webp" alt="" /></div>
                  </div>
                </div>
                {/* <div className="first-container-box-left">
                  <b>Current Slot</b>
                  <h5>27</h5>
                  <div className="icon-redius" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="zero-number"> 0</div>
                    <div className="reload-icon"> <img src="/images/activity_white.webp" alt="" /></div>
                  </div>
                </div> */}
              </div>
              <div className="dashboard-right-box" >
               
                <div className="first-container-box-left">
                  <b>Total Profit</b>
                  <h5>{totalIncome}</h5>
                  <div className="icon-redius" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="zero-number"> 0</div>
                    <div className="reload-icon"> <img src="/images/activity_white.webp" alt="" /></div>
                  </div>
                </div>
                <div className="first-container-box-left">
                  <b>Today Profit</b>
                  <h5>{totalIncome}</h5>
                  <div className="icon-redius" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="zero-number"> 0</div>
                    <div className="reload-icon"> <img src="/images/activity_white.webp" alt="" /></div>
                  </div>
                </div>
              </div>

            </div>

            <div className="announsment">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="Announcment-text" >
                  Announcment :
                </div>
                <div style={{ width: '80%', paddingLeft: '15px' }}>
                  <marquee className="hurryup" behavior="smooth" direction="left" >
                    {announcement} 
                    {/* Hurry up! 50% OFF For New User */}
                  </marquee>
                </div>
              </div>
            </div>


            <Row className="m-0">
              <div className="dashboard-main-box">
                <div className="dashboard-container">

                  <div className="dashboard-container-box dashboard-boxes"  >
                    <div>
                      <div> <span style={{ fontSize: '34px', fontWeight: '500' }}>
                        {refferalIncome}
                      </span>
                      </div>
                      <div> <span>
                        Referral Income
                      </span>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-container-box dashboard-boxes" >
                    <div>
                      <div> <span style={{ fontSize: '34px', fontWeight: '500' }}>
                        {levelIncome}
                      </span>
                      </div>
                      <div> <span>
                        Level Income
                      </span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-container-box dashboard-boxes" >
                    <div>
                      <div> <span style={{ fontSize: '34px', fontWeight: '500' }}>
                        {packageIncome}
                      </span>
                      </div>
                      <div> <span>
                        Package Upgrade Income
                      </span>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-container-box dashboard-boxes" >
                    <div>
                      <div> <span style={{ fontSize: '34px', fontWeight: '500' }}>
                        {slotIncome}
                      </span>
                      </div>
                      <div> <span>
                        Slot Income
                      </span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-container-box dashboard-boxes" >
                    <div>
                      <div> <span style={{ fontSize: '34px', fontWeight: '500' }}>
                        {totalIncome}
                      </span>
                      </div>
                      <div> <span>
                        Total Income
                      </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </Row>

            <Row className="m-0">
              <div className="main-package-slot-container">
                <div className="inner-package-slot-container">
                  <div className="inner-left-package-container">
                    <div className="package-first-flex">
                      <div>
                        <div>
                          <span className="package-header">
                            Package
                          </span>
                        </div>

                      </div>

                      <div>
                        <div>
                          <span className="package-header">
                            {userData.packageIncome}
                          </span>
                        </div>
                        <div>

                        </div>
                      </div>
                    </div>
                    <div className="empty-div-row">
                      <div className="empty-main-div">
                        <div className="empty-row-1-div">
                          {listOfALLPackages.includes("20")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("30")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("80")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("160")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("320")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("640")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("1280")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("2560")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("5120")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          {listOfALLPackages.includes("10240")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div>)}
                          
                          {/* <div className="empty-div empty-div-1-1">  
                            <svg   // not important
                              className="fill-current text-white"
                              width="24"
                              height="24"
                              viewBox="0 0 20 20"
                              fill="white" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm0-11.334a.5.5 0 0 1 .5.5V10a.5.5 0 0 1-1 0V6.667a.5.5 0 0 1 .5-.5Zm0 6.668a.5.5 0 0 0 0 1h.01a.5.5 0 0 0 0-1H10Z"
                              ></path>
                            </svg>

                          </div> */}
                          {/* <div className="empty-div empty-div-1-1">
                            <svg
                              className="fill-current text-white"
                              width="24"
                              height="24"
                              viewBox="0 0 20 20"
                              fill="white" // Set the fill property to "white"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm0-11.334a.5.5 0 0 1 .5.5V10a.5.5 0 0 1-1 0V6.667a.5.5 0 0 1 .5-.5Zm0 6.668a.5.5 0 0 0 0 1h.01a.5.5 0 0 0 0-1H10Z"
                              ></path>
                            </svg>
                          </div> */}
                          {/* <div className="empty-div"></div> */}
                        </div>
                        {/* <div className="empty-row-1-div">
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                        </div> */}
                        {/* <div className="empty-row-1-div">
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                        </div> */}
                      </div>
                      <div className="empty-right-div">
                        <div>
                          {/* <span style={{ color: '#E1444D', fontSize: '14px' }}>
                            Missed Profits
                          </span> */}
                        </div>
                        <div>
                          {/* <span style={{ color: '#E1444D', fontSize: '20px', fontWeight: '700' }}>
                            40 USD</span> */}
                        </div>
                        <div className="preview-button">
                          <button>View</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inner-left-package-container inner-right-slot-container">
                    <div className="package-first-flex">
                      <div>
                        <div>
                          <span className="package-header">
                            Slot
                          </span>
                        </div>

                      </div>

                      <div>
                        <div>
                          <span className="package-header">
                            {userData.slotIncome}
                          </span>
                        </div>
                        <div>

                        </div>
                      </div>
                    </div>

                    <div className="empty-div-row">
                      {}
                      <div className="empty-main-div">
                        <div className="empty-row-1-div">
                        {listOfAllSlots.includes("20")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {listOfAllSlots.includes("50")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {listOfAllSlots.includes("100")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {listOfAllSlots.includes("200")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {listOfAllSlots.includes("500")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {listOfAllSlots.includes("800")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {listOfAllSlots.includes("1000")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {listOfAllSlots.includes("1500")?(
                            <div className="empty-div empty-div-2-1"></div>
                          ): (<div className="empty-div"></div> )}
                          {/* <div className="empty-div empty-div-2-1"></div> */}
                          {/* <div className="empty-div empty-div-2-1"></div>
                          <div className="empty-div empty-div-2-1"></div>
                          <div className="empty-div"></div> */}
                        </div>
                        {/* <div className="empty-row-1-div">
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                        </div> */}
                        {/* <div className="empty-row-1-div">
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                          <div className="empty-div"></div>
                        </div> */}
                      </div>
                      <div className="empty-right-div-box-2">
                        <div className="preview-button-right-box ">
                          <button>View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* inner-right-slot-container */}
                </div>
              </div>
            </Row>

            {/* <Row>
              <div className="dashboard-main-box">
                <div className="dashboard-container dashboard-container-2">

               
                  <div className="dashboard-container-box dashboard-boxes" >

                    <span>total Memeber
                    </span>
                  </div>

                  <div className="dashboard-container-box dashboard-boxes" >
                    <span>today member
                    </span>
                  </div>
                  <div className="dashboard-container-box dashboard-boxes" >
                    <span>total referral</span>
                  </div>

                  <div className="dashboard-container-box dashboard-boxes" >
                    <span>total deposite</span>
                  </div>

                </div>
              </div>

            </Row> */}


            <div className="platform-heading">
              <span>Platform recent activity</span>
            </div>

            <div className="platform-container-main overscroll-y-container">
              <div className="platform-left-container">
                <div className="platform-left-box" >
                  <div></div>
                  {platformData.slice(0, visibleItems).map((data, index) => (   //class is currently data.className
                    <div className="table-in-row-1" key={index}>
                      <div className="table-left-div">
                        <div className="table-user-icon" style={{ fontSize: '15px' }}>
                          {/* {data.usericon} */}
                        </div>
                        <div className='NewUser'>

                          <div className="new-user-heading">
                            <span>{data.activiy}</span>
                          </div>
                          <div className="ID-box">ID {data.userId}</div>
                        </div>
                      </div>

                      <div className="table-right-div">
                        <span>
                          <CiShare1 size={'18px'} style={{ fontWeight: '800', cursor : 'pointer' }} onClick={() => window.open(`https://testnet.bscscan.com/tx/${data.transactionHash}`, '_blank')} />
                        </span>
                        <span>{formatTimeDifference(data.createdAt)}</span>
                      </div>
                    </div>

                  ))}

                  {/* {platformdata.slice(0, visibleItems).map((data, index) => (

                    <div className="table-in-row-1" key={index}>
                      <div className="table-left-div">
                        <div className="table-user-icon">
                          <PersonAddAltRoundedIcon sx={{ fontSize: '16px' }} />
                        </div>
                        <div className="ID-box">ID {data.UserId}</div>
                        <div className="new-user-heading">
                          <span>{data.newuser}</span>
                        </div>
                      </div>

                      <div className="table-right-div">
                        <span>
                          <CiShare1 size={'18px'} style={{ fontWeight: '800' }} />
                        </span>
                        <span>{data.jioningtiming}</span>
                      </div>
                    </div>

                  ))} */}




                  {platformData.length > visibleItems && (
                    <div className="see-more-div">
                      <div className="see-more-button" onClick={showMoreItems}>

                        <IoEyeSharp />  See More
                      </div>
                    </div>
                  )}

                </div>

              </div>

              <div className="platform-right-container">
                {/* <div className="platform-right-box-1" > */}
                  {/* <div>
                    <span className="right-box-1-heading">
                      Members total
                    </span>
                  </div> */}

                  {/* <div>
                    <div style={{ color: 'white', fontSize: '23px', fontWeight: '700' }}>
                      <span>1452 555</span>
                    </div>
                    <div style={{ color: 'lightgreen', fontSize: '17px' }}>
                      <span><NorthIcon sx={{ fontSize: '16px' }} />554</span>
                    </div>
                  </div> */}
                {/* </div> */}

                {/* <div className="platform-right-box-2"> */}
                  {/* <div>
                    <span className="right-box-1-heading">
                      Members received
                    </span>
                  </div> */}

                  {/* <div style={{ borderBottom: '1px solid #363737', paddingBottom: '5px' }}>
                    <div style={{ color: 'white', fontSize: '23px', fontWeight: '700' }}>
                      <span> 1452 555</span>
                    </div>
                    <div style={{ color: 'lightgreen', fontSize: '17px' }}>
                      <span>
                       
                        + 554</span>
                    </div>
                  </div> */}

                  {/* <div>
                    <div style={{ color: 'white', fontSize: '23px', fontWeight: '700' }}>
                      <span>1452 555</span>
                    </div>
                    <div style={{ color: 'lightgreen', fontSize: '17px' }}>
                      <span>
                        
                        + 554</span>
                    </div>
                  </div> */}
                {/* </div> */}

                <div className="platform-right-box-3">
                  <div>
                    <span className="right-box-3-heading-main">
                      Groways BUSD Contracts
                    </span>
                  </div>
                  {boxdata3.map((data1, index) => {
                    return (
                      <div className="right-box-3-data-div">
                        <div className="right-box-3-data-div-left">
                          <span >
                            {data1.name}
                          </span>
                        </div>

                        <div className="right-box-3-data-div-right">
                          <span >
                            {data1.link}
                          </span>
                          <span style={{ cursor: 'pointer' }} title="copy link"><FaCopy /></span>
                          <span ><FaLink fontSize={'medium'} /></span>
                        </div>
                      </div>
                    )
                  })}

                  {/* <div>
                    <span className="right-box-1-heading">
                      Transactions made
                    </span>
                  </div>

                  <div style={{ borderBottom: '1px solid #363737', paddingBottom: '5px' }}>
                    <div style={{ color: 'white', fontSize: '23px', fontWeight: '700' }}>
                      <span>1452 555</span>
                    </div>
                    <div style={{ color: 'lightgreen', fontSize: '17px' }}>
                      <span>
                       
                        + 554</span>
                    </div>
                  </div> */}

                  {/* <div>
                    <span className="right-box-1-heading">
                      Turnover, BUSD
                    </span>
                  </div>

                  <div style={{ borderBottom: '1px solid #363737', paddingBottom: '5px' }}>
                    <div style={{ color: 'white', fontSize: '23px', fontWeight: '700' }}>
                      <span>1452 555</span>
                    </div>
                    <div style={{ color: 'lightgreen', fontSize: '17px' }}>
                      <span>
                        
                        + 554</span>
                    </div>
                  </div> */}

                </div>


              </div>

            </div>

          </Row>
        </Container>
      </Fragment>
    </div>
  );
};

export default Dashboard;
