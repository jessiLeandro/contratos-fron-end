import React, { Component } from "react";
import { Button, Input } from "antd";
import { connect } from "react-redux";
import { NewUser } from "../../services/user";

import "./index.css";

class DashPage extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    telphone: ""
  };

  newUser = async () => {
    const value = this.state;
    await NewUser(value);
  };

  onChange = e => {
    const { value, name } = e.target;

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="card-main">
        <div className="div-titulo">
          <h1 className="h1-titulo">Graficos</h1>
        </div>
        <div className="div-container-newUser">
          <div>
            <label>email</label>
            <Input
              onChange={this.onChange}
              value={this.state.email}
              name="email"
              placeholder="email"
            />
          </div>
          <div>
            <label>username</label>
            <Input
              onChange={this.onChange}
              value={this.state.username}
              name="username"
              placeholder="username"
            />
          </div>
          <div>
            <label>password</label>
            <Input
              onChange={this.onChange}
              value={this.state.password}
              name="password"
              placeholder="password"
            />
          </div>
          <div>
            <label>Telefone</label>
            <Input
              onChange={this.onChange}
              value={this.state.telphone}
              name="telphone"
              placeholder="telphone"
            />
          </div>
        </div>
        <Button onClick={this.newUser} type="submit">
          Criar
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(mapStateToProps)(DashPage);
