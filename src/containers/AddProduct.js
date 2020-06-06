
import React , {Component} from 'react'
import axios from 'axios';
import './birger.css'

class AddProduct extends Component {
    state = {
        name:' ',
        price:' ',
        image:' ',
        description:' '
    }

    postHandler=()=>{
        const data = {
            name:this.state.name,
            price:this.state.price,
            image:this.state.image ,
            description:this.state.description
        }
        // axios.post('http://localhost:5003/user/post-product', data )
        // .then(response=>{
        //     console.log(response)
        // }).catch(err =>{
        //     console.log(err)
        // })
        fetch('http://localhost:5003/user/post-product',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body:JSON.stringify(data)
        
            }).then(response=>{
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
      
    }

    render () {
      return (
        <div>
          <div>
              <label>name</label>
              <input type='text' value={this.state.name} onChange={(event)=> this.setState({name:event.target.value})}  />
          </div>
          <div>
              <label>price</label>
              <input type='number' value={this.state.price} onChange={(event)=> this.setState({price:event.target.value})}  />
          </div>
          <div>
              <label>description</label>
              <input type='text' value={this.state.description} onChange={(event)=> this.setState({description:event.target.value})}  />
          </div>
          <div>
              <label>image</label>
              <input type='text' value={this.state.image} onChange={(event)=> this.setState({image:event.target.value})}  />
          </div>
           
         <button onClick={this.postHandler}></button>
        </div>
      );
    }
  }
  
  export default AddProduct;