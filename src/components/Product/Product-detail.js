import React from 'react'
import './Product-detail.css'
import style from 'styled-components'
import Button from '@material-ui/core/Button';
const CustomDiv = style.div`
color:white;
`
const productDetail=(props)=>{
    return(
        <CustomDiv>
            <div>{props.name}</div>
            <div>{'Price for one unit -' + props.price}</div>
            <div>{'Full descriptiom -' + props.description}</div>
            <img src={props.image}/>
            <div>In stock {props.amount} units</div>
            <div> Cap diametr {props.cap}</div>
            <div> Lamp type - {props.type}</div>
            <div> Power - {props.power}</div>
            
           <Button color='secondary' variant='contained'  onClick={props.closeDetails}>close</Button >
        </CustomDiv>
    )
}

export default productDetail