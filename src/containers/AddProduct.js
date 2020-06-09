
import React , {Component} from 'react'
import axios from 'axios';
import './birger.css'

class AddProduct extends Component {
    state = {
       products:{name:' ',
        price:' ',
        image:' ',
        description:' '}
    }
    postHandler=()=>{
        
        const data = {
            name:this.state.products.name,
            price:this.state.products.price,
            image:this.state.products.image ,
            description:this.state.products.description
        }
        axios.post('http://localhost:5003/user/post-product', data )
        .then(response=>{
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })

      
    }

    render () {
      return (
        <div>
          <div>
              <label>name</label>
              <input type='text' value={this.state.products.name} onChange={(event)=> this.setState({name:event.target.value})}  />
          </div>
          <div>
              <label>price</label>
              <input type='number' value={this.state.products.price} onChange={(event)=> this.setState({price:event.target.value})}  />
          </div>
          <div>
              <label>description</label>
              <input type='text' value={this.state.products.description} onChange={(event)=> this.setState({description:event.target.value})}  />
          </div>
          <div>
              <label>image</label>
              <input type='text' value={this.state.products.image} onChange={(event)=> this.setState({image:event.target.value})}  />
          </div>
           
      <button onClick={this.postHandler} ></button>
        </div>
      );
    }
  }
  
  export default AddProduct;