import React,{useEffect,useRef} from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser, setMyDocs } from '../redux/authSlice';
import "quill/dist/quill.snow.css";
import Quill from 'quill';
import { documentRef } from '../firebase';
import { query, where, getDocs } from 'firebase/firestore';
import Navbar from './Navbar';
const Document = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wrapperRef = useRef();
    
    
    useEffect(() => {
      const doTask = async () => {
          let user = JSON.parse(localStorage.getItem("userObject"));
          // if(!user) window.location.href = "/";
          if (!user) navigate("/");
          const firestoreQuery1 = query(documentRef, where("host.name", "==", user.name));
          const fetchedUsers = await getDocs(firestoreQuery1);
          const allDocs = [];
          fetchedUsers.forEach((doc) => {
              allDocs.push(doc.data());
          });

          const firestoreQuery2 = query(documentRef, where("allowedUsers", "array-contains", user.name));
          const fetchedUsersAgain = await getDocs(firestoreQuery2);
          fetchedUsersAgain.forEach((doc) => {
              let d = doc.data();
              let by = d.name;
              d.sharedBy = by;
              allDocs.push(d);
          });
          // console.log('the docs are',allDocs);
          await dispatch(setMyDocs(allDocs));
          await dispatch(setUser(user));
      }
      return () => doTask();



  }, [dispatch, navigate])

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]

  useEffect(() => {
    const editor = document.createElement('div');
    
      if(wrapperRef.current.children.length==0){
        wrapperRef.current.append(editor);
        new Quill(editor, {
          theme: "snow",
          modules: { toolbar: TOOLBAR_OPTIONS },
        })
      }
   

    
    return () => {
      wrapperRef.innerHTML = "";
    }
  }, [])
  

  return (
    <>
    <Navbar />
    <div className="w-full h-full" id="container" ref={wrapperRef}>
     
     </div>
    </>
    
  )
}

export default Document
