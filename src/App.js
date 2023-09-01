import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Notfound from "./components/Notfound";
import Dashboard from "./components/Dashboard";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import {setAllUser } from "./redux/authSlice";
import { query, getDocs } from 'firebase/firestore'; // Make sure to import query, where, getDocs, and addDoc
import { userRef } from './firebase';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state?.auth?.user);
    

    useEffect(() => {
      if(!user) return;
      const fetchData = async () => {
        try {
          const firestoreQuery = query(userRef);
          const querySnapshot = await getDocs(firestoreQuery);
  
          const userDataArray = [];
          querySnapshot.forEach((doc) => {
            // Convert Firestore document data to a JavaScript object and add it to the array
            userDataArray.push({ ...doc.data() });
          });
  
          // Set the userData state with the filtered data
          
          const userData = userDataArray.filter((User)=>{
            return User.uid != user?.uid;
          })
          await dispatch (setAllUser(userData));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [user,dispatch]);
    
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
  
      


      <Route path="*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
