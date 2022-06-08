
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../auth/index";
import * as Papa from 'papaparse';


import * as XLSX from "xlsx"; 

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
import { parsePath } from "history";

class supervisor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisorData: [],
            panelData: [],
            groupData:[],
            panelId: "",
            supervisorName: "",
            panelIdInvalid: false,
            supervisorNameInvalid: false,
        };
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changesupervisorName = this.changesupervisorName.bind(this);
        this.changepanelId = this.changepanelId.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.setState({supervisorData: this.props.supervisorData, panelData: this.props.panelData, groupData: this.props.groupData});
    }
    changepanelId(values) {
        let val = values.target.value ;
        this.setState({panelId: val}) ;
        if (val === "") this.setState({panelIdInvalid: true});
        else this.setState({panelIdInvalid: false});
    }
    changesupervisorName(values) {
        let name = values.target.value ;
        this.setState({supervisorName: name});
        if (name.length <= 3) this.setState({supervisorNameInvalid: true});
        else this.setState({supervisorNameInvalid: false});
    }
    async handleSubmit(values) {
        
        values.preventDefault();
        if (
        
            this.state.supervisorNameInvalid === false &&
            this.state.panelIdInvalid === false
         ){
            let tLoad = toast.loading("Adding supervisor") ;
            await this.props.postingsupervisors(this.state.supervisorName, this.state.panelId);
            this.setState({supervisorData: this.props.supervisorData});
            this.setState({
                supervisorName: '',
                panelId: '',
            });
            toast.dismiss(tLoad) ;
            toast.success("supervisor Added");
      }
      else {
        toast.error("invalid Entry");
      }
      
    }
    async readCSV (filePath) { 
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
    async handleDelete(data) {
      if (data.totalgroups <= 0) {
        let tLoad = toast.loading("Deleting supervisor") ;
      
        await this.props.deletingsupervisor(data._id) ;
        this.setState({supervisorData: this.props.supervisorData});
        toast.dismiss(tLoad) ;
        toast.success("supervisor Deleted");
      }
      else {
        toast.error("This panel can't be deleted");
      }
    }





  render() {                                //  reading from the readExcell file that has uploaded
                                              // link of the viddeo https://www.youtube.com/watch?v=h33eakwu7oo
      const readExcel=(file)=>{
        const promise = new Promise((resolve,reject)=>{
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file)

          fileReader.onload=(e)=>{
            const bufferArray=e.target.result;

            const wb = XLSX.read(bufferArray,{type:'buffer'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            resolve(data);
          };
          fileReader.onerror = (error)=>{
              reject(error);
            };
          });

      //     promise.then((d)=> {
      //       console.log(d);
      // });

      let btn_upload = document.getElementById('Excel_file_Button').addEventListener('click', ()=>{
        Papa.parse(document.getElementById('upload_Excelfile').files[0], {
          download: true,
          header: false,
          complete: function(results) {
            console.log(results);
          }
        });
      });
    }



    return (
      <>
        <div className="content">
        {!isAuthenticated(sessionStorage.getItem('HMS-Admin')) ? <Redirect to="/admin/login" /> : <></>}
          <Row>
            {console.log(this.props)}
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Enter Panelists Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="12">
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
                          <FormFeedback>Not a valid panel</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1 " md="12">
                        <FormGroup>
                          <label>Panelist Name</label>
                          <Input
                            placeholder="Panelist Name"
                            type="text"
                            onChange = {this.changesupervisorName}
                            value = {this.state.supervisorName}
                            invalid = {this.state.supervisorNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid panelist name</FormFeedback>
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



        
          <Row>                            {/*      uploading the excel file here  */}
            
            <Col md="12">
              <Card >
                <CardHeader>
                  <CardTitle tag="h5">Enter Panelists Excel file</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  {/* <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="12">
                            <input type="file" id='upload_Excelfile' onChange={(e)=>{
                              const file = e.target.files[0];             //to read first file in case of multiplefiles
                              
                              readExcel(file);
                            }}/>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button id="Excel_file_Button"
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </Row>
                  </Form> */}
                  

                  <div className="App">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={async (e) => {
                        const files = e.target.files;
                        console.log(files);
                        if (files) {
                          console.log(files[0]);
                          let results = await this.readCSV(files[0]) ;
                          console.log(results);
                          let tLoad = toast.loading("Batch Uploading Supervisors") ;
                          for (let i = 1 ; i < results.length ; i++) {
                            for (let j = 0 ; j < results[0].length ; j++) {
                              await this.props.postingsupervisors(results[i][j], results[0][j]);
                            }
                          }
                          await this.props.gettingResources() ;
                          toast.dismiss(tLoad) ;
                          toast.success("supervisor Added");
                        }
                      }}
                    />
                  </div>
                  
                </CardBody>
              </Card>
            </Col>
          </Row>


          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Teachers</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Teachers</th>
                        <th>Select Panel</th>
                      </tr>
                      <td>

                      </td>
                      <td>
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
                      </td>
                    </thead>
                    <tbody>
                        
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row> */}








          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Panelist</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Total Groups</th>
                        <th>Group Name</th>
                      </tr>
                    </thead>
                    <tbody>
                        
                      {this.state.supervisorData.map((data, index) => {
                          return(
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.totalgroups}</td>
                                <td>{data.groups.map((data, index) => {
                                  let name;
                                  for (var i = 0 ; i < this.state.groupData.length ; i++) {
                                    if (this.state.groupData[i]._id === data) {
                                      name = this.state.groupData[i].name;
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

export default supervisor;
