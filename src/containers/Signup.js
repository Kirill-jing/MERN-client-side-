import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withRouter } from "react-router-dom";
const CustomLabel = styled(InputLabel)({
  color: (props) => (props.alt ? "white" : "red"),
  "&.Mui-focused": {
    color: (props) => (props.alt ? "white" : "red"),
  },
});
const CustomInput = styled(Input)({
  color: (props) => (props.alt ? "white" : "red"),
});

class Signup extends Component {
  state = {
    email: null,
    password: null,
    name: null,
    phone: null,
    coln: false,
    cole: false,
    colp: false,
    colPh: false,
    showPassword: false,
    enable: true,
  };

  handleClickShowPassword = () => {
    let show = this.state.showPassword;
    this.setState({ showPassword: !show });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  inputNameHandler = (event) => {
    if (!event.match(/^[a-zа-я]{5,20}$/gi)) {
      this.setState({ coln: false });
    } else {
      this.setState({ coln: true });
    }
  };

  inputEmailHandler = (event) => {
    if (!event.match(/^([a-z0-9]+\.?)+@{1}(gmail.|mail.)(com|ru)$/gi)) {
      this.setState({ cole: false });
    } else {
      this.setState({ cole: true });
    }
  };
  inputPasswordHandler = (event) => {
    if (!event.match(/^\w{10,25}$/gi)) {
      this.setState({ colp: false });
    } else {
      this.setState({ colp: true });
    }
  };
  inputPhoneHandler = (event) => {
    if (!event.match(/^(\+\d+)\((\d+)\)\d{3}\-\d{2}\-\d{2}$/gi)) {
      this.setState({ colPh: false });
    } else {
      this.setState({ colPh: true });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.onSignup(e, this.state)}>
          <FormControl>
            <CustomLabel alt={this.state.coln}>Name</CustomLabel>
            <CustomInput
              alt={this.state.coln}
              label="Name"
              value={this.state.name}
              onChange={(event) => {
                this.setState({ name: event.target.value });
                return this.inputNameHandler(event.target.value.trim());
              }}
            />
            <FormHelperText>minimum 5 letters</FormHelperText>
          </FormControl>
          <FormControl>
            <CustomLabel alt={this.state.cole}>Email</CustomLabel>
            <CustomInput
              alt={this.state.cole}
              label="Email"
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
                return this.inputEmailHandler(event.target.value.trim());
              }}
            />
          </FormControl>
          <FormControl>
            <CustomLabel alt={this.state.colp}>Password</CustomLabel>
            <CustomInput
              alt={this.state.colp}
              id="standard-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
                return this.inputPasswordHandler(event.target.value.trim());
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: "whitesmoke" }}
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>minimum 10 characters</FormHelperText>
          </FormControl>

          <FormControl>
            <CustomLabel
              alt={this.state.colPh}
              htmlFor="standard-adornment-password"
            >
              Phone number
            </CustomLabel>
            <CustomInput
              alt={this.state.colPh}
              value={this.state.phone}
              onChange={(event) => {
                this.setState({ phone: event.target.value });
                return this.inputPhoneHandler(event.target.value.trim());
              }}
            />
            <FormHelperText>example:+7(999)999-99-99</FormHelperText>
          </FormControl>
          <Button
            disabled={
              this.state.colp &&
              this.state.colPh &&
              this.state.cole &&
              this.state.coln
                ? false
                : true
            }
            variant="contained"
            color="secondary"
            type="submit"
          >
            sign up
          </Button>
        </form>
      </div>
    );
  }
}
export default withRouter(Signup);
