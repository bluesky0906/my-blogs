import React from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { Env } from "./firebase/Firestore";

type SigninProps = {
  text?: string;
};

type SigninState = {
  username: string;
  password: string;
  token: string;
};

class Signin extends React.Component<SigninProps, SigninState> {
  constructor(props: SigninProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
    };
  }

  // TODO: signinしているかどうかで表示を変える
  isSignin = async (): Promise<boolean> => {
    const token = await Env.instance.getToken();
    console.debug(token);
    if (!token) {
      return false;
    }
    this.setState({
      token: token,
    });
    return true;
  };

  handleGoogleSignin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const token = await Env.instance.signin();
    this.setState({
      token: token,
    });
  };

  // 動かない
  async handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const apiBaseUrl = "http://localhost:3000/auth/";
    const payload = {
      email: this.state.username,
      password: this.state.password,
    };
    try {
      const response = await axios.post(apiBaseUrl + "signin", payload);

      if (response.data.code === 200) {
        console.log("Login successfull");
        // var uploadScreen=[];
        // uploadScreen.push(<uploadScreen appContext={self.props.appContext}/>)
        // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        // }
      } else if (response.data.code === 204) {
        console.log("Username password do not match");
        alert("username password do not match");
      } else {
        console.log("Username does not exists");
        alert("Username does not exist");
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="Signin">
        {/* <div>
          <TextField
            placeholder="Username"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <br />
          <TextField
            type="password"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <br />
          <Button onClick={(e) => this.handleClick(e)}>Submit</Button>
        </div> */}
        <TextField
          fullWidth={true}
          multiline
          rows={15}
          variant="outlined"
          value={this.state.token}
        />
        <br />
        <Button onClick={this.handleGoogleSignin}>Google</Button>
      </div>
    );
  }
}

export default Signin;
