import React , {Component} from 'react'
import axios from 'axios'
import Product from '../components/Product/Product'
import ProductDetail from '../components/Product/Product-detail'
import {
    BrowserRouter ,
    Route,
  } from 'react-router-dom';

class AllProducts extends Component {

    state={
        products:[],
        product:false
    }

componentDidMount(){
    axios.get('http://localhost:5003/user/products')
    .then(result=>{
this.setState({products:result.data.product})
 })
}

componentDidUpdate(){
    this.detailsHandler=(id)=>{
        if(id){
            axios.get(`http://localhost:5003/user/productDetail/${id}`)
            .then(res=>{
              this.setState({product:res.data.prod})
              console.log(res.data)
            })
        }
    }
}

delete=(id)=>{
    axios.delete('http://localhost:5003/user/delete-product/'+id)
   let newProd={
       ...this.state.products
   }
let update = Object.values(newProd).filter(prod=>
    prod._id!==id
)
this.setState({products:update})
    
}


    render(){
        let post
        if(this.state.products!=null){
        post=<p></p>
        }
   if(this.state.product){
     post= <ProductDetail 
           description={this.state.product.description}
           name={this.state.product.name}
           price={this.state.product.price}
       
           />
   }
         
   let prods=this.state.products.map(product=>{
    return(
       <Product
       key={Math.random()}
       name={product.name}
       price={product.price}
       description={product.description}
       image={'http://localhost:5003/'+product.image}
       delete={()=>this.delete(product._id)}
       id={product._id}
       details={()=>this.detailsHandler(product._id)}
       />
          )
        
   })
   return(<div>
    <div>{prods}</div>
    <div>{post}</div>
    <Route path='/products/:prodId' component={ProductDetail}></Route>
    </div>
    
  )
    }

}

export default AllProducts


