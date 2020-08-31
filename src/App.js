
import React, { Component } from 'react';
import AddProduct from './containers/AddProduct';
import MyProducts from './containers/MyProducts'
import  SignUp from './containers/Signup'
import Login from './containers/Login'
import AllProducts from './containers/AllProducts'
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
    h:null
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
   

    if (!token || !expiryDate) {
      return;
    }
    // if (new Date(expiryDate) <= new Date()) {
    //   this.logoutHandler();
    //   return;
    // }
    const userId = localStorage.getItem('userId');
 
    // const remainingMilliseconds =
    //   new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId ,h:'1'});

    // this.setAutoLogout(remainingMilliseconds);


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
    console.log(this.state.token)
    return (
      <BrowserRouter>
        <NavLinks/>
        <Switch>
        <Route  path='/All-products' exact 
        render={props=>(
         <AllProducts
         {...props}
         token={this.state.token}
     
         />
         
        )}> 
        </Route>
        <Route  path='/Myproducts' exact 
            render={props=>(
              <MyProducts
              {...props}
              token={this.state.token}
              />
              
             )} ></Route>
                  <Route  path='/Myproducts/:prodId' exact 
            render={props=>(
              <MyProducts
              {...props}
              token={this.state.token}
              />
              
             )} ></Route>
                 <Route  path='/add-product'  exact 
        render={props=>(
          <AddProduct
          {...props}
          userId={this.state.userId}
          token={this.state.token}
          />
          
         )}
        
        ></Route>
                  <Route  path='/add-product/:prodId'  exact 
        render={props=>(
          <AddProduct
          {...props}
          userId={this.state.userId}
          token={this.state.token}
          />
          
         )}
        
        ></Route>
    
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

















