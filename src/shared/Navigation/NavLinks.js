import React from 'react'
import {NavLink}  from 'react-router-dom'

const NavLinks =(props)=>{
   return(
      <ul>
          <li> 
            <NavLink to = '/' exact> All Products</NavLink>
          </li>

         <li>
            < NavLink to = '/add-product' exact> Add Product</NavLink>
         </li>
     </ul>

   )

}

export default NavLinks
