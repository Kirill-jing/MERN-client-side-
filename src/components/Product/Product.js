import React from 'react'
import {NavLink, Switch} from 'react-router-dom'
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';
import style from 'styled-components'

const Gr1 = style.div`
margin:50px;
display:flex;
flex-direction:row;
color:white;
`

const SumBtns =styled(Button)({
  width:'5px',
  height:'25px', 
})
const SumIcon =styled(AddIcon)({
})
const RegBtns = style.div`
display:flex;
flex-direction:row;
`
const Div1=style.div`
display:flex;
flex-direction:column;
`
const Div2=style.div`
display:flex;
flex-direction:column;
`
const Product =(props)=>{
    let str=props.description
let arr = str.split('').splice(0,50).join('')

return(
<Gr1 >
  <audio src='../audio/s.mp3'></audio>
<Div1>
<img src={props.image}></img>
<div>{'Price for one unit- '+props.price + " $"}</div>
</Div1>
<Div2>
    <div>{props.name}</div>
    <div>{arr+"..."}</div>

    <div>{'In stock - '+props.amount}</div>
    {!props.show ?
<div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={< AddShoppingCartIcon />}
        onClick={props.addToCart}
      >
        Add to Cart
      </Button>
      <Button
        variant="contained"
        color="secondary"
startIcon={<MenuBookIcon/>}
        onClick={props.details}
      >
      Details
      </Button>
      <div>{'Full price - '+props.priceYourAmount+' $'}</div>
      </div>
:null}
    
 {props.show ?
 <div>
     <Button
     variant="contained"
     color="secondary"
     startIcon={<DeleteIcon />}
     onClick={props.delete}
   >
     Delete
   </Button>
     <Button
     variant="contained"
     color="secondary"
     startIcon={< EditIcon />}

   >
   <NavLink to={`/add-product/${props.id}?edit=true`} exact>edit </NavLink>
   </Button>
   
   </div>
:null}

      {props.showButton ?
< RegBtns>
          <SumBtns
        color="secondary"
        onClick={props.subtraction}
      >
        <RemoveIcon   style={{ fontSize: 30 }}/>
      </SumBtns>
      <div>{props.yourAmount}</div>
      <SumBtns

        color="secondary"
 
        size='small'
        onClick={props.addition}
      >
        <SumIcon 
       style={{ fontSize: 30 }}
        />
      </SumBtns>
  
</ RegBtns>
: null}

  
</Div2>
</Gr1 >)

}

export default Product 