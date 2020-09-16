import React from 'react'
import {NavLink, Switch} from 'react-router-dom'
import './Product.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';
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
        startIcon={< AddShoppingCartIcon />}
        onClick={props.addToCart}
      >
        Add to Cart
      </Button>
    
 {props.show ?
     <Button
     variant="contained"
     color="secondary"
     startIcon={< EditIcon />}

   >
   <NavLink to={`/add-product/${props.id}?edit=true`} exact>edit </NavLink>
   </Button>

:null}
        <Button
        variant="contained"
        color="secondary"
startIcon={<MenuBookIcon/>}
        onClick={props.details}
      >
      Details
      </Button>
{props.showButton ?
    <div className='buttons'>
          <Button
        variant="contained"
        color="secondary"

        onClick={props.subtraction}
      >
        <RemoveIcon/>
      </Button>
      <p>{props.yourAmount}</p>
      <Button
        variant="contained"
        color="secondary"

        onClick={props.addition}
      >
        <AddIcon/>
      </Button>
        {/* <button onClick={props.subtraction}>-</button>
        <p>{props.yourAmount}</p>
        <button onClick={props.addition}>+</button> */}
        <p>{'Общая стоимость - '+props.priceYourAmount+' $'}</p>
    </div>
: null}
</div>
</div>)

}

export default Product 