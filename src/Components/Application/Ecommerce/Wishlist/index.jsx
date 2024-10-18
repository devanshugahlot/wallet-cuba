import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../../AbstractElements';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import NorthIcon from '@mui/icons-material/North';
import {useAccount} from 'wagmi';
import { fetchAllIncomeInfo } from '../../../../api/integrateConfig';

const styles = {
  background: 'rgb(0, 36, 11), linear-gradient(351deg, rgba(0, 36, 11, 0.9528186274509804) 37%, rgba(0, 36, 11, 1) 41%, rgba(42, 221, 36, 1) 58%)'
};


const WishListContain = () => {
  const [refferalIncome , setRefferalIncome] = useState();
  const [levelIncome , setLevelIncome] = useState();
  const [slotIncome , setSlotIncome] = useState();
  const [totalIncome , setTotalIncome] = useState();
  const [packageIncome , setPackageIncome] = useState();
  const [totalTeam , setTotalTeam] = useState();
  const {address} = useAccount();
  useEffect(()=>{
    const fetchIncomeDetails = async()=>{
      try{
        let data = {
          address : address
        }
        const response = await fetchAllIncomeInfo(data);

        setTotalIncome(response.data.totalIncome);
      // setTotalProfit(response.data.totalProfit)
      // setTotalTeam(response.data.totalTeam);
      setRefferalIncome(response.data.refferalIncome);
      setPackageIncome(response.data.packageIncome);
      setSlotIncome(response.data.slotIncome);
      setLevelIncome(response.data.levelIncome);
      // setTotalTeam(response.data.totalTeam);
      
      }catch(error){
        console.log(`error in fetch income details`)
      }
    }
    fetchIncomeDetails();
  }, [])

  return (
    <Fragment>
      <Breadcrumbs parent='Income Report' title='My Income' mainTitle='My Income' />
      <Container fluid={true}>
        <Row>
          <div className="myincome-main-box">
            <div className="myincome-container">

              <div className="myincome-box my-income-box-1"  >
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
              <div className="myincome-box my-income-box-2" >
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

            </div>
          </div>


          <div className="myincome-container">

            <div className="myincome-box my-income-box-3" >
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
            <div className="myincome-box my-income-box-4" >
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
          </div>

          <div className="myincome-container-1">

            <div className="myincome-box my-income-box-5" >
              <div>
                <div> <span style={{ fontSize: '34px', fontWeight: '500' }}>
                  {packageIncome + slotIncome + refferalIncome+ levelIncome}
                </span>
                </div>
                <div> <span>
                  Total Income
                </span>
                </div>
              </div>
            </div>

          </div>

        </Row>
      </Container>
    </Fragment>
  );
};
export default WishListContain;
