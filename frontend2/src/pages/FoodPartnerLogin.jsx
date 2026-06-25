import React from 'react'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'


const FoodPartnerLogin = () => {

    const navigate = useNavigate();

 const submitHandler = async (e) =>{

    
        
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post('http://localhost:5000/api/auth/food-partner/login' ,{

              email,
              password
        },{withCredentials:true});

           console.log(response.data);

           navigate('/CreateFood');

           
    }

               
  return (

  <div className='auth-page-wrapper flex justify-center items-center'>

      <div className='auth-card' role="region" aria-labelledby="user-login-title ">

         <header>

            <h1 id='user-login-title' style={{ fontWeight: '700', color: '#97ceeeff', transform: 'translateX(5rem)', fontSize: '20' }} className='auth-title st-4'>Partner login</h1>
            <p className='auth-subtitle' style={{color:'red'}}>Access your dashboard and manage orders.</p>
         </header>
             
         <form className='auth-form' onSubmit={submitHandler} noValidate>

            <div className='field-group'>
               <h3 className='mt-4 email'style={{ transform: 'translateX(7rem)' }} >Email</h3>
               <input style={{ transform: 'translateX(1rem) translateY(0.5rem)', color:'black', blockSize: '2rem', inlineSize: '15rem' }}   type="email" id='email' name='email' placeholder='Enter email' autoComplete='email' />
            </div>

            <div className='field-group'>
               <h3 className='password'  style={{ transform: 'translateY(1.5rem) translateX(6rem)' }} >Password</h3>
               <input style={{ transform: 'translateY(2rem) translateX(1rem)', blockSize: '2rem', inlineSize: '15rem', color:'black'}} className='font-10 text-black' type="password" id='password' name='password' placeholder='   .  .  .  .  .  .  .  .' autoComplete='current-password' />
            </div>

            <button style={{ transform: 'translateY(3rem) translateX(3.8rem)', inlineSize: '10rem', backgroundColor: 'skyblue', color:'gray' }}className=' auth-submit bg-red-500  px-4 py-2 rounded mt-4' type='submit' >Sign In</button>

         </form>

         
      </div>
     </div>


        
  )
}

export default FoodPartnerLogin