
import React, { Component } from 'react';
import AddProduct from './containers/AddProduct';
import AllProducts from './containers/AllProducts'
import  SignUp from './containers/Signup'
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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

















