import React from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import style from 'styled-components'


const CartProd=style.div`
display:flex;
flex-direction:row;
align-items:center;
color:white;
`
const Image=style.img`
width:90px;
height:130px
`
const Div1= style.div`
didpalt:flex;
flex-direction:column;
`

const Cart=(props)=>{
    let str=props.description
    let arr = str.split('').splice(0,50).join('')
    return(
        <CartProd>
            <Div1>
            <div>{props.name}</div>
            <Image  src={props.image}/>
            <div>{'Price for one unit '+props.price+' $'}</div>
            </Div1>
            <div>
            <div>{arr+"..."}</div>
            <p>{'You ordered '+ props.yourAmount +' units'}</p>
            <p>{'Full price '+props.priceYourAmount+' $'}</p>
            </div>
      <HighlightOffIcon onClick={props.deleteHandler}/>
        </CartProd>
       
    )
}

export default Cart