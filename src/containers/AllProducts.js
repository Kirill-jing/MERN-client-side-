import React ,{Component} from 'react'
import Product from '../components/Product/Product'
import axios from 'axios'
import ProductDetail from '../components/Product/Product-detail'
import Cart from '../components/Product/Cart'
import './AllProducts.css'
import { styled } from '@material-ui/core/styles';
import style from 'styled-components'
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Slider from '@material-ui/core/Slider';

const Korz = style.div`
position:absolute;
right:0px;
`

const CustomSlider=styled(Slider)({
  width:'200px'
})
const StyledBadge =  styled(Badge)({
    position:'absolute',
    right: '20px',
   top:'-50px',
   zIndex:'20',
   cursor:'pointer'

})
class AllProducts extends Component {
state={
    products:[],
    product:{},
    showeDetails:false,
    serarchPrice:0,
    cart:[],
    opac:' ',
    showeCart:null,
    showButtons:true,
    slide:[]
}

componentDidMount(){
    axios.get('http://localhost:5003/user/all-products',{headers:{
        Authorization:'bearer '+this.props.token
    }})
    .then(result=>{   
     
this.setState({products:result.data.product,slide:result.data.product})
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

    addToCart=(id)=>{
       let cartProd=this.state.products.filter(el=>{
            return el._id == id
        })[0]

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
  
        })}

componentDidUpdate(){  
    this.detailsHandler=(id)=>{
 let prod=  this.state.products.filter(el=>{
     return el._id==id
    })
    this.setState({product:prod[0],showeDetails:true,opac:'opac'}) 
}
this.showCart=(e)=>{
 
    this.setState({showeCart:e})
}
this.Close=(e)=>{
    this.setState({showeCart:null})
}
this.changeHandler=(e)=>{
 let products = this.state.slide.filter(el=>{
return el.price<=this.state.serarchPrice
 })
 this.setState({
   products:products
  })
}}
closeDetails(){
   this.setState({showeDetails:false})
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

    const StyledMenuItem = withStyles((theme) => ({
        root: {
          '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
              color: theme.palette.common.white,
            },
          },
        },
      }))(MenuItem);

 const   StyledMenu = withStyles({

      })((props) => (
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...props}
        />
      ));


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
       cap={this.state.product.cap}
       power={this.state.product.power}
       type={this.state.product.type}
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
           delete={()=>this.delete(product._id)}
           details={()=>this.detailsHandler(product._id)}
           addToCart={()=>this.addToCart(product._id)}
           addition={()=>this.addition(product.priceYourAmount,product._id,product.yourAmount)}
           subtraction={()=>this.subtraction(product._id)}
           />
              )   
       })

    return(
      
<div className='all-prods' >
<CustomSlider
defaultValue={20}
      min={0}
      max={50}
      step={1}
        value={this.state.serarchPrice} 
        valueLabelDisplay="auto"
        onChange={(event,value)=>{
          this.setState({serarchPrice:value})
      return this.changeHandler(this.state.serarchPrice)}}
      />

   

    <Korz>
    <StyledBadge onClick={event=>this.showCart(event.currentTarget)}  aria-label="cart">
      <Badge  badgeContent={this.state.cart.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </StyledBadge>

          <StyledMenu
          onClose={this.Close}
        anchorEl={this.state.showeCart}
        keepMounted
        open={this.state.showeCart}
      
      >
    <StyledMenuItem>
        <div> {[cart]}</div>
        </StyledMenuItem>
      </StyledMenu>
    </Korz>
<div className='products '>
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