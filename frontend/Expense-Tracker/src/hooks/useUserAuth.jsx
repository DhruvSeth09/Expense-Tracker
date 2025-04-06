import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    const {user,updateUser,clearUser}=useContext(UserContext);
    let navigate = useNavigate();
    useEffect(()=>{
        if(user) return;

        let isMounted = true;

        const fetchUserInfo=async ()=>{
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
                if(isMounted && response.data){
                    updateUser(response.data);
                }
        }catch(err){
            console.log(err);
            if(isMounted){
                clearUser();
                navigate("/login");
            }
        }
    }
    fetchUserInfo();

    return ()=>{
        isMounted = false;
        
    }
}, [updateUser,clearUser,navigate])
}
 