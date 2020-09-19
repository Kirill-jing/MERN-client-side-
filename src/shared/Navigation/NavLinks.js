import React, { Fragment } from 'react'
import {NavLink}  from 'react-router-dom'
import './NavLinks.css'
const NavLinks =(props)=>{
   
      
    
   return(
      <div className='back-nav'>
      <ul className = 'nav'>
{props.auth ?
         <Fragment>
          <li> 
            <NavLink to = '/Myproducts'  exact>My Products</NavLink>
          </li>

         <li>
            < NavLink to = '/add-product'  exact > Add Product</NavLink>
         </li>
         <li>
            < NavLink to = '/search'  exact > Search</NavLink>
         </li>
         </Fragment>:null}
         {!props.auth ?
             <Fragment> 
         <li>
            < NavLink to = '/signup'  exact > sign up </NavLink>
         </li>
         
         <li>
            < NavLink to = '/login'  exact > log in</NavLink>
         </li>
         </Fragment>  :null} 
         <li onClick={props.logout}>
            < NavLink to = '/logout'  exact > log out</NavLink>
         </li>
         <li>
            < NavLink to = '/All-products'  exact >All products</NavLink>
         </li>
     </ul>
     </div>
   )

}

export default NavLinks
