import React ,{Component} from 'react'
import Product from '../components/Product/Product'
import axios from 'axios'
import ProductDetail from '../components/Product/Product-detail'
import Cart from '../components/Product/Cart'
import './AllProducts.css'
import { connect } from 'react-redux'
class AllProducts extends Component {
state={
    products:[],
    product:{},
    showeDetails:false,
    cart:[],
    opac:' ',
    showeCart:false,
    showButtons:true
}

componentDidMount(){

    axios.get('http://localhost:5003/user/all-products',{headers:{
        Authorization:'bearer '+this.props.token
    }})
    .then(result=>{   
     
this.setState({products:result.data.product})
 })
 if(!this.props.token){
     return
 }
 axios.get('http://localhost:5003/user/get-cart',{headers:{ 
     Authorization:'bearer '+this.props.token
 }}).then(res=>{
console.log(res)

     this.setState({cart:res.data.user})
 })}

    addToCart=(id)=>{
       let cartProd=this.state.products.filter(el=>{
            return el._id == id
        })[0]
       console.log(cartProd)
        let copy =[... this.state.cart]
          copy.push(cartProd)
        this.setState({cart:copy})
        const data=new FormData()
        data.append('name',cartProd.name )
        data.append('price',cartProd.price)
        data.append('priceYourAmount', cartProd.priceYourAmount)
        data.append("amount",cartProd.amount)
        data.append("yourAmount",cartProd.yourAmount)
        data.append("image",cartProd.image)
        data.append('description',cartProd.description)
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
    this.setState({product:prod[0],showeDetails:true,opac:'opac'})  
    
}
this.showCart=()=>{
    let show=!this.state.showeCart

    this.setState({showeCart:show})
    console.log(this.state.showeCart)
}
}
closeDetails(){
    console.log('fuck')
   this.setState({showeDetails:false})
}
showCart(){
    let show=!this.state.showeCart
    this.setState({showeCart:show})
    console.log(this.state.showeCart)
}


deleteHandler=(id)=>{
    let data=null
 axios.post(`http://localhost:5003/user/delete-cart/${id}`,data,{headers:{
    Authorization:'bearer '+this.props.token
}})
 let updatedCart=[... this.state.cart]
let newCart=updatedCart.filter(el=>{
  return  el._id!=id
})
this.setState({cart:newCart})
}

addition=(price,id,amount)=>{

    let newArr=[...this.state.products]
    newArr.forEach(el=>{
        if(el._id==id){
            if(el.yourAmount>=el.amount){
                return
            }
            el.yourAmount++
        return  el.priceYourAmount+=el.price
        }
    })
   this.setState({products:newArr})
}
subtraction=(id)=>{
    let newArr=[...this.state.products]
    newArr.forEach(el=>{
        if(el._id==id){
            if(el.yourAmount<=0){
                return
            }
            el.yourAmount--
        return  el.priceYourAmount-=el.price
        }})
   this.setState({products:newArr})
}



render(){
    console.log(this.state.showeCart)

    let post
    if(this.state.products!=null){
    post=<p></p>
    }
if(this.state.product){
 post= <ProductDetail 
       description={this.state.product.description}
       name={this.state.product.name}
       amount={this.state.product.amount}
       price={this.state.product.price}
       image={'http://localhost:5003/'+ this.state.product.image}
       closeDetails={()=>this.closeDetails()}
       />
}

let cart=this.state.cart.map(item=>{
    return(<li >
        <Cart
        key={Math.random()}
        name={item.name}
        price={item.price}
        amount={item.amount}
        yourAmount={item.yourAmount}
        priceYourAmount={item.priceYourAmount}
        image={'http://localhost:5003/'+item.image}
        description={item.description}
        deleteHandler={()=>this.deleteHandler(item._id)}
        /></li>
    )})


    let prods=this.state.products.map(product=>{
        return(
           <Product
           showButton={this.state.showButtons}
           show={false}
           key={Math.random()}
           name={product.name}
           amount={product.amount}
           price={product.price}
           yourAmount={product.yourAmount}
           priceYourAmount={product.priceYourAmount}
           description={product.description}
           image={'http://localhost:5003/'+product.image}
           id={product._id}
           details={()=>this.detailsHandler(product._id)}
           addToCart={()=>this.addToCart(product._id)}
           addition={()=>this.addition(product.priceYourAmount,product._id,product.yourAmount)}
           subtraction={()=>this.subtraction(product._id)}
           />
              )
            
       })

    return(
      
<div  >
 

    <img className='buck' onClick={this.showCart} src="/images/bin.png"/>
    {this.state.showeCart ?
        [cart] : null }

<div className='products'>
{prods} 
</div>

{this.state.showeDetails ?
<div className={this.state.opac}>{post} </div> :null
}


</div>
    )
}

}


export default AllProducts