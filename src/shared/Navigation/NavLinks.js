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
     </ul>

   )

}

export default NavLinks
