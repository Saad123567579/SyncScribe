import "../index.css";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, userRef } from '../firebase';
import { useState } from "react";
import {toast} from "react-toastify"
import { query, where, getDocs, addDoc } from 'firebase/firestore';
function Signin() {
    const [status,setStatus] = useState(false);
   
    const handleAuth = async() => {
        setStatus(true);
        const provider = new GoogleAuthProvider();
        try {
          const { user } = await signInWithPopup(firebaseAuth, provider);
          const obj = { "name": user.displayName, "email": user.email, "image": user.photoURL, "uid": user.uid };
          const firestoreQuery = query(userRef, where("uid", "==", user.uid));
          const fetchedUsers = await getDocs(firestoreQuery);
          if (fetchedUsers.docs.length === 0) {
            await addDoc(userRef, obj);
            console.log("User added");
            localStorage.setItem('userObject', JSON.stringify(obj));

            toast.success("Congratulations on signing up");
            setTimeout(() => {
                window.location.href="/dashboard";
            }, 1000);
            
            
          } else {
            localStorage.setItem('userObject', JSON.stringify(obj));

            toast.success("Welcome back");
            setTimeout(() => {
                window.location.href="/dashboard";
            }, 1000);

          }
        } catch (e) {
          console.log(e);
        }
    }
  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col items-center ">
      <img
        alt="img"
        className="mt-4"
        src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png"
      />

      <button disabled={status} className={`p-4 rounded-lg ${status?("cursor-wait"):("cursor-pointer")}  flex bg-blue-500 hover:bg-blue-600  mt-4`}>
       <h1 className="font-bold mr-1 text-white" onClick={handleAuth}>Sign in</h1>
        <svg
          className="w-6 h-6 text-white dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            fillRule="evenodd"
            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default Signin;
