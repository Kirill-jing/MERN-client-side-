import React from 'react'
import {NavLink, Switch} from 'react-router-dom'
import './Product.css'
const Product =(props)=>{
    let str=props.description
let arr = str.split('').splice(0,50).join('')

return(
<div className='product'>
    <div className='pr' >
    <div>{props.name}</div>
    <div>{arr+"..."}</div>
    <div>{'цена за еденицу - '+props.price + " $"}</div>
    <div>{'всего в наличии - '+props.amount}</div>
    <img src={props.image}></img>
    <button onClick={props.delete}>delete</button>
    <button onClick={props.addToCart}>Add to Cart</button>
 {props.show ?
    <button><NavLink to={`/add-product/${props.id}?edit=true`} exact>edit </NavLink></button>
:null}
 
    <button onClick={props.details}>detail</button>
{props.showButton ?
    <div className='buttons'>
        <button onClick={props.subtraction}>-</button>
        <p>{props.yourAmount}</p>
        <button onClick={props.addition}>+</button>
        <p>{'Общая стоимость - '+props.priceYourAmount+' $'}</p>
    </div>
: null}
</div>
</div>)

}

export default Product 