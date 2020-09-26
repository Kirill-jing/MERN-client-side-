import React from "react";

const SearchProd = (props) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>{props.price}</div>
      <div>{props.description}</div>
      <img src={props.image} />
      <div>{props.amount}</div>
      <div>{props.cap}</div>
      <div>{props.type}</div>
      <div>{props.power}</div>

      <button onClick={props.closeDetails}>close</button>
    </div>
  );
};

export default SearchProd;
