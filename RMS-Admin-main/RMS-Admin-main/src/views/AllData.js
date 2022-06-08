
import React from "react";
import { Link } from "react-router-dom";
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../auth/index";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

class AllData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StudentData: [],
            allotmentData: [],
            panelData: [],
            supervisorData: [],
            groupData: [],
        }
    }
    componentDidMount(){
        this.setState({
                        StudentData: this.props.StudentData, 
                        allotmentData: this.props.allotmentData, 
                        panelData: this.props.panelData,
                        supervisorData: this.props.supervisorData, 
                        groupData: this.props.groupData,
                      });
    }
  render() {
    return (
      <>
        <div className="content">
        {console.log(isAuthenticated(sessionStorage.getItem('HMS-Admin')))}
        {!isAuthenticated(sessionStorage.getItem('HMS-Admin')) ? <Redirect to="/admin/login" /> : <></>}
        {/* <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-satisfied text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Students</p>
                        <CardTitle tag="p">{this.props.StudentData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-copy-04 text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Allotments</p>
                        <CardTitle tag="p">{this.props.allotmentData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-alert-circle-i text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Expenses</p>
                        <CardTitle tag="p">{this.props.expenseData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Payments</p>
                        <CardTitle tag="p">{this.props.rentData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bullet-list-67 text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total panels</p>
                        <CardTitle tag="p">{this.props.panelData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-box text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total supervisors</p>
                        <CardTitle tag="p">{this.props.supervisorData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-tie-bow text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total groups</p>
                        <CardTitle tag="p">{this.props.groupData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-02 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Visitors</p>
                        <CardTitle tag="p">{this.props.visitorData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Panel</th>
                        <th>Panel Members</th>
                        <th>Group</th>
                        <th>Student</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.panelData.map(((panel) => {
                            // if (panel.supervisors.length === 0) {
                            //     return (
                            //         <tr>
                            //             <td>{panel.name}</td>
                            //             <td>-</td>
                            //             <td>-</td>
                            //             <td>-</td>
                            //             <td><Link to="/admin/supervisor"><Button color="primary"  >Add Panelist</Button></Link></td>
                            //         </tr>
                            //     );
                            // }
                            // else {
                            //     const supervisorReturn = panel.supervisors.map((supervisorId) => {
                            //         let supervisor = undefined ;
                            //         for (var i = 0 ; i < this.state.supervisorData.length ; i++) {
                            //             if (this.state.supervisorData[i]._id === supervisorId){
                            //                 supervisor = this.state.supervisorData[i];
                            //                 console.log("Panel Members", supervisor); 
                            //                 break ;
                            //             }
                            //         }
                            //         if (supervisor.groups.length === 0 || supervisor.groups === undefined) {
                            //             console.log("supervisor IF");
                            //             return (
                            //                 <tr>
                            //                     <td>{panel.name}</td>
                            //                     <td>{supervisor.name}</td>
                            //                     <td>-</td>
                            //                     <td>-</td>
                            //                     <td><Link to="/admin/group"><Button color="primary"  >Add Group</Button></Link></td>
                            //                 </tr>
                            //             );
                            //         }
                            //         else {
                            //             console.log("supervisor Else");
                            //             const groupReturn = supervisor.groups.map((groupId) => {
                            //                 let group = undefined;
                            //                 for (var i = 0 ; i < this.state.groupData.length ; i++) {
                            //                     if (this.state.groupData[i]._id === groupId){
                            //                         group = this.state.groupData[i];
                            //                         break ;
                            //                     }
                            //                 }
                            //                 if (group.allotmentId === undefined) {
                            //                     return (
                            //                         <tr>
                            //                             <td>{panel.name}</td>
                            //                             <td>{supervisor.name}</td>
                            //                             <td>{group.name}</td>
                            //                             <td>-</td>
                            //                             <td><Link to="/admin/alottment"><Button color="primary"  >Make Assignment</Button></Link></td>
                            //                         </tr>
                            //                     );
                            //                 }
                            //                 else {
                            //                     let StudentId = undefined;
                            //                     let StudentName = undefined;
                            //                     for (var j = 0 ; j < this.state.allotmentData.length ; j++) {
                            //                         if (this.state.allotmentData[j]._id === group.allotmentId){
                            //                             StudentId = this.state.allotmentData[j].studentId;
                            //                             break ;
                            //                         }
                            //                     }
                            //                     for (var k = 0 ; k < this.state.StudentData.length ; k++) {
                            //                         if (this.state.StudentData[k]._id === StudentId){
                            //                             StudentName = this.state.StudentData[k].name;
                            //                             break ;
                            //                         }
                            //                     }
                            //                     return (
                            //                         <tr>
                            //                             <td>{panel.name}</td>
                            //                             <td>{supervisor.name}</td>
                            //                             <td>{group.name}</td>
                            //                             <td>{StudentName}</td>
                            //                             <td><Link to={"/admin/Student-profile/" + StudentId}><Button color="primary"  >Details</Button></Link></td>
                            //                         </tr>
                            //                     );
                            //                 }
                            //             });
                            //             return (<>{groupReturn}</>);
                            //         }
                            //     })
                            //     return (<>{supervisorReturn}</>);
                            // }
                        }))}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Student's</CardTitle>
                  <Link to="/admin/Student"><Button color="primary"  >Add Student</Button></Link>
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
                                <td><Link to={"/admin/Student-profile/" + record._id}><Button color="primary"  >Edit</Button></Link></td>
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

export default AllData;
