import React from "react";
import toast, { Toaster } from 'react-hot-toast';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import FormFeedback from "reactstrap/lib/FormFeedback";
import isAuthenticated from "../auth/index";
import {Redirect} from 'react-router-dom';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password: "",
      emailValid: true,
      passwordValid: true,
      isAuthenticated: isAuthenticated(sessionStorage.getItem('HMS-Admin')),
      loggingIn: false 
      // 0- Undefined
      // 1 - Redirect 
      // 2 - No Redirect
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  changeEmail(values) {
    const email = values.target.value ;
    this.setState({email: email});
  }
  changePassword(values) {
    const password = values.target.value ;
    this.setState({password: password});
  }
  async handleSubmit(values) {
    values.preventDefault();
    if (this.state.emailValid === true && this.state.passwordValid === true) {
      let t = toast.loading("Logging You In !");
      await this.props.login(this.state.email, this.state.password) ;
      if (isAuthenticated(sessionStorage.getItem('HMS-Admin'))) {
        toast.dismiss(t);
        toast.success("Logged In !");
        this.setState({
          email: "",
          password: "",
          isAuthenticated: true,
        });
        
      }
      else {
        toast.dismiss(t) ;
        toast.error(this.props.loginResponse.message);
      }
    }
    else {
      toast.error("Invalid Input");
    }
    
  }
  
  render() {
    let mainWindow ;
    if (this.state.isAuthenticated) {
      mainWindow = <Redirect to="/admin/dashboard" />
    }
    else {
      mainWindow = <>
      <div className="content">
          <Row>
            <Toaster />
            <Col md="6" className="m-auto">
              <Card className="card-user">
                <CardHeader  className="m-auto">
                  <CardTitle tag="h5">Login</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit= {(values) => this.handleSubmit(values)}>
                  <Row>
                      <Col className="m-auto" md="12">
                        <FormGroup>
                          <label htmlFor="loginEmail">
                            Email 
                          </label>
                          <Input 
                            placeholder="Email" 
                            type="text"
                            onChange = {this.changeEmail}
                            value = {this.state.email}
                            invalid = {!this.state.emailValid} />
                          <FormFeedback>Invalid Username</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      
                      <Col className="m-auto" md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange = {this.changePassword}
                            value = {this.state.password}
                            invalid = {!this.state.passwordValid} />
                          <FormFeedback>Invalid Password</FormFeedback>
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Login
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div
            className="full-page-background"
            style={{
              backgroundImage: `url(${require("assets/img/bg/fabio-mangione.jpg")})`,
            }}
          />
        </div>
      </>
    }
    return (
      <>
        {mainWindow}
      </>
    );
  }
}

export default User;
