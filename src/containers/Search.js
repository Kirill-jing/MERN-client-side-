import React,{Component} from 'react'
import SearchProd from '../components/Product/Search-prod'
import axios from 'axios'

class Search extends Component{
   state={
       cap:undefined,
       type:undefined,
       power:undefined,
       prods:[]
   }


   search=(event)=>{
event.preventDefault()
axios.get(`http://localhost:5003/user/search?cap=${this.state.cap}&type=${this.state.type}&power=${this.state.power}`).then(result=>{
   this.setState({prods:result.data.prods})
})
   }



    render(){

            let prods = this.state.prods.map(item=>{
               return( <SearchProd
               key={Math.random()}
                name={item.name}
                price={item.price}
                description={item.description}
                image={'http://localhost:5003/'+item.image}
                amount={item.amount}
                cap={item.cap}
                type={item.type}
                power={item.power}
               />)

            })
        
        return(
            <div>
            <form>
            <select name="cap" value={this.state.cap} onChange={event=>this.setState({cap:event.target.value})}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25" selected>25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
            </select>
            <select value={this.state.power} onChange={event=>this.setState({power:event.target.value})} name="power" >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25" selected>25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
            </select>
            <select name="type"value={this.state.type} onChange={event=>this.setState({type:event.target.value})} >
            <option value="накаливания">накаливания</option>
            <option value="галогенные">галогенные</option>
            <option value="энергосберегающие" selected>энергосберегающие</option>
            </select>
            <button onClick={(event)=>this.search(event)}></button>
            </form>
{prods}
            </div>
        )
    }
}

export default Search