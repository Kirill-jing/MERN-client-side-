import {NavLink}  from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import {configure,shallow } from 'enzyme'
import React from 'react'
import NavLinks from './NavLinks'

configure({adapter:new Adapter()})

describe('<NavLinks/>',()=>{
    it('should render 4 navitems if unauth',()=>{
const wrapper = shallow(<NavLinks/>)
expect(wrapper.find(NavLink)).toHaveLength(4)
    })
    it('should render 5 navitems if auth',()=>{
        const wrapper = shallow(<NavLinks auth/>)
        expect(wrapper.find(NavLink)).toHaveLength(5)
            })
})