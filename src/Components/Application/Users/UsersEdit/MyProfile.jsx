import React, { Fragment, useContext } from 'react';
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { H5, H4, H6, P, Image, Btn } from '../../../../AbstractElements';
import { Link } from 'react-router-dom';
import { MyProfile, Bio, Password, Website, Save, EmailAddress } from '../../../../Constant';
import CustomizerContext from '../../../../_helper/Customizer';
import MyContext from '../../../../Context/MyContext';
// import dotenv from 'dotenv'
// import dotenv from 'dotenv'


const MyProfileEdit = ({imagePath, nameOfUser}) => {
  const {userData} = useContext(MyContext);
  // dotenv.config(); 
  // const imageURL = `${process.env.IMAGE_URL}/${imagePath}`;
  const imageURL = userData ? userData.profilePicture ? process.env.REACT_APP_API_URL+"/images/"+userData.profilePicture : "" : `${process.env.REACT_APP_WEBSITE_URL}/images/${imagePath}`;
  // {imagePath , nameOfUser} as props

  const { layoutURL } = useContext(CustomizerContext);
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <H4 attrH4={{ className: 'card-title mb-0' }}>{MyProfile}</H4>
          <div className='card-options'>
            <a className='card-options-collapse' href='#javascript'>
              <i className='fe fe-chevron-up'></i>
            </a>
            <a className='card-options-remove' href='#javascript'>
              <i className='fe fe-x'></i>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className='mb-2'>
              <div className='profile-title'>
                <div className='media'>
                  <Image attrImage={{ className: 'img-70 m-0 rounded-circle', alt: '', src: imageURL }} />
                  <div className='media-body'>
                    <Link to={`/app/users/userProfile/${layoutURL}`}>
                      <H5 attrH5={{ className: 'mb-1' }}>{userData ? userData.name ? userData.name : nameOfUser : nameOfUser}</H5>
                    </Link>
                    <P> <span style={{color:'#BEBFC2'}} >
                    {/* DESIGNER */}
                      </span>
                      </P>
                  </div>
                </div>
              </div>
            </Row>
            {/* <FormGroup className='mb-3'>
              <H6 attrH6={{ className: 'form-label' }}>{Bio}</H6>
              <Input type='textarea' className='form-control' rows='5' defaultValue='On the other hand, we denounce with righteous indignation' />
            </FormGroup> */}
            {/* <FormGroup className='mb-3'>
              <Label className='form-label'>{EmailAddress}</Label>
              <Input className='form-control' placeholder='your-email@domain.com' />
            </FormGroup>
            <FormGroup className='mb-3'>
              <Label className='form-label'>{Password}</Label>
              <Input className='form-control' type='password' defaultValue='password' />
            </FormGroup> */}
            {/* <FormGroup className='mb-3'>
              <Label className='form-label'>{Website}</Label>
              <Input className='form-control' placeholder='http://Uplor .com' />
            </FormGroup> */}
            {/* <div className='form-footer'>
              <Btn attrBtn={{ className: 'btn-block', color: 'primary' }}>{Save}</Btn>
            </div> */}
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default MyProfileEdit;
