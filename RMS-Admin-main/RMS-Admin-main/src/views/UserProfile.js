
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../auth/index";
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
  Table,
  FormFeedback
} from "reactstrap";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentData: [],
            allotmentData: [],
            groupData: [],
            rentData:[],
            StudentId: '',
            StudentName: '',
            StudentPhoto: '',
            StudentPassword: '',
          
            emailAddress: '',
           
           
            // reactstrap components
            StudentNameInvalid: false,
            StudentPasswordInvalid: false, 
           
            emailAddressInvalid: false,
           
        }
        this.changeStudentName = this.changeStudentName.bind(this) ;
        this.changeStudentPassword = this.changeStudentPassword.bind(this) ;
      
        this.changeEmailAddress = this.changeEmailAddress.bind(this) ;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
      //this.setState({StudentData: this.props.StudentData});
      //let id = this.props.id;
      console.log("id", this.props.match.params.id);
      let StudentId = this.props.match.params.id ;
      let index = undefined; ;
      for (var i = 0 ; i < this.props.StudentData.length ; i++) {
          if (this.props.StudentData[i]._id === StudentId) {
            index = i ;
            break ;
          }
      }
      this.setState({
        StudentName: this.props.StudentData[index].name,
        StudentPhoto: this.props.StudentData[index].photo,
        StudentPassword: this.props.StudentData[index].password,
       
        emailAddress: this.props.StudentData[index].email,
        rentData: this.props.rentData,
        allotmentData: this.props.allotmentData,
        groupData: this.props.groupData,
        StudentId: StudentId,
      });
        //this.fetchingGuradianRecords();
    }
    //Validation
    changeStudentName(values) {
      var name = values.target.value ;
      if (name.length < 5 || name.length > 30) {
        this.setState({StudentNameInvalid: true});
      }
      else {
        this.setState({StudentNameInvalid: false});
      }
      this.setState({StudentName: values.target.value});
    }
    changeStudentPassword(values) {
      var name = values.target.value ;
      if (name.length < 7) {
        this.setState({StudentPasswordInvalid: true});
      }
      else {
        this.setState({StudentPasswordInvalid: false});
      }
      this.setState({StudentPassword: values.target.value});
    }
   
    changeEmailAddress(values) {
      var email  = values.target.value ;
      var check = false ;
      for (var i = 0 ; i < email.length ; i++) {
        if (email[i] === '@') check = true ;
      }
      if (check) {
        this.setState({emailAddressInvalid: false});
      }
      else {
        this.setState({emailAddressInvalid: true});
      }
      this.setState({emailAddress: values.target.value});
    }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.StudentNameInvalid === false &&
        this.state.StudentPasswordInvalid === false &&
       
        this.state.emailAddressInvalid === false 
      ){
        let tLoad = toast.loading("Updating Student");
        await this.props.updatingStudent(this.state.StudentId,
                                          this.state.StudentName, 
                                          this.state.StudentPassword,
                                        
                                          this.state.emailAddress,
                                         );
        this.setState({StudentData: this.props.StudentData}) ;
        toast.dismiss(tLoad);
        toast.success("Student Updated") ;
      }
      else {
        toast.error("Wrong Input");
      }
      
    }
  render() {
    return (
      <>
        <div className="content">
        {!isAuthenticated(sessionStorage.getItem('HMS-Admin')) ? <Redirect to="/admin/login" /> : <></>}
          <Row>
            
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5"></CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={this.state.StudentPhoto}
                        />
                        <h5 className="title">{this.state.StudentName}</h5>
                      </a>
                    </div>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="6">
                        <FormGroup>
                          <label>Student Name</label>
                          <Input
                            placeholder="Student Name"
                            type="text"
                            onChange = {this.changeStudentName}
                            value = {this.state.StudentName}
                            invalid = {this.state.StudentNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid Student name</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1 " md="6">
                        <FormGroup>
                          <label>Student Password</label>
                          <Input
                            placeholder="Student Password"
                            type="text"
                            onChange = {this.changeStudentPassword}
                            value = {this.state.StudentPassword}
                            invalid = {this.state.StudentPasswordInvalid}
                            required
                          />
                          <FormFeedback>Not a valid Student password</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Email Address</label>
                          <Input
                            placeholder="Email Address"
                            type="text"
                            onChange = {this.changeEmailAddress}
                            value = {this.state.emailAddress}
                            invalid = {this.state.emailAddressInvalid}
                            required
                          />
                          <FormFeedback>Not a valid email address</FormFeedback>
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
                          Update
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Allotment Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Group</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.allotmentData.map(((record) => {
                            if (record.studentId !== this.state.StudentId) {
                                return (<></>);
                            }
                            else {
                                let groupName = "";
                                for (var i = 0 ; i < this.state.groupData.length ; i++) {
                                if (this.state.groupData[i]._id === record.groupId) {
                                    groupName = this.state.groupData[i].name ;
                                    break ;
                                }
                                }
                                return (
                                    <>
                                    <tr>
                                    <td>{groupName}</td>
                                   
                                    </tr>
                                    </>
                                );
                            }
                            
                        }))}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Payment Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Created At</th>
                        <th>Rent Month</th>
                        <th>NOP</th>
                        <th>Amount</th>
                        <th>MOP</th>
                        <th>RP</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.rentData.map(((record) => {
                            if (record.StudentId !== this.state.StudentId) {
                                return (<></>);
                            }
                            else {
                                return (
                                    <>
                                    <tr>
                                    <td>{record.createdAt}</td>
                                    <td>{record.rentMonth}</td>
                                    <td>{record.natureOfPayment}</td>
                                    <td>{record.amount}</td>
                                    <td>{record.modeOfPayment}</td>
                                    <td>{record.receivingPerson}</td>
                                    </tr>
                                    </>
                                );
                            }
                            
                        }))}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row> */}
        </div>
      </>
    );
  }
}

export default UserProfile;
