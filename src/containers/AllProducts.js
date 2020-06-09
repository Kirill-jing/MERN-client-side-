import React , {Component} from 'react'
import axios from 'axios'
import Product from '../components/Product/Product'
import ProductDetails from '../components/Product/Product-detail'
import {
  BrowserRouter ,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

class Allproducts extends Component{

    state = {
    products:[],
    product:null

    }


  

    componentDidMount(){

         axios.get('http://localhost:5003/user/products')
         .then(result=>{
               this.setState({products:result.data.product}
               )     
         })  
    }
       componentDidUpdate(){

          this.detailsHandler=(id)=>{
            if(id){
      axios.get(`http://localhost:5003/user/products/${id}`).then(result=>{
        
        this.setState({product:result.data.prod})

  console.log(result)
  console.log(this.props)
      })}
    
    }}
   render(){
     let post
     if(this.state.products!=null){
     post=<p>loading</p>
     }
if(this.state.product){
  post= <ProductDetails 
        description={this.state.product.description}
        name={this.state.product.name}
        price={this.state.product.price}
        />
}
   
      let products = this.state.products.map((product) =>{
        return ( 
              <Product
          key={product._id}
          id={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          detailsHandler={()=>this.detailsHandler(product._id)
          }
          />
        )
      })
       return(
        <div>
       {products}
    {post}
    <Route component={ProductDetails }  path='/products/:prodId' />
       </div>
       )
   }


}

export default Allproducts