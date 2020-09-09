import React from 'react'
import './Cart.css'
const Cart=(props)=>{
    return(
        <div className='cart'>
          
             <img className='cartImage' src={props.image}/>
            <div>{props.name}</div>
            <div>{'цена за еденицу '+props.price+' $'}</div>
            <div>{props.description}</div>
            <p>{'Общее колличество '+ props.yourAmount}</p>
            <p>{'общая стоимость '+props.priceYourAmount+' $'}</p>
          
            <button onClick={props.deleteHandler}>delete</button>
           
        </div>
       
    )
}

export default Cart