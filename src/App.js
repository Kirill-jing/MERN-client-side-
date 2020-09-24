import React, { Component, Fragment } from 'react';
import AddProduct from './containers/AddProduct';
import MyProducts from './containers/MyProducts'
import  SignUp from './containers/Signup'
import Login from './containers/Login'
import lazyComponent from './hoc/lazy'
// import AllProducts from './containers/AllProducts'

import Search from './containers/Search'
import './containers/AllProducts.css'
import {
  BrowserRouter ,
  Route,
  Switch,
 Redirect
} from 'react-router-dom';
import NavLinks from './shared/Navigation/NavLinks'
import axios from 'axios';
const LazyAllProds=lazyComponent(()=>{
  return import('./containers/AllProducts')
})
class App extends Component { 
  state={
    isAuth:false,
    token: undefined,
    userId: undefined,
    data:undefined,
    redirect:false
  }
  
componentWillMount() {
  const token = localStorage.getItem('token');
  const expiryDate = localStorage.getItem('expiryDate');
  if (!token || !expiryDate) {
    return;
  }
  const userId = localStorage.getItem('userId');
  this.setState({ isAuth: true, token: token, userId: userId });
}

signupHandler=(event,authData)=>{
  event.preventDefault()
  let Data={
    name:authData.name,
    email:authData.email,
    password:authData.password,
    phone:authData.phone
}
axios.put('http://localhost:5003/auth/signup',Data).then(res => {
  if (res.status === 422) {
    console.log('Error!');
  }
  if (res.status !== 200 && res.status !== 201) {
    console.log('Error!');
  }
  return res
}).then(resData=>{
  this.setState({
    isAuth: true,
    token: resData.data.token,
    userId: resData.data.userId,
    redirect:true
});
  localStorage.setItem('token', resData.data.token);
  localStorage.setItem('userId', resData.data.userId);
  const remainingMilliseconds = 60 * 60 * 1000;
  const expiryDate = new Date(
    new Date().getTime() + remainingMilliseconds
  );
  localStorage.setItem('expiryDate', expiryDate.toISOString());
})}

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
  this.setState({
    isAuth: true,
    token: resData.data.token,
    userId: resData.data.id,
    redirect:true
  });
  localStorage.setItem('token', resData.data.token);
  localStorage.setItem('userId', resData.data.id);
  const remainingMilliseconds = 60 * 60 * 1000;
  const expiryDate = new Date(
    new Date().getTime() + remainingMilliseconds
  );
  localStorage.setItem('expiryDate', expiryDate.toISOString());
})
 }
 logoutHandler = () => {
  this.setState({ isAuth: false, token: null });
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('exp');
  this.setState({redirect:false})
};

  render () {
  let red=null
  if(this.state.redirect===true){
      red=<Redirect  to='All-products'></Redirect>
  }
  if(Date.parse(localStorage.getItem('expiryDate'))-new Date().getTime()<=0){
    this.logoutHandler()
  }
return (<div className='main' >
  <BrowserRouter>
  {red}
    <NavLinks langHandler={e=>this.langHandler(e)} logout={this.logoutHandler} auth={this.state.isAuth}/>
    <Switch>
    <Route  path='/All-products' exact 
    render={props=>(
    <LazyAllProds
    {...props}
    token={this.state.token}/>)}> 
    </Route>
{this.state.isAuth ?
<Fragment>
  <Route  path='/Myproducts' exact 
    render={props=>(
  <MyProducts
    {...props}
    token={this.state.token}/> 
    )} >
  </Route>
  <Route path='/search' 
  exact 
  component={Search}>
  </Route>
  <Route  path='/Myproducts/:prodId' exact 
  render={props=>(
  <MyProducts 
  {...props}
  token={this.state.token}/>
  )} >
  </Route> 
  <Route  path='/add-product'  exact 
  render={props=>(
  <AddProduct
    {...props}
    userId={this.state.userId}
    token={this.state.token}/> 
     )}>
  </Route>
  <Route  path='/add-product/:prodId'  exact 
  render={props=>(
    <AddProduct
    {...props}
    userId={this.state.userId}
    token={this.state.token}/>
   )}>
   </Route>
   </Fragment> : null}
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
         onLogin={this.loginHandler}/>
        )}> 
        </Route>
        </Switch>
  </BrowserRouter>
    </div>
    )
  }}

export default App;

















