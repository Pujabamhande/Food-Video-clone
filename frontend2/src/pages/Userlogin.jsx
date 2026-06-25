import React from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

const Userlogin = () => {

   const Navigate = useNavigate();

   const submitHandler = async (e) => {

      e.preventDefault()


      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post('http://localhost:5000/api/auth/user/login', {

         email: email,
         password: password
      }, {

         withCredentials: true
      });


      console.log(response.data);

      Navigate('/Home');


   }

   return (

      <div className='auth-page-wrapper flex justify-center items-center'>

         <div className='auth-card' role="region" aria-labelledby="user-login-title ">

            <div style={{transform:'translateY(3rem)'}}>
               <header>

                  <h1 id='user-login-title' className='auth-title ' style={{ fontWeight: '700', color: '#97ceeeff', transform: 'translateX(5rem)', fontSize: '20' }} >Welcome back</h1>
                  <p className='auth-subtitle' style={{ color: 'red' }}>Sign in to continue your food journey</p>
               </header>

            </div>


            <div style={{ transform: 'translateY(4rem)'}}>


               <form className='auth-form' onSubmit={submitHandler} noValidate>

                  <div className='field-group'>
                     <h3 className='mt-4' style={{ transform: 'translateX(7rem)' }}>Email</h3>

                     <input className='text-black' style={{ transform: 'translateX(1rem) translateY(0.5rem)', blockSize: '2rem', inlineSize: '15rem' }} type="email" id='email' name='email' placeholder='                Enter email' autoComplete='email' />
                  </div>

                  <div className='field-group'>
                     <h3 style={{ transform: 'translateY(1.5rem) translateX(6rem)' }}>Password</h3>
                     <input style={{ transform: 'translateY(2rem) translateX(1rem)', blockSize: '2rem', inlineSize: '15rem' }} className='font-10 text-black' type="password" id='password' name='password' placeholder='                 .   .   .   .   .   . ' autoComplete='current-password' />
                  </div>

                  <button style={{ transform: 'translateY(3rem) translateX(3.8rem)', inlineSize: '10rem', backgroundColor: 'skyblue' }} className=' auth-submit  text-black px-4 py-2 rounded mt-4' type='submit' >Sign In</button>

               </form>
            </div>


         </div>
      </div>
   )
}

export default Userlogin