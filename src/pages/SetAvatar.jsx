import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

function  SetAvatar() {
    const api = "https://api.multiavatar.com/4645646";
    const navigate =useNavigate();
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);


    useEffect( () => {

        const reload = async () => {
        if (!localStorage.getItem("chat-app-user")){
          navigate("/login");
        }
    }
        reload();
    },[]);

    const setProfilePicture = async() => {
        if(selectedAvatar === undefined){
            toast.error("Please select an avator",options);
        }
        else{
            const user = JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            })
            console.log(data)
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate("/");
            }
            else{
                toast.error("Error setting avatar please try again",options)
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=0Qtw2XkJ6SlpAL`)
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchData();
    }, []);


      const options = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
      }




  return (
    <>
    {
        isLoading ? <Container>
            <h1 className='loading text' style={{color:"white"}}>Loading the Avatars Please wait few Second.....</h1>
        </Container> : 
    
      <Container>
        <div className='title-container'>
            <h1>Pick an avatar as your Profile Picture</h1>
            <div className='avatars'>
                {
                    avatars.map((avatar,index) =>{
                        return (
                        <div key={index} 
                        className={`avatar ${
                            selectedAvatar === index ? "selected" : ""
                            }`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        )
                    })
                }
                
            </div>
            <div className='btn-wrapper'>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
            </div>
            
        </div>
      </Container>
    }
      <ToastContainer/>
    </>
  )
}

export default SetAvatar

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    display:flex;
    flex-direction:column;
    gap:2rem;
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #;
    }
  }
  .btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center; /* This will make the container take up the full viewport height */
}
`;
