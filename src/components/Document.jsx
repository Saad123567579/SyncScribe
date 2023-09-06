import React,{useEffect,useRef,useState} from 'react'
import { useParams } from 'react-router'
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser, setMyDocs, setSocket,delCurrentDoc, setCurrentDoc } from '../redux/authSlice';
import "quill/dist/quill.snow.css";
import Quill from 'quill';
import { documentRef } from '../firebase';
import { query, where, getDocs } from 'firebase/firestore';
import io from 'socket.io-client';
import Navbar from './Navbar';
const Document = () => {
    const socket = useRef();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quill,setQuill] = useState();
    const user = useSelector((state)=>state?.auth?.user);
    const wrapperRef = useRef();
    const allUsers = useSelector((state)=>state?.auth?.allUsers);
    useEffect(() => {
      if(!user) return;
      const getData = async() => {
        const firestoreQuery2 = query(documentRef, where("uid", "==",id));
        const fetchedDocs = await getDocs(firestoreQuery2);
        const allDocs = [];
        fetchedDocs.forEach((doc) => {
              allDocs.push(doc.data());
          });
          if(allDocs.length==0) navigate("/dashboard");
          
          let currentDocs = allDocs[0];
          let obj = {};
          let arr = [...currentDocs?.allowedUsers];
          arr.push(currentDocs?.host?.name);
          obj.users = arr;
          obj.uid = currentDocs?.uid;
          await dispatch(setCurrentDoc(obj));
          
          
      }
     getData();

     return () => {
      const delDoc = async() => {
        await dispatch(delCurrentDoc());
        
       
      }
      delDoc();
     }
    }, [user,dispatch])
    
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
        var q = new Quill(editor, {
          theme: "snow",
          modules: { toolbar: TOOLBAR_OPTIONS },
        })
        setQuill(q);
       

      }
    return () => {
      wrapperRef.innerHTML = "";
    }
  }, [])

  useEffect(() => {
    if(socket?.current == null && quill == null && !allUsers) return;
    const handleTextChange = (delta,oldDelta,source)=> {
      if(source !== 'user' ) return;
      console.log(delta);
      console.log(source)
      console.log("changes sent")
      socket.current.emit('send-changes',delta,user?.uid,id);
    }
    quill?.on('text-change',handleTextChange)
  
    return () => {
      quill?.off('text-change',handleTextChange)
    }
  }, [quill,socket,allUsers])

  useEffect(() => {
    
    const handleReceiveChanges = (delta,roomId)=> {
      if(roomId === id){
        console.log("changes receive")
        quill?.updateContents(delta);
      }
     
    }
    socket?.current?.on('receive-changes',handleReceiveChanges)
  
    return () => {
      socket?.current?.off('receive-changes',handleReceiveChanges)

    }
  }, [quill,socket,allUsers,id])

  useEffect(() => {
    if (!user) return;
    const fdata = async () => {
      socket.current = io('http://localhost:3001');
      await dispatch(setSocket(socket?.current?.id));
      socket.current.emit("adduser", user?.uid);
      console.log("new user connected")
      socket?.current?.emit('join-room', id);
      console.log("joining room")
     

    }
    fdata();
    return () => {
      console.log("user disconnected")
      socket.current.emit("dis");
      socket?.current?.emit('leave-room', id);
        console.log("leaving room")
    }
   
  }, [user,dispatch])

 

  useEffect(() => {
    console.log(quill)
  }, [quill])
  
  
  

  return (
    <>
    <Navbar />
    <div className="w-full h-full" id="container" ref={wrapperRef}>
     
     </div>
    </>
    
  )
}

export default Document
