import React, { Component } from 'react'
import './signup.css'

class Signup extends Component{

    state={
        email:null,
        password:null,
        name:null,
        phone:null,
        colName:'',
        colEmail:'',
        colPassword:'',
        colPhone:''
    }


inputNameHandler=(event)=>{
    if(!event.match(/^[a-zа-я]{1,20}$/ig)){

        console.log('invalid')
        this.setState({colName:'red'})
    }else{
        this.setState({colName:'blue'})
    }
}
// funm=(e)=>{
// let str = e
// let pattern = /^([a-z0-9]+\.?)+@{1}(gmail.|mail.)(com|ru)$/ig
// let match = pattern.exec(str)
// if(match===null){
//     return
// }
// console.log(match[1])   
// }
inputEmailHandler=(event)=>{
    if(!event.match(/^([a-z0-9]+\.?)+@{1}(gmail.|mail.)(com|ru)$/ig)){
        console.log('invalid')
        this.setState({colEmail:'red'})
    }else{
        this.setState({colEmail:'blue'})
    }
}
inputPasswordHandler=(event)=>{
    if(!event.match(/^\w{10,25}$/ig)){
        console.log('invalid')
        this.setState({colPassword:'red'})
    }else{
        this.setState({colPassword:'blue'})
    }
}
inputPhoneHandler=(event)=>{
    if(!event.match(/^(\+\d+)\((\d+)\)\d{3}\-\d{2}\-\d{2}$/ig)){
        console.log('invalid')
        this.setState({colPhone:'red'})
    }else{
        this.setState({colPhone:'blue'})
    }
}

render(){
    return(
       <div>
           <form  onSubmit={e=>this.props.onSignup(e,this.state)}>
                <input className={this.state.colName}   value={this.state.name}  onChange={ event=>{
                this.setState({name:event.target.value}) 
              return  this.inputNameHandler(event.target.value.trim())}}></input>
                <input className={this.state.colEmail} value={this.state.email} onChange={event=>{this.setState({email:event.target.value})
           return  this.inputEmailHandler(event.target.value.trim())} }></input>
                <input className={this.state.colPassword}  value={this.state.password} onChange={event=>{
            this.setState({password:event.target.value})
            return  this.inputPasswordHandler(event.target.value.trim())}
            }></input>
            <input className={this.state.colPhone}  value={this.state.phone} onChange={event=>{
            this.setState({phone:event.target.value})
            return  this.inputPhoneHandler(event.target.value.trim())}
            }></input>
                <button type="submit">signup</button>
           </form>
       </div>
    )
}
}

export default Signup