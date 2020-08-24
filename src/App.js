
import React, { Component } from 'react';
import AddProduct from './containers/AddProduct';
import AllProducts from './containers/AllProducts'
import {
  BrowserRouter ,
  Route,
  Switch
} from 'react-router-dom';
import NavLinks from './shared/Navigation/NavLinks'

class App extends Component { 

  render () {
    return (
      <BrowserRouter>
        <NavLinks/>
        <Switch>
        <Route  path='/products'   component={AllProducts } ></Route>
        <Route component={AddProduct }  path='/add-product/:prodId' />
        <Route  path='/add-product'   component={AddProduct } ></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

















