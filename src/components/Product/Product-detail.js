import React from 'react'
import './Product-detail.css'
const productDetail=(props)=>{
    return(
        <div>
            <div>{props.name}</div>
            <div>{props.price}</div>
            <div>{props.description}</div>
            <img src={props.image}/>
            <div>{props.amount}</div>
           <button onClick={props.closeDetails}>close</button>
        </div>
    )
}

export default productDetail