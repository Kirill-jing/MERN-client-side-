import React ,{Component} from 'react'

class Login extends Component{
    state={
        password:'',
        email:null,
        
    }


    render(){
        return(
            <div>
                <form onSubmit={e=>this.props.onLogin(e,this.state)}>
                    <input value={this.state.email} onChange={event=>this.setState({email:event.target.value})}></input>
                    <input value={this.state.password} onChange={event=>this.setState({password:event.target.value})}></input>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }
}

export default Login