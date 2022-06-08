
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
// import {Redirect} from 'react-router-dom';
// import isAuthenticated from "../../auth/index";

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
  // Table,
  FormFeedback
} from "reactstrap";
var axios = require("axios");

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentData: [],
            StudentName: '',
            StudentPhoto: '',
            StudentPassword: '',
            emailAddress: '',
            // reactstrap components
            StudentNameInvalid: false,
            StudentPasswordInvalid: false, 
            emailAddressInvalid: false,
            StudentPhotoInvalid : false,
          
            //occupationInvalid: false,
            //bloodGroupInvalid: false,
           
            //stateInvalid: false
        }
        this.changeStudentName = this.changeStudentName.bind(this) ;
        this.changeStudentPhoto = this.changeStudentPhoto.bind(this) ;
        this.changeStudentPassword = this.changeStudentPassword.bind(this) ;
        this.changeEmailAddress = this.changeEmailAddress.bind(this) ;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    fetchingStudent() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        var url = '';
        if (process.env.NODE_ENV === 'production') {
          url = 'http://localhost:3000/api/Student';
        }
        else {
          url = 'http://localhost:3443/api/Student';
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({StudentData: data});
                
            })
            .catch((error) => console.log(error));
    }
    postingStudent() {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ StudentName: this.state.StudentName, 
                                  StudentPassword: this.state.StudentPassword,
                                  emailId: this.state.emailAddress,
                                  StudentPhoto : this.state.StudentPhoto,
                                })
      };
      var url = '';
      if (process.env.NODE_ENV === 'production') {
        url = 'http://localhost:3000/api/Student';
      }
      else {
        url = 'http://localhost:3443/api/Student';
      }
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            //console.log(data) ;
            this.fetchingStudent();
        })
        .catch((error) => console.log(error));
    }
    componentDidMount(){
      this.setState({StudentData: this.props.StudentData});
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
    changeStudentPhoto(values) {
      this.setState({StudentPhoto: values.target.files[0]})
      console.log("State: ", this.state.StudentPhoto);
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
    async uploadImage() {
      const data = new FormData();
      console.log(this.state.StudentPhoto);
      data.append("file", this.state.StudentPhoto);
      data.append("upload_preset", "hms_admin");
      data.append("cloud_name", "zam-technologies");
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
      var response = await axios.post("https://api.cloudinary.com/v1_1/zam-technologies/upload", data, config) ;
      this.setState({photoURL: response.data.url});
      console.log(response);

    }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.StudentNameInvalid === false &&
        this.state.StudentPhoto !== '' &&
        this.state.StudentPasswordInvalid === false &&
        this.state.emailAddressInvalid === false 
      ){
        let tLoad = toast.loading("Adding New Student");
        await this.uploadImage();
        await this.props.postingStudent(this.state.StudentName, 
                                          this.state.photoURL,
                                          this.state.StudentPassword,
                                          this.state.emailAddress,
                                        );
        this.setState({StudentData: this.props.StudentData}) ;
        this.setState({
          StudentName: '',
          StudentPassword: '',
          photoURL: '',
          emailAddress: '',
        });
        toast.dismiss(tLoad);
        toast.success("New Student Added") ;
      }
      else {
        toast.error("Wrong Input");
      }
      
    }
    async handleDelete(id) {
        let tLoad = toast.loading("Deleting Student") ;
        await this.props.deletingStudent(id) ;
        this.setState({StudentData: this.props.StudentData});
        toast.dismiss(tLoad) ;
        toast.success("Student Deleted");
    }
  render() {
    return (
      <>
        <div className="content">
        {/* {!isAuthenticated(sessionStorage.getItem('Student')) ? <Redirect to="/auth/login" /> : <></>} */}
          <Row>
            
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)} encType='multipart/form-data'>
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
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Profile Photo</label>
                          <Input 
                              type="file" 
                              accept=".png, .jpg, .jpeg"
                              name="Profile Photo"
                              onChange={this.changeStudentPhoto}
                              required
                          />
                          <FormFeedback>Not an image</FormFeedback>
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
                          Submit
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Student;
