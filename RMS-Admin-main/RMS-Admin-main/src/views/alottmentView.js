
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
 // FormFeedback
} from "reactstrap";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentData: [],
            supervisorData: [],
            panelData: [],
            groupData: [],
            allotmentData: [],
            panelsupervisor: [],
            supervisorgroup: [],

            StudentId: "",
            StudentIdInvalid: false,
            panelId: "",
            panelIdInvalid: false,
            supervisorId: "",
            supervisorIdInvalid: false,
            groupId: "",
            groupIDInvalid:false,
            securityCharges: '0',
            registeraitonCharges: '0',
            monthlyRent: '0',
            securityChargesInvalid: false,
            registrationChargesInvalid: false,
            monthlyRentInvalid: false,

        }
        this.changeStudentId = this.changeStudentId.bind(this);
        this.changepanelId = this.changepanelId.bind(this) ;
        this.changesupervisorId = this.changesupervisorId.bind(this);
        this.changegroupId = this.changegroupId.bind(this) ;
        this.changeSecurityCharges = this.changeSecurityCharges.bind(this) ;
        this.changeRegisterationCharges = this.changeRegisterationCharges.bind(this) ;
        this.changeMonthlyRent = this.changeMonthlyRent.bind(this) ;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({StudentData: this.props.StudentData, 
                        panelData: this.props.panelData, 
                        groupData: this.props.groupData, 
                        supervisorData: this.props.supervisorData,
                        allotmentData: this.props.allotmentData
                      });
    }
    //Validation
    changeStudentId(values) {
      this.setState({StudentId: values.target.value});
      
      if (values.target.value === "") this.setState({StudentIdInvalid: true}) ;
      else this.setState({StudentIdInvalid: false}) ;
    }
    changepanelId(values) {
      this.setState({panelId: values.target.value});
      let val = values.target.value;
      if (values.target.value === "") this.setState({panelIdInvalid: true}) ;
      else {
        this.setState({panelIdInvalid: false}) ;
        let panelData = this.state.panelData;
          let supervisorpanel = [];
          for (var i = 0 ; i < panelData.length ; i++) {
            if (panelData[i]._id === val) {
              for (var j = 0 ; j < panelData[i].supervisors.length ; j++) {
                for (var k = 0 ; k < this.state.supervisorData.length ; k++) {
                  if (panelData[i].supervisors[j] === this.state.supervisorData[k]._id) {
                    supervisorpanel.push(this.state.supervisorData[k]);
                  }
                }
              }
              this.setState({panelsupervisor: supervisorpanel});
              return ;
            }
          }
      }
    }
    changesupervisorId(values) {
      this.setState({supervisorId: values.target.value});
      let val = values.target.value;
      if (values.target.value === "") this.setState({supervisorIdInvalid: true}) ;
      else {
        this.setState({supervisorIdInvalid: false}) ;
        let supervisorData = this.state.supervisorData;
          let supervisorgroup = [];
          for (var i = 0 ; i < supervisorData.length ; i++) {
            if (supervisorData[i]._id === val) {
              for (var j = 0 ; j < supervisorData[i].groups.length ; j++) {
                for (var k = 0 ; k < this.state.groupData.length ; k++) {
                  if (supervisorData[i].groups[j] === this.state.groupData[k]._id) {
                    supervisorgroup.push(this.state.groupData[k]);
                  }
                }
              }
              this.setState({supervisorgroup: supervisorgroup});
              return ;
            }
          }
      }
    }
    changegroupId(values) {
      this.setState({groupId: values.target.value});
      if (values.target.value === "") this.setState({groupIDInvalid: true}) ;
      else {
        this.setState({groupData: false}) ;}
    }
    changeSecurityCharges(values) {
      let val = values.target.value ;
      this.setState({securityCharges: val}) ;
      let check = false ;
      if (val === '') check = true ;
      for (var i = 0 ; i < val.length ; i++) {
        if (val[i] >= '0' && val <= '9') continue ;
        check = true ;
        break ;
      }
      this.setState({securityChargesInvalid: check}) ;
    }
    changeRegisterationCharges(values) {
      let val = values.target.value ;
      this.setState({registeraitonCharges: val}) ;
      let check = false ;
      if (val === '') check = true ;
      for (var i = 0 ; i < val.length ; i++) {
        if (val[i] >= '0' && val[i] <= '9') continue ;
        check = true ;
        break ;
      }
      this.setState({registrationChargesInvalid: check}) ;
    }
    changeMonthlyRent(values) {
      let val = values.target.value ;
      this.setState({monthlyRent: val}) ;
      let check = false ;
      if (val === '') check = true ;
      for (var i = 0 ; i < val.length ; i++) {
        if (val[i] >= '0' && val[i] <= '9') continue ;
        check = true ;
        break ;
      }
      this.setState({monthlyRentInvalid: check}) ;
    }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.StudentIdInvalid === false &&
        this.state.panelIdInvalid === false &&
        this.state.supervisorIdInvalid === false &&
        this.state.groupIDInvalid === false &&
        this.state.securityChargesInvalid === false &&
        this.state.registrationChargesInvalid === false &&
        this.state.monthlyRentInvalid === false 
      ){
        let tLoad = toast.loading("Adding New Allotment")
        await this.props.postingAllotment(this.state.StudentId, this.state.groupId, this.state.securityCharges, this.state.registeraitonCharges, this.state.monthlyRent)
        this.setState({StudentData: this.props.StudentData, 
          panelData: this.props.panelData, 
          groupData: this.props.groupData, 
          supervisorData: this.props.supervisorData,
          allotmentData: this.props.allotmentData
        });
        this.setState({StudentId: '', groupId: '', panelId: '', supervisorId: '', registeraitonCharges: 0, monthlyRent: 0, securityCharges: 0});
        toast.dismiss(tLoad);
        toast.success("New Allotment Added");
      }
      else {
        toast.error("Inavlid Entry");
      }
      
    }
    async handleDelete(data) {
      let tLoad = toast.loading("Deleting Allotment") ;
      await this.props.deletingAllotment(data._id) ;
      this.setState({allotmentData: this.props.allotmentData});
      toast.dismiss(tLoad) ;
      toast.success("Allotment Deleted");
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
                  <CardTitle tag="h5">Enter Student Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                          <label>Student </label>
                          <Input
                            type="select"
                            onChange = {this.changeStudentId}
                            value = {this.state.StudentId}
                            required
                          >
                            {/* <option value="" disabled selected>Select Allotee</option>
                            {
                                this.state.StudentData.map((data, index) => {
                                    let check = false ;
                                    for (var i = 0 ; i < this.state.allotmentData.length ; i++) {
                                      if (data._id === this.state.allotmentData[i].studentId) {
                                        check = true ;
                                        break ;
                                      }
                                    }
                                    if (check) {
                                      return (<></>);
                                    }
                                    else {
                                      return (
                                        <option key={index} value={data._id}>{data.name}</option>
                                      );
                                    }
                                    
                                })
                            } */}
                          </Input>
                        </FormGroup>
                        </Col>
                      
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Panel</label>
                          <Input
                            type="select"
                            onChange = {this.changepanelId}
                            value = {this.state.panelId}
                            required
                          >
                            <option value="" disabled selected>Select Panel</option>
                            {
                                this.state.panelData.map((data, index) => {
                                    return (
                                        <option key={index} value={data._id}>{data.name}</option>
                                    );
                                })
                            }
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Panel member</label>
                          <Input
                            type="select"
                            onChange = {this.changesupervisorId}
                            value = {this.state.supervisorId}
                            required
                          >
                            <option value=""  selected>Select Panel Member</option>
                            {
                                this.state.panelsupervisor.map((data, index) => {
                                    return (
                                        <option key={index} value={data._id}>{data.name}</option>
                                    );
                                })
                            }
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Group </label>
                          <Input
                            type="select"
                            onChange = {this.changegroupId}
                            value = {this.state.groupId}
                            required
                          >
                            <option value=""  selected>Select Group</option>
                            {
                                this.state.supervisorgroup.map((entry, index) => {
                                  return (
                                    <option key={index} value={entry._id}>{ entry.name }</option>
                                  );
                                    
                                })
                            }
                          </Input>
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
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Students</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Student</th>
                        <th>Group</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                        {this.state.allotmentData.map(((record) => {
                            let groupName = "";
                            let StudentName = "";
                            for (var i = 0 ; i < this.state.groupData.length ; i++) {
                              if (this.state.groupData[i]._id === record.groupId) {
                                groupName = this.state.groupData[i].name ;
                                break ;
                              }
                            }
                            for (var j = 0 ; j < this.state.StudentData.length ; j++) {
                              if (this.state.StudentData[j]._id === record.studentId) {
                                StudentName = this.state.StudentData[j].name ;
                                break ;
                              }
                            }
                            return (
                                <>
                                <tr>
                                <td>{StudentName}</td>
                                <td>{groupName}</td>
                                <td><Button color="danger" onClick={() => this.handleDelete(record)} >Delete</Button></td>
                                </tr>
                                </>
                            );
                        }))}
                      
                    </tbody> */}
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

export default User;
