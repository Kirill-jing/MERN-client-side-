import React, { Component } from "react";
import SearchProd from "../components/Product/Search-prod";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import { styled } from "@material-ui/core/styles";

const CustomLabel = styled(InputLabel)({
  color: "white",
  "&.Mui-focused": {
    color: "white",
  },
});
const CustomSelect = styled(NativeSelect)({
  color: "white",
  "&.MuiNativeSelect-nativeInput": {
    color: "black",
  },
});
class Search extends Component {
  state = {
    cap: undefined,
    type: undefined,
    power: undefined,
    prods: [],
  };

  search = (event) => {
    event.preventDefault();
    axios
      .get(
        `http://localhost:5003/user/search?cap=${this.state.cap}&type=${this.state.type}&power=${this.state.power}`
      )
      .then((result) => {
        this.setState({ prods: result.data.prods });
      });
  };
  render() {
    let prods = this.state.prods.map((item) => {
      return (
        <SearchProd
          key={Math.random()}
          name={item.name}
          price={item.price}
          description={item.description}
          image={"http://localhost:5003/" + item.image}
          amount={item.amount}
          cap={item.cap}
          type={item.type}
          power={item.power}
        />
      );
    });

    return (
      <div>
        <FormControl>
          <CustomLabel htmlFor="cup">Cup</CustomLabel>
          <CustomSelect
            value={this.state.cap}
            onChange={(event) => this.setState({ cap: event.target.value })}
            inputProps={{
              name: "cap",
              id: "cap",
            }}
          >
            <option aria-label="None" value="" />
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
          </CustomSelect>
          <FormHelperText>Choose cap diameter </FormHelperText>
        </FormControl>
        <form>
          <FormControl>
            <CustomLabel htmlFor="power">Power</CustomLabel>
            <NativeSelect
              value={this.state.power}
              onChange={(event) => this.setState({ power: event.target.value })}
              inputProps={{
                name: "power",
                id: "power",
              }}
            >
              <option aria-label="None" value="" />
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
              <option value="60">60</option>
            </NativeSelect>
            <FormHelperText>Chose power range </FormHelperText>
          </FormControl>
          <FormControl>
            <CustomLabel htmlFor="type">Type</CustomLabel>
            <NativeSelect
              value={this.state.type}
              onChange={(event) => this.setState({ type: event.target.value })}
              inputProps={{
                name: "type",
                id: "type",
              }}
            >
              <option aria-label="None" value="" />
              <option value="tungsten lamp">tungsten lamp</option>
              <option value="halogenous lamp">halogenous lamp</option>
              <option value="energy-efficient lamp">
                energy-efficient lamp
              </option>
              <option value="luminiscent lamp">luminiscent lamp</option>
              <option value="luminodiode lamp">luminodiode lamp</option>
              <option value="IR">IR</option>
            </NativeSelect>
            <FormHelperText>Choose type you need </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
            onClick={(event) => this.search(event)}
          >
            Search
          </Button>
        </form>
        {prods}
      </div>
    );
  }
}
export default Search;
