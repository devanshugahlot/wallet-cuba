import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
// import { Breadcrumbs } from '../../../AbstractElements';
// import HeaderCard from '../../Common/Component/HeaderCard';
import UserDataSection from '../Components/Tables/DataTable/DataTableComponent';
import { Breadcrumbs } from '../AbstractElements';
import HeaderCard from '../Components/Common/Component/HeaderCard';

const AllDeposite = () => {

  return (
    <Fragment>
      <Breadcrumbs parent="Table" title="Data Tables" mainTitle="Data Tables" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Select Multiple and Delete Single Data" />
              <CardBody>
                <UserDataSection  />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );

};

export default AllDeposite;