import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import UserDataSection from '../../Tables/DataTable/DataTableComponent';
import HeaderCard from '../../Common/Component/HeaderCard';
import { Breadcrumbs, H2 } from '../../../AbstractElements';
import Approved from '../../../Deposite/Approved';
import Pending from '../../../Deposite/Pending';
import Reject from '../../../Deposite/Reject';
// import { Breadcrumbs } from '../../../AbstractElements';
// import HeaderCard from '../../Common/Component/HeaderCard';


// ... (previous imports)

const AllDeposite = () => {
  const [allDeposite, setAllDeposite] = useState(true);
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false);
  const [reject, setReject] = useState(false);

  const handleStatusChange = (selectedStatus) => {
    setAllDeposite(selectedStatus === "allDeposite");
    setPending(selectedStatus === "pending");
    setApproved(selectedStatus === "approved");
    setReject(selectedStatus === "reject");
  };

  return (
    <Fragment>
      <Breadcrumbs parent="Table" title="Data Tables" mainTitle="Data Tables" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px 30px 0px 0px' }}>
                <HeaderCard title="Select Multiple and Delete Single Data" />
                <select
                  style={{ borderRadius: '3px' }}
                  name="Status"
                  id=""
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="allDeposite">All Deposite</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="reject">Reject</option>
                </select>
              </div>
              <CardBody>
                {allDeposite && <UserDataSection />}
                {approved && <Approved />}
                {pending && <Pending/> }
                {reject &&  <Reject/> }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AllDeposite;
