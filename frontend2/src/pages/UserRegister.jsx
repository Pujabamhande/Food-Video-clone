import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {


    const Navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;



        const response = await axios.post('http://localhost:5000/api/auth/user/register', {


            fullName: firstName + " " + lastName,
            email: email,
            password: password
        }, {

            withCredentials: true
        })


        console.log(response.data);

        Navigate('/Home');

    };

    return (
        <div>


            <div className='auth-page-wrapper flex justify-center items-center'>

                <div className='auth-card' role="region" aria-labelledby="user-register-title ">

                    <div style={{ transform: 'translateY(2rem) translateX(2rem)' }}>

                        <header>

                            <h1 id='user-register-title' className='auth-title text-black font-bold text-lg  '>Create your Account</h1>
                            <p className='auth-subtitle font-bold text-[#450045]'>Join us and start your food journey</p>
                   
                        </header>

                    </div>



                    <div className="flex justify-center w-96 h-screen mt-12 items-center rounded-lg ">


                        <form className='auth-form' onSubmit={submitHandler} noValidate>


                            <div className=' items-center  mb-56 '>



                                <div className='flex gap-3'>

                                    <div className='mt-3'>
                                        <h3 className='text-center text-gray-700  font-semibold'>firstname</h3>
                                         <input className='h-10 bg-[#f6f6f6] text-center text-gray-700 rounded border' id='firstName' name='firstName' placeholder='Enter first name' autoComplete='given-name' />
                                    </div>
                                    <div className='mt-3'>
                                        <h3 className='text-center text-gray-700  font-semibold'>lastname</h3>
                                        <input className='h-10 bg-[#f6f6f6] text-center text-gray-700 rounded border' id='lastName' name='lastName' placeholder='Enter last name' autoComplete='family-name' />
                                    </div>

                                </div>



                                <div className='mt-6'>

                                    <h3 className=' text-gray-700 font-semibold text-center '>Email</h3>
                                    <input className='text-black text-center w-full rounded border text-gray-700 h-10 bg-[#f6f6f6]' type="email" id='email' name='email' placeholder='Enter email address' autoComplete='email' />

                                </div>


                                <div  className='mt-6'>
                                    <h3 className='text-gray-700 font-semibold text-center '>Password</h3>
                                    <input className='text-black text-center rounded w-full border text-gray-700 h-10 bg-[#f6f6f6]' type="password" id='password' name='password' placeholder='Enter password' autoComplete='new-password' />

                                </div>


                                    <button type="submit" className="auth-submit mt-16 text-black rounded text-center w-full h-10 bg-[#f8e2ff]">Sign Up</button>


                            </div>

                         

                        </form>
                    </div>





                </div>
            </div>
        </div>
    )
}

export default UserRegister