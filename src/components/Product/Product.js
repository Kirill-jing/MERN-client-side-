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
    <Switch>
    <button><NavLink to={`/add-product/${props.id}?edit=true`} exact>edit </NavLink></button>
    <button onClick={props.details}><NavLink to={`/products/${props.id}`} exact>detail</NavLink></button>
    </Switch>
</div>)

}

export default Product 