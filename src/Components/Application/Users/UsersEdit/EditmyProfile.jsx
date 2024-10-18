import React, { Fragment, useEffect, useState } from "react";
import { Btn, H4 } from "../../../../AbstractElements";
import { useForm } from "react-hook-form";
import './EditProfile.css'
import { Row, Col, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { EditProfile, Company, Username, UsersCountryMenu, AboutMe, UpdateProfile, FirstName, LastName, Address, EmailAddress, PostalCode, Country, City } from '../../../../Constant';
// import Web3 from 'web3'
import { getUserDetails, updateProfile } from "../../../../api/integrateConfig";
import  {useAccount } from 'wagmi';
import Swal from 'sweetalert2';
import MyContext from "../../../../Context/MyContext";
import { useContext } from "react";





const EditMyProfile = ({setNameOfUser,setImagePath }) => {
    const { register, handleSubmit,control, setValue,watch, formState: { errors } } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const {getUserData} = useContext(MyContext)
    const [formData,setFormdata] = useState({
        name:"",
        profilePicture:"",
        email:"",
        mobileNumber:""
    })

    console.log(formData," form data")
    const { address} = useAccount(); 

    
    const [emailId, setEmailId] = useState();
    
    const [sponserId , setSponserId] = useState('')

    const onEditSubmit = async (e) => {
        try{
            e.preventDefault();
        // console.log(`data of the email is : ${data}`)
        // console.log(`data of the username is : ${formData.name}`)
        // console.log("in the sumbit")
        // for (const key in data) {
        //         if (data.hasOwnProperty(key)) {
        //           console.log(key + ":  fdsfds:  " + data[key]);
        //         }
        //     }

            // if(!formData.profilePicture){
            //     console.log('please use profile pic')
            // }
        // const formData = new FormData();
        // formData.append('profilePicture', profilePicture);
        // // alert(data)
        // console.log(`user id is : ${userId} and email is : ${emailId} , join date is : ${joininDate} , username is : ${userName} , mobilenumber is : ${mobileNumber} , and sposor id ; ${sponserId}`)
        // let dataSumbit  = {
        //     address : address,
        //     transactionHash : "0x6df737816d9d21d8ca8a54139af66fb08d45fe9d235e1c779d2b60c5d8035869",
        //     email : emailId,
        //     name : userName,
        //     mobileNumber : mobileNumber,
        //     profilePicture : formData,
        // }
        // // dataSumbit.profilePicture = profilePicture;
       
        const updateIt = await updateProfile(formData);
        getUserData(address);
        console.log(`uodate in update ir fuciton is : ${updateIt}`)
        console.log(`updare it text is : ${updateIt.text}`)
        Swal.fire({
            icon:"success",
            title:"SUCCESSFULL",
            text:"Successfully edited profile",
          })
        
        }catch(error){

            console.log(`error in try catch block in the uodate profile section in handlesubmit : ${error.message}`)
        }
        // console.log(`update it function has returned me : ${updateIt}`)
    }


    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    }


    useEffect(()=>{               // new addition
        const fetchUserDetails = async()=>{
                // const accounts = await window.ethereum.request({ method : 'eth_requestAccounts'});
                // const userAddress = accounts[0];
                console.log(`user address is : ${address}`)
                const data = {address : address}
                try{
                const response = await getUserDetails(data);
                // for (const key in response) {
                    //     if (response.hasOwnProperty(key)) {
                        //       console.log(key + ":  :  " + response[key]);
                        //     }
                        // }
                        localStorage.setItem("userID" , response.userData.userId);
                        // console.log(`storage from the loacl storage is : ${localStorage.getItem("userID")}`)
                // setaddressOfUser(response.userData.address);
                // setJoiningDate(response.userData.join_time);
                // setUserId(response.userData.userId);
                // setSponserId(response.userData.referBy);
                // setEmailId(response.userData.email);
                // setUserName(response.userData.name);
                // setMobileNumber(response.userData.mobileNumber);
                // setSponserId(response.userData.referBy);
                // setProfilePictureName(response.userData.profilePicture);
                // console.log(`address of the user is : ${address}`)
                // setValue('email' , response.userData.email);
                // setValue('name' , response.userData.name);
                // setValue('mobileNumber' , response.userData.mobileNumber);
                // setValue('address' , address);
                // setValue('sposerId' , response.userData.referBy);
                // setValue('userId' , response.userData.userId);
                // setValue('join_time' , response.userData.join_time)
                setSponserId(response.sponsorId)
                // console.log(response.userData);
                setFormdata({...response.userData})
                setNameOfUser(response.userData.name);
                setImagePath(response.userData.profilePicture);
                console.log(response)
                }catch(error){
                    // alert(`You have been logged out! Please log back in again`)
                    console.log(`error in getuserdetails when in Fnd : ${error.message}`)
                }
        }
        
        fetchUserDetails();
    }, [address])   // might add setValue here too

    // const handleFileChange = (e)=>{
    //     const file = e.target.files[0];
    //     setProfilePicture(file);
    //     setValue("profilePicture", file);
    //     // const fileName = file ? file.name : '';
    //     // setProfilePictureName(fileName)
    // }

    return (
        <Fragment>
            <Form className="card" onSubmit={onEditSubmit} encType="multipart/form-data" method="POST">
                <CardHeader>
                    <H4 attrH4={{ className: "card-title mb-0" }}>{EditProfile}</H4>
                    <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                            <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                            <i className="fe fe-x"></i>
                        </a>
                    </div>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col sm="6" md="6">
                            <FormGroup> <Label className="form-label" style={{ color: '#BEBFC2' }}>{Username}</Label>
                            {/* value={userName} onChange={(e)=>setUserName(e.target.value)} */}
                                <Input style={{ color: '#BEBFC2' }}  className="form-control" type="text" placeholder="Username" value={formData.name} onChange={(e)=>setFormdata((prev)=>({...prev,name:e.target.value}))} /><span style={{ color: "red" }}>{errors.Username && 'Username is required'} </span>
                            </FormGroup>
                        </Col>


                        <Col sm="6" md="6">
                            <FormGroup><Label className="form-label" style={{ color: '#BEBFC2' }}>
                                {/* {EmailAddress} */}
                                User ID
                            </Label>
                                <Input
                                    className="form-control"
                                    // value={userId}      // new line of code
                                    type="text"
                                    placeholder="User ID"
                                    {...register('userId', { required: true })}
                                    value={formData.userId}   // it is set to value so that the user is unable to edit it
                                    readOnly
                                />
                                <span style={{ color: "red" }}>{errors.EmailAddress && ' User ID is required'} </span>
                            </FormGroup>
                        </Col>

                        <Col sm="6" md="6">
                            <FormGroup className="mb-3"><Label className="form-label" style={{ color: '#BEBFC2' }}>
                                {/* {Company} */}
                                Photo
                            </Label>
                            {/* onChange={(e)=>{handleFileChange(e)}} */}
                            {/* {...register('profilePicture', { required: true })} */}
                                <Input className="form-control"   type="file" placeholder="Photo" name="profilePicture"  onChange={(e)=>setFormdata((prev)=>({...prev,profilePicture:e.target.files[0]}))}    /><span style={{ color: "red" }}>{errors.company && 'Photo is required'} </span>
                            </FormGroup>
                        </Col>

                        <Col sm="6" md="6">


                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                {/* {LastName} */}
                                Sponser ID
                            </Label>
                                <Input className="form-control" value={sponserId} type="text" placeholder="Sponser ID"  /><span style={{ color: "red" }}>{errors.LastName && 'Sponser ID is required'} </span>
                            </FormGroup>
                        </Col>

                        {/* USer name */}
                        {/* <Col sm="6" md="6">


                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                Sponser Name
                            </Label>
                                <Input className="form-control" type="text" placeholder="Sponser Name" {...register("Address", { required: true })} /><span style={{ color: "red" }}>{errors.Address && 'Sponser Name is required'} </span>
                            </FormGroup>
                        </Col> */}
                        <Col sm="6" md="6">
                            {/*  */}

                            <FormGroup><Label className="form-label" style={{ color: '#BEBFC2' }}>
                                {/* {City} */}
                                Email ID
                            </Label>
                            {/* value={emailId}  onChange={(e) => setEmailId(e.target.value)} */}
                                <Input className="form-control"  value={formData.email} onChange={(e)=>setFormdata((prev)=>({...prev,email:e.target.value}))} type="email" placeholder="Email ID" defaultValue={watch('email')} /><span style={{ color: "red" }}>{errors.City && 'Email ID is required'} </span>
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="6">


                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                {/* {Address} */}
                                Mobile No.
                            </Label>
                            {/* {...register("Address", { required: true })}  placeholder = "Sponser Name" */}
                            {/* value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} */}
                                <Input className="form-control"  type="text" placeholder="Mobile Number" value={formData.mobileNumber} onChange={(e)=>setFormdata((prev)=>({...prev,mobileNumber:e.target.value}))}  defaultValue={watch('mobileNumber')}  /><span style={{ color: "red" }}>{errors.Address && 'Mobile No. is required'} </span>
                            </FormGroup>
                        </Col>
                        <Col sm="6" md="6">


                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                {/* {Address} */}
                                Address
                            </Label>
                            {/* {...register("FirstName", { required: true })} */}
                                <Input value={address} className="form-control" {...register("address", { required: true })} type="text" placeholder="Address" readOnly /><span style={{ color: "red" }}>{errors.Address && 'Address is required'} </span>
                            </FormGroup>
                        </Col>

                        <Col sm="6" md="6">
                            <FormGroup><Label style={{ color: '#BEBFC2' }} className="form-label">
                                {/* {FirstName} */}
                                Joining Date
                            </Label>
                            {/* {...register("FirstName", { required: true })} */}
                                <Input className="form-control" value={new Date(formData.join_time).toLocaleString()} {...register("join_time", { required: true })} readOnly type="text" placeholder="Joining Date"  /><span style={{ color: "red" }}>{errors.FirstName && 'Jioning Date is required'} </span>
                            </FormGroup>
                        </Col>

                        {/* <Col sm="6" md="4">
                            <FormGroup><Label className="form-label" style={{color:'#BEBFC2'}}>{City}</Label>
                                <Input className="form-control" type="text" placeholder="City" {...register("City", { required: true })} /><span style={{ color: "red" }}>{errors.City && 'City is required'} </span>
                            </FormGroup>
                        </Col> */}
                        {/* <Col sm="6" md="3">
                            <FormGroup><Label className="form-label">{PostalCode}</Label>
                                <Input className="form-control" type="number" placeholder="ZIP Code" />
                            </FormGroup>
                        </Col>
                        <Col md="5">
                            <FormGroup><Label className="form-label">{Country}</Label>
                                <Input type="select" name="select" className="form-control btn-square">
                                    {UsersCountryMenu.map((items, i) =>
                                        <option key={i}>{items}</option>
                                    )}
                                </Input>
                            </FormGroup>
                        </Col> */}
                        {/* <Col md="12">
                            <div><Label className="form-label" style={{color:'#BEBFC2'}}>{AboutMe}</Label>
                                <Input type="textarea" className="form-control" rows="5" placeholder="Enter About your description" />
                            </div>
                        </Col> */}
                    </Row>
                </CardBody>
                <CardFooter className="text-end" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <div className="Edit-button" onClick={toggleEditMode}>
                        {isEditMode ? 'Cancel' : 'Edit'}
                    </div>
                    <Button attrBtn={{ color: "primary", type: "submit" }}>
                        {/* {UpdateProfile} */}
                        Submit
                    </Button>
                </CardFooter>
            </Form>
        </Fragment>
    )
}
export default EditMyProfile