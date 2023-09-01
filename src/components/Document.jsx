import React,{useEffect} from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setUser } from '../redux/authSlice';
const Document = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const doTask = async () => {
            let user = JSON.parse(localStorage.getItem("userObject"));
            // if(!user) window.location.href = "/";
            if (!user) navigate("/");
            await dispatch(setUser(user));
        }
        return () => doTask();



    }, [dispatch, navigate])
  return (
    <div>
      The id is {id}
    </div>
  )
}

export default Document
