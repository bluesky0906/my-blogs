import React from "react";
import { AppBar, TextField, Button } from "@material-ui/core";
import axios from "axios";

type SignupProps = {
  text?: string;
};

type SignupState = {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  async handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const apiBaseUrl = "http://localhost:3000/auth/";
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";

    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    try {
      const response = await axios.post(apiBaseUrl + "signup", payload);
      console.debug(response.data);
      console.debug(response.status);
      if (response.status === 200) {
        console.log("registration successfull");
        // const token = await Env.instance.signin(
        //   payload.email,
        //   payload.password
        // );
        // console.debug(token);
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div>
        <div>
          <AppBar title="Register" />
          <TextField
            placeholder="First Name"
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
          <br />
          <TextField
            placeholder="Last Name"
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
          <br />
          <TextField
            type="email"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <br />
          <TextField
            type="password"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <br />
          <Button onClick={(e) => this.handleClick(e)}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default Signup;
