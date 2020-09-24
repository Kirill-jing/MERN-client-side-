import Button from '@material-ui/core/Button';
import React , {Component} from 'react'
import axios from 'axios';
import style from 'styled-components'
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from "react-router-dom";
const CustomLabel=styled(InputLabel)({
  color:'white',
  '&.Mui-focused':{
      color:'white'
  }
})
const CustomSelect=styled(NativeSelect)({
  color:'white',
  '&.MuiNativeSelect-nativeInput':{
  color:'black',  
  }
})
const MyInput = style.input`
display:none;
`
const MyGrid=style.div`
dispaly:flex;
height:100%;
flex-direction:column;
width:400px;
justify-content:flex-end;
`
const CustInput=styled(TextField)({
palette: {
secondary: {
main: 'white',
  },
},
color:'white',
borderBottom: '1px solid #e2e2e1',
'& label':{
  color:'white'
  },
'& label.Mui-focused': {
  color: 'white',
  },
'&.MuiInput-underline:after': {
  borderBottomColor: 'white',
  },
})
class AddProduct extends Component {
  editMode = this.props.location.search==="?edit=true"
  state = {
    name:undefined,
    price:undefined,
    image:undefined,
    description:undefined,
    amount:undefined,
    priceYourAmount:0,
    cap:undefined,
    type:undefined,
    power:undefined,
    yourAmount:1
        }


        handleClick = () => {
          this.props.history.push("/Myproducts");
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
        image:prepProd.image,
        cap:prepProd.cap,
        power:prepProd.power,
        type:prepProd.type,
        })})}
     }
        
  editHandler=()=>{
    let id = this.props.match.params.prodId
    if(this.editMode){
      const data=new FormData()
      data.append('name',this.state.name )
      data.append('price', this.state.price)
      data.append('priceYourAmount', this.state.priceYourAmount)
      data.append("amount",this.state.amount)
      data.append("yourAmount",this.state.yourAmount)
      data.append("image",this.state.image)
      data.append('description',this.state.description)
      data.append('cap',this.state.cap)
      data.append('power',this.state.power)
      data.append('type',this.state.type)
      axios.put(`http://localhost:5003/user/products/edit/${id}`, data, {headers:{
          Authorization:'bearer '+this.props.token
          }})
      .then(response=>{
        console.log(response)
          }).catch(err =>{
        console.log(err)
            })}
      }

  postHandler=()=>{
    const data = new FormData()
    data.append('name',this.state.name )
    data.append('price', this.state.price)
    data.append("amount",this.state.amount)
    data.append('priceYourAmount', this.state.priceYourAmount)
    data.append("yourAmount",this.state.yourAmount)
    data.append('image',this.state.image)
    data.append('description',this.state.description)
    data.append('cap',this.state.cap)
    data.append('power',this.state.power)
    data.append('type',this.state.type)
    axios.post('http://localhost:5003/user/post-product', data,{headers:{
      Authorization:'bearer '+this.props.token
      }})
        .then(response=>{
      return  this.handleClick()
        }).catch(err=>{
            console.log(err)
        })
  }


render(){
  return(
  <MyGrid>
    <div>
    <CustInput value={ this.state.name }
    color='secondary'
    onChange={(event)=> this.setState({name:event.target.value})}  
    id="standard-search" 
    label="name" 
    type="search" />
    </div>
 <div>
    <CustInput
    value={this.state.price} onChange={(event)=> this.setState({price:event.target.value,priceYourAmount:event.target.value})}
    id="standard-number"
    label="Price"
    type="number"
    InputLabelProps={{
      shrink: true,
    }}/>
  </div>
  <div>
    <CustInput
    id="standard-multiline-static"
    label="Description"
    multiline
    rows={4}
    columns={17}
    value={this.state.description}
    onChange={(event)=> this.setState({description:event.target.value})}/>
  </div>
  <div>
    <MyInput  
    id="contained-button-file" 
    type='file'  
    name='image'  
    onChange={this.fileSelectedHandler}>
    </MyInput >
    <label htmlFor="contained-button-file">
    <Button   startIcon={<CloudUploadIcon />} variant="contained" color="primary" component="span">
      Upload
    </Button>
    </label>
  </div>
  <div>
    <CustInput
    value={this.state.amount} 
    onChange={(event)=> this.setState({amount:event.target.value})}
    id="standard-number"
    label="Amount"
    type="number"
    InputLabelProps={{
      shrink: true,
    }}/>
  </div>
  <div>
    <CustInput
    value={this.state.cap} 
    onChange={(event)=> this.setState({cap:event.target.value})} 
    id="standard-number"
    label="Cap"
    type="number"
    InputLabelProps={{
      shrink: true,
    }}/>
  </div>
  <div>
    <CustInput
    value={this.state.power} onChange={(event)=> this.setState({power:event.target.value})}
    id="standard-number"
    label="Power"
    type="number"
    InputLabelProps={{
      shrink: true,
    }}/>
  </div>
  <div style={{display:'none'}} >
    <label>youramount</label>
    <input type='number' value={this.state.yourAmount}   />
  </div>
  <div style={{display:'none'}} >
      <label>priceamount</label>
      <input type='number' value={this.state.priceYourAmount}  />
  </div>
  <FormControl >
    <CustomLabel htmlFor="type">Type</CustomLabel>
    <NativeSelect
    value={this.state.type}
    onChange={event=>this.setState({type:event.target.value})} 
    inputProps={{
      name:"type" ,
      id: 'type',
    }}>
    <option aria-label="None" value="" />
    <option value="tungsten lamp">tungsten lamp</option>
    <option value="halogenous lamp">halogenous lamp</option>
    <option value="energy-efficient lamp" >energy-efficient lamp</option>
    <option value="luminiscent lamp" >luminiscent lamp</option>
    <option value="luminodiode lamp" >luminodiode lamp</option>
    <option value="IR" >IR</option>
    </NativeSelect>
    <FormHelperText>Choose type you need </FormHelperText>
  </FormControl>
  <div>
    <Button
    onClick={this.editMode ? this.editHandler:this.postHandler  
            }
    variant="contained"
    color="primary"
    size="small"
    startIcon={<SaveIcon />}
      >
        Save
    </Button>
  </div>
    </MyGrid>
    )
}}
export default withRouter(AddProduct)