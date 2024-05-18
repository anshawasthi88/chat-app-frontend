import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import logo from "../assets/image.png"
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes';

function Register() {

  const navigate = useNavigate();

    const [values , setValues] = useState({
        username: "",
        email : "",
        password : "",
        confirmPassword: "",
    })

     const  handleSubmit = async ( event ) => {
        event.preventDefault();
        if(handleValidation()){
          const {password,email,username} = values;
          const {data} = await axios.post(registerRoute,{
            username,
            email,
            password,
          });
          console.log("printing data",data);
          if(data.success === false){
            toast.error(data.message,options);
        }
        if(data.success === true ){
          localStorage.setItem("chat-app-user",JSON.stringify(data.user));
          alert("Account Created Successfully");
          toast.success(data.message,options);
            toast.success("Redirecting in 3 seconds");
            setTimeout(() => {
              navigate('/');
            }, 3000);
        }
      }
    }

    useEffect( () => {

      const reload = async () => {
      if (localStorage.getItem("chat-app-user")){
        navigate("/");
      }
  }
      reload();
  },[]);

    const options = {
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",
    }

    const handleValidation = () => {
        const {password,confirmPassword,email,username} = values;

        if(password !== confirmPassword){
            toast.error("Password and Confirm password should be same",options)
            return ;
        }

        if(!email || !username){
          toast.error("All fields are required",options)
          return;
        }

        if(username.length <= 3){
          toast.error("Username should be greater than 3",options)
          return 
        }

        if(password.length < 8){
          toast.error("Password should be greater than 8 for safety",options);
          return;
        }
        return true;
    }

const handleChange = (event) => {
    setValues({...values,[event.target.name]:event.target.value});
}

  return (
    <>
      <FormContainer>
        <form onSubmit= {(event) => handleSubmit(event)}>
            <div className='brand'>
                <img src={logo} alt="logo" />
                <h1>snappy</h1>
            </div>
            <input 
            type="text" 
            placeholder='Username' 
            name='username' 
            onChange={(e) => handleChange(e)}/>

            <input 
            type="email" 
            placeholder='email' 
            name='email' 
            onChange={(e) => handleChange(e)}/>

            <input 
            type="password" 
            placeholder='password' 
            name='password' 
            onChange={(e) => handleChange(e)}/>

            <input 
            type="password" 
            placeholder='Confirm password' 
            name='confirmPassword' 
            onChange={(e) => handleChange(e)}/>

            <button type='submit'>Create User</button>
            <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register
