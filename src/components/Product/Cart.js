import React from 'react'
import './Cart.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Cart=(props)=>{
    return(
        <div className='cart'>
             <img className='cartImage' src={props.image}/>
            <div>{props.name}</div>
            <div>{'цена за еденицу '+props.price+' $'}</div>
            <div>{props.description}</div>
            <p>{'Общее колличество '+ props.yourAmount}</p>
            <p>{'общая стоимость '+props.priceYourAmount+' $'}</p>
          
      <HighlightOffIcon onClick={props.deleteHandler}/>
        </div>
       
    )
}

export default Cart