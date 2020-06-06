import React , {Component} from 'react'
import axios from 'axios'
import Product from '../components/Product/Product'
class Allproducts extends Component{
    state = {
    products:[]
    }



    componentDidMount(){
         axios.get('http://localhost:5003/user/products')
         .then(result=>{
               this.setState({products:result.data.product}

                )
                console.log(result)
         })     
    }
s


   render(){

      let products = this.state.products.map((product) =>{
        return   <Product
          key={product._id}
          id={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
         substract= {this.substract}
          />
      })
  

       return(
        <div>
       {products}
       </div>
       )
   }


}

export default Allproducts