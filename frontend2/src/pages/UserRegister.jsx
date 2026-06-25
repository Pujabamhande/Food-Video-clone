import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const UserRegister = () => {
  

    const Navigate = useNavigate();
    
      const submitHandler = async(e) =>{
        e.preventDefault();



         const firstName = e.target.firstName.value;
            const lastName = e.target.lastName.value;
            const email = e.target.email.value;
            const password = e.target.password.value;



               const response = await axios.post('http://localhost:5000/api/auth/user/register',{


                        fullName: firstName  +" "+lastName,
                        email: email,
                        password: password
                    },{

                        withCredentials:true
                    })


                    console.log(response.data);

                    Navigate('/Home');
                    
              };
   
  return (
    <div>


        <div className='auth-page-wrapper flex justify-center items-center'>

        <div className='auth-card' role="region" aria-labelledby="user-register-title ">

           <div style={{transform:'translateY(2rem) translateX(2rem)'}}>

                 <header>

                <h1 id='user-register-title' className='auth-title ' style={{color:'#a3d2f2ff'}}>Create your Account</h1>
                <p className='auth-subtitle ' style={{color:'red' , transform:'translateX(-2.7rem)'}}>Join us and start your food journey</p>
            </header>

           </div>
           

                <div style={{transform:'translateY(2rem) translateX(1rem)'}}>


                       <form className='auth-form' onSubmit={submitHandler} noValidate>


                <div className='field-group'>
                    <h3  style={{transform:'translateX(2.5rem) ', }} className='mt-4 '>firstName</h3>
                    <input style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.2rem)', inlineSize:'15rem' }}  className='text-black' id='firstName' name='firstName' placeholder='Enter first firstname' autoComplete='given-name' />
                </div> 


                <div className='field-group'>
                    <h3   style={{transform:'translateX(2.5rem) translateY(0.1rem)' }}className='mt-4 '>lastName</h3>
                    <input  style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.4rem)', inlineSize:'15rem' }}   className='text-black' id='lastName' name='lastName' placeholder='Enter last name' autoComplete='family-name' />
                </div> 


                <div className='field-group'>
                    <h3  style={{transform:'translateX(2.5rem) translateY(0.5rem)', }}className='mt-4 '>Email</h3>
                    <input style={{ blockSize:'2rem', transform:'translateX(-1.5rem) translateY(0.6rem)', inlineSize:'15rem' }} className='text-black' type="email" id='email' name='email' placeholder='Enter email address' autoComplete='email' />
                </div> 

                <div className='field-group'>
                    <h3   style={{transform:'translateX(2.5rem) translateY(0.9rem)',  }} className='mt-4'>Password</h3>
                    <input  style={{ blockSize:'2rem', transform:'translateX(-1.5rem) translateY(1.3rem)', inlineSize:'15rem' }}    className='text-black' type="password" id='password' name='password' placeholder='Enter password' autoComplete='new-password' />
                </div> 

                <button   style={{transform:'translateY(2rem) translateX(1rem)' , inlineSize:'10rem', backgroundColor:'red'}} type="submit" className="auth-submit  text-white px-4 py-2 rounded mt-4">Sign Up</button>
            </form>
                </div>




            </div>
        </div>
    </div>
  )
}

export default UserRegister