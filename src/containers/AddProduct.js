
import React , {Component} from 'react'
import axios from 'axios';


class AddProduct extends Component {
   editMode = this.props.location.search==="?edit=true"


    state = {
        name:undefined,
        price:undefined,
        image:undefined,
        description:undefined,
        amount:undefined,
        priceYourAmount:undefined,
        yourAmount:1
        }

          
          fileSelectedHandler=event=>{
            let file=event.target.files[0]

            this.setState({image:file})
            }
        
     componentDidMount(){
         let id =this.props.match.params.prodId
        if(this.editMode){
            axios.get('http://localhost:5003/user/products/'+id)
            .then(res=>{
                let prepProd={...this.state}
                prepProd=res.data.prod
              
                this.setState({name:prepProd.name,
                 price:prepProd.price,
                 description:prepProd.description,
                 amount:prepProd.amount,
                 image:prepProd.image})
                 console.log(this.state)

            })
        }
     }
        
            editHandler=()=>{
                let id = this.props.match.params.prodId
               console.log(this.props.token)
                if(this.editMode){
                  const data=new FormData()
                  data.append('name',this.state.name )
                  data.append('price', this.state.price)
                  data.append('priceYourAmount', this.state.priceYourAmount)
                  data.append("amount",this.state.amount)
                  data.append("yourAmount",this.state.yourAmount)
                  data.append("image",this.state.image)
                  data.append('description',this.state.description)
                  
                  axios.put(`http://localhost:5003/user/products/edit/${id}`, data, {headers:{
                    Authorization:'bearer '+this.props.token
                }} )
                  .then(response=>{
                      console.log(response)
                  }).catch(err =>{
                      console.log(err)
                  })  
                }
              }

          postHandler=()=>{
              console.log(this.props.token)
              const data = new FormData()
              data.append('name',this.state.name )
              data.append('price', this.state.price)
              data.append("amount",this.state.amount)
              data.append('priceYourAmount', this.state.priceYourAmount)
              data.append("yourAmount",this.state.yourAmount)
              data.append('image',this.state.image)
              data.append('description',this.state.description)
              axios.post('http://localhost:5003/user/post-product', data,{headers:{
                Authorization:'bearer '+this.props.token
            }})
              .then(response=>{

                  console.log(response)
              }).catch(err=>{
                  console.log(err)
              })
          }


render(){
    return(
        <div>
        <div>
            <label>name</label>
            <input type='text' value={ this.state.name } onChange={(event)=> this.setState({name:event.target.value})}  />
        </div>
        <div>
            <label>price</label>
            <input type='number' value={this.state.price} onChange={(event)=> this.setState({price:event.target.value,priceYourAmount:event.target.value})}  />
        </div>
        <div>
            <label>description</label>
            <input type='text' value={this.state.description} onChange={(event)=> this.setState({description:event.target.value})}  />
        </div>
          <div>
             <input type='file'  name='image'  onChange={this.fileSelectedHandler}></input>
         </div>
         <div>
            <label>amount</label>
            <input type='number' value={this.state.amount} onChange={(event)=> this.setState({amount:event.target.value})}  />
        </div>
        <div style={{display:'none'}} >
            <label>youramount</label>
            <input type='number' value={this.state.yourAmount}   />
        </div>
        <div style={{display:'none'}} >
            <label>priceamount</label>
            <input type='number' value={this.state.priceYourAmount}  />
        </div>
        

    <button onClick={this.editMode ? this.editHandler:this.postHandler} ></button>
      </div>
    )
}
}

export default AddProduct