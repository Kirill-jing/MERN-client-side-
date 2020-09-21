import React , {Component} from 'react'
import axios from 'axios'
import Product from '../components/Product/Product'
import ProductDetail from '../components/Product/Product-detail'
import style from 'styled-components'

const AllProds=style.div`
background-color:  rgb(53, 65, 138);
position:absolute;
width:100%;
`

const MyProds=style.div`
justify-content:center;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  width:100%
`
class AllProducts extends Component {

state={
    products:[],
    product:false,
    showeDetails:false,
    showButtons:false
}

componentDidMount(){
    axios.get('http://localhost:5003/user/products',{headers:{
        Authorization:'bearer '+this.props.token
    }})
    .then(result=>{   
    this.setState({products:result.data.product})
})
}

componentDidUpdate(){  
    this.detailsHandler=(id)=>{
    let prod=  this.state.products.filter(el=>{
     return el._id==id
    })
    this.setState({product:prod[0] , showeDetails:true})  
}}


closeDetails(){
   this.setState({showeDetails:false})
}

delete=(id)=>{
    axios.delete('http://localhost:5003/user/delete-product/'+id, {headers:{
        Authorization:'bearer '+this.props.token
    }} )
   let newProd={
       ...this.state.products
   }
let update = Object.values(newProd).filter(prod=>
    prod._id!==id)
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
        amount={this.state.product.amount}
        price={this.state.product.price}
        image={'http://localhost:5003/'+this.state.product.image}
        closeDetails={()=>this.closeDetails()}
        cap={this.state.product.cap}
        power={this.state.product.power}
        type={this.state.product.type}/>
   }
         
   let prods=this.state.products.map(product=>{
    return(
       <Product
       showButtons={this.state.showButtons}
       show={true}
       key={Math.random()}
       name={product.name}
       amount={product.amount}
       price={product.price}
       description={product.description}
       image={'http://localhost:5003/'+product.image}
       delete={()=>this.delete(product._id)}
       id={product._id}
       details={()=>this.detailsHandler(product._id)}
       />
        )   
   })
   return(<AllProds>
    <MyProds>{prods}</MyProds>
    {this.state.showeDetails ?
    <div>{post}</div> :null
    }
    </AllProds>
    )
    }}

export default AllProducts


