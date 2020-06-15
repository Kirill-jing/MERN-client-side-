import React from 'react'
import {NavLink} from 'react-router-dom'

const Product=(props)=>{
   



    return(
        <div  >
            <div>{props.name}</div>
            <div>{ props.description.split('').splice(0,5).join('') }</div>
            <div>{props.price}</div>
            <img src={props.image} alt="erferfewrf"></img>
            <button onClick={props.detailsHandler}>
                <NavLink to={'/products/'+ props.id} exact>egrtg</NavLink>
            </button>
          <button onClick={props.delete}>delete</button>
           <button>
           <NavLink to={`/add-product/${props.id}?edit=true`} exact>egrtg</NavLink>
           </button>
        </div>
    )
}

export default Product