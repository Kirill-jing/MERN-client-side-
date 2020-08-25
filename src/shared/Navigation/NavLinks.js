import React from 'react'
import {NavLink}  from 'react-router-dom'
import './NavLinks.css'
const NavLinks =(props)=>{
   
      
    
   return(
      <ul className = 'nav'>
          <li> 
            <NavLink to = '/products'  exact> All Products</NavLink>
          </li>

         <li>
            < NavLink to = '/add-product'  exact > Add Product</NavLink>
         </li>
         
         <li>
            < NavLink to = '/signup'  exact > signup </NavLink>
         </li>
         
         <li>
            < NavLink to = '/login'  exact > login</NavLink>
         </li>
     </ul>

   )

}

export default NavLinks
