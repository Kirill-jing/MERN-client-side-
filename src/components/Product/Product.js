import React from 'react'

const Product=(props)=>{
   



    return(
        <div >
            <div>{props.name}</div>
            <div>{ props.description.split('').splice(0,5).join('') }</div>
            <div>{props.price}</div>
            <img src={props.image} alt="erferfewrf"></img>
            
        </div>
    )
}

export default Product