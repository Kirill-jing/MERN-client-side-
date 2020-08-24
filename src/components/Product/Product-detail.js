import React from 'react'

const productDetail=(props)=>{
    return(
        <div>
            <div>{props.name}</div>
            <div>{props.price}</div>
            <div>{props.description}</div>
            <img src={props.image}/>
           <button>close</button>
        </div>
    )
}

export default productDetail