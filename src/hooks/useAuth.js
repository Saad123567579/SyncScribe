// import {useEffect} from "react";
// import { useDispatch } from "react-redux";
// import {setUser} from "../redux/authSlice";

// export function useAuth(){
//     const dispatch = useDispatch();
//     useEffect(() => {
//         const doTask = async() => {
//             let user = JSON.parse(localStorage.getItem("userObject"));
//         if(!user) window.location.href = "/";
//         await dispatch(setUser(user));
//         }
//         return () => doTask();

        
    
//     }, [dispatch])
    
// }