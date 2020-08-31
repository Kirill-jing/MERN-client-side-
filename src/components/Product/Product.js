import React from 'react'
import {NavLink, Switch} from 'react-router-dom'

const Product =(props)=>{

return(
<div>
    <div>{props.name}</div>
    <div>{props.description}</div>
    <div>{props.price}</div>
    <img src={props.image}></img>
    <button onClick={props.delete}>delete</button>
 {props.show ?
 
    <button><NavLink to={`/add-product/${props.id}?edit=true`} exact>edit </NavLink></button>
:null}
    <button onClick={props.details}><NavLink to={`/Myproducts/${props.id}`} exact>detail</NavLink></button>
    

</div>)

}

export default Product 