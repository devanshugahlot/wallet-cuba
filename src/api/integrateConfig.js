import { axiosBase } from "./config";
import axios from 'axios'

export const createAccount = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            // const formData = new FormData();
            // formData.append('address',data.address);
            // formData.append('referBy',data.referBy);
            const response = await axiosBase.post('api/users/create', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            resolve(response.data);

        }catch(error){
            console.log(`error in create account : ${error.message}`);
            reject(error)
        }
    })
}

export const updateData = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.patch('api/users/updateData', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            resolve(response.data);
        }catch(error){
            console.log(`error in create account : ${error.message}`);
            reject(error)
        }
    })
}

export const checkAddressExists = async (address) =>  {
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.get(`api/users/checkUser/${address}`,{
                headers : {
                    'Content-Type': 'application/json',
                },
            });
            resolve(response.data);
        }catch(error){
            console.log(`error in get user details function intergrate config : ${error.message}`);
            reject(error)
        }
    })  
}

export const getUserDetails = async(data)=>{    
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.get(`api/users/userdetails/${data.address}`, {
                headers : {
                    'Content-Type': 'application/json',
                },
            });                        
            resolve(response.data);
        }catch(error){
            console.log(`error in get user details function intergrate config : ${error.message}`);
            reject(error)
        }
    })
}


export const updateProfile = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            console.log(`the data in update profile in axios is ${data}`)
            console.log(data)
            const formData = new FormData();
            formData.append("address" , data.address);
            formData.append("name",data.username);
            formData.append("email",data.email);
            formData.append("transactionHash" , data.transactionHash);
            formData.append("profilePicture" , data.profilePicture);
            formData.append("mobileNumber" , data.mobileNumber);

            const response = await axiosBase.patch('api/users/update' , data  , {
                headers : {
                    'Content-Type': 'multipart/form-data',  //multipart
                },
            });
            console.log(`response recieved from the user is : ${response.data}`)
            resolve(response.data);
        }catch(error){
            console.log(`error in uodate profile in integrate api : ${error.message}`);
            reject(error);
        }
    })
}


export const buySlots = async(data)=>{       
    return new Promise(async(resolve, reject)=>{
        try{
           const response = await axiosBase.post('api/users/buySlots' , data ,{
                headers : {
                    'Content-Type': 'application/json',
                },
            });
            resolve(response.data)
        }catch(error){
            reject(error);
        }
    })
}


export const fetchSlot = async(data1)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.post('api/users/fetchSlots' , data1 ,{
                headers : {
                    'Content-Type': 'application/json',
                },
            } );
            resolve(response.data);
        }catch(error){
            reject(error);
        }
    })
}

export const updatePackage = async (data) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const response = await axiosBase.patch('api/users/updatePackagedata' , data , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            resolve(response.data)
        }catch(error){
            reject(error);
        }
    })    
}

export const updateslot = async (data) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const response = await axiosBase.patch('api/users/updateSlotdata' , data , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            resolve(response.data)
        }catch(error){
            reject(error);
        }
    })    
}

export const buyPackages = async(data)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            const response = await axiosBase.post('api/users/buyPackage' , data , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            resolve(response.data)
        }catch(error){
            reject(error);
        }
    })
}


export const fetchPackage = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const response = await axiosBase.post('api/users/fetchPackages' , data , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            resolve(response.data)
        }catch(error){
            reject(error);
        }
    })
}



export const fetchUsersList = async(data1)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`api/users/allusers?startDate=${data1.startDate}&endDate=${data1.endDate}` , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            resolve(response.data);
        }catch(error){
            console.log(`error in fetch user list in axios config : ${error.message}`);
            reject(error)
        }
    })
}


export const fetchReferralList = async(data1)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`api/users/referrals/${data1.address}?startDate=${data1.startDate}&endDate=${data1.endDate}` , {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            resolve(response.data);
        }catch(error){
            console.log(`error in fetch refferal list in axios config : ${error.message}`);
            reject(error)
        }
    })
}


export const fetchAllActivities = async()=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`api/activities/all` , {
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            resolve(response.data);

        }catch(error){
            console.log(`error in fetch all activities in axios config : ${error.message}`)
            reject(error);
        }
    })
}

export const fetchIncomeDetails = async(data1)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            console.log('in the fucntionssss')
            const response = await axiosBase.get(`api/users/transactions/${data1.address}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            resolve(response.data);
        }catch(error){
            console.log(`error in fetch income details in axios : ${error.message}`)
            reject(error)
        }
    })
}


export const fetchAllIncomeInfo = async(data1)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`/api/activities/dashboard/${data1.address}`, {
                headers : {
                    'Content-Type' : 'application/json',
                }
            });
            resolve(response.data);

        }catch(error){
            console.log(`error in fetch all income info : ${error.message}`);
        }
    })
}



export const fetchLatestAnnouncement = async()=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get('/api/users/announcements' , {
                headers : {
                    'Content-Type' : 'application/json',
                }
            })
            resolve(response.data)
        }catch(error){
            reject(error)
        }
    })
}



export const fetchPackageInfoForDashboardBox = async(data)=>{
    return new Promise(async(resolve , reject)=>{
        try{
            const response = await axiosBase.get(`/api/users/packageofuser/${data.address}` , {
                headers : {
                    'Content-Type' : 'application/json',
                }
            });
            resolve(response.data);
        }catch(error){
            reject(error)
        }
    })
}



export const fetchSlotsInfoForDashboardBox = async(data)=>{
    return new Promise(async(resolve , reject)=>{
        try{    
            const reponse = await axiosBase.get(`/api/users/slotsofuser/${data.userId}`, {
                headers : {
                    'Content-Type' : 'application/json',
                }
            })
            resolve(reponse.data)
        }catch(error){
            reject(error);
        }
    })
}