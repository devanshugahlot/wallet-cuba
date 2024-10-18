import { useEffect,useState } from 'react';
import MyContext from './MyContext';
import { useAccount } from 'wagmi'
import { checkAddressExists, getUserDetails } from '../api/integrateConfig';


export const MyProvider = ({children}) => {
    const { address} = useAccount();
    const [userData,setUserData] = useState([]);


  const getUserData = async (address) => {
    try{
      let response = await getUserDetails({address});         
      if(response.userData){
          setUserData(response.userData);
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    if(address){      
      (async () => {
        await getUserData(address);      
      })();
    }
  },[address])
    return (
        <MyContext.Provider value={{userData,getUserData}}>
            {children}
        </MyContext.Provider>
    )
}