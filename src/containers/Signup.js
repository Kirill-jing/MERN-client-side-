import React, { Component } from 'react'
import './signup.css'

class Signup extends Component{

    state={
        email:'',
        password:'',
        name:'',
        col:''
    }


inputHandler=(event)=>{
    console.log(event)
    if(!event.match(/([a-z0-9]+\.?)+@{1}(gmail.|mail.)(com|ru)/ig)){
        console.log('invalid')
        this.setState({col:'red'})
    }else{
        this.setState({col:'blue'})
    }
}


render(){
    return(
       <div>
           <form  onSubmit={e=>this.props.onSignup(e,this.state)}>
                <input className={this.state.col} value={this.state.name}  onChange={ event=>{
                this.setState({name:event.target.value}) 
              return  this.inputHandler(event.target.value)}}></input>
                <input value={this.state.email} onChange={event=>this.setState({email:event.target.value})}></input>
                <input value={this.state.password} onChange={event=>this.setState({password:event.target.value})}></input>
                <button type="submit">signup</button>
           </form>
       </div>
    )
}
}

export default Signup