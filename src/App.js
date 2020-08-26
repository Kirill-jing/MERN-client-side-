
import React, { Component } from 'react';
import AddProduct from './containers/AddProduct';
import AllProducts from './containers/AllProducts'
import  SignUp from './containers/Signup'
import Login from './containers/Login'
import {
  BrowserRouter ,
  Route,
  Switch
} from 'react-router-dom';
import NavLinks from './shared/Navigation/NavLinks'
import axios from 'axios';

class App extends Component { 
  state={
    isAuth:false,
    token: null,
    userId: null,
  }

 signupHandler=(event,authData)=>{
event.preventDefault()
let Data={
  name:authData.name,
  email:authData.email,
  password:authData.password
}
axios.put('http://localhost:5003/auth/signup',Data).then(res=>{
  console.log(res)

})
 }

 loginHandler=(event,logData)=>{
event.preventDefault()
let Data={
  email:logData.email,
  password:logData.password
}

axios.post('http://localhost:5003/auth/login',Data)

.then(res => {
 
  if (res.status === 422) {
    console.log('Error!');
  }
  if (res.status !== 200 && res.status !== 201) {
    console.log('Error!');
    
  }
  return res

}).then(resData=>{
  console.log(resData)
  this.setState({
    isAuth: true,
    token: resData.data.token,
    userId: resData.data.id
  });
  localStorage.setItem('token', resData.data.token);
  localStorage.setItem('userId', resData.data.id);
  console.log(this.state.token)
  console.log(this.state.userId)
  const remainingMilliseconds = 60 * 60 * 1000;
  const expiryDate = new Date(
    new Date().getTime() + remainingMilliseconds
  );
  localStorage.setItem('expiryDate', expiryDate.toISOString());

})

 }

  render () {
    return (
      <BrowserRouter>
        <NavLinks/>
        <Switch>
        <Route  path='/products' exact   component={AllProducts } ></Route>
        <Route component={AddProduct } exact path='/add-product/:prodId' />
        <Route  path='/add-product'  exact component={AddProduct } ></Route>
        <Route  path='/signup' exact 
        render={props=>(
         <SignUp
         {...props}
         onSignup={this.signupHandler}
         />
         
        )}>

        </Route>
        <Route  path='/login' exact 
        render={props=>(
         <Login
         {...props}
         onLogin={this.loginHandler}
         />
         
        )}>
          
        </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

















