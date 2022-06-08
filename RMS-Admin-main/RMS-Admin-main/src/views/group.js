
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../auth/index";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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

class group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisorData: [],
            panelData: [],
            panelsupervisor: [],
            groupData: [],
            groupId: "",
            supervisorName: "",
            sideTable:false,
            cupboard:false,
            panelId: "",
            groupName: "",
            sideTablaInvalid:false,
            cupboardInvalid:false,
            panelIdInvalid: false,
            supervisorNameInvalid: false,
            groupNameInvalid: false,
        };
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changesupervisorName = this.changesupervisorName.bind(this);
        this.changepanelId = this.changepanelId.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.changepanelId=this.changepanelId.bind(this);
        this.changeCupBoard=this.changeCupBoard.bind(this);
        this.changeSideTable = this.changeSideTable.bind(this);
        this.changegroupName = this.changegroupName.bind(this);
        this.deletesubmit = this.deletesubmit.bind(this);
    }
    componentDidMount() {
        this.setState({supervisorData: this.props.supervisorData, panelData: this.props.panelData, groupData: this.props.groupData});
        // console.log("Group data is :",this.props.groupData);
    }
    changepanelId(values) {
        let val = values.target.value ;
        this.setState({panelId: val}) ;
        if (val === "") this.setState({panelIdInvalid: true});
        else {
          this.setState({panelIdInvalid: false});
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
    changesupervisorName(values) {
        let name = values.target.value ;
        this.setState({supervisorName: name});
        if (name==="") this.setState({supervisorNameInvalid: true});
        else this.setState({supervisorNameInvalid: false});

    }
    changeSideTable(values) {
      this.setState({sideTable: values.target.value});
    }
    changeCupBoard(values) {
      this.setState({cupboard: values.target.value});
    }
    changegroupName(values) {
      let name = values.target.value;
      this.setState({groupName: name});
      if (name.length < 3) this.setState({groupNameInvalid: true});
      this.setState({groupNameInvalid: false});
    }
    async handleSubmit(values) {
        
        values.preventDefault();
        // console.log("Panel is : ",this.state.supervisorName);
        if (
        
            this.state.supervisorNameInvalid === false &&
            this.state.panelIdInvalid === false
         ){
            console.log("Handle Submit");
            let tLoad = toast.loading("Adding group") ;
            await this.props.postinggroup(this.state.cupboard, this.state.sideTable, this.state.supervisorName, this.state.groupName);
            this.setState({supervisorData: this.props.supervisorData, panelData: this.props.panelData, groupData: this.props.groupData});
            this.setState({
                supervisorName: '',
                panelId: '',
                cupboard: false,
                sideTable: true,
                groupName: '',
            });
            toast.dismiss(tLoad) ;
            toast.success("group Added");
      }
      else {
        toast.error("Invalid Entry");
      }
      
    }
    async handleDelete(data) {
      if (data.enrollmentId === undefined) {
        let tLoad = toast.loading("Deleting group") ;
        await this.props.deletinggroup(data._id) ;
        this.setState({groupData: this.props.groupData});
        toast.dismiss(tLoad) ;
        toast.success("group Deleted");
      }
      else {
        toast.error("group can't be deleted");
      }
    }
    async deletesubmit(data) {
      confirmAlert({
        title: 'Deletion Alert',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.handleDelete(data)
          },
          {
            label: 'No',
            // onClick: () => alert('Click No')
          }
        ]
      });
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
                  <CardTitle tag="h5">Enter group info</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="12">
                        <FormGroup>
                          <label>Group Name</label>
                          <Input
                            placeholder="Group Name"
                            type="text"
                            onChange = {this.changegroupName}
                            value = {this.state.groupName}
                            invalid = {this.state.groupNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid Group name</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1 " md="6">
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
                          <FormFeedback>Not a valid Panel</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1 " md="6">
                        <FormGroup>
                          <label>Panel Member </label>
                          <Input
                            type="select"
                            onChange = {this.changesupervisorName}
                            value = {this.state.supervisorName}
                            required
                          >
                            <option value=""  selected>Select Panelist</option>
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
                    </Row>




{/* 
                    <Row>
            
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Upload Studentgroup file</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="12">
                        <FormGroup>
                          <label>Group Name</label>
                          <Input
                            placeholder="Group Name"
                            type="text"
                            onChange = {this.changegroupName}
                            value = {this.state.groupName}
                            invalid = {this.state.groupNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid Group name</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1 " md="6">
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
                          <FormFeedback>Not a valid Panel</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1 " md="6">
                        <FormGroup>
                          <label>Panel Member </label>
                          <Input
                            type="select"
                            onChange = {this.changesupervisorName}
                            value = {this.state.supervisorName}
                            required
                          >
                            <option value=""  selected>Select Panelist</option>
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
                    </Row> */}








                    <Row>
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
                  <CardTitle tag="h4">All Groups</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        
                      {this.state.groupData.map((data, index) => {
                          return(
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td><Button color="danger" onClick={() =>  this.deletesubmit(data)} >Delete</Button></td>
                            </tr>
                          );
                      })}
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

export default group;
