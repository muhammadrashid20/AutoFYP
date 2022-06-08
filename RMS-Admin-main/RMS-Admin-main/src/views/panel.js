
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

class panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelData: [],
            supervisorData: [],
            panelName: '',
            panelNameInvalid: false,
        }
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changepanelName = this.changepanelName.bind(this);
        //this.deletepanel = this.props.deletepanel.bind(this);
    }
    componentDidMount() {
        this.setState({panelData: this.props.panelData, supervisorData: this.props.supervisorData});
    }
    changepanelName(values) {
        let name = values.target.value ;
        this.setState({panelName: name});
        if (name.length <= 3) this.setState({panelNameInvalid: true});
        else this.setState({panelNameInvalid: false});
    }
    async handleSubmit(values) {
        let tLoad = toast.loading("Adding New Panel")
        values.preventDefault();
        if (
        
            this.state.panelNameInvalid === false 
         ){
        await this.props.postingpanels(this.state.panelName);
        this.setState({panelData: this.props.panelData});
        this.setState({
          panelName: '',
        });
        toast.dismiss(tLoad);
        toast.success("New Panel Added");
      }
      
    }
    async handleDelete(data) {
        if (data.totalsupervisors <= 0) {
          let tLoad = toast.loading("Deleting Panel") ;
          await this.props.deletingpanel(data._id) ;
          this.setState({panelData: this.props.panelData});
          toast.dismiss(tLoad) ;
          toast.success("Panel Deleted");
        }
        else {
          toast.error("This panel can't be deleted");
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
                  <CardTitle tag="h5">Enter Panel Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster />
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="12">
                        <FormGroup>
                          <label>Panel Name</label>
                          <Input
                            placeholder="Panel Name"
                            type="text"
                            onChange = {this.changepanelName}
                            value = {this.state.panelName}
                            invalid = {this.state.panelNameInvalida}
                            required
                          />
                          <FormFeedback>Not a valid panel name</FormFeedback>
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
                  <CardTitle tag="h4">All Panels</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Total Panelists</th>
                        <th>Panelists Names</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.panelData.map((data, index) => {
                          return(
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.totalsupervisors}</td>
                                <td>{data.supervisors.map((data, index) => {
                                  let name ;
                                  for (var i = 0 ; i < this.state.supervisorData.length ; i++) {
                                    if (this.state.supervisorData[i]._id === data) {
                                      name = this.state.supervisorData[i].name;
                                    }
                                  }
                                  return (
                                    <><p>{name}</p></>  
                                    
                                  );
                                })}</td>
                                <td><Button color="danger" onClick={() => this.handleDelete(data)} >Delete</Button></td>
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

export default panel;
