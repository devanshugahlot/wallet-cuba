import React, { Fragment } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../../AbstractElements';
import EditMyProfile from './EditmyProfile';
import MyProfileEdit from './MyProfile';
import UserTable from './UserTable';
import { useState } from 'react';

const UsersEditContain = () => {
  const [nameOfUser , setNameOfUser] = useState();
    const [imagePath , setImagePath] = useState();
  return (
    <Fragment>
      <Breadcrumbs mainTitle='Edit Profile' parent='Users' title='Edit Profile' />
      <Container fluid={true}>
        <div className='edit-profile'>
          <Row>
            <Col xl='4'>
              <MyProfileEdit nameOfUser = {nameOfUser} imagePath = {imagePath} />
            </Col>
            <Col xl='8'>
              <EditMyProfile setNameOfUser={setNameOfUser} setImagePath={setImagePath} />
            </Col>
           
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};
export default UsersEditContain;
