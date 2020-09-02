import React ,{Component} from 'react'
import Product from '../components/Product/Product'
import axios from 'axios'
import ProductDetail from '../components/Product/Product-detail'
import Cart from '../components/Product/Cart'
class AllProducts extends Component {

state={
    products:[],
    product:{},
    showeDetails:false,
    cart:[]
}



componentDidMount(){
    axios.get('http://localhost:5003/user/all-products',{headers:{
        Authorization:'bearer '+this.props.token
    }})
    .then(result=>{   
     
this.setState({products:result.data.product})
 })
 axios.get('http://localhost:5003/user/get-cart',{headers:{ 

     Authorization:'bearer '+this.props.token
 }}).then(res=>{
   let newCart=[]
     res.data.user.forEach(el=>{
        this.state.products.map(elem=>{
           if(elem._id==el){
               newCart.push(elem)
           }
           }) 
           
     })
     this.setState({cart:newCart})
  
 })}

    addToCart=(id)=>{
       let cartProd=this.state.products.filter(el=>{
            return el._id == id
        })[0]
       
        let copy =[... this.state.cart]
          copy.push(cartProd)
        this.setState({cart:copy})
        let data=null
        axios.post(`http://localhost:5003/user/add-cart/${id}`,data,{headers:{
            Authorization:'bearer '+this.props.token
        }}).then(res=>{
            console.log(res)
        })}

componentDidUpdate(){  
    this.detailsHandler=(id)=>{
 let prod=  this.state.products.filter(el=>{
     return el._id==id
    })
    this.setState({product:prod[0],showeDetails:true})  
}}
closeDetails(){
    console.log('fuck')
   this.setState({showeDetails:false})
}

render(){
console.log(this.state.cart)
    let post
    if(this.state.products!=null){
    post=<p></p>
    }
if(this.state.product){
 post= <ProductDetail 
       description={this.state.product.description}
       name={this.state.product.name}
       price={this.state.product.price}
       image={'http://localhost:5003/'+ this.state.product.image}
       closeDetails={()=>this.closeDetails()}
       />
}

let cart=this.state.cart.map(item=>{
    return(
        <Cart
        key={Math.random()}
        name={item.name}
        price={item.price}
        image={'http://localhost:5003/'+item.image}
        description={item.description}
        />
    )
})


    let prods=this.state.products.map(product=>{
        return(
           <Product
           show={false}
           key={Math.random()}
           name={product.name}
           price={product.price}
           description={product.description}
           image={'http://localhost:5003/'+product.image}
           id={product._id}
           details={()=>this.detailsHandler(product._id)}
           addToCart={()=>this.addToCart(product._id)}
           />
              )
            
       })

    return(
<div>
{prods}
{this.state.showeDetails ?
<div>{post} </div> :null
}
{/* {cart} */}

</div>
    )
}

}

export default AllProducts