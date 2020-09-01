import React from 'react'

const Cart=(props)=>{
    return(
        <div>
            <div>{props.name}</div>
            <div>{props.price}</div>
            <div>{props.description}</div>
            <img src={props.image}/>
        </div>
    )
}

export default Cart