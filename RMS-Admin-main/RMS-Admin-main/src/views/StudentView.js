
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../auth/index";
import Papa from "papaparse";
import Axios from "axios";
import {ProgressBar} from 'react-bootstrap';

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
var axios = require("axios");

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentData: [],
            StudentName: '',
            StudentPhoto: '',
            photoURL: '',
            StudentPassword: '',
            emailAddress: '',
            // reactstrap components
            StudentNameInvalid: false,
            StudentPasswordInvalid: false, 
            emailAddressInvalid: false,
            UploadPercentage: 0,
          
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
          url =  'http://localhost:3500/api/Student';
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
                                  
                                  emailId: this.state.emailAddress,
                                })
      };
      var url = '';
      if (process.env.NODE_ENV === 'production') {
        url = 'http://localhost:3500/api/Student' ;
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
    
    // async uploadImage() {
    //   const data = new FormData();
    //   console.log(this.state.StudentPhoto);
    //   data.append("file", this.state.StudentPhoto);
    //   data.append("upload_preset", "hms_admin");
    //   data.append("cloud_name", "zam-technologies");
    //   const config = {
    //     headers: { "X-Requested-With": "XMLHttpRequest" },
    //   }
    //   var response = await axios.post("https://api.cloudinary.com/v1_1/zam-technologies/upload", data, config) ;
    //   this.setState({photoURL: response.data.url});
    //   console.log(response);

    // }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.StudentNameInvalid === false &&
        // this.state.StudentPhoto !== '' &&
        this.state.StudentPasswordInvalid === false &&
        this.state.emailAddressInvalid === false
      ){
        let tLoad = toast.loading("Adding New Student");
       // await this.uploadImage();
        await this.props.postingStudent(  this.state.StudentName, 
                                          // this.state.photoURL,
                                          this.state.StudentPassword,                                        
                                          this.state.emailAddress,
                                        );
        this.setState({StudentData: this.props.StudentData}) ;
        this.setState({
          StudentName: '',
          StudentPassword: '',
          // StudentPhoto: '',
         
          emailAddress: '',
        
        });
        toast.dismiss(tLoad);
        toast.success("New Student Added") ;
      }
      else {
        toast.error("Wrong Input");
      }
      
    }
    async readCSV (filePath) {                // reading the csv file
      return new Promise(resolve => {
        Papa.parse(filePath, {
          // header: true,
          complete: results => {
            console.log('Complete', results.data.length, 'records.'); 
            resolve(results.data);
          }
        });
      });
    };
    async handleDelete(id) {
        let tLoad = toast.loading("Deleting Student") ;
        await this.props.deletingStudent(id) ;
        this.setState({StudentData: this.props.StudentData});
        toast.dismiss(tLoad) ;
        toast.success("Student Deleted");
    }
  render() {
    const {UploadPercentage} = this.state;
    return (
      <>
        <div className="content">
        {!isAuthenticated(sessionStorage.getItem('HMS-Admin')) ? <Redirect to="/admin/login" /> : <></>}
          <Row>
            
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Enter Student Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)} encType='multipart/form-data'>
                    <Row>
                      <Col className="pr-1 " md="5">
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
                      <Col className="pr-1 " md="5">
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
                      <Col className="pr-1" md="5">
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
                          Submit
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
              <Card >
                <CardHeader>
                  <CardTitle tag="h5">Upload Student's CSV file</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Row>
                  <Col className="pr-1 " md="4">
                    <div className="App">
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={async (e) => {
                          const files = e.target.files;
                          console.log(files);
                          if (files) {
                            console.log(files[0]);
                            let results = await this.readCSV(files[0]) ;  // it is storing all data from csv file in array
                            var allStudent = []
                            console.log("length",results.length)
                            for (var i = 1; i < results.length-1; i++) {
                              const stu = {
                                name: results[i][0],
                                password: results[i][1],
                                email: results[i][2],
                              };
                              allStudent.push(stu)
                            }        
                            // console.log("ALLLLLLLLLLLLLLLLLL",allStudent)
                            // console.log("Size of file",files[0].size)
                            // console.log(results);
                            let tLoad = toast.loading("Batch Uploading Students") ;
                            
                            // let PercentageLoad;
                            // let total = files[0].size;
                            // let total_loaded = 0;
                            
                            const options = {
                              onUploadProgress: (ProgressEvent) => {
                                const { loaded , total } = ProgressEvent;
                                // total_loaded += loaded;
                                // let lo = total_loaded / 1.7;
                                let percent = Math.floor((loaded * 100) / total);
                                console.log( loaded + "kb of " + total + " kb | " + percent + "%");
                                // PercentageLoad = toast.loading(percent) ;
                                if(percent < 100){
                                  this.setState({UploadPercentage: percent})
                                }
                              }
                              
                            };
                            // toast.dismiss(PercentageLoad) ;

                              // for (let j = 0 ; j < results[0].length ; j++) {
                                // console.log(results[i][0], results[i][1],  results[i][2]);
                                await this.props.postingStudent(allStudent, options).then(res => {
                                  console.log(res)
                                  this.setState({ UploadPercentage:100}, ()=> {
                                    setTimeout(() => {
                                      this.setState({UploadPercentage:0})
                                    }, 1000 );
                                  })
                                }) ;
                              // }
                              
                            
                            await this.props.gettingResources() ;
                            toast.dismiss(tLoad) ;
                            toast.success("Students Added");
                          }
                        }}
                      />
                      { UploadPercentage >0 && <ProgressBar now = {UploadPercentage} active label={UploadPercentage} /> }
                    </div>
                  </Col>
                      
                  <Col className="pr-1 " md="4">
                    <FormGroup>
                      <h6>File formate</h6>
                      <p>First cloumn: Name <br></br>
                      Second cloumn: Password<br></br>
                      Third cloumn: Email
                      </p>
                    </FormGroup>
                  </Col>
                    </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>






          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Students</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.StudentData.map(((record) => {
                            return (
                                <>
                                <tr>
                                <td>{record.name}</td>
                                <td>{record.email}</td>
                                <td><Button color="danger" onClick={() => this.handleDelete(record._id)} >Delete</Button></td>
                                </tr>
                                </>
                            );
                        }))}
                      
                    </tbody>
                  </Table>
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
