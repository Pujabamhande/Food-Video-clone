import React from 'react'

import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'

import Userlogin from '../pages/Userlogin'
import UserRegister from '../pages/UserRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import FoodpartnerResiter from '../pages/FoodpartnerResiter'
import CreateFood from '../pages/food-partner/CreateFood'
import Home from '../pages/general/Home'
import Saved from '../pages/general/Saved'
import Profile from '../pages/food-partner/Profile'


const AppRoutes = () => {
  return (


       <Router>
         <Routes>

               <Route path="/register/user" element={<UserRegister/>}/>
               
               <Route path="/login/user" element={<Userlogin/>}/>
               
               <Route path="/register/food-partner" element={<FoodpartnerResiter/>}/>
               
               <Route path="/login/food-partner" element={<FoodPartnerLogin/>}/>
               <Route path="/CreateFood" element={<CreateFood/>}/>
               <Route path="/Home" element={<Home/>}/>
                <Route path="/saved" element={<Saved />} />
               <Route path="/food-partner/:id" element={<Profile/>}/>

         </Routes>
       </Router>
  )
}

export default AppRoutes