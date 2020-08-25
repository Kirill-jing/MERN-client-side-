import React, { Component } from 'react'


class Signup extends Component{

    state={
        email:null,
        password:null,
        name:null
    }
render(){
    return(
       <div>
           <form onSubmit={e=>this.props.onSignup(e,this.state)}>
                <input value={this.state.name} onChange={event=>this.setState({name:event.target.value})}></input>
                <input value={this.state.email} onChange={event=>this.setState({email:event.target.value})}></input>
                <input value={this.state.password} onChange={event=>this.setState({password:event.target.password})}></input>
                <button type="submit">signup</button>
           </form>
       </div>
    )
}
}

export default Signup