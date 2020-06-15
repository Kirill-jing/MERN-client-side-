
import React , {Component} from 'react'
import axios from 'axios';


class AddProduct extends Component {
  editMode=this.props.location.search==='?edit=true'

    state = {
      name:undefined,
        price:undefined,
        image:undefined,
        description:undefined}
    

fileSelectedHandler=event=>{
    let file=event.target.files[0]
 this.setState({image:file})
    }

editHandler=()=>{
  let id = this.props.match.params.prodId
  if(this.editMode){
    const data=new FormData()
    data.append('name',this.state.name )
    data.append('price', this.state.price)
    data.append("image",this.state.image)
    data.append('description',this.state.description)
    axios.put(`http://localhost:5003/user/products/edit/${id}`, data )
    .then(response=>{
        console.log(response)
    }).catch(err =>{
        console.log(err)
    })  
  }
}
  

    postHandler=()=>{
if(!this.editMode){
        const data=new FormData()
        data.append('name',this.state.name )
        data.append('price', this.state.price)
        data.append("image",this.state.image)
        data.append('description',this.state.description)
        axios.post('http://localhost:5003/user/post-product', data )
        .then(response=>{
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })    
    }}

    render () {


      return (
        <div>
          <div>
              <label>name</label>
              <input type='text' value={ this.state.name } onChange={(event)=> this.setState({name:event.target.value})}  />
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
               <input type='file' name='image'  onChange={this.fileSelectedHandler}></input>
           </div>

      <button onClick={this.editMode ? this.editHandler:this.postHandler} ></button>
        </div>
      );
    }
  }
  
  export default AddProduct;