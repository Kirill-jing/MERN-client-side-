import React from 'react'
import {NavLink, Switch} from 'react-router-dom'

const Product =(props)=>{

return(
<div>
    <div>{props.name}</div>
    <div>{props.description}</div>
    <div>{props.price}</div>
    <div>{props.amount}</div>
    <img src={props.image}></img>
    <button onClick={props.delete}>delete</button>
    <button onClick={props.addToCart}>Add to Cart</button>
 {props.show ?
    <button><NavLink to={`/add-product/${props.id}?edit=true`} exact>edit </NavLink></button>
:null}
 
    <button onClick={props.details}>detail</button>
    <div>
        <button>-</button>
        <p>{props.yourAmount}</p>
        <button onClick={props.addition}>+</button>
        <p>{props.priceYourAmount}</p>
    </div>
    

</div>)

}

export default Product 