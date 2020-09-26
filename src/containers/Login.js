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

const CustomLabel = styled(InputLabel)({
  color: "white",
  "&.Mui-focused": {
    color: "white",
  },
});
const CustomInput = styled(Input)({
  color: "white",
});

class Login extends Component {
  state = {
    password: "",
    email: null,
    showPassword: false,
  };

  handleClickShowPassword = () => {
    let show = this.state.showPassword;
    this.setState({ showPassword: !show });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.onLogin(e, this.state)}>
          <FormControl>
            <CustomLabel htmlFor="standard-adornment-password">
              Email
            </CustomLabel>
            <CustomInput
              label="Email"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </FormControl>
          <FormControl>
            <CustomLabel htmlFor="standard-adornment-password">
              Password
            </CustomLabel>
            <CustomInput
              id="standard-adornment-password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
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
          </FormControl>
          <Button variant="contained" color="secondary" type="submit">
            log in
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
