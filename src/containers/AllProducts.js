import React ,{Component} from 'react'
import Product from '../components/Product/Product'
import axios from 'axios'
class AllProducts extends Component {

    state={
        products:[],
        product:false
    }

    componentDidMount(){
        console.log(this.props.token)
        axios.get('http://localhost:5003/user/all-products',{headers:{
            Authorization:'bearer '+this.props.token
        }})
        .then(result=>{
          
          
    this.setState({products:result.data.product})
    
     })
    }


render(){
    let prods=this.state.products.map(product=>{
        return(
           <Product
           show={true}
           key={Math.random()}
           name={product.name}
           price={product.price}
           description={product.description}
           image={'http://localhost:5003/'+product.image}
 
           id={product._id}
           details={()=>this.detailsHandler(product._id)}
           />
              )
            
       })

    return(
    <div>{prods}</div>   

    )
}

}

export default AllProducts