import React, { useContext } from "react";
import { Input, Col, Row, Button } from "antd";

import AuthContext from "../context/AuthContext";

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <Row justify="center">
      <Col span={6}>
        <form onSubmit={loginUser}>
          <Input
            type="text"
            name="username"
            placeholder="Enter username"
            required={true}
            style={{
              margin:'5px'
            }}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            required={true}
            style={{
              margin: '5px'
            }}
          />
          <Button type="primary" htmlType="submit" style={{
            margin:'5px'
          }}>
            Login
          </Button>
        </form>
      </Col>
    </Row>
  );
};

export default Login;
