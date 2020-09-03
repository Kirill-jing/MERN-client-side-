import React from 'react'

const Cart=(props)=>{
    return(
        <div>
            <div>{props.name}</div>
            <div>{props.price}</div>
            <div>{props.description}</div>
            <div>{props.amount}</div>
            <p>{props.yourAmount}</p>
            <p>{props.priceYourAmount}</p>
            <img src={props.image}/>
            <button onClick={props.deleteHandler}>delete</button>
            <p></p>
            <p></p>
        </div>
    )
}

export default Cart