import React from 'react'

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const FoodpartnerResiter = () => {

     const Navigate = useNavigate();
      

      const submitHandler = async (e) => {
        e.preventDefault();

        const businessName = e.target.businessName.value;
        const contactName = e.target.contactName.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const address = e.target.address.value;

        await axios.post('http://localhost:5000/api/auth/food-partner/register', {
            name : businessName,
            contactName: contactName,
            phone: phone,
            email: email,
            password: password,
            address: address},{withCredentials:true}).then(response =>{
                console.log(response.data);
                 
                Navigate('/CreateFood');
              


            }).catch(error =>{

                console.log('There was asn error registering!' , error);
            });
            

        }
   

  return (
      
        <div>


            <div className='auth-page-wrapper flex justify-center items-center'>

                <div className='auth-card' role="region" aria-labelledby="user-register-title ">

                    <header>

                        <h1 id='user-register-title' style={{color:'#a3d2f2ff'}} className='auth-title '>Partner sign up</h1>
                        <p className='auth-subtitle ' style={{color:'red' , transform:'translateX(-2.7rem)'}} >Grow your business with us platform</p>
                    </header>



                    <form className='auth-form' onSubmit={submitHandler} noValidate>



                        <div className='field-group'>
                            <h3 className='mt-4  businessName'>Business Name</h3>
                            <input style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.2rem)', inlineSize:'15rem' }} className='text-black' id='businessName' name='businessName' placeholder='Enter business name' autoComplete='organization' />
                        </div>


                        <div className='two-col'>

                          


                            <div className='field-group'>
                                <h3 className='mt-4 contactName'>Contact Name</h3>
                                <input style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.2rem)', inlineSize:'15rem' }} className='text-black' type="text" id='contactName' name='contactName' placeholder='Enter your contact ' autoComplete='name' />
                            </div>


                            <div className='field-group'>

                                <h3 className='mt-4  phone'>Phone</h3>
                                <input style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.2rem)', inlineSize:'15rem' }} className='text-black' id='phone' name='phone' placeholder='Enter your phone number' autoComplete='tel' />

                            </div>


                              <div className='field-group'>
                                <h3 className='mt-4 '>Email</h3>
                                <input style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.2rem)', inlineSize:'15rem' }} className='text-black' type="email" id='email' name='email' placeholder='Enter email address' autoComplete='email' />
                            </div>

                            <div className='field-group'>
                    <h3 className='mt-4 password '>Password</h3>
                    <input style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.2rem)', inlineSize:'15rem' }} className='text-black' type="password" id='password' name='password' placeholder='Enter password' autoComplete='new-password' />
                </div> 


               <div className='field-group'>

                <h3 className='mt-4  address'>Address</h3>

                <input style={{ blockSize:'2rem',transform:'translateX(-1.5rem) translateY(0.2rem)', inlineSize:'15rem' }} className='text-black' id='address' name='address' placeholder='Enter your address' autoComplete='street-address' />
                <p style={{transform:'translateY(0.5rem) translateX(-1.4rem)' ,fontSize:'1', fontWeight:'5'}} className='small-note'>Full address helps customers find you faster.</p>
               </div>



                        </div>




                        <button type="submit" className="auth-submit bg-red-500 text-white px-4 py-2 rounded mt-4">Create Partner account</button>
                    </form>




                </div>
            </div>
        </div>
  )
}

export default FoodpartnerResiter